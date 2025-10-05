"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { FaTimes, FaCamera } from "react-icons/fa";

interface QRScannerProps {
  appointmentId?: string;
  onSuccess?: (result: any) => void;
  onError?: (err: string) => void;
}

export default function QRScanner({ appointmentId, onSuccess, onError }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const fallbackStreamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawLoopRef = useRef<number | null>(null);
  const pollRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scanPayload, setScanPayload] = useState<any | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    // Note: newer versions of qr-scanner manage worker setup differently.
    // Setting QrScanner.WORKER_PATH is deprecated in some releases and
    // may produce console warnings. If your build requires an explicit
    // worker file, keep the file in `public/` and follow the package README.
    return () => {
      if (qrScannerRef.current) {
        try { qrScannerRef.current.stop(); } catch {}
        try { qrScannerRef.current.destroy(); } catch {}
        qrScannerRef.current = null;
      }
      if (fallbackStreamRef.current) {
        try { fallbackStreamRef.current.getTracks().forEach(t => t.stop()); } catch {}
        fallbackStreamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const initScanner = async () => {
      if (!visible) return;

      setCameraError(null);
      setIsScanning(true);

      // wait for the video element to mount
      const maxAttempts = 10;
      let attempt = 0;
      while (mounted && attempt < maxAttempts && !videoRef.current) {
        await new Promise((r) => setTimeout(r, 150));
        attempt += 1;
      }

      if (!mounted) return;
      if (!videoRef.current) {
        const errMsg = 'Video element not mounted';
        console.error(errMsg);
        setCameraError(errMsg);
        setIsScanning(false);
        onError?.(errMsg);
        return;
      }

  // Try attaching a getUserMedia stream first for reliable display
      try {
        // getUserMedia requires a secure context (https) or localhost. Show
        // a clear error instead of letting obscure browser warnings appear.
        const isSecure = window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost';
        if (!isSecure) {
          const secureErr = 'Camera access requires a secure context (HTTPS or localhost).';
          console.debug('QRScanner:', secureErr);
          setCameraError(secureErr);
          throw new Error(secureErr);
        }

        console.debug('QRScanner: attempting getUserMedia');
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        fallbackStreamRef.current = stream;
          try {
          videoRef.current.srcObject = stream;
          videoRef.current.style.display = 'block';
          if (canvasRef.current) canvasRef.current.style.display = 'block';
          await videoRef.current.play();
          console.debug('QRScanner: video.play() succeeded with fallback stream');
          console.debug('QRScanner: video element size', videoRef.current.clientWidth, videoRef.current.clientHeight, 'readyState', videoRef.current.readyState);

          // start a canvas preview draw loop as a fallback visual indicator
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const draw = () => {
              try {
                if (videoRef.current && ctx) {
                  canvas.width = videoRef.current.videoWidth || canvas.width;
                  canvas.height = videoRef.current.videoHeight || canvas.height;
                  ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                }
              } catch (e) {
                // ignore draw errors
              }
              drawLoopRef.current = requestAnimationFrame(draw);
            };
            if (!drawLoopRef.current) {
              if (canvasRef.current) canvasRef.current.style.display = 'block';
              drawLoopRef.current = requestAnimationFrame(draw);
            }
          }
        } catch (playErr) {
          console.debug('QRScanner: video.play() failed after attaching fallback', playErr);
        }
      } catch (mediaErr) {
        console.debug('QRScanner: getUserMedia failed or blocked', mediaErr);
      }

      try {
        const scanner = new QrScanner(
          videoRef.current!,
          (result: any) => {
            console.log('QR decoded:', result?.data ?? result);
            try {
              // stop polling immediately
              if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
            } catch (e) { /* ignore */ }
            setIsScanning(false);

            const payload = (() => {
              try { return result && result.data ? JSON.parse(result.data) : result; } catch { return result?.data ?? result; }
            })();

            // stop decoding but keep the video stream running so user sees preview
            try { scanner.stop(); } catch (e) { console.debug('QRScanner: error stopping scanner', e); }
            // do NOT destroy the scanner here; keep video visible for confirmation
            qrScannerRef.current = scanner;
            setScanPayload(payload);
            // show tick briefly then show confirmation panel
            setTimeout(() => {
              setScanned(true);
            }, 120);
          },
          { preferredCamera: 'environment', highlightScanRegion: true, highlightCodeOutline: true }
        );

        qrScannerRef.current = scanner;
        await scanner.start();

        // start a polling fallback that tries scanImage() periodically
        try {
          if (pollRef.current == null) {
            pollRef.current = window.setInterval(async () => {
              try {
                if (!videoRef.current) return;
                const res = await QrScanner.scanImage(videoRef.current as HTMLVideoElement);
                if (res) {
                  console.debug('QRScanner.poll: decoded', res);
                  try { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; } } catch {}
                  setIsScanning(false);
                  const payload = (() => { try { return JSON.parse(res); } catch { return res; } })();
                  // stop any active scanner decoding but keep video visible
                  try { if (qrScannerRef.current) { qrScannerRef.current.stop(); } } catch (e) { console.debug('QRScanner: error stopping scanner after poll', e); }
                  setScanPayload(payload);
                  setTimeout(() => setScanned(true), 120);
                }
              } catch (e) {
                // ignore no-result errors
              }
            }, 700);
          }
        } catch (e) {
          console.debug('QRScanner: poll setup failed', e);
        }

        // If QrScanner did not attach a stream for display, attach fallback stream
        try {
          if (videoRef.current && !videoRef.current.srcObject && fallbackStreamRef.current) {
            videoRef.current.srcObject = fallbackStreamRef.current;
            try { await videoRef.current.play(); } catch {}
          }
        } catch (attachErr) {
          console.debug('QRScanner: failed to attach fallback after scanner.start()', attachErr);
        }
      } catch (err: any) {
        if (!mounted) return;
        console.error('QR scanner error', err);
        setCameraError(err?.message ?? String(err));
        setIsScanning(false);
        onError?.(err?.message ?? String(err));
      }
    };

    initScanner();

    return () => {
      mounted = false;
      if (qrScannerRef.current) {
        try { qrScannerRef.current.stop(); } catch {}
        try { qrScannerRef.current.destroy(); } catch {}
        qrScannerRef.current = null;
      }
      if (fallbackStreamRef.current) {
        try { fallbackStreamRef.current.getTracks().forEach(t => t.stop()); } catch {}
        fallbackStreamRef.current = null;
      }
      if (drawLoopRef.current) {
        try { cancelAnimationFrame(drawLoopRef.current); } catch {}
        drawLoopRef.current = null;
      }
      if (pollRef.current) {
        try { clearInterval(pollRef.current); } catch {}
        pollRef.current = null;
      }
    };
  }, [visible]);

  const openScanner = async () => {
    console.debug('QRScanner: opening scanner modal');
    setCameraError(null);
    setVisible(true);
    setIsScanning(true);
  };

  const closeScanner = () => {
    setVisible(false);
    setIsScanning(false);
    if (qrScannerRef.current) {
      try { qrScannerRef.current.stop(); } catch {}
      try { qrScannerRef.current.destroy(); } catch {}
      qrScannerRef.current = null;
    }
    if (fallbackStreamRef.current) {
      try {
        console.debug('QRScanner: stopping fallback tracks', fallbackStreamRef.current.getTracks().map(t => t.kind + ':' + t.id));
        fallbackStreamRef.current.getTracks().forEach(t => t.stop());
      } catch (e) { console.debug('QRScanner: error stopping tracks', e); }
      fallbackStreamRef.current = null;
    }
    if (drawLoopRef.current) {
      try { cancelAnimationFrame(drawLoopRef.current); } catch {}
      drawLoopRef.current = null;
      console.debug('QRScanner: draw loop stopped');
    }
      // clear polling fallback if active
      if (pollRef.current) {
        try { clearInterval(pollRef.current); } catch (e) { console.debug('QRScanner: error clearing poll', e); }
        pollRef.current = null;
        console.debug('QRScanner: poll cleared');
      }

      // hide and detach media from video/canvas
      try {
        if (videoRef.current) {
          try { videoRef.current.pause(); } catch {}
          try { (videoRef.current as HTMLVideoElement).srcObject = null; } catch {}
          videoRef.current.style.display = 'none';
        }
        if (canvasRef.current) {
          canvasRef.current.style.display = 'none';
        }
      } catch (e) { console.debug('QRScanner: error during detach', e); }
  };

  return (
    <div>
      <button
        onClick={openScanner}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <FaCamera className="w-4 h-4" />
        Scan QR Code
      </button>

      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeScanner} />

          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Scan QR Code</h4>
              <button onClick={closeScanner} className="text-gray-600 hover:text-gray-900"><FaTimes /></button>
            </div>

            <div className="relative w-full h-64">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full rounded-lg bg-gray-900 object-cover z-10"
                autoPlay
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full rounded-lg bg-gray-800 z-20"
                style={{ display: 'none' }}
              />

              {/* success tick overlay */}
              {scanned && (
                <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/90 rounded-full p-4 shadow-lg flex items-center justify-center animate-pulse-fast" style={{ width: 112, height: 112 }}>
                    <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
              )}

              {/* confirmation panel shown after decode */}
              {scanPayload && (
                <div className="absolute right-3 top-3 z-50 w-64 bg-white rounded-lg shadow-lg p-3 border">
                  <div className="text-sm font-semibold mb-2">QR Scan Result</div>
                  <div className="text-xs text-gray-700 mb-2 max-h-36 overflow-auto">
                    {/* render friendly fields when available */}
                    {scanPayload && typeof scanPayload === 'object' ? (
                      <div className="space-y-1 text-sm">
                        <div><span className="font-medium">Name:</span> {scanPayload.name ?? '—'}</div>
                        <div><span className="font-medium">Email:</span> {scanPayload.email ?? '—'}</div>
                        <div><span className="font-medium">UID:</span> {scanPayload.uid ?? '—'}</div>
                        <div><span className="font-medium">Timestamp:</span> {scanPayload.timestamp ? new Date(scanPayload.timestamp).toLocaleString() : '—'}</div>
                      </div>
                    ) : (
                      <pre className="whitespace-pre-wrap text-xs">{String(scanPayload)}</pre>
                    )}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded"
                      onClick={() => {
                        // confirm -> clean up scanner and media, call onSuccess and close modal
                        try { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; } } catch {}
                        try { if (qrScannerRef.current) { qrScannerRef.current.stop(); qrScannerRef.current.destroy(); qrScannerRef.current = null; } } catch (e) { console.debug('QRScanner: error destroying scanner on confirm', e); }
                        try { if (fallbackStreamRef.current) { fallbackStreamRef.current.getTracks().forEach(t => t.stop()); fallbackStreamRef.current = null; } } catch (e) { console.debug('QRScanner: error stopping tracks on confirm', e); }
                        onSuccess?.(scanPayload);
                        setScanPayload(null);
                        setScanned(false);
                        setVisible(false);
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                      onClick={async () => {
                        // Scan again: reset state and re-initialize scanner
                        setScanPayload(null);
                        setScanned(false);
                        setIsScanning(true);
                        // attempt to re-init scanner after a tick
                        setTimeout(() => {
                          // re-run init by toggling visible (effect depends on visible)
                          // force re-init by calling init inside effect; easiest is to unmount/re-mount by toggling visible
                          setVisible(false);
                          setTimeout(() => setVisible(true), 120);
                        }, 120);
                      }}
                    >
                      Scan again
                    </button>
                  </div>
                </div>
              )}

              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                  <div className="relative w-40 h-40 border-4 border-white/60 rounded-lg pointer-events-none">
                    <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-lg"></div>
                  </div>
                </div>
              )}
            </div>

            {cameraError && (
              <div className="mt-3 text-sm text-red-600">{cameraError}</div>
            )}

            <div className="mt-4 flex justify-end">
              <button onClick={closeScanner} className="px-4 py-2 bg-gray-100 rounded-md text-sm">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

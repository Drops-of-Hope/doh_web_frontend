"use client";

import { useEffect, useState } from 'react';

// Dummy coordinates for Sri Lankan cities (donors locations)
const donorLocations = [
  { id: 1, name: "Colombo", lat: 6.9271, lng: 79.8612, donors: 45 },
  { id: 2, name: "Kandy", lat: 7.2906, lng: 80.6337, donors: 32 },
  { id: 3, name: "Galle", lat: 6.0329, lng: 80.2168, donors: 28 },
  { id: 4, name: "Matara", lat: 5.9549, lng: 80.5550, donors: 19 },
  { id: 5, name: "Negombo", lat: 7.2083, lng: 79.8358, donors: 24 },
  { id: 6, name: "Anuradhapura", lat: 8.3114, lng: 80.4037, donors: 21 },
  { id: 7, name: "Jaffna", lat: 9.6615, lng: 80.0255, donors: 18 },
  { id: 8, name: "Batticaloa", lat: 7.7102, lng: 81.7088, donors: 16 },
  { id: 9, name: "Kurunegala", lat: 7.4818, lng: 80.3609, donors: 22 },
  { id: 10, name: "Ratnapura", lat: 6.6828, lng: 80.4126, donors: 15 },
  { id: 11, name: "Badulla", lat: 6.9934, lng: 81.0550, donors: 14 },
  { id: 12, name: "Polonnaruwa", lat: 7.9403, lng: 81.0188, donors: 12 },
  { id: 13, name: "Trincomalee", lat: 8.5874, lng: 81.2152, donors: 11 },
  { id: 14, name: "Hambantota", lat: 6.1241, lng: 81.1185, donors: 13 },
  { id: 15, name: "Kalutara", lat: 6.5854, lng: 79.9607, donors: 17 }
];

export default function MapComponent() {
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [CircleMarker, setCircleMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only import on client side
    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-leaflet'),
        import('leaflet/dist/leaflet.css')
      ]).then(([reactLeaflet]) => {
        setMapContainer(() => reactLeaflet.MapContainer);
        setTileLayer(() => reactLeaflet.TileLayer);
        setCircleMarker(() => reactLeaflet.CircleMarker);
        setPopup(() => reactLeaflet.Popup);
        setIsLoading(false);
      }).catch((error) => {
        console.error('Failed to load map components:', error);
        setIsLoading(false);
      });
    }
  }, []);

  // Show loading state during SSR and while loading components
  if (typeof window === 'undefined' || isLoading || !MapContainer) {
    return (
      <div className="h-96 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <MapContainer
        center={[7.8731, 80.7718] as [number, number]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {donorLocations.map((location) => (
          <CircleMarker
            key={location.id}
            center={[location.lat, location.lng] as [number, number]}
            radius={Math.max(location.donors / 3, 5)}
            fillColor="#ef4444"
            color="#dc2626"
            weight={2}
            opacity={0.8}
            fillOpacity={0.6}
          >
            <Popup>
              <div className="text-center p-2">
                <h3 className="font-semibold text-gray-900">{location.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium text-red-600">{location.donors}</span> donors
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
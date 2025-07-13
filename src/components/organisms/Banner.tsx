"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaQrcode } from 'react-icons/fa';

interface AppDownloadBannerProps {
  className?: string;
}

export default function AppDownloadBanner({ className = '' }: AppDownloadBannerProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-16 px-4 mb-4${className}`}>

      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-start"
          >
            {/* Background Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-red-400/20 to-red-600/30 rounded-full blur-xl"></div>
              <div className="absolute w-64 h-64 bg-gradient-to-br from-red-300/20 to-blue-200 rounded-full blur-xl translate-x-8 translate-y-8"></div>
            </div>
            
            {/* Phone Mockup */}
            <div className="relative z-10 w-64 h-[480px] bg-black rounded-[2.5rem] p-2 shadow-2xl left-12">
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">

                <div className="absolute inset-0 bg-gradient-blue-primary flex flex-col items-center justify-center">

                  <div className="h-30 w-30 bg-gradient-to-br from-white to-[#B3D0E9] rounded-full mb-6 flex items-center justify-center shadow-xl">
                      <Image
                                src="/assets/blood.png"
                                alt="Blood"
                                width={300}
                                height={300}
                                className="w-[300px] h-auto"
                        />
                  </div>
                  
                  <div className="text-center text-white">
                    <p className="text-sm font-medium">DROPS OF</p>
                    <h3 className="text-6xl font-bold mb-1 bg-gradient-hope">HOPE</h3>
                    
                  </div>
                </div>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
              </div>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-700">
                Download
              </h2>
              <p className="text-lg text-gray-600 font-medium">Our New App</p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-500 leading-relaxed">
                Experience the future of blood donation with our innovative mobile app. 
                Connect with donation platforms, track your impact, and save lives with just a few taps.
              </p>
              
              <p className="text-gray-500 leading-relaxed">
                Join thousands of heroes making a difference in their communities. 
                Your journey to saving lives starts here.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FaQrcode className="text-white text-2xl" />
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Scan QR Code</p>
                  <p>to download</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <FaApple className="text-xl" />
                  <div className="text-left">
                    <p className="text-xs">Download on the</p>
                    <p className="text-sm font-bold">App Store</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <FaGooglePlay className="text-xl" />
                  <div className="text-left">
                    <p className="text-xs">Get it on</p>
                    <p className="text-sm font-bold">Google Play</p>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
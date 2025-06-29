"use client";

import React from 'react';
import Image from 'next/image';
import Button from '../atoms/Button';

export default function DonationBanner() {
  return (
    <div className="relative w-full max-w-5xl h-[300px] rounded-2xl overflow-hidden shadow-md bg-white flex items-center justify-center">
      {/* Banner Content with background image and overlay */}
      <div className="absolute inset-5 rounded-2xl overflow-hidden">
        <Image
          src="/assets/Hand_holding_heart.jpg"
          alt="Donate Blood"
          fill
          className="object-cover scale-150"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#151928e0] via-[#31386029] to-[#151928e0]" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between items-start px-8 py-6 w-full">
        <div>
          <h2 className="text-white text-2xl font-Helvetica font-bold mb-1">
            Spread hope by donating more!
          </h2>
          <p className="text-white text-base font-Helvetica mb-4">
            Join us and help the community by donating blood!
          </p>
        </div>
        <Button
          title="Donate Blood"
          containerStyles="mb-2 bg-white text-[#FF2424] text-sm font-Helvetica font-bold px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          handleClick={() => {}}
        />
      </div>
    </div>
  );
}
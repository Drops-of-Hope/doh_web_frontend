"use client";

import React from 'react';
import Image from 'next/image';
import Button from '../atoms/Button';

export default function DonationBanner() {
  return (
    <div className="relative w-full max-w-5xl h-[400px] rounded-2xl overflow-hidden shadow-md bg-white flex items-center justify-center">
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
      <div className="relative z-10 flex flex-col h-full justify-start items-start px-10 pt-10 w-full">
        <h2 className="text-white text-3xl font-Helvetica font-bold mb-2">
          Spread hope by donating more!
        </h2>
        <p className="text-white text-lg font-Helvetica mb-8">
          Join us and help the community by donating blood!
        </p>
        <Button
          title="Donate Blood"
          containerStyles="bg-white text-[#FF2424] text-base font-Helvetica font-bold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition mt-30"
          handleClick={() => {}}
        />
      </div>
    </div>
  );
}
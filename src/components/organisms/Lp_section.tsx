import React from 'react';
import Image from 'next/image';

export default function LpSection() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white px-10">
      <div className="flex w-full max-w-7xl h-[500px] items-center justify-between">

        {/* Left Text Section */}
        <div className="w-[50%] flex flex-col justify-center space-y-6">
           <h2 className="text-4xl font-bold leading-tight text-[#F8314C]">
            EMPOWERING COMMUNITIES TO <br /> SAVE LIVES!
          </h2>
          <p className="text-base max-w-md text-[#222222]">
            Inspired by the silent strength of everyday champions, Drops of Hope was created to connect those in critical need with those who selflessly contribute.
          </p>
          <a href="#" className="text-red-500 font-semibold hover:underline inline-flex items-center gap-1">
            Explore more <span>→</span>
          </a>
        </div>

        {/* Right Image Section */}
        <div className="w-[50%] relative flex items-center justify-end-safe">
          <div
            className="
              relative flex items-center justify-center
              w-[553px] h-[590px] 
              bg-gradient-to-br from-[#B3D0E9] to-[#486A8F]
              border-[25px] border-[#FEFEFE]
              rounded-2xl
              rounded-tl-[330px]
              rounded-br-[330px]
              overflow-hidden
              shadow-[0_10px_40px_rgba(0,0,0,0.1)]
              z-10
            "
          >
            <Image
              src="/assets/Doctor.png"
              alt="Doctor"
              width={450}
              height={655}
              className="absolute top-0 left-1/2 -translate-x-1/2 z-50 object-contain pointer-events-none"
            />
          </div>

          {/* Floating Pills */}
          <div className="absolute top-14 right-95  w-[350px] h-[80px] bg-[#FEFEFE] rounded-[25px] shadow-[0_0_50px_0_rgba(0,0,0,0.25)] z-10" />
          <div className="absolute bottom-14 left-95 w-[350px] h-[80px] bg-[#FEFEFE] rounded-[25px] shadow-[0_0_50px_0_rgba(0,0,0,0.25)] z-10" />
        </div>

      </div>
    </div>
  );
}
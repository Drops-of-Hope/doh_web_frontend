import React from 'react';
import Image from 'next/image';

export default function LpSection() {
  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full flex items-center justify-between p-8">

        {/* Left Text Section */}
        <div className="w-[40%] flex flex-col justify-center space-y-6">
           <h2 className="text-4xl font-bold leading-tight text-[#F8314C]">
            EMPOWERING COMMUNITIES TO <br /> SAVE LIVES!
          </h2>
          <p className="text-base max-w-md text-[#222222]">
            Inspired by the silent strength of everyday champions, Drops of Hope was created to connect those in critical need with those who selflessly contribute.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="w-[50%] relative flex items-center justify-center">
          <div
            className="
              relative flex items-center justify-center
              w-[350px] h-[370px] 
              bg-gradient-to-br from-[#B3D0E9] to-[#486A8F]
              border-[25px] border-[#FEFEFE]
              rounded-2xl
              rounded-tl-[200px]
              rounded-br-[200px]
              overflow-hidden
              shadow-[0_10px_40px_rgba(0,0,0,0.1)]
              z-10
            "
          >
            <Image
              src="/assets/Doctor.png"
              alt="Doctor"
              width={350}
              height={555}
              className="absolute top-0 left-1/2 -translate-x-1/2 z-50 object-contain pointer-events-none"
            />
          </div>

          {/* Floating Pills */}
          <div className="absolute top-14 right-95  w-[250px] h-[60px] bg-[#FEFEFE] rounded-[20px] shadow-[0_0_50px_0_rgba(0,0,0,0.25)] z-10" />
          <div className="absolute bottom-14 left-95 w-[250px] h-[60px] bg-[#FEFEFE] rounded-[20px] shadow-[0_0_50px_0_rgba(0,0,0,0.25)] z-10" />
        </div>

      </div>
    </div>
  );
}
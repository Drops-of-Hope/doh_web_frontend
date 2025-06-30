import React from 'react';
import Image from 'next/image';

export default function LpSection() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full flex flex-col md:flex-row items-center justify-between p-8 space-y-8 md:space-y-0 md:space-x-4">

        <div className="w-full md:w-[40%] flex flex-col justify-center space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#F8314C]">
            EMPOWERING COMMUNITIES TO <br className="hidden md:block" /> SAVE LIVES!
          </h2>
          <p className="text-base max-w-md text-gray-600 mx-auto md:mx-0">
            Inspired by the silent strength of everyday champions, Drops of Hope was created to connect those in critical need with those who selflessly contribute.
          </p>
        </div>

        <div className="w-full md:w-[50%] relative flex items-center justify-center">
          <div
            className="
              relative flex items-center justify-center
              w-[260px] md:w-[350px] h-[280px] md:h-[370px]
              bg-gradient-to-br from-[#B3D0E9] to-[#486A8F]
              border-[20px] md:border-[25px] border-[#FEFEFE]
              rounded-2xl
              rounded-tl-[140px] md:rounded-tl-[200px]
              rounded-br-[140px] md:rounded-br-[200px]
              overflow-hidden
              shadow-[0_10px_40px_rgba(0,0,0,0.1)]
              z-10
            "
          >
            <Image
              src="/assets/Doctor.png"
              alt="Doctor"
              width={300}
              height={500}
              className="absolute top-0 left-1/2 -translate-x-1/2 z-50 object-contain pointer-events-none"
            />
          </div>

          <div className="absolute top-14 right-70 md:right-95 md:w-[250px] md:h-[60px] bg-[#FEFEFE] rounded-[20px] shadow-[0_0_50px_0_rgba(0,0,0,0.25)] z-10 flex items-center justify-center px-4 text-center">
            <span className="text-gray-500 font-md text-md font-body">
              EVERY DROP COUNTS!
            </span>
          </div>
          <div className="absolute bottom-14 left-70 md:left-95 md:w-[250px] md:h-[60px] bg-[#FEFEFE] rounded-[20px] shadow-[0_0_50px_0_rgba(0,0,0,0.25)] z-10 flex items-center justify-center px-4 text-center">
            <span className="text-gray-500 font-md text-md font-body">
              DONATE BLOOD, SHARE HOPE!
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

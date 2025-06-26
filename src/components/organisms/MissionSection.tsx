import React from 'react';
import Image from 'next/image';

export default function MissionSection() {
  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full flex items-center justify-center p-4 space-x-16">

        <div className="flex items-center justify-center w-1/2">
          <div className="relative flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-white to-[#B3D0E9] rounded-full flex items-center justify-center shadow-2xl">
              <Image
                src="/assets/blood.png"
                alt="Blood drop"
                width={700}
                height={700}
                className=''
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 w-1/2">
          <h2 className="text-4xl font-bold leading-tight text-gray-700">
            OUR MISSION IS <br />
            <span className="text-[#F8314C]">SAVING LIVES</span>
          </h2>
          <p className="text-base max-w-md text-gray-600">
            Every drop counts in our mission to bridge the gap between blood donors and those in urgent need. We believe that technology can transform how communities come together to save lives.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#F8314C] rounded-full"></div>
              <span className="text-gray-600 font-medium">Connect donors with recipients instantly</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#F8314C] rounded-full"></div>
              <span className="text-gray-600 font-medium">Build stronger, healthier communities</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#F8314C] rounded-full"></div>
              <span className="text-gray-600 font-medium">Make blood donation accessible for everyone</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

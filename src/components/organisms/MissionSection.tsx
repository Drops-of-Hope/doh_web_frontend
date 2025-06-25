import React from 'react';

export default function MissionSection() {
  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full flex items-center justify-between p-8">
        
        <div className="flex items-center justify-center w-1/2">
          <div className="relative flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg
                  className="w-32 h-32 text-white drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c-4.97 4.97-9 10.23-9 15a9 9 0 0 0 18 0c0-4.77-4.03-10.03-9-15z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Text Section */}
        <div className="flex flex-col justify-center space-y-6">
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
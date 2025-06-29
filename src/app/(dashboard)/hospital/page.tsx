"use client";

import { Button } from '@/components'

export default function HomePage() {
  const handleRequestBlood = () => {
    console.log('Request blood button clicked');
  };

  return (
    <div className="min-h-[100vh] p-4 pt-0">
      <div className="text-[#2D3748] flex justify-between">
        <div>
          <h1 className="font-semibold">Hello, Nadhiya</h1>
          <p className="text-s text-gray-500">Here's your summary for the day</p>
        </div>
        <div className="mt-4">
          <Button
            title="Request Blood"
            containerStyles="bg-[#CE121A] hover:bg-red-800 text-white font-medium rounded-lg font-normal transition-colors duration-200"
            handleClick={handleRequestBlood}
          />
        </div>
      </div>
    </div>
  );
}
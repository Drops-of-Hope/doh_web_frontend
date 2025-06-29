"use client";

import { Button } from '@/components';

export default function HomePage() {
  const handleCreateUser = () => {
    console.log('Create User');
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
            title="Add User"
            containerStyles="bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-3xl transition-colors duration-200"
            handleClick={handleCreateUser}
          />
        </div>
      </div>
    </div>
  );
}
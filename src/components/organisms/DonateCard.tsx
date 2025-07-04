import Image from 'next/image';
import React from 'react';

const DonateCard: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-stretch justify-between gap-6">
      <div className="w-2/5 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-0">Be a part of this community.</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-0">
            <span className="font-bold text-lg">Support Drops of Hope for a better future!</span>
          </h2>
          <p className="text-sm text-gray-500">
            Help us build this community by donating to keep this system a sustainable one.
          </p>
        </div>
        <button className="mt-6 bg-[#2A4473] text-white px-4 py-2 text-sm rounded-md hover:bg-[#1d3458] transition-colors duration-200 w-fit">
          Donate Us
        </button>
      </div>

      <div className="w-3/5">
        <div className="relative w-full h-64 md:h-72">
          <Image
            src="/assets/donate-card.jpg"
            alt="Doctors supporting the community"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default DonateCard;
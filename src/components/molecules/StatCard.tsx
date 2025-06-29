import React from 'react';
import Image from 'next/image';

import { StatisticCardProps } from '../../../types';

const StatCard = ({ title, count, icon } : StatisticCardProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm w-full max-w-sm">
      <div className="flex flex-col">
        <span className="text-gray-400 font-bold">{title}</span>
        <span className="text-[#222222] text-xl font-bold">{count}</span>
      </div>
      <div className="w-10 h-10 bg-[#FB7373] rounded-lg flex items-center justify-center">
        <Image src={icon} alt={title} width={100} height={100} />
      </div>
    </div>
  );
}

export default StatCard

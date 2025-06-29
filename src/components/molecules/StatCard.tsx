import React from 'react';
import { StatisticCardProps } from '../../../types';

const StatCard = ({ title, count, icon, iconBgColor = '#CE121A' }: StatisticCardProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm w-full max-w-sm">
      <div className="flex flex-col">
        <span className="text-gray-400 font-semibold">{title}</span>
        <span className="text-[#222222] text-xl font-bold">{count}</span>
      </div>
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard
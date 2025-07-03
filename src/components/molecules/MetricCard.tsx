import React from 'react';
import Image from 'next/image';
import { MetricCardProps } from '../../../types';

const MetricCard = ({ iconBgColor, heading, body, count }: MetricCardProps) => {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 text-center w-[310px] h-[310px] max-w-xs">
      <div className="w-[64px] h-[64px] mx-auto flex items-center justify-center rounded-xl" style={{ backgroundColor: iconBgColor }}>
        <Image 
          src="/assets/icon.png" 
          alt={heading} 
          width={80} 
          height={80} 
          className="object-contain" 
        />
      </div>
      <h3 className="text-[#FB7373] font-bold text-[25px] font-Helvetica text-lg mt-4 leading-tight">
        {heading.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </h3>
      <p className="text-gray-400 mt-5 font-Helvetica font-semibold text-[16px]">{body}</p>
      <div className="my-4 h-[2px] w-full rounded-full bg-gradient-to-r from-[#E0E1E200] via-[#E0E1E2] to-[#E0E1E228]" />
      <div className="text-[20px] font-bold text-gray-700">{count}</div>
    </div>
  );
};

export default MetricCard;

import React from 'react';
import Image from 'next/image';
import { LogoProps } from '../../../types';

const Logo = ({
  width = 48,
  height = 48,
  textSize = "text-xs"
}: LogoProps) => {
  return (
    <div className="flex items-center -space-x-2">
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={width}
        height={height}
        className=''
      />
      <span className={`text-red-500 font-medium font-body ${textSize}`}>
        DROPS OF HOPE
      </span>
    </div>
  );
};

export default Logo;
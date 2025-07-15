import React from 'react';

interface BloodBagDisplayProps {
  fillPercentage: number;
}

const BloodBagDisplay: React.FC<BloodBagDisplayProps> = ({ fillPercentage }) => {
  return (
    <div className="relative w-48 bg-white rounded-lg shadow-lg p-4">
      <svg 
        viewBox="0 0 200 300" 
        className="w-full h-full"
        fill="none" 
        stroke="#333" 
        strokeWidth="2"
      >
        {/* Top connector/tube */}
        <rect x="70" y="10" width="60" height="20" rx="10" fill="none" />
        <line x1="85" y1="20" x2="115" y2="20" strokeWidth="1" strokeLinecap="round" />

        {/* Main bag body */}
        <path 
          d="M 50 30 L 150 30 Q 170 30 170 50 L 170 200 Q 170 220 150 220 L 50 220 Q 30 220 30 200 L 30 50 Q 30 30 50 30 Z"
          fill="none"
        />
        {/* Inner bag area */}
        <path 
          d="M 45 45 L 155 45 Q 165 45 165 55 L 165 190 Q 165 200 155 200 L 45 200 Q 35 200 35 190 L 35 55 Q 35 45 45 45 Z"
          fill="none"
        />
      </svg>

      {/* Blood fill level */}
      <div className="absolute inset-4 overflow-hidden">
        <svg viewBox="0 0 200 300" className="w-full h-full">
          <defs>
            <clipPath id="bagClip">
              <path d="M 45 45 L 155 45 Q 165 45 165 55 L 165 190 Q 165 200 155 200 L 45 200 Q 35 200 35 190 L 35 55 Q 35 45 45 45 Z" />
              <path d="M 35 190 Q 35 240 100 250 L 100 280 Q 100 290 110 290 L 120 290 Q 130 290 130 280 L 130 250 Q 165 240 165 190" />
            </clipPath>
          </defs>

          {/* Blood fill rectangle */}
          <rect
            x="35"
            y={200 - (155 * fillPercentage / 100)}
            width="130"
            height={155 * fillPercentage / 100}
            fill="#DC2626"
            clipPath="url(#bagClip)"
          />
        </svg>
      </div>
      <div className="text-center">
            <p className="text-sm text-gray-600">
            45 / 200 units
            </p>
        </div>
    </div>
  );
};

export default BloodBagDisplay;
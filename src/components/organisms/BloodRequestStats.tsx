'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FaTint } from 'react-icons/fa';

const bloodData = [
  { type: 'A+', count: 18 },
  { type: 'A-', count: 8 },
  { type: 'B+', count: 26 },
  { type: 'B-', count: 12 },
  { type: 'AB+', count: 18 },
  { type: 'AB-', count: 6 },
  { type: 'O+', count: 22 },
  { type: 'O-', count: 15 },
];

interface BloodRequestStatsProps {
  heading: string;
}

const BloodRequestStats: React.FC<BloodRequestStatsProps> = ({ heading }) => {
  const mostRequested = bloodData.reduce((max, curr) => (curr.count > max.count ? curr : max));
  const leastRequested = bloodData.reduce((min, curr) => (curr.count < min.count ? curr : min));

  return (
    <div className="p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-4 w-full max-w-lg mx-auto">
      
      <div className="flex-1">
        <h2 className="text-base font-semibold mb-1 text-gray-700">{heading}</h2>
        <p className="text-xs text-green-600 font-medium mb-3">(+23) than last week</p>
        
        <div className="h-40 rounded-xl p-3 bg-gradient-blue-primary-120">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bloodData}>
              <YAxis
                stroke="#000000"
                tick={{ fill: '#000000', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={25}
              />
              
              <XAxis
                dataKey="type"
                stroke="#e11d48"
                tick={{ fill: '#e11d48', fontSize: 10, fontWeight: 'bold' }}
                axisLine={false}
                tickLine={false}
              />
              
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '6px', 
                  border: 'none',
                  fontSize: '12px',
                  padding: '6px 8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                cursor={{ fill: 'rgba(255,255,255,0.2)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={8}>
                {bloodData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill="#CE121A" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="flex flex-col justify-end gap-3 pb-3 h-full">
        {[ 
          { label: 'Blood requests', value: '+15%' },
          { label: 'Most requested blood type', value: mostRequested.type },
          { label: 'Least requested blood type', value: leastRequested.type },
        ].map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-2">
              <FaTint className="text-red-500 text-sm" />
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
            <p className="text-base font-semibold text-gray-800 ml-5">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodRequestStats;

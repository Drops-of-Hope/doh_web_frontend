// components/BloodRequestStats.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FaTint } from 'react-icons/fa';

const bloodData = [
  { type: 'A', count: 18 },
  { type: 'B', count: 26 },
  { type: 'AB', count: 18 },
  { type: 'O', count: 12 },
  { type: 'Other', count: 6 },
];

const BloodRequestStats = () => {
  const mostRequested = bloodData.reduce((max, curr) => (curr.count > max.count ? curr : max));
  const leastRequested = bloodData.reduce((min, curr) => (curr.count < min.count ? curr : min));

  return (
    <div className="p-10 bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-6 w-full max-w-3xl mx-auto">
      {/* Left: Chart Section */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-1 text-gray-700">
          Blood requests for this week
        </h2>
        <p className="text-sm text-green-600 font-medium mb-4">(+23) than last week</p>

        {/* Chart with red gradient background */}
<div className="h-60 rounded-xl p-4 bg-gradient-to-tr from-red-500 to-red-700">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={bloodData}>
      {/* Y-axis on the left with white ticks */}
      <YAxis
        stroke="#fff"
        tick={{ fill: '#fff', fontSize: 12 }}
        axisLine={false}
        tickLine={false}
        width={30}
      />
      
      {/* X-axis at the bottom */}
      <XAxis
        dataKey="type"
        stroke="#fff"
        tick={{ fill: '#fff', fontSize: 12 }}
        axisLine={false}
        tickLine={false}
      />
      
      <Tooltip
        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none' }}
        cursor={{ fill: 'rgba(255,255,255,0.2)' }}
      />

      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
        {bloodData.map((_, index) => (
          <Cell key={`cell-${index}`} fill="#fff" />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>

{/* Right: Stats */}
<div className="flex flex-col justify-end gap-4 pb-4 h-full">
  {[
    { label: 'Blood requests', value: '+15%' },
    { label: 'Most requested blood type', value: mostRequested.type },
    { label: 'Least requested blood type', value: leastRequested.type },
  ].map((item, index) => (
    <div key={index}>
      <div className="flex items-center gap-3">
        <FaTint className="text-red-500" />
        <p className="text-[15px] text-gray-500">{item.label}</p>
      </div>
      <p className="text-[20px] font-semibold text-gray-800 ml-6">{item.value}</p>
    </div>
  ))}
</div>

    </div>
  );
};

export default BloodRequestStats;

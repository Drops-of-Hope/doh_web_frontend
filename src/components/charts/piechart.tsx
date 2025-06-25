'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartWithLegendProps {
  data: PieChartData[];
}

const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042', '#AF19FF', '#FF4560'];

const PieChartWithLegend: React.FC<PieChartWithLegendProps> = ({ data }) => {
  return (
    <div className="flex bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto">
      {/* Pie Chart */}
      <div className="w-1/2 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const safeMidAngle = midAngle ?? 0;
                const x = cx + radius * Math.cos(-safeMidAngle * RADIAN);
                const y = cy + radius * Math.sin(-safeMidAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="black"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {`${((percent ?? 0) * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="w-1/2 flex flex-col justify-center pl-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Available blood packets</h2>
        <div className="space-y-2">
          {data.map((entry, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-sm text-gray-800">{entry.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-800">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartWithLegend;

'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartWithLegendProps {
  title?: string;
  data: PieChartData[];
}

const COLORS = ['#8884d8', '#FFBB28', '#00C49F', '#FF8042', '#0088FE', '#AF19FF'];

const PieChartWithLegend: React.FC<PieChartWithLegendProps> = ({ title = "Available blood packets", data }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl mx-auto">
    <h2 className="text-lg font-bold mb-6 ml-10 text-gray-900">{title}</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Pie Chart */}
        <div className="w-full md:w-1/2 h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
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
                      fontSize={12}
                    >
                      {`${((percent ?? 0) * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="w-full md:w-1/2">
          <div className="w-3/4">
            <div className="grid grid-cols-2 gap-x-8 text-sm border-b pb-2 mb-2">
              <div className="text-gray-600 font-semibold pl-2">Blood type</div>
              <div className="text-gray-600 font-semibold pl-5">Quantity</div>
            </div>
          </div>
            <div className="grid grid-cols-2 gap-x-8 text-sm">
            {data.map((entry, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-2 pl-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full pl-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <span className="text-gray-800">{entry.name}</span>
                </div>
                <div className="text-gray-800">{entry.value}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartWithLegend;

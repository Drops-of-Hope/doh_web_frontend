"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';

interface ChartDataPoint {
  month: string;
  donations: number;
  usage: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    name: string;
    value: number;
  }>;
  label?: string;
}

const DonationUsageChart: React.FC = () => {
  const chartData: ChartDataPoint[] = [
    { month: 'Jan', donations: 450, usage: 420 },
    { month: 'Feb', donations: 380, usage: 400 },
    { month: 'Mar', donations: 520, usage: 480 },
    { month: 'Apr', donations: 490, usage: 510 },
    { month: 'May', donations: 610, usage: 580 },
    { month: 'Jun', donations: 580, usage: 620 },
    { month: 'Jul', donations: 650, usage: 590 },
    { month: 'Aug', donations: 620, usage: 640 },
    { month: 'Sep', donations: 540, usage: 570 },
    { month: 'Oct', donations: 480, usage: 520 },
    { month: 'Nov', donations: 510, usage: 490 },
    { month: 'Dec', donations: 590, usage: 580 }
  ];

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-700">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} units`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const calculateTrend = (data: ChartDataPoint[]): { donations: string; usage: string } => {
    const donationsChange = data[data.length - 1].donations - data[0].donations;
    const usageChange = data[data.length - 1].usage - data[0].usage;
    
    return {
      donations: donationsChange >= 0 ? `+${donationsChange}` : `${donationsChange}`,
      usage: usageChange >= 0 ? `+${usageChange}` : `${usageChange}`
    };
  };

  const trends = calculateTrend(chartData);

  return (
    <div className="bg-white w-full rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Donation vs Usage Trend</h2>
          <p className="text-sm text-gray-600">Monthly blood units over the past year</p>
        </div>

      </div>

      <div className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e0e0e0' }}
              tickLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e0e0e0' }}
              tickLine={{ stroke: '#e0e0e0' }}
              label={{ value: 'Units', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '14px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="donations"
              stroke="#12cb8e"
              strokeWidth={2}
              dot={{ fill: '#12cb8e', strokeWidth: 1, r: 2 }}
              activeDot={{ r: 6, stroke: '#12cb8e', strokeWidth: 1 }}
              name="Donations"
            />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', strokeWidth: 1, r: 2 }}
              activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 1 }}
              name="Usage"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-green-800">Average Monthly Donations</span>
          </div>
          <p className="text-xl font-bold text-green-600 mt-1">
            {Math.round(chartData.reduce((sum, item) => sum + item.donations, 0) / chartData.length)} units
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span className="text-xs text-red-800">Average Monthly Usage</span>
          </div>
          <p className="text-xl font-bold text-red-600 mt-1">
            {Math.round(chartData.reduce((sum, item) => sum + item.usage, 0) / chartData.length)} units
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationUsageChart;
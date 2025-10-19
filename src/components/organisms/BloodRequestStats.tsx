"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaTint } from "react-icons/fa";

interface BloodRequestStatsProps {
  heading: string;
  data: { type: string; count: number }[];
  percentChange?: number; // positive or negative compared to last week
}

const BloodRequestStats: React.FC<BloodRequestStatsProps> = ({
  heading,
  data,
  percentChange,
}) => {
  const mostRequested = React.useMemo(() => {
    if (!data || data.length === 0) return { type: "-", count: 0 };
    return data.reduce((max, curr) => (curr.count > max.count ? curr : max));
  }, [data]);

  const leastRequested = React.useMemo(() => {
    if (!data || data.length === 0) return { type: "-", count: 0 };
    return data.reduce((min, curr) => (curr.count < min.count ? curr : min));
  }, [data]);

  const percentLabel = React.useMemo(() => {
    if (percentChange === undefined || percentChange === null) return "";
    const sign = percentChange >= 0 ? "+" : "";
    return `(${sign}${percentChange.toFixed(0)}%) than last week`;
  }, [percentChange]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-4 w-full max-w-lg mx-auto">
      <div className="flex-1">
        <h2 className="text-base font-semibold mb-1 text-gray-700">
          {heading}
        </h2>
        {percentLabel && (
          <p
            className={`text-xs font-medium mb-3 ${
              percentChange && percentChange < 0
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {percentLabel}
          </p>
        )}

        <div className="h-40 rounded-xl p-3 bg-gradient-blue-primary-120">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <YAxis
                stroke="#000000"
                tick={{ fill: "#000000", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={25}
              />

              <XAxis
                dataKey="type"
                stroke="#e11d48"
                tick={{ fill: "#e11d48", fontSize: 10, fontWeight: "bold" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "12px",
                  padding: "6px 8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                cursor={{ fill: "rgba(255,255,255,0.2)" }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={8}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill="#CE121A" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col justify-end gap-3 pb-3 h-full">
        {[
          {
            label: "Blood requests",
            value:
              percentChange !== undefined && percentChange !== null
                ? `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(0)}%`
                : "-",
          },
          { label: "Most requested blood type", value: mostRequested.type },
          { label: "Least requested blood type", value: leastRequested.type },
        ].map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-2">
              <FaTint className="text-red-500 text-sm" />
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
            <p className="text-base font-semibold text-gray-800 ml-5">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodRequestStats;

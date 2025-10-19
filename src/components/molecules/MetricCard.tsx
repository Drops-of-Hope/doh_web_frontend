import React from "react";
import { MetricCardProps } from "../../../types";

const MetricCard = ({
  iconBgColor,
  heading,
  body,
  count,
  icon,
  onClick,
}: MetricCardProps) => {
  return (
    <div
      className={
        "bg-[#FFFFFF] rounded-2xl shadow-sm p-4 text-center max-w-xs " +
        (onClick ? "cursor-pointer hover:shadow-md transition-shadow" : "")
      }
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div
        className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>
      <h3 className="text-gray-500 font-semibold font-Helvetica text-xl mt-2">
        {heading.split("\n").map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </h3>
      <p className="text-gray-400 mt-1 font-Helvetica text-md">{body}</p>
      <div className="my-4 h-[2px] w-full rounded-full bg-gradient-to-r from-[#E0E1E200] via-[#E0E1E2] to-[#E0E1E228]" />
      <div className="text-[20px] font-bold text-gray-700">{count}</div>
    </div>
  );
};

export default MetricCard;

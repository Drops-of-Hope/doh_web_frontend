import { MouseEventHandler } from "react";

export interface ButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?:
    MouseEventHandler<HTMLButtonElement>;
}

export interface SearchBarProps {
    title: string;         
}

export interface StatisticCardProps {
  title: string;
  count: number | string;
  icon: string; 
}
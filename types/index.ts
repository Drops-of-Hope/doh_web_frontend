import { MouseEventHandler } from "react";

export interface ButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconSpacing?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface LogoProps {
  width?: number;
  height?: number;
  textSize?: string;
}

export interface SearchBarProps {
    title: string;         
}

export interface StatisticCardProps {
  title: string;
  count: number | string;
  icon: React.ReactNode;
  iconBgColor?: string;
}
import { MouseEventHandler } from "react";
import { ReactElement } from 'react';

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

export interface MetricCardProps {
  icon: React.ReactNode;
  iconBgColor?: string;
  heading: string;
  body: string;
  count: number;
}

export type DashboardType = 'blood_bank' | 'donor' | 'hospital' | 'it_support' | 'campaign_org';

export interface MenuItem {
  name: string;
  href?: string;
  icon: ReactElement;
  active: boolean;
  position: 'top' | 'bottom';
  onClick?: () => void;
  children?: Array<{
    name: string;
    href: string;
    icon: ReactElement;
    active: boolean;
  }>;
}

export interface TestimonialsProps {
  name: string;
  role: string;
  message: string;
  image: string;
  rating: number;
}
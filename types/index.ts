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
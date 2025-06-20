"use client";

import React from 'react'
import { ButtonProps } from '../../../types';

const Button = ({
    title, 
    containerStyles, 
    handleClick, 
    leftIcon, 
    rightIcon,
    iconSpacing = "gap-2"
}: ButtonProps) => {
    return (
        <button
            disabled={false}
            type={"button"}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1 flex items-center justify-center ${iconSpacing}`}>
                {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                <span>{title}</span>
                {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
            </span>
        </button>
    )
}

export default Button

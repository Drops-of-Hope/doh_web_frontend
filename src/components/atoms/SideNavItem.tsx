'use client';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SideNavItemProps {
  label: string;
  icon: React.ReactNode;
  path?: string;
  active: boolean;
  isSidebarExpanded: boolean;
  position?: 'top' | 'bottom';
  onClick?: () => void;
}

export default function SideNavItem({
  label,
  icon,
  path = '#',
  active,
  isSidebarExpanded,
  position = 'top',
  onClick,
}: SideNavItemProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const navItemRef = useRef<HTMLDivElement>(null);
  const isBottomPosition = position === 'bottom';

  const handleMouseEnter = () => {
    if (!isSidebarExpanded && navItemRef.current) {
      const rect = navItemRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 8,
      });
      setShowTooltip(true);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const navContent = (
    <div
      ref={navItemRef}
      className={cn(
        'group flex items-center gap-2 px-2 py-1 rounded-md transition-colors cursor-pointer',
        isBottomPosition
          ? active
            ? 'bg-red-100 text-red-600 font-semibold'
            : 'hover:bg-gray-50'
          : active
          ? 'text-blue-600 font-semibold'
          : 'hover:bg-gray-50'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
    >
      <div
        className={cn(
          'min-w-[20px] text-xl p-2 rounded-xl transition-all duration-200',
          isBottomPosition
            ? 'text-gray-700 group-hover:text-gray-500'
            : active
            ? 'bg-[#CE121A] text-white'
            : 'text-[#FB7373] group-hover:bg-[#CE121A] group-hover:text-white'
        )}
      >
        {icon}
      </div>
      {isSidebarExpanded && (
        <span
          className={cn(
            'text-sm font-semibold transition-colors duration-200',
            isBottomPosition
              ? active
                ? 'text-red-600'
                : 'text-red-400 group-hover:text-red-700'
              : active
              ? 'text-[#2D3748]'
              : 'text-[#A0AEC0] group-hover:text-[#2D3748]'
          )}
        >
          {label}
        </span>
      )}
    </div>
  );

  return (
    <div className="relative">
      {onClick ? (
        <button type="button" className="w-full text-left">
          {navContent}
        </button>
      ) : (
        <Link href={path}>
          {navContent}
        </Link>
      )}
      
      {!isSidebarExpanded && showTooltip && (
        <div
          className="fixed px-2 py-1 bg-white text-gray-700 text-sm rounded-sm shadow-md border border-gray-200 whitespace-nowrap pointer-events-none z-[1000] transition-opacity duration-200"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translateY(-50%)',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
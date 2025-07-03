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
  children?: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
    active: boolean;
  }>;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export default function SideNavItem({
  label,
  icon,
  path = '#',
  active,
  isSidebarExpanded,
  position = 'top',
  onClick,
  children,
  isExpanded = false,
  onToggleExpanded,
}: SideNavItemProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const navItemRef = useRef<HTMLDivElement>(null);
  const isBottomPosition = position === 'bottom';
  const hasChildren = children && children.length > 0;

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
    } else if (hasChildren && onToggleExpanded) {
      e.preventDefault();
      onToggleExpanded();
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
          ? 'text-blue-600 font-semibold bg-gray-100'
          : 'hover:bg-gray-100'
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
      {onClick || hasChildren ? (
        <button type="button" className="w-full text-left">
          {navContent}
        </button>
      ) : (
        <Link href={path}>
          {navContent}
        </Link>
      )}

      {hasChildren && isSidebarExpanded && isExpanded && (
        <div className="ml-6 mt-1 space-y-1">
          {children.map((child, index) => (
            <Link key={index} href={child.href}>
              <div
                className={cn(
                  'group flex items-center px-2 py-1 rounded-md transition-colors cursor-pointer justify-between',
                  child.active
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-gray-100'
                )}
              >
                <span
                  className={cn(
                    'text-sm font-normal transition-colors duration-200',
                    child.active
                      ? 'text-[#2D3748]'
                      : 'text-gray-600 group-hover:text-gray-900'
                  )}
                >
                  {child.name}
                </span>
                <div
                  className={cn(
                    'text-xxs transition-colors duration-200',
                    child.active
                      ? 'text-gray-400'
                      : 'text-gray-300 group-hover:text-gray-400'
                  )}
                >
                  {child.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>
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
          {hasChildren && (
            <div className="text-xs text-gray-500 mt-1">
              {children.map(child => child.name).join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
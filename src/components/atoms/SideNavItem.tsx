'use client';

import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

interface SideNavItemProps {
  label: string;
  icon: React.ReactNode;
  path?: string;
  active: boolean;
  isSidebarExpanded: boolean;
}

export default function SideNavItem({
  label,
  icon,
  path = '#',
  active,
  isSidebarExpanded,
}: SideNavItemProps) {
  return (
    <Link href={path}>
      <div
        className={cn(
          'group flex items-center gap-2 px-2 py-1 rounded-md transition-colors cursor-pointer',
          active
            ? 'bg-blue-100 text-blue-600 font-semibold'
            : 'hover:bg-gray-50'
        )}
      >
        <div className="min-w-[20px] text-xl text-[#FB7373] p-2 rounded-xl transition-all duration-200 group-hover:bg-[#CE121A] group-hover:text-white">
          {icon}
        </div>

        {isSidebarExpanded && (
          <span
            className={cn(
              'text-sm font-semibold transition-colors duration-200',
              active
                ? 'text-blue-600'
                : 'text-[#A0AEC0] group-hover:text-[#2D3748]'
            )}
          >
            {label}
          </span>
        )}
      </div>
    </Link>
  );
}

"use client";

import React, { useEffect, useRef } from 'react';
import { MobileMenuProps } from '../../../types';

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        !target.closest('[data-mobile-menu-toggle="true"]')
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="md:hidden absolute top-full right-2 w-48 bg-white/95 backdrop-blur-md shadow-lg rounded-lg border border-white/20 -mt-4"
    >
      <div className="px-4 py-3 space-y-2">
        
        <a
          href="/"
          onClick={onClose}
          className="block text-gray-800 hover:text-red-600 transition-colors duration-200 font-normal text-sm px-2 py-1"
        >
          Home
        </a>
        <a
          href="#"
          onClick={onClose}
          className="block text-gray-800 hover:text-red-600 transition-colors duration-200 font-normal text-sm px-2 py-1"
        >
          Campaigns
        </a>
        <a
          href="#"
          onClick={onClose}
          className="block text-gray-800 hover:text-red-600 transition-colors duration-200 font-normal text-sm px-2 py-1"
        >
          About
        </a>
        <a
          href="#"
          onClick={onClose}
          className="block text-gray-800 hover:text-red-600 transition-colors duration-200 font-normal text-sm px-2 py-1"
        >
          Contact
        </a>
        
        <div className="pt-2 mt-2 border-t border-gray-200 space-y-1">
          <button 
            onClick={onClose}
            className="block w-full text-left text-red-600 hover:text-red-800 transition-colors duration-200 font-medium text-sm px-2 py-1"
          >
            Login
          </button>
          <button 
            onClick={onClose}
            className="block w-full text-left text-red-600 hover:text-red-800 transition-colors duration-200 font-medium text-sm px-2 py-1"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
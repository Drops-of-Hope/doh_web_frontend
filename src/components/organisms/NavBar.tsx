"use client"

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out h-[20vh] ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <span className="text-red-500 font-bold text-lg font-body">DROPS OF HOPE</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a 
            href="/" 
            className="text-nav-link hover:font-medium transition-colors duration-200 font-normal text-sm"
          >
            Home
          </a>
          <a 
            href="#" 
            className="text-nav-link hover:font-medium transition-colors duration-200 font-normal text-sm"
          >
            Campaigns
          </a>
          <a 
            href="#" 
            className="text-nav-link hover:font-medium transition-colors duration-200 font-normal text-sm"
          >
            About
          </a>
          <a 
            href="#" 
            className="text-nav-link hover:font-medium transition-colors duration-200 font-normal text-sm"
          >
            Contact
          </a>
        </div>

        
        <div className="flex items-center space-x-4">
          <button className="text-red-600 hover:text-gray-600 transition-colors duration-200 font-medium cursor-pointer">
            Login
          </button>
          <span className="text-red-600">|</span>
          <button className="text-red-600 hover:text-gray-600 transition-colors duration-200 font-medium cursor-pointer">
            Sign up
          </button>
        </div>

        <div className="md:hidden">
          <button className="text-white hover:text-red-300 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
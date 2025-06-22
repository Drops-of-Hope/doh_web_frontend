"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MobileMenu } from "@/components";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/10 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex items-center justify-between">
        
        <div className="flex items-center -space-x-2">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className=''
          />
          <span className="text-red-500 font-medium text-xs font-body">DROPS OF HOPE</span>
        </div>
        
        <>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-nav-link hover:text-red-400 transition-colors duration-200 font-normal text-sm"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-nav-link hover:text-red-400 transition-colors duration-200 font-normal text-sm"
            >
              Campaigns
            </Link>
            <Link
              href="#"
              className="text-nav-link hover:text-red-400 transition-colors duration-200 font-normal text-sm"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-nav-link hover:text-red-400 transition-colors duration-200 font-normal text-sm"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-red-600 hover:text-red-800 transition-colors duration-200 font-medium cursor-pointer text-sm">
              Login
            </button>
            <span className="text-red-600">|</span>
            <button className="text-red-600 hover:text-red-800 transition-colors duration-200 font-medium cursor-pointer text-sm">
              Sign up
            </button>
          </div>
        </>
        
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-white hover:text-red-600 transition-colors duration-200"
            data-mobile-menu-toggle="true"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </nav>
  );
}
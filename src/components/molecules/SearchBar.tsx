"use client";

import React from 'react'
import { SearchBarProps } from '../../../types'

const SearchBar = ({ title }: SearchBarProps) => {
  return (
    <div className="flex items-center border-2 border-gray-700 rounded-full px-6 py-2 w-full max-w-xl bg-white">
      <input
        type="text"
        placeholder={title}
        className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400 text-lg font-normal"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-gray-700 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor" 
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default SearchBar;
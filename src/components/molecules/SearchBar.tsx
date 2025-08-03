"use client";

import React from 'react'
import { SearchBarProps } from '../../../types'
import { FaSearch } from 'react-icons/fa';

interface ExtendedSearchBarProps extends SearchBarProps {
  onSearch?: (query: string) => void;
  value?: string;
}

const SearchBar = ({ title, onSearch, value = '' }: ExtendedSearchBarProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center border-1 border-gray-300 rounded-full px-6 py-2 w-88 bg-white">
      <input
        type="text"
        placeholder={title}
        value={value}
        onChange={handleInputChange}
        className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400 font-normal"
      />
      <FaSearch className="w-5 h-5 text-gray-500 ml-2" />
    </div>
  );
};

export default SearchBar;
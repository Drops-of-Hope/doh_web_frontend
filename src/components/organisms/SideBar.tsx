"use client";

import { Fragment, useState } from 'react';
import { useNavItems } from "@/config/menuConfig";
import Link from 'next/link';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';

export default function SideBar() {

  const [ isSidebarExpanded, setIsSidebarExpanded ] = useState(true);
  const navItems = useNavItems();
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="bg-red-100">
        SideBar
    </div>
  );
}
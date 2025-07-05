"use client";

import { Fragment, useState } from 'react';
import { SideNavItem } from "@/components";
import Image from 'next/image';
import { useNavItems } from "@/hooks/useNavItems";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function SideBar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  // Function to determine dashboard type from URL path
  const getDashboardType = () => {
    if (pathname.startsWith('/donor')) return 'donor';
    if (pathname.startsWith('/hospital')) return 'hospital';
    if (pathname.startsWith('/it_support')) return 'it_support';
    if (pathname.startsWith('/campaign_org')) return 'campaign_org';
    return 'blood_bank';
  };

  // Alternative: Get dashboard type from session/user role
  // const getDashboardTypeFromSession = () => {
  //   if (!session?.user) return 'blood_bank';
  //   const userRole = session.user.role;
  //   switch (userRole) {
  //     case 'donor': return 'donor';
  //     case 'hospital': return 'hospital';
  //     case 'it_support': return 'it_support';
  //     case 'campaign_org': return 'campaign_org';
  //     default: return 'blood_bank';
  //   }
  // };

  const dashboardType = getDashboardType();
  const navItems = useNavItems(dashboardType);


     
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
    // Close all expanded items when sidebar collapses
    if (isSidebarExpanded) {
      setExpandedItems(new Set());
    }
  };

  const toggleItemExpansion = (itemName: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  return (
    <div className={cn(isSidebarExpanded ? 'w-[200px]' : 'w-[68px]',
      'transition-all duration-300 ease-in-out transform hidden sm:flex h-fill bg-white border-r border-gray-200'
    )}>
        <aside className="flex h-full flex-col w-full break-words px-2 overflow-x-hidden columns-1">
          <div className="mt-4 relative pb-2">
            <div className='mb-2'>
              <div className="flex items-center -space-x-2">
                    <Image
                      src="/assets/logo.png"
                      alt="Logo"
                      width={48}
                      height={48}
                      className=''
                    />
                    {isSidebarExpanded && (
                      <span className="text-red-500 font-medium font-body text-xs ml-2">
                        DROPS OF HOPE
                      </span>
                    )}
              </div>
            </div>
            <hr className="border-t border-gray-200 mb-4" />
            <div className="flex flex-col space-y-2 flex-1 overflow-y-auto">
              {navItems.map((item, idx) => {
                if (item.position === 'top') {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1">
                        <SideNavItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                          onClick={item.onClick}
                          isExpanded={expandedItems.has(item.name)}
                          onToggleExpanded={() => toggleItemExpansion(item.name)}
                          subItems={item.children} 
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
           
          <div className="sticky bottom-0 mt-auto whitespace-nowrap mb-4 transition duration-200 block">
            {navItems.map((item, idx) => {
              if (item.position === 'bottom') {
                return (
                  <Fragment key={idx}>
                    <div className="space-y-1">
                      <SideNavItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                          position={item.position}
                          onClick={item.onClick}
                         />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        </aside>
         
        <div className="mt-[calc(calc(90vh)-40px)] relative">
          <button
            type="button"
            className="absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center border border-muted-foreground/20 rounded-full bg-accent shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-[#2D3748]"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <FaArrowCircleLeft size={16} className='stroke-foreground'/>
            ) : (
              <FaArrowCircleRight size={16} className='stroke-foreground'/>
            )}
          </button>
        </div>
    </div>
  );
}
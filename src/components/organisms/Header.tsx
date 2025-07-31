"use client";
import { FaBell } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  // Function to get page info from pathname
  const getPageInfo = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    
    // Handle root/home routes
    if (segments.length === 0) {
      return { breadcrumb: "Pages / Home", title: "Home" };
    }
    
    if ((segments[0] === "blood_bank" && segments.length === 1) || 
        (segments[0] === "hospital" && segments.length === 1)) {
      return { breadcrumb: "Pages / Home", title: "Home" };
    }
    
    // Handle dashboard routes
    if (segments[0] === "dashboard") {
      if (segments.length === 1) {
        return { breadcrumb: "Pages / Dashboard", title: "Dashboard" };
      }
      
      // Build breadcrumb for nested dashboard routes
      let breadcrumbParts = ["Pages", "Dashboard"];
      let currentTitle = "Dashboard";
      
      // Process each segment after dashboard, skip "blood_bank"
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        
        // Skip "blood_bank" segment
        if (segment === "blood_bank") {
          continue;
        }
        
        const formattedSegment = segment.replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        
        breadcrumbParts.push(formattedSegment);
        currentTitle = formattedSegment;
      }
      
      const breadcrumb = breadcrumbParts.join(' / ');
      return { breadcrumb, title: currentTitle };
    }
    
    // Handle other nested routes (like donor -> appointment -> form)
    let breadcrumbParts = ["Pages"];
    let currentTitle = "Home";
    
    // Process each segment, skip "blood_bank"
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      
      // Skip "blood_bank" segment
      if (segment === "blood_bank") {
        continue;
      }
      
      const formattedSegment = segment.replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      
      breadcrumbParts.push(formattedSegment);
      currentTitle = formattedSegment;
    }
    
    const breadcrumb = breadcrumbParts.join(' / ');
    return { breadcrumb, title: currentTitle };
  };

  const { breadcrumb, title } = getPageInfo(pathname);

  return (
    <div className="bg-[#f8f8f8] p-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">
            <span dangerouslySetInnerHTML={{ 
              __html: breadcrumb.replace(/\/([^/]+)$/, '/ <span class="text-blue-600">$1</span>') 
            }} />
          </div>
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
              <FaBell className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-800">Nadhiya Nashath</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
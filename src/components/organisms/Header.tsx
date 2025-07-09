"use client";
import { FaBell } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  // Function to get page info from pathname
  const getPageInfo = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    
    // Handle different route patterns
    if (segments.length === 0) {
      return { breadcrumb: "Pages / Home", title: "Home" };
    }
    
    if ((segments[0] === "blood_bank" && segments.length === 1) || (segments[0] === "hospital" && segments.length === 1)) {
      return { breadcrumb: "Pages / Home", title: "Home" };
    }
    
    if (segments[0] === "dashboard") {
      if (segments.length === 1) {
        return { breadcrumb: "Pages / Dashboard", title: "Dashboard" };
      }
      
      // Handle nested dashboard routes
      const section = segments[1];
      const subsection = segments[2];
      
      if (section === "blood_bank") {
        if (!subsection) {
          return { breadcrumb: "Pages / Blood Bank", title: "Blood Bank" };
        }
        
        const formattedSubsection = subsection.charAt(0).toUpperCase() + subsection.slice(1);
        return { 
          breadcrumb: `Pages / Blood Bank / ${formattedSubsection}`, 
          title: formattedSubsection 
        };
      }
      
      // Handle other sections
      const formattedSection = section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return { breadcrumb: `Pages / ${formattedSection}`, title: formattedSection };
    }
    
    // Default fallback
    const title = segments[segments.length - 1].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { breadcrumb: `Pages / ${title}`, title };
  };

  const { breadcrumb, title } = getPageInfo(pathname);

  return (
    <div className="bg-[#f8f8f8] p-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">
            <span dangerouslySetInnerHTML={{ __html: breadcrumb.replace(/\/([^/]+)$/, '/ <span class="text-blue-600">$1</span>') }} />
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
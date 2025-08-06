"use client";
import { FaBell } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  // Function to get page info and breadcrumb data from pathname
  const getPageInfo = (path: string) => {
    const segments = path.split("/").filter(Boolean);

    // Handle root/home routes
    if (segments.length === 0) {
      return {
        breadcrumbItems: [
          { label: "Pages", path: "/" },
          { label: "Home", path: "/" },
        ],
        title: "Home",
      };
    }

    if (
      (segments[0] === "blood_bank" && segments.length === 1) ||
      (segments[0] === "hospital" && segments.length === 1)
    ) {
      return {
        breadcrumbItems: [
          { label: "Pages", path: "/" },
          { label: "Home", path: "/" },
        ],
        title: "Home",
      };
    }

    // Handle dashboard routes
    if (segments[0] === "dashboard") {
      if (segments.length === 1) {
        return {
          breadcrumbItems: [
            { label: "Pages", path: "/" },
            { label: "Dashboard", path: "/dashboard" },
          ],
          title: "Dashboard",
        };
      }

      // Build breadcrumb for nested dashboard routes
      const breadcrumbItems = [
        { label: "Pages", path: "/" },
        { label: "Dashboard", path: "/dashboard" },
      ];
      let currentTitle = "Dashboard";
      let currentPath = "";

      // Process each segment after dashboard
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;

        // Skip adding "blood_bank" to breadcrumbs but keep it in path
        if (segment === "blood_bank") {
          continue;
        }

        const formattedSegment = segment
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        breadcrumbItems.push({ label: formattedSegment, path: currentPath });
        currentTitle = formattedSegment;
      }

      return { breadcrumbItems, title: currentTitle };
    }

    // Handle other nested routes
    const breadcrumbItems = [{ label: "Pages", path: "/" }];
    let currentTitle = "Home";
    let currentPath = "";

    // Process each segment
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;

      // Skip adding "blood_bank" to breadcrumbs but keep it in path
      if (segment === "blood_bank") {
        continue;
      }

      const formattedSegment = segment
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      breadcrumbItems.push({ label: formattedSegment, path: currentPath });
      currentTitle = formattedSegment;
    }

    return { breadcrumbItems, title: currentTitle };
  };

  const { breadcrumbItems, title } = getPageInfo(pathname);

  return (
    <div className="bg-[#f8f8f8] p-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">
            {breadcrumbItems.map((item, index) => (
              <span key={index}>
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-blue-600">{item.label}</span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className="hover:text-blue-600 cursor-pointer transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                    <span className="mx-1">/</span>
                  </>
                )}
              </span>
            ))}
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
              <div className="text-sm font-medium text-gray-800">
                Nadhiya Nashath
              </div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

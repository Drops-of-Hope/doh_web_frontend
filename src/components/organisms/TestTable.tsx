"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useSession } from "next-auth/react";
// import { useGetInventoryByEstablishmentIdQuery } from '@/store/api/inventoryApi';
import { useGetPendingBloodUnitsByInventoryQuery } from "@/store/api/bloodTestApi";
import {
  formatDisplayDate,
  mapBloodGroupToDisplay,
} from "@/lib/appointmentUtils";

interface UserInfo {
  bloodGroup: string;
}

interface BloodDonationInfo {
  id: string;
  bdfId: string;
  userId: string;
  numberOfDonations: number | null;
  pointsEarned: number;
  startTime: string;
  endTime: string;
  user?: UserInfo; // Only blood type from user
}

interface BloodUnit {
  id: string;
  donationId: string;
  inventoryId: string;
  status: string;
  volume: number;
  bagType: string;
  expiryDate: string;
  consumed: boolean;
  disposed: boolean;
  bloodDonation?: BloodDonationInfo; // Include donation details
}

interface TestTableProps {
  // Free-text search across unit id, donation id, donor id, and blood type
  searchQuery?: string;
  // Filter by blood type display value (e.g., "O+", "A-"), or 'all'
  bloodType?: string;
  // Sort option: id | collectionDate | expiryDate
  sortBy?: "id" | "collectionDate" | "expiryDate";
}

export default function TestTable({
  searchQuery = "",
  bloodType = "all",
  sortBy = "id",
}: TestTableProps) {
  const router = useRouter();
  // const { data: session } = useSession();
  // const medicalEstablishmentId = session?.decodedIdToken?.sub;

  // // Get inventory for this establishment
  // const { data: inventoryData, isLoading: inventoryLoading } = useGetInventoryByEstablishmentIdQuery(
  //   medicalEstablishmentId ?? "",
  //   { skip: !medicalEstablishmentId }
  // );

  const inventoryId = "3d24eb85-dg27-4055-8f94-a712fa4ff1d2";

  // Fetch pending blood units for the inventory
  const { data: bloodUnitsData = [], isLoading: bloodLoading } =
    useGetPendingBloodUnitsByInventoryQuery(inventoryId ?? "", {
      skip: !inventoryId,
    });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Filter data based on search query
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredBySearch: BloodUnit[] = normalizedQuery
    ? bloodUnitsData.filter((item: BloodUnit) => {
        const unitId = item.id?.toLowerCase() || "";
        const donationId = item.donationId?.toLowerCase() || "";
        const donorId = item.bloodDonation?.userId?.toLowerCase() || "";
        const displayType = item.bloodDonation?.user?.bloodGroup
          ? mapBloodGroupToDisplay(
              item.bloodDonation.user.bloodGroup
            ).toLowerCase()
          : "";
        return [unitId, donationId, donorId, displayType].some((field) =>
          field.includes(normalizedQuery)
        );
      })
    : bloodUnitsData;

  // Apply blood type filter
  const filteredData: BloodUnit[] =
    bloodType && bloodType !== "all"
      ? filteredBySearch.filter((item: BloodUnit) => {
          const displayType = item.bloodDonation?.user?.bloodGroup
            ? mapBloodGroupToDisplay(item.bloodDonation.user.bloodGroup)
            : "";
          return displayType === bloodType;
        })
      : filteredBySearch;

  // Sort data
  const sortedData: BloodUnit[] = [...filteredData].sort(
    (a: BloodUnit, b: BloodUnit) => {
      switch (sortBy) {
        case "collectionDate": {
          const da = a.bloodDonation?.startTime
            ? new Date(a.bloodDonation.startTime).getTime()
            : 0;
          const db = b.bloodDonation?.startTime
            ? new Date(b.bloodDonation.startTime).getTime()
            : 0;
          return da - db; // ascending
        }
        case "expiryDate": {
          const da = a.expiryDate ? new Date(a.expiryDate).getTime() : 0;
          const db = b.expiryDate ? new Date(b.expiryDate).getTime() : 0;
          return da - db; // ascending
        }
        case "id":
        default: {
          const ia = (a.id || "").toLowerCase();
          const ib = (b.id || "").toLowerCase();
          if (ia < ib) return -1;
          if (ia > ib) return 1;
          return 0;
        }
      }
    }
  );

  // Reset to first page whenever the search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedQuery, bloodType, sortBy]);

  const totalPages = Math.ceil((sortedData?.length || 0) / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleRowClick = (bloodId: string) => {
    router.push(`./test/blood_test/${bloodId}`);
  };

  const getBloodTypeBadgeColor = (bagType: string) => {
    switch (bagType) {
      case "O+":
      case "O-":
        return "bg-red-100 text-red-800 border-red-200";
      case "A+":
      case "A-":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "B+":
      case "B-":
        return "bg-green-100 text-green-800 border-green-200";
      case "AB+":
      case "AB-":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (bloodLoading) {
    return <div className="p-6">Loading blood units...</div>;
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Blood units available for testing
          </h2>
          <p className="text-sm text-gray-600">
            {sortedData.length > 0
              ? `Showing ${startIndex + 1} to ${Math.min(
                  endIndex,
                  sortedData.length
                )} of ${sortedData.length} entries`
              : `No entries found`}
          </p>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Collection Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  {normalizedQuery
                    ? `No results for "${searchQuery}"`
                    : "No data available"}
                </td>
              </tr>
            ) : (
              currentData.map((item: BloodUnit) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item.id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.bloodDonation?.user?.bloodGroup ? (
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getBloodTypeBadgeColor(
                          mapBloodGroupToDisplay(
                            item.bloodDonation.user.bloodGroup
                          )
                        )}`}
                      >
                        {mapBloodGroupToDisplay(
                          item.bloodDonation.user.bloodGroup
                        )}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.bloodDonation
                      ? formatDisplayDate(item.bloodDonation.startTime)
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDisplayDate(item.expiryDate)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FaChevronLeft className="w-4 h-4 mr-1" />
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page: number) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-3 text-sm font-medium rounded-full ${
                      currentPage === page
                        ? "bg-blue-400 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FaChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

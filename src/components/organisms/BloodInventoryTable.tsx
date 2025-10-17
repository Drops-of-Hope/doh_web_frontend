"use client";
import { ReactElement } from "react";
import { useRouter } from "next/navigation";
// removed unused session import

interface BloodGroupData {
  id: string;
  bloodGroup: string;
}

export default function BloodInventoryTable(): ReactElement {
  const router = useRouter();

  const bloodGroupData: BloodGroupData[] = [
    { id: "BG-001", bloodGroup: "O+" },
    { id: "BG-002", bloodGroup: "A+" },
    { id: "BG-003", bloodGroup: "B+" },
    { id: "BG-004", bloodGroup: "AB+" },
    { id: "BG-005", bloodGroup: "O-" },
    { id: "BG-006", bloodGroup: "A-" },
    { id: "BG-007", bloodGroup: "B-" },
    { id: "BG-008", bloodGroup: "AB-" },
  ];

  const handleRowClick = () => {
    router.push("/blood_bank/inventory/blood_group");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Group
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bloodGroupData.map((item) => {
              return (
                <tr
                  key={item.id}
                  onClick={handleRowClick}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                    {item.bloodGroup}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

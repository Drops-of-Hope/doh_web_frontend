"use client";
import React from "react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import {
  // useGetInventoryByEstablishmentIdQuery,
  useGetBloodByInventoryMutation,
} from "@/store/api/inventoryApi";
import {
  mapBloodGroupToDisplay,
  getBloodGroupColor,
} from "@/lib/appointmentUtils";
import { formatDisplayDate } from "@/lib/appointmentUtils";

export default function BloodInventoryTable(): React.JSX.Element {
  const router = useRouter();
  // const { data: session } = useSession();
  // const medicalEstablishmentId = session?.decodedIdToken?.sub;

  // Get inventory for this establishment
  // const { data: inventoryData, isLoading: inventoryLoading } =
  //   useGetInventoryByEstablishmentIdQuery(medicalEstablishmentId ?? "", {
  //     skip: !medicalEstablishmentId,
  //   });

  const inventoryId = "3d24eb85-dg27-4055-8f94-a712fa4ff1d2";

  // POST: fetch blood units by inventory (hardcoded inventory id)
  const [
    getBloodByInventory,
    {
      data: bloodResp,
      isLoading: bloodLoading,
      isError: bloodError,
      // error: bloodErrObj,
    },
  ] = useGetBloodByInventoryMutation();

  React.useEffect(() => {
    // Trigger the POST call once on mount
    getBloodByInventory({ inventory_id: inventoryId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryId]);

  const bloodUnits = React.useMemo(() => bloodResp?.data ?? [], [bloodResp]);

  const handleRowClick = () => {
    router.push("/blood_bank/inventory/blood_group");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        {(bloodLoading) && (
          <div className="p-6 text-sm text-gray-500">Loading inventory…</div>
        )}
        {bloodError && !bloodLoading && (
          <div className="p-6 text-sm text-red-600">
            Failed to load inventory data.
          </div>
        )}
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donated Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bloodUnits.length === 0 && !bloodLoading && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-sm text-gray-500">
                  No blood units found for this inventory.
                </td>
              </tr>
            )}
            {bloodUnits.map((unit) => (
              <tr
                key={unit.id}
                onClick={handleRowClick}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {unit.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                  <span
                    className={
                      `w-10 inline-flex items-center justify-center px-2 py-1 rounded-2xl border text-xs font-medium ` +
                      getBloodGroupColor(
                        unit.bloodDonation?.user?.bloodGroup || ""
                      )
                    }
                  >
                    {mapBloodGroupToDisplay(
                      unit.bloodDonation?.user?.bloodGroup
                    ) || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDisplayDate(unit.bloodDonation?.startTime) || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDisplayDate(unit.expiryDate) || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

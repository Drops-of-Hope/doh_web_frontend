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
import { Button } from "@/components";

interface Props {
  showOnlyExpired?: boolean;
}

export default function BloodInventoryTable({
  showOnlyExpired = false,
}: Props): React.JSX.Element {
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

  // Helper function to check if a unit is expired
  const isExpired = (expiryDate: string | undefined) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const bloodUnits = React.useMemo(() => {
    const units = bloodResp?.data ?? [];
    if (!showOnlyExpired) return units;
    return units.filter((u: any) => isExpired(u?.expiryDate));
  }, [bloodResp, showOnlyExpired]);

  const handleRowClick = () => {
    router.push("/blood_bank/inventory/blood_group");
  };

  const handleDispose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    unitId: string
  ) => {
    // Prevent triggering the row click navigation
    e.stopPropagation();
    // TODO: Wire this up to a dispose/delete API mutation
    // e.g., disposeBloodUnit({ id: unitId })
    // For now, just log
    console.log("Dispose unit:", unitId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        {bloodLoading && (
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
            {bloodUnits.map((unit) => {
              const expired = isExpired(unit.expiryDate);
              return (
                <tr
                  key={unit.id}
                  onClick={handleRowClick}
                  className={`hover:bg-gray-50 ${expired ? "bg-red-50" : ""}`}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      {expired && (
                        <svg
                          className="w-5 h-5 text-red-600 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span
                        className={
                          expired
                            ? "text-red-600 font-semibold"
                            : "text-gray-700"
                        }
                      >
                        {formatDisplayDate(unit.expiryDate) || "-"}
                        {expired && (
                          <span className="ml-1 text-xs">Expired</span>
                        )}
                      </span>
                      {expired && (
                        <Button
                          title="Dispose Unit"
                          containerStyles="ml-auto border border-red-500 text-red-500 bg-red-50 hover:bg-red-100 rounded-md"
                          handleClick={(e) => handleDispose(e as any, unit.id)}
                        />
                      )}
                    </div>
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

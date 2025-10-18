"use client";
import React from "react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import {
  // useGetInventoryByEstablishmentIdQuery,
  useGetBloodByInventoryMutation,
  useDiscardBloodUnitMutation,
} from "@/store/api/inventoryApi";
import {
  mapBloodGroupToDisplay,
  getBloodGroupColor,
} from "@/lib/appointmentUtils";
import { formatDisplayDate } from "@/lib/appointmentUtils";
import { Button } from "@/components";
import ConfirmModal from "@/components/molecules/ConfirmModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [discardBloodUnit, { isLoading: discarding }] =
    useDiscardBloodUnitMutation();

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [pendingDisposeId, setPendingDisposeId] = React.useState<string | null>(
    null
  );

  // UI state for sorting and filtering
  const [sortBy, setSortBy] = React.useState<
    "donation_desc" | "donation_asc" | "expiry_desc" | "expiry_asc"
  >("donation_desc");
  const [expiredOnly, setExpiredOnly] =
    React.useState<boolean>(showOnlyExpired);
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);

  const allDisplayGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

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
    const units = (bloodResp?.data ?? []) as any[];

    // Filter by expired
    let filtered = expiredOnly
      ? units.filter((u) => isExpired(u?.expiryDate))
      : units;

    // Filter by blood groups (using display values)
    if (selectedGroups.length > 0) {
      filtered = filtered.filter((u) => {
        const displayGroup = mapBloodGroupToDisplay(
          u?.bloodDonation?.user?.bloodGroup
        );
        return displayGroup && selectedGroups.includes(displayGroup);
      });
    }

    // Sort according to selected option
    const toTime = (d: string | undefined) =>
      d ? new Date(d).getTime() : null;
    const sorted = [...filtered].sort((a, b) => {
      const aDonation = toTime(a?.bloodDonation?.startTime);
      const bDonation = toTime(b?.bloodDonation?.startTime);
      const aExpiry = toTime(a?.expiryDate);
      const bExpiry = toTime(b?.expiryDate);

      switch (sortBy) {
        case "donation_asc":
          return (
            (aDonation ?? Number.POSITIVE_INFINITY) -
            (bDonation ?? Number.POSITIVE_INFINITY)
          ); // earliest donation first
        case "donation_desc":
          return (
            (bDonation ?? Number.NEGATIVE_INFINITY) -
            (aDonation ?? Number.NEGATIVE_INFINITY)
          ); // latest donation first
        case "expiry_asc":
          return (
            (aExpiry ?? Number.POSITIVE_INFINITY) -
            (bExpiry ?? Number.POSITIVE_INFINITY)
          ); // earliest expiry first
        case "expiry_desc":
          return (
            (bExpiry ?? Number.NEGATIVE_INFINITY) -
            (aExpiry ?? Number.NEGATIVE_INFINITY)
          ); // latest expiry first
        default:
          return (
            (bDonation ?? Number.NEGATIVE_INFINITY) -
            (aDonation ?? Number.NEGATIVE_INFINITY)
          );
      }
    });

    return sorted;
  }, [bloodResp, expiredOnly, selectedGroups, sortBy]);

  const handleRowClick = () => {
    router.push("/blood_bank/inventory/blood_group");
  };

  const handleDispose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    unitId: string
  ) => {
    // Prevent triggering the row click navigation
    e.stopPropagation();
    setPendingDisposeId(unitId);
    setConfirmOpen(true);
  };

  const onConfirmDispose = async () => {
    if (!pendingDisposeId) return;
    try {
      await discardBloodUnit({ blood_id: pendingDisposeId }).unwrap();
      // Refresh the list after successful discard
      await getBloodByInventory({ inventory_id: inventoryId }).unwrap();
      toast.success("Blood unit discarded successfully");
    } catch (err) {
      console.error("Failed to discard blood unit", err);
      toast.error("Failed to discard blood unit. Please try again.");
    } finally {
      setConfirmOpen(false);
      setPendingDisposeId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        {/* Controls: sort and filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm text-gray-600">Sort by</label>
            <select
              className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="donation_desc">Latest donation</option>
              <option value="donation_asc">Earliest donation</option>
              <option value="expiry_desc">Latest expiry</option>
              <option value="expiry_asc">Earliest expiry</option>
            </select>

            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={expiredOnly}
                onChange={(e) => setExpiredOnly(e.target.checked)}
              />
              Show expired only
            </label>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Blood groups</label>
              <select
                multiple
                className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white min-w-[140px]"
                value={selectedGroups}
                onChange={(e) => {
                  const opts = Array.from(e.target.selectedOptions).map(
                    (o) => o.value
                  );
                  setSelectedGroups(opts);
                }}
              >
                {allDisplayGroups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedGroups.length > 0 || expiredOnly ? (
            <button
              type="button"
              className="text-xs text-gray-600 hover:text-gray-800 underline self-start sm:self-auto"
              onClick={() => {
                setSelectedGroups([]);
                setExpiredOnly(showOnlyExpired);
              }}
            >
              Reset filters
            </button>
          ) : null}
        </div>
        <ConfirmModal
          open={confirmOpen}
          title="Dispose blood unit?"
          description={
            <span>
              This action will permanently mark the unit
              {pendingDisposeId ? (
                <span className="font-semibold"> {pendingDisposeId} </span>
              ) : (
                ""
              )}
              as discarded. Continue?
            </span>
          }
          confirmText="Yes, dispose"
          cancelText="No, cancel"
          loading={discarding}
          onConfirm={onConfirmDispose}
          onCancel={() => {
            setConfirmOpen(false);
            setPendingDisposeId(null);
          }}
        />
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

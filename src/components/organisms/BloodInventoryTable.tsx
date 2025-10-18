"use client";
import React from "react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import {
  // useGetInventoryByEstablishmentIdQuery,
  useGetBloodByInventoryMutation,
  useDiscardBloodUnitMutation,
} from "@/store/api/inventoryApi";
import type { BloodUnit } from "@/store/api/inventoryApi";
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
  >("expiry_asc");
  const [expiredOnly, setExpiredOnly] =
    React.useState<boolean>(showOnlyExpired);
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);

  const allDisplayGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  // Consider units within this many days of expiry as "nearing expiry"
  const NEARING_EXPIRY_DAYS = 7;

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

  // Helper to check if a unit is nearing expiry (not yet expired, within threshold)
  const isNearingExpiry = (expiryDate: string | undefined) => {
    if (!expiryDate) return false;
    const now = new Date();
    const exp = new Date(expiryDate);
    if (exp <= now) return false; // already expired
    const diffMs = exp.getTime() - now.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= NEARING_EXPIRY_DAYS;
  };

  const bloodUnits = React.useMemo(() => {
    const units: BloodUnit[] = bloodResp?.data ?? [];

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
      // Priority groups: near-expiry first, then other valid units, then expired last (unless filtering expired only)
      const priority = (u: BloodUnit) => {
        if (expiredOnly) return 0; // don't re-order by status when viewing only expired
        if (isNearingExpiry(u?.expiryDate)) return 0;
        if (isExpired(u?.expiryDate)) return 2;
        return 1;
      };

      const prA = priority(a);
      const prB = priority(b);
      if (prA !== prB) return prA - prB;

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
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
            {/* Left side: Sort and Filter controls */}
            <div className="flex flex-col gap-4 flex-1">
              {/* Sort Section */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    className="w-full sm:w-64 text-sm border-2 border-gray-300 rounded-lg px-4 py-2.5 pr-10 bg-white hover:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all cursor-pointer font-medium text-gray-700"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  >
                    <option value="donation_desc">Latest donation first</option>
                    <option value="donation_asc">
                      Earliest donation first
                    </option>
                    <option value="expiry_desc">Latest expiry first</option>
                    <option value="expiry_asc">Earliest expiry first</option>
                  </select>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Expired Filter */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </label>
                  <label className="inline-flex items-center gap-3 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-gray-600 focus:ring-2 focus:ring-blue-500"
                      checked={expiredOnly}
                      onChange={(e) => setExpiredOnly(e.target.checked)}
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                      Show expired only
                    </span>
                  </label>
                </div>

                {/* Blood Groups Filter */}
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Blood Groups
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allDisplayGroups.map((g) => {
                      const isSelected = selectedGroups.includes(g);
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setSelectedGroups((prev) =>
                              isSelected
                                ? prev.filter((bg) => bg !== g)
                                : [...prev, g]
                            );
                          }}
                          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border-2 ${
                            isSelected
                              ? "bg-red-500 text-white border-red-600 shadow-md scale-105"
                              : "bg-white text-gray-700 border-gray-300 hover:border-red-400 hover:bg-red-50"
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Active filters and reset */}
            <div className="flex flex-col gap-2 items-start lg:items-end">
              {(selectedGroups.length > 0 || expiredOnly) && (
                <>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-semibold text-gray-600">
                      Active filters:
                    </span>
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      {selectedGroups.length > 0 &&
                        `${selectedGroups.length} group${
                          selectedGroups.length > 1 ? "s" : ""
                        }`}
                      {selectedGroups.length > 0 && expiredOnly && " • "}
                      {expiredOnly && "Expired"}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-red-400 transition-all flex items-center gap-2"
                    onClick={() => {
                      setSelectedGroups([]);
                      setExpiredOnly(showOnlyExpired);
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Reset filters
                  </button>
                </>
              )}
            </div>
          </div>
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
              const nearing = isNearingExpiry(unit.expiryDate);
              return (
                <tr
                  key={unit.id}
                  onClick={handleRowClick}
                  className={`hover:bg-gray-50 ${
                    expired ? "bg-red-50" : nearing ? "bg-yellow-50" : ""
                  }`}
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
                      {!expired && nearing && (
                        <svg
                          className="w-5 h-5 text-yellow-600 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.59c.75 1.335-.213 2.99-1.743 2.99H3.482c-1.53 0-2.493-1.655-1.743-2.99l6.518-11.59zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v4a1 1 0 01-1 1z" />
                        </svg>
                      )}
                      <span
                        className={
                          expired
                            ? "text-red-600 font-semibold"
                            : nearing
                            ? "text-yellow-700 font-medium"
                            : "text-gray-700"
                        }
                      >
                        {formatDisplayDate(unit.expiryDate) || "-"}
                        {expired && (
                          <span className="ml-1 text-xs">Expired</span>
                        )}
                        {!expired && nearing && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-[10px] uppercase tracking-wide">
                            Nearing expiry
                          </span>
                        )}
                      </span>
                      {expired && (
                        <Button
                          title="Dispose Unit"
                          containerStyles="ml-auto border border-red-500 text-red-500 bg-red-50 hover:bg-red-100 rounded-md"
                          handleClick={(
                            e: React.MouseEvent<HTMLButtonElement>
                          ) => handleDispose(e, unit.id)}
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

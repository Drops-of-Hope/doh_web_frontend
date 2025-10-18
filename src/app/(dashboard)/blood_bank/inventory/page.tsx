"use client";
import React from "react";
import {
  FaBoxes,
  FaExclamationTriangle,
  FaTimesCircle,
  FaClock,
  FaFileExport,
} from "react-icons/fa";
import {
  MetricCard,
  BloodInventoryTable,
  PieChartWithLegend,
  BloodUsage,
  DonationUsageChart,
} from "@/components";
import {
  useGetStockCountsByInventoryMutation,
  useGetBloodByBloodGroupMutation,
} from "@/store/api/inventoryApi";

export default function InventoryPage() {
  const [showOnlyExpired, setShowOnlyExpired] = React.useState(false);
  const inventory_id = "3d24eb85-dg27-4055-8f94-a712fa4ff1d2";

  // Fetch stock counts on mount
  const [getStockCounts, { data: stockCounts, isLoading }] =
    useGetStockCountsByInventoryMutation();
  const [getBloodByBloodGroup, { data: bloodGroupBuckets }] =
    useGetBloodByBloodGroupMutation();

  React.useEffect(() => {
    getStockCounts({ inventory_id })
      .unwrap()
      .catch((e) => {
        console.error("Failed to fetch stock counts", e);
      });
  }, [getStockCounts]);

  // Fetch blood grouped data on mount
  React.useEffect(() => {
    getBloodByBloodGroup({ inventory_id })
      .unwrap()
      .catch((e) => {
        console.error("Failed to fetch blood by blood group", e);
      });
  }, [getBloodByBloodGroup]);

  // Map API blood group keys to chart labels
  const GROUP_LABELS: Record<string, string> = {
    O_POSITIVE: "O+",
    A_POSITIVE: "A+",
    B_POSITIVE: "B+",
    AB_POSITIVE: "AB+",
    O_NEGATIVE: "O-",
    A_NEGATIVE: "A-",
    B_NEGATIVE: "B-",
    AB_NEGATIVE: "AB-",
  };

  const GROUP_ORDER = [
    "O_POSITIVE",
    "A_POSITIVE",
    "B_POSITIVE",
    "AB_POSITIVE",
    "O_NEGATIVE",
    "A_NEGATIVE",
    "B_NEGATIVE",
    "AB_NEGATIVE",
  ];

  const bloodTypeData = React.useMemo(() => {
    const counts = new Map<string, number>();
    bloodGroupBuckets?.data?.forEach((bucket) => {
      counts.set(bucket.blood_group, bucket.available_units ?? 0);
    });

    return GROUP_ORDER.map((key) => ({
      name: GROUP_LABELS[key] ?? key,
      value: counts.get(key) ?? 0,
    }));
  }, [bloodGroupBuckets]);

  const handleExportReport = () => {
    console.log("Exporting inventory report...");
  };

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <MetricCard
          iconBgColor="#3B82F6"
          heading="Total Units"
          body="Blood units in stock"
          count={isLoading ? 0 : stockCounts?.totalStock ?? 0}
          icon={<FaBoxes size={24} className="text-white" />}
          onClick={() => setShowOnlyExpired(false)}
        />

        <MetricCard
          iconBgColor="#28A745"
          heading="Safe Blood Units"
          body="Units ready for transfusion"
          count={isLoading ? 0 : stockCounts?.safeUnits ?? 0}
          icon={<FaExclamationTriangle size={24} className="text-white" />}
          onClick={() => setShowOnlyExpired(false)}
        />

        <MetricCard
          iconBgColor="#DC2626"
          heading="Expired Units"
          body="Units past expiration"
          count={isLoading ? 0 : stockCounts?.expiredUnits ?? 0}
          icon={<FaTimesCircle size={24} className="text-white" />}
          onClick={() => setShowOnlyExpired(true)}
        />

        <MetricCard
          iconBgColor="#f97316"
          heading="Expiring Soon"
          body="Units expiring in 7 days"
          count={isLoading ? 0 : stockCounts?.nearingExpiryUnits ?? 0}
          icon={<FaClock size={24} className="text-white" />}
          onClick={() => setShowOnlyExpired(false)}
        />
      </div>

      <div className="">
        <BloodInventoryTable showOnlyExpired={showOnlyExpired} />
      </div>

      <div className="mt-4 w-full flex justify-between gap-3">
        <div className="w-1/2">
          <PieChartWithLegend
            title="Available Blood Packets"
            data={bloodTypeData}
          />
        </div>
        <div className="w-1/2">
          <BloodUsage />
        </div>
      </div>

      <div className="mt-4 w-full flex">
        <DonationUsageChart />
      </div>

      <div className="mt-8 mb-6 w-full flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-full flex justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Export Inventory Report
          </h3>
          <button
            onClick={handleExportReport}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaFileExport size={18} />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}

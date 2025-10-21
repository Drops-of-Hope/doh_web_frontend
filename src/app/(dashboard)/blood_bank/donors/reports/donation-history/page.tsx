"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Search, Calendar, Droplet, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetDonationStatsMutation } from "@/store/api/ReportsApi";
import { useGetBloodDonationsQuery } from "@/store/api/bloodDonationApi";

export default function DonationHistoryReportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBloodType, setFilterBloodType] = useState("all");

  // Fetch donation stats via RTK Query mutation (manually triggered on mount)
  const [getDonationStats, { data: statsResponse, isLoading: statsLoading }] =
    useGetDonationStatsMutation();

  useEffect(() => {
    // trigger fetch once on mount
    getDonationStats();
  }, [getDonationStats]);

  // Fetch all donations for charts and table
  const { data: donationsResp, isLoading: donationsLoading } =
    useGetBloodDonationsQuery();
  const donations = useMemo(() => donationsResp?.data ?? [], [donationsResp]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Reset to first page when the dataset changes
  useEffect(() => {
    setCurrentPage(1);
  }, [donations.length]);

  // Apply search and blood type filters
  const filteredDonations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const byType = (bg?: string) => {
      if (filterBloodType === "all") return true;
      return formatBloodType(bg) === filterBloodType;
    };
    if (!term && filterBloodType === "all") return donations;
    return donations.filter((d) => {
      if (!byType(d.user?.bloodGroup)) return false;
      if (!term) return true;
      const donorName = (d.user?.name ?? "").toLowerCase();
      const donationId = String(d.id ?? "").toLowerCase();
      const donorId = String(d.user?.id ?? "").toLowerCase();
      return (
        donorName.includes(term) ||
        donationId.includes(term) ||
        donorId.includes(term)
      );
    });
  }, [donations, searchTerm, filterBloodType]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBloodType]);

  // Helper to format API blood type enums (e.g., B_POSITIVE -> B+)
  function formatBloodType(t?: string) {
    if (!t) return t;
    const map: Record<string, string> = {
      O_POSITIVE: "O+",
      A_POSITIVE: "A+",
      B_POSITIVE: "B+",
      AB_POSITIVE: "AB+",
      O_NEGATIVE: "O-",
      A_NEGATIVE: "A-",
      B_NEGATIVE: "B-",
      AB_NEGATIVE: "AB-",
    };
    return map[t] ?? t;
  }

  // Sample data - replace with actual API calls
  // Map API response into UI stats shape
  const stats = useMemo(() => {
    const api = statsResponse?.data;
    if (!api)
      return {
        totalDonations: 0,
        thisMonth: 0,
        lastMonth: 0,
        averagePerDay: 0,
        completionRate: 0,
      };
    return {
      totalDonations: 0, // not provided by endpoint; keep fallback if needed elsewhere
      thisMonth: api.thisMonth,
      lastMonth: api.lastMonth,
      averagePerDay: api.last30DaysAvgPerDay,
      completionRate: 0, // not in endpoint
    };
  }, [statsResponse]);

  // Donation trend for the current month (daily counts)
  const monthlyTrend = useMemo(() => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth(); // 0-based
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

    const counts: number[] = Array(daysInMonth).fill(0);

    for (const donation of filteredDonations) {
      const dt = new Date(donation.startTime);
      if (dt.getUTCFullYear() === year && dt.getUTCMonth() === month) {
        const day = dt.getUTCDate(); // 1..daysInMonth
        counts[day - 1] += 1;
      }
    }

    // Data points: day number and count
    return counts.map((count, idx) => ({ day: idx + 1, donations: count }));
  }, [filteredDonations]);

  // Blood type distribution (computed from API)
  const bloodTypeData = useMemo(() => {
    if (!filteredDonations.length)
      return [] as { type: string; count: number; percentage: number }[];
    const counts = filteredDonations.reduce<Record<string, number>>(
      (acc, d) => {
        const type = d.user?.bloodGroup ?? "UNKNOWN";
        acc[type] = (acc[type] ?? 0) + 1;
        return acc;
      },
      {}
    );
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(counts)
      .map(([k, v]) => ({
        type: formatBloodType(k),
        count: v,
        percentage: +((100 * v) / total).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count);
  }, [filteredDonations]);

  // colors for charts can be added when needed

  const mostDonatedFromApi = statsResponse?.data?.mostDonatedBloodType;
  const leastDonatedFromApi = statsResponse?.data?.leastDonatedBloodType;

  const filtersActive = searchTerm.trim() !== "" || filterBloodType !== "all";

  // Prefer stats endpoint if no filters are active; else derive from filtered distribution above
  const defaultBT = { type: "-", count: 0 };
  const mostDonatedBloodType =
    !filtersActive && mostDonatedFromApi
      ? {
          type: formatBloodType(mostDonatedFromApi.type),
          count: mostDonatedFromApi.count,
        }
      : bloodTypeData[0] ?? defaultBT;
  const leastDonatedBloodType =
    !filtersActive && leastDonatedFromApi
      ? {
          type: formatBloodType(leastDonatedFromApi.type),
          count: leastDonatedFromApi.count,
        }
      : bloodTypeData[bloodTypeData.length - 1] ?? defaultBT;

  // Sorted donations (newest first) and paginated view
  const sortedDonations = useMemo(() => {
    return [...filteredDonations].sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
  }, [filteredDonations]);

  const totalDonations = sortedDonations.length;
  const totalPages = Math.max(1, Math.ceil(totalDonations / pageSize));
  const current = Math.min(currentPage, totalPages);
  const startIdx = (current - 1) * pageSize;
  const endIdx = startIdx + pageSize;

  const paginatedDonations = useMemo(() => {
    return sortedDonations.slice(startIdx, endIdx).map((d) => {
      const dt = new Date(d.startTime);
      return {
        id: d.id,
        donor: d.user?.name ?? "-",
        bloodType: formatBloodType(d.user?.bloodGroup),
        date: dt.toLocaleDateString(),
        time: dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        units: 450, // default unit per donation if not provided by API
        status: "Completed", // API does not expose donation status; assume completed
      };
    });
  }, [sortedDonations, startIdx, endIdx]);

  // Pagination page numbers: show only up to 3 numeric buttons
  const pageNumbers = useMemo(() => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    // If at the start, show 1,2,3
    if (current <= 2) return [1, 2, 3];
    // If at the end, show last three
    if (current >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    // Otherwise, show prev,current,next
    return [current - 1, current, current + 1];
  }, [current, totalPages]);

  // Helpers to export filtered + sorted data (all rows, not just current page)
  const buildExportRows = () => {
    return sortedDonations.map((d) => {
      const dt = new Date(d.startTime);
      return {
        donor: d.user?.name ?? "-",
        bloodType: formatBloodType(d.user?.bloodGroup) ?? "-",
        date: dt.toLocaleDateString(),
        time: dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        units: 450,
        status: "Completed",
      };
    });
  };

  const exportToPDF = async () => {
    const rows = buildExportRows();
    if (!rows.length) {
      if (typeof window !== "undefined") alert("No data to export.");
      return;
    }
    const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
      import("jspdf"), 
      import("jspdf-autotable")
    ]);
    const doc = new jsPDF({ orientation: "landscape", unit: "pt" });
    const head = [
      ["Donor Name", "Blood Type", "Date", "Time", "Units (ml)", "Status"],
    ];
    const body = rows.map((r) => [
      r.donor,
      r.bloodType,
      r.date,
      r.time,
      String(r.units),
      r.status,
    ]);
    autoTable(doc, {
      head,
      body,
      styles: { fontSize: 10, cellPadding: 6 },
      headStyles: { fillColor: [239, 68, 68] },
      margin: { top: 40, left: 40, right: 40 },
      didDrawPage: () => {
        doc.setFontSize(14);
        doc.text("Blood Donations Report", 40, 24);
      },
    });
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    doc.save(`donations-${ts}.pdf`);
  };

  const exportToExcel = async () => {
    const rows = buildExportRows();
    if (!rows.length) {
      if (typeof window !== "undefined") alert("No data to export.");
      return;
    }
    const XLSX = await import("xlsx");
    const header = [
      "Donor Name",
      "Blood Type",
      "Date",
      "Time",
      "Units (ml)",
      "Status",
    ];
    const data = rows.map((r) => [
      r.donor,
      r.bloodType,
      r.date,
      r.time,
      r.units,
      r.status,
    ]);
    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Donations");
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    XLSX.writeFile(wb, `donations-${ts}.xlsx`, { bookType: "xlsx" });
  };

  const handleExport = async (format: "pdf" | "excel" | "csv") => {
    try {
      if (format === "pdf") return await exportToPDF();
      if (format === "excel") return await exportToExcel();
      console.warn("CSV export not implemented.");
    } catch (err) {
      console.error("Export failed:", err);
      if (typeof window !== "undefined")
        alert("Export failed. Check console for details.");
    }
  };

  // Most/least donated blood types are derived above from API with fallback

  return (
    <div className="min-h-screen p-4 pt-2 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Blood Donation Reports
        </h1>
        <p className="text-gray-600">
          Overview and detailed history of all recorded blood donations.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-blue-500" size={20} />
            <span className="text-gray-600 text-sm">This Month</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {stats.thisMonth}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {statsLoading ? (
              "Loading…"
            ) : (
              <>
                {stats.thisMonth > stats.lastMonth ? "↑" : "↓"}{" "}
                {Math.abs(stats.thisMonth - stats.lastMonth)} from last month
              </>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-500" size={20} />
            <span className="text-gray-600 text-sm">Avg Per Day</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {stats.averagePerDay}
          </div>
          <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
        </div>

        {/* Most Donated Blood Type */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="text-red-500" size={20} />
            <span className="text-gray-600 text-sm">Most Donated Type</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {mostDonatedBloodType.type}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {mostDonatedBloodType.count.toLocaleString()} donations
          </div>
        </div>

        {/* Least Donated Blood Type */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="text-gray-500" size={20} />
            <span className="text-gray-600 text-sm">Least Donated Type</span>
          </div>
          <div className="text-2xl font-bold text-gray-700">
            {leastDonatedBloodType.type}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {leastDonatedBloodType.count.toLocaleString()} donations
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Donation Trend (This Month)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Blood Type Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Donations by Blood Type
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative w-1/2">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by donor name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <select
            value={filterBloodType}
            onChange={(e) => setFilterBloodType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Blood Types</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <button
            onClick={() => handleExport("pdf")}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-2"
          >
            <Download size={18} />
            PDF
          </button>

          <button
            onClick={() => handleExport("excel")}
            className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center gap-2"
          >
            <Download size={18} />
            Excel
          </button>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Donations
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units (ml)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.donor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      {donation.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {donation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {donation.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.units}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        donation.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : donation.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {donationsLoading
              ? "Loading donations…"
              : (() => {
                  const startDisp = totalDonations ? startIdx + 1 : 0;
                  const endDisp = Math.min(totalDonations, endIdx);
                  return `Showing ${startDisp} to ${endDisp} of ${totalDonations} donations`;
                })()}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={current <= 1}
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                current <= 1
                  ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            {pageNumbers.map((p, idx) =>
              typeof p === "number" ? (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    p === current
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ) : (
                <span key={idx} className="px-2 py-2 text-gray-400">
                  {p}
                </span>
              )
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={current >= totalPages}
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                current >= totalPages
                  ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

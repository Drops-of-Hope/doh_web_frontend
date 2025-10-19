"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Search,
  UserCheck,
  UserX,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Activity,
  AlertCircle,
} from "lucide-react";
import {
  useGetDonorStatsMutation,
  useGetInactiveDonorsMutation,
} from "@/store/api/ReportsApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ActiveInactiveDonorsReportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterBloodType, setFilterBloodType] = useState("all");
  const [dateRange, setDateRange] = useState("year");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // Fetch donor stats from API
  const [
    getDonorStats,
    {
      data: donorStatsResponse,
      isLoading: isDonorStatsLoading,
      isError: isDonorStatsError,
    },
  ] = useGetDonorStatsMutation();

  // Fetch inactive donors
  const [
    getInactiveDonors,
    {
      data: inactiveDonorsResponse,
      isLoading: isInactiveLoading,
      isError: isInactiveError,
    },
  ] = useGetInactiveDonorsMutation();

  useEffect(() => {
    getDonorStats();
  }, [getDonorStats]);

  useEffect(() => {
    getInactiveDonors({ page, limit });
  }, [getInactiveDonors, page, limit]);

  const apiStats = donorStatsResponse?.data;

  // Summary statistics
  const stats = {
    totalDonors: apiStats?.totalDonors ?? 0,
    activeDonors: apiStats?.activeDonorsThisMonth ?? 0,
    inactiveDonors: apiStats?.inactiveDonorsLastYear ?? 0,
    activeRate: apiStats?.activeDonorsPercent ?? 0,
    // Fallbacks until backend provides these fields
    retentionRate: 72.4,
    atRisk: 124,
    avgDonationsPerDonor: apiStats?.avgDonationsPerDonor ?? 0,
  };

  // Helpers for transforming API data
  const mapBloodGroup = (grp: string | null | undefined) => {
    if (!grp) return "Unknown";
    const normalized = grp.toUpperCase();
    const map: Record<string, string> = {
      A_POSITIVE: "A+",
      A_NEGATIVE: "A-",
      B_POSITIVE: "B+",
      B_NEGATIVE: "B-",
      AB_POSITIVE: "AB+",
      AB_NEGATIVE: "AB-",
      O_POSITIVE: "O+",
      O_NEGATIVE: "O-",
    };
    return map[normalized] ?? grp;
  };

  const daysSinceDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return null;
    const ms = Date.now() - d.getTime();
    return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  };

  // Map API donors to table-friendly shape
  const apiDonors = inactiveDonorsResponse?.data?.donors ?? [];
  const tableDonors = apiDonors.map((d) => {
    const lastDonation = d.lastDonationDate ? d.lastDonationDate : null;
    // Fallback: if no last donation, use createdAt to show time since registration
    const days = daysSinceDate(lastDonation) ?? daysSinceDate(d.createdAt) ?? 0;
    return {
      id: d.id,
      name: d.name,
      bloodType: mapBloodGroup(d.bloodGroup),
      lastDonation: lastDonation
        ? new Date(lastDonation).toISOString().slice(0, 10)
        : "-",
      daysSince: days,
      donations: d.totalDonations,
    };
  });

  const handleExport = (format: "pdf" | "excel" | "csv") => {
    // Create a filtered snapshot of the current rows for export
    const rows = filteredDonors.map((d) => ({
      id: d.id,
      name: d.name,
      bloodType: d.bloodType,
      lastDonation: d.lastDonation,
      daysSince: d.daysSince,
      donations: d.donations,
      status: getStatusBadge(d.daysSince).label,
    }));

    const fileSuffix = new Date().toISOString().slice(0, 10);
    if (format === "pdf") {
      const doc = new jsPDF({ orientation: "landscape" });
      doc.setFontSize(14);
      doc.text("Active & Inactive Donors", 14, 16);
      doc.setFontSize(10);
      doc.text(
        `Generated: ${new Date().toLocaleString()}  |  Total: ${rows.length}`,
        14,
        24
      );

      autoTable(doc, {
        startY: 30,
        head: [
          [
            "Donor ID",
            "Name",
            "Blood Type",
            "Last Donation",
            "Days Since",
            "Total Donations",
            "Status",
          ],
        ],
        body: rows.map((r) => [
          r.id,
          r.name,
          r.bloodType,
          r.lastDonation,
          `${r.daysSince}`,
          `${r.donations}`,
          r.status,
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [37, 99, 235] },
      });

      doc.save(`active_inactive_donors_${fileSuffix}.pdf`);
      return;
    }

    if (format === "csv") {
      const headers = [
        "Donor ID",
        "Name",
        "Blood Type",
        "Last Donation",
        "Days Since",
        "Total Donations",
        "Status",
      ];
      const escapeCSV = (val: unknown) => {
        const s = String(val ?? "");
        if (/[",\n]/.test(s)) {
          return '"' + s.replace(/"/g, '""') + '"';
        }
        return s;
      };
      const csv = [
        headers.join(","),
        ...rows.map((r) =>
          [
            r.id,
            r.name,
            r.bloodType,
            r.lastDonation,
            r.daysSince,
            r.donations,
            r.status,
          ]
            .map(escapeCSV)
            .join(",")
        ),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `active_inactive_donors_${fileSuffix}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }
  };

  const getStatusBadge = (daysSince: number) => {
    if (daysSince < 180)
      return { label: "Active", color: "bg-green-100 text-green-800" };
    if (daysSince < 365)
      return { label: "At Risk", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Inactive", color: "bg-red-100 text-red-800" };
  };

  // Derived filtered donors based on search and filters
  const filteredDonors = tableDonors.filter((d) => {
    const status = getStatusBadge(d.daysSince).label;
    const matchesSearch =
      !searchTerm ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || status === filterStatus;
    const matchesBlood =
      filterBloodType === "all" || d.bloodType === filterBloodType;
    return matchesSearch && matchesStatus && matchesBlood;
  });

  return (
    <div className="min-h-screen p-4 pt-2 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          Active vs Inactive Donors
        </h1>
        <p className="text-gray-600">
          Overview of donor activity, engagement trends, and retention insights.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-blue-500" size={20} />
            <span className="text-gray-600 text-sm">Total Donors</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.totalDonors.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="text-green-500" size={20} />
            <span className="text-gray-600 text-sm">Active Donors</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {stats.activeDonors}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.activeRate.toFixed
              ? stats.activeRate.toFixed(2)
              : stats.activeRate}
            % of total
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <UserX className="text-red-500" size={20} />
            <span className="text-gray-600 text-sm">Inactive Donors</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {stats.inactiveDonors}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {(100 - stats.activeRate).toFixed(1)}% of total
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-indigo-500" size={20} />
            <span className="text-gray-600 text-sm">Avg Donations</span>
          </div>
          <div className="text-2xl font-bold text-indigo-600">
            {typeof stats.avgDonationsPerDonor === "number"
              ? stats.avgDonationsPerDonor.toFixed(2)
              : stats.avgDonationsPerDonor}
          </div>
          <div className="text-xs text-gray-500 mt-1">Per donor/year</div>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
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
            className="px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 flex items-center gap-2"
          >
            <Download size={18} />
            PDF
          </button>

          <button
            onClick={() => handleExport("csv")}
            className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center gap-2"
          >
            <Download size={18} />
            CSV
          </button>
        </div>
      </div>

      {/* At Risk / Inactive Donors Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            At Risk & Inactive Donors
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Donors who haven't donated in 6+ months - prime candidates for
            re-engagement
          </p>
        </div>
        {isInactiveLoading ? (
          <div className="p-6 text-gray-500">Loading inactive donors...</div>
        ) : isInactiveError ? (
          <div className="p-6 text-red-600 flex items-center gap-2">
            <AlertCircle size={18} /> Failed to load inactive donors.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Since
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Donations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonors.map((donor) => {
                    const statusBadge = getStatusBadge(donor.daysSince);
                    return (
                      <tr key={donor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {donor.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            {donor.bloodType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {donor.daysSince} days
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {donor.donations}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredDonors.length} donor(s)
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  disabled={!inactiveDonorsResponse?.data?.pagination?.hasPrev}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {inactiveDonorsResponse?.data?.pagination?.page ?? page}{" "}
                  of {inactiveDonorsResponse?.data?.pagination?.totalPages ?? 1}
                </span>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  disabled={!inactiveDonorsResponse?.data?.pagination?.hasNext}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

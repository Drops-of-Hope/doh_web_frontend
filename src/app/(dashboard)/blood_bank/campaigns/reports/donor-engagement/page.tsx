"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Search, Users, UserCheck, UserX, TrendingUp, Award } from "lucide-react";
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
  AreaChart,
  Area,
} from "recharts";
import { useGetDonorEngagementStatsMutation } from "@/store/api/ReportsApi";
import { BackButton } from "@/components";

export default function DonorEngagementReportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch donor engagement stats via RTK Query mutation
  const [getDonorEngagementStats, { data: statsResponse, isLoading: statsLoading }] =
    useGetDonorEngagementStatsMutation();

  useEffect(() => {
    // trigger fetch once on mount
    getDonorEngagementStats();
  }, [getDonorEngagementStats]);

  // Map API response to UI stats
  const stats = useMemo(() => {
    const api = statsResponse?.data;
    if (!api)
      return {
        totalRegistrations: 0,
        actualParticipants: 0,
        participationRate: 0,
        repeatDonors: 0,
        newDonors: 0,
        retentionRate: 0,
        averageParticipationPerCampaign: 0,
        topEngagedDonors: [],
        engagementTrend: [],
      };
    return {
      totalRegistrations: api.totalRegistrations,
      actualParticipants: api.actualParticipants,
      participationRate: api.participationRate,
      repeatDonors: api.repeatDonors,
      newDonors: api.newDonors,
      retentionRate: api.retentionRate,
      averageParticipationPerCampaign: api.averageParticipationPerCampaign,
      topEngagedDonors: api.topEngagedDonors || [],
      engagementTrend: api.engagementTrend || [],
    };
  }, [statsResponse]);

  // Sample data for charts (replace with actual API data when available)
  const sampleEngagementTrend = [
    { date: '2024-01-01', registrations: 45, participations: 38 },
    { date: '2024-02-01', registrations: 52, participations: 44 },
    { date: '2024-03-01', registrations: 48, participations: 41 },
    { date: '2024-04-01', registrations: 61, participations: 55 },
    { date: '2024-05-01', registrations: 58, participations: 52 },
    { date: '2024-06-01', registrations: 67, participations: 61 },
  ];

  const sampleTopDonors = [
    { id: "1", name: "John Doe", totalParticipations: 12, lastParticipation: "2024-06-15" },
    { id: "2", name: "Jane Smith", totalParticipations: 10, lastParticipation: "2024-06-20" },
    { id: "3", name: "Mike Johnson", totalParticipations: 9, lastParticipation: "2024-06-10" },
    { id: "4", name: "Sarah Wilson", totalParticipations: 8, lastParticipation: "2024-06-18" },
    { id: "5", name: "David Brown", totalParticipations: 7, lastParticipation: "2024-06-12" },
  ];

  const engagementTrend = stats.engagementTrend.length > 0 ? stats.engagementTrend : sampleEngagementTrend;
  const topDonors = stats.topEngagedDonors.length > 0 ? stats.topEngagedDonors : sampleTopDonors;

  // Filter top donors based on search
  const filteredTopDonors = useMemo(() => {
    if (!searchTerm.trim()) return topDonors;
    const term = searchTerm.toLowerCase();
    return topDonors.filter(donor =>
      donor.name.toLowerCase().includes(term) ||
      donor.id.toLowerCase().includes(term)
    );
  }, [topDonors, searchTerm]);

  // Pagination for top donors
  const totalDonors = filteredTopDonors.length;
  const totalPages = Math.max(1, Math.ceil(totalDonors / pageSize));
  const current = Math.min(currentPage, totalPages);
  const startIdx = (current - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedDonors = filteredTopDonors.slice(startIdx, endIdx);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Export functions
  const exportToPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      
      const doc = new jsPDF({ orientation: "landscape", unit: "pt" });
      
      // Title
      doc.setFontSize(16);
      doc.text("Donor Engagement & Retention Report", 40, 40);
      
      // Key metrics
      const metricsData = [
        ['Total Registrations', stats.totalRegistrations.toString()],
        ['Actual Participants', stats.actualParticipants.toString()],
        ['Participation Rate', `${stats.participationRate}%`],
        ['Repeat Donors', stats.repeatDonors.toString()],
        ['New Donors', stats.newDonors.toString()],
        ['Retention Rate', `${stats.retentionRate}%`],
        ['Avg Participation per Campaign', stats.averageParticipationPerCampaign.toString()],
      ];

      autoTable(doc, {
        head: [['Metric', 'Value']],
        body: metricsData,
        startY: 60,
        styles: { fontSize: 10, cellPadding: 6 },
        headStyles: { fillColor: [16, 185, 129] },
      });

      // Top donors table
      const donorData = filteredTopDonors.map(donor => [
        donor.name,
        donor.totalParticipations.toString(),
        new Date(donor.lastParticipation).toLocaleDateString(),
      ]);

      autoTable(doc, {
        head: [['Donor Name', 'Participations', 'Last Participation']],
        body: donorData,
        startY: (doc as any).lastAutoTable.finalY + 20,
        styles: { fontSize: 10, cellPadding: 6 },
        headStyles: { fillColor: [59, 130, 246] },
      });

      const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
      doc.save(`donor-engagement-${ts}.pdf`);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. Check console for details.");
    }
  };

  const exportToExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      
      // Metrics sheet
      const metricsData = [
        ['Donor Engagement & Retention Report'],
        [''],
        ['Metric', 'Value'],
        ['Total Registrations', stats.totalRegistrations],
        ['Actual Participants', stats.actualParticipants],
        ['Participation Rate (%)', stats.participationRate],
        ['Repeat Donors', stats.repeatDonors],
        ['New Donors', stats.newDonors],
        ['Retention Rate (%)', stats.retentionRate],
        ['Average Participation per Campaign', stats.averageParticipationPerCampaign],
      ];

      // Top donors sheet
      const donorData = [
        ['Top Engaged Donors'],
        [''],
        ['Donor Name', 'Total Participations', 'Last Participation'],
        ...filteredTopDonors.map(donor => [
          donor.name,
          donor.totalParticipations,
          new Date(donor.lastParticipation).toLocaleDateString(),
        ]),
      ];

      const metricsWs = XLSX.utils.aoa_to_sheet(metricsData);
      const donorsWs = XLSX.utils.aoa_to_sheet(donorData);
      const wb = XLSX.utils.book_new();
      
      XLSX.utils.book_append_sheet(wb, metricsWs, "Engagement Metrics");
      XLSX.utils.book_append_sheet(wb, donorsWs, "Top Donors");
      
      const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
      XLSX.writeFile(wb, `donor-engagement-${ts}.xlsx`);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. Check console for details.");
    }
  };

  const handleExport = async (format: "pdf" | "excel") => {
    if (format === "pdf") return await exportToPDF();
    if (format === "excel") return await exportToExcel();
  };

  return (
    <div className="min-h-screen p-4 pt-2 bg-gray-50">
      <div className="mb-6">
        <BackButton
          fallbackUrl="/blood_bank/campaigns/reports"
          className="hover:shadow-md"
        />
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Donor Engagement & Retention
        </h1>
        <p className="text-gray-600">
          Track donor participation rates, retention trends, and engagement patterns across campaigns.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-blue-500" size={20} />
            <span className="text-gray-600 text-sm">Total Registrations</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {stats.totalRegistrations.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {statsLoading ? "Loading…" : `${stats.actualParticipants} participated`}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="text-green-500" size={20} />
            <span className="text-gray-600 text-sm">Participation Rate</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {stats.participationRate}%
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Registration to participation
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-purple-500" size={20} />
            <span className="text-gray-600 text-sm">Retention Rate</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {stats.retentionRate}%
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.repeatDonors} repeat donors
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <UserX className="text-orange-500" size={20} />
            <span className="text-gray-600 text-sm">New Donors</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {stats.newDonors.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">First-time participants</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Engagement Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Engagement Trend Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="registrations"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
                name="Registrations"
              />
              <Area
                type="monotone"
                dataKey="participations"
                stackId="2"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.8}
                name="Participations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Participation vs Registration */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Registration vs Participation Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Legend />
              <Bar dataKey="registrations" fill="#93C5FD" name="Registrations" />
              <Bar dataKey="participations" fill="#10B981" name="Participations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Engaged Donors */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Engaged Donors
            </h3>
            <div className="relative w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search donors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Participations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Participation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedDonors.map((donor, index) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {startIdx + index + 1 <= 3 && (
                        <Award 
                          className={`mr-2 ${
                            startIdx + index + 1 === 1 ? 'text-yellow-500' :
                            startIdx + index + 1 === 2 ? 'text-gray-400' :
                            'text-orange-600'
                          }`} 
                          size={16} 
                        />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        #{startIdx + index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {donor.totalParticipations}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(donor.lastParticipation).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        new Date(donor.lastParticipation) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {new Date(donor.lastParticipation) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                        ? "Active"
                        : "Inactive"}
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
            Showing {totalDonors ? startIdx + 1 : 0} to {Math.min(totalDonors, endIdx)} of {totalDonors} donors
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
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {current} of {totalPages}
            </span>
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

      {/* Export Actions */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Export Report</h3>
          <div className="flex gap-2">
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
      </div>
    </div>
  );
}
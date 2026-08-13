"use client";

import { useEffect, useMemo } from "react";
import { Download, BarChart3, TrendingUp, Target, Users } from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useGetCampaignPerformanceStatsMutation } from "@/store/api/ReportsApi";
import { BackButton } from "@/components";

export default function CampaignPerformanceReportPage() {
  // Fetch campaign performance stats via RTK Query mutation (manually triggered on mount)
  const [getCampaignPerformanceStats, { data: statsResponse, isLoading: statsLoading }] =
    useGetCampaignPerformanceStatsMutation();

  useEffect(() => {
    // trigger fetch once on mount
    getCampaignPerformanceStats();
  }, [getCampaignPerformanceStats]);

  // Map API response to UI stats
  const stats = useMemo(() => {
    const api = statsResponse?.data;
    if (!api)
      return {
        totalCampaigns: 0,
        activeCampaigns: 0,
        completedCampaigns: 0,
        pendingApproval: 0,
        totalDonorsReached: 0,
        totalBloodUnitsCollected: 0,
        averageDonorsPerCampaign: 0,
        campaignSuccessRate: 0,
        topPerformingCampaign: null,
        monthlyPerformance: [],
      };
    return {
      totalCampaigns: api.totalCampaigns,
      activeCampaigns: api.activeCampaigns,
      completedCampaigns: api.completedCampaigns,
      pendingApproval: api.pendingApproval,
      totalDonorsReached: api.totalDonorsReached,
      totalBloodUnitsCollected: api.totalBloodUnitsCollected,
      averageDonorsPerCampaign: api.averageDonorsPerCampaign,
      campaignSuccessRate: api.campaignSuccessRate,
      topPerformingCampaign: api.topPerformingCampaign,
      monthlyPerformance: api.monthlyPerformance || [],
    };
  }, [statsResponse]);

  // Sample data for charts (replace with actual API data when available)
  const sampleMonthlyData = [
    { month: 'Jan', campaigns: 4, donors: 320, unitsCollected: 144 },
    { month: 'Feb', campaigns: 6, donors: 480, unitsCollected: 216 },
    { month: 'Mar', campaigns: 5, donors: 400, unitsCollected: 180 },
    { month: 'Apr', campaigns: 8, donors: 640, unitsCollected: 288 },
    { month: 'May', campaigns: 7, donors: 560, unitsCollected: 252 },
    { month: 'Jun', campaigns: 9, donors: 720, unitsCollected: 324 },
  ];

  const campaignStatusData = [
    { name: 'Completed', value: stats.completedCampaigns, color: '#10B981' },
    { name: 'Active', value: stats.activeCampaigns, color: '#3B82F6' },
    { name: 'Pending Approval', value: stats.pendingApproval, color: '#F59E0B' },
  ];

  const monthlyTrend = stats.monthlyPerformance.length > 0 ? stats.monthlyPerformance : sampleMonthlyData;

  // Export functions
  const exportToPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      
      const doc = new jsPDF({ orientation: "landscape", unit: "pt" });
      
      // Title
      doc.setFontSize(16);
      doc.text("Campaign Performance Report", 40, 40);
      
      // Key metrics
      const metricsData = [
        ['Total Campaigns', stats.totalCampaigns.toString()],
        ['Active Campaigns', stats.activeCampaigns.toString()],
        ['Completed Campaigns', stats.completedCampaigns.toString()],
        ['Total Donors Reached', stats.totalDonorsReached.toString()],
        ['Blood Units Collected', stats.totalBloodUnitsCollected.toString()],
        ['Success Rate', `${stats.campaignSuccessRate}%`],
      ];

      autoTable(doc, {
        head: [['Metric', 'Value']],
        body: metricsData,
        startY: 60,
        styles: { fontSize: 10, cellPadding: 6 },
        headStyles: { fillColor: [59, 130, 246] },
      });

      const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
      doc.save(`campaign-performance-${ts}.pdf`);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. Check console for details.");
    }
  };

  const exportToExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      
      const data = [
        ['Campaign Performance Report'],
        [''],
        ['Metric', 'Value'],
        ['Total Campaigns', stats.totalCampaigns],
        ['Active Campaigns', stats.activeCampaigns],
        ['Completed Campaigns', stats.completedCampaigns],
        ['Pending Approval', stats.pendingApproval],
        ['Total Donors Reached', stats.totalDonorsReached],
        ['Blood Units Collected', stats.totalBloodUnitsCollected],
        ['Average Donors per Campaign', stats.averageDonorsPerCampaign],
        ['Campaign Success Rate (%)', stats.campaignSuccessRate],
      ];

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Campaign Performance");
      
      const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
      XLSX.writeFile(wb, `campaign-performance-${ts}.xlsx`);
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
          Campaign Performance Analytics
        </h1>
        <p className="text-gray-600">
          Comprehensive analysis of campaign success rates, blood collection goals, and performance metrics.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="text-blue-500" size={20} />
            <span className="text-gray-600 text-sm">Total Campaigns</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {stats.totalCampaigns}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {statsLoading ? "Loading…" : `${stats.activeCampaigns} active`}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-green-500" size={20} />
            <span className="text-gray-600 text-sm">Donors Reached</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {stats.totalDonorsReached.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Avg {stats.averageDonorsPerCampaign} per campaign
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-red-500" size={20} />
            <span className="text-gray-600 text-sm">Blood Units Collected</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {stats.totalBloodUnitsCollected.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">ml total collected</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-purple-500" size={20} />
            <span className="text-gray-600 text-sm">Success Rate</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {stats.campaignSuccessRate}%
          </div>
          <div className="text-xs text-gray-500 mt-1">Goal achievement rate</div>
        </div>
      </div>

      {/* Top Performing Campaign */}
      {stats.topPerformingCampaign && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Performing Campaign
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Campaign Title</p>
              <p className="text-lg font-semibold text-gray-900">
                {stats.topPerformingCampaign.title}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Donors Reached</p>
              <p className="text-lg font-semibold text-blue-600">
                {stats.topPerformingCampaign.donorsReached.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Units Collected</p>
              <p className="text-lg font-semibold text-red-600">
                {stats.topPerformingCampaign.unitsCollected.toLocaleString()} ml
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Monthly Performance Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="campaigns"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Campaigns"
              />
              <Line
                type="monotone"
                dataKey="donors"
                stroke="#10B981"
                strokeWidth={2}
                name="Donors"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Campaign Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {campaignStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Blood Units Collection Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Blood Units Collection
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="unitsCollected" fill="#EF4444" name="Blood Units (ml)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Export Actions */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
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
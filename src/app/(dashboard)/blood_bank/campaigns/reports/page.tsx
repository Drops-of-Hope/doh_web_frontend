"use client";

import { useRouter } from "next/navigation";
import { FileText, BarChart3, Users } from "lucide-react";
import { BackButton } from "@/components";

export default function CampaignReportsPage() {
  const router = useRouter();

  const reports = [
    {
      id: "campaign-performance",
      title: "Campaign Performance Analytics",
      description:
        "Comprehensive analysis of campaign success rates, blood collection goals, and donor participation",
      icon: BarChart3,
      color: "bg-blue-500",
    },
    {
      id: "donor-engagement",
      title: "Donor Engagement & Retention",
      description: "Track donor participation rates, retention trends, and engagement patterns across campaigns",
      icon: Users,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen p-4 pt-2 bg-gray-50">
      <div className="mb-6">
        <BackButton
          fallbackUrl="/blood_bank/campaigns"
          className="hover:shadow-md"
        />
      </div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Reports</h1>
        <p className="text-gray-600">
          Comprehensive analytics and reporting for campaign performance and donor engagement
        </p>
      </div>

      {/* Report Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                if (report.id === "campaign-performance") {
                  router.push("/blood_bank/campaigns/reports/campaign-performance");
                } else if (report.id === "donor-engagement") {
                  router.push("/blood_bank/campaigns/reports/donor-engagement");
                }
              }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`${report.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {report.description}
                    </p>
                    <button
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (report.id === "campaign-performance") {
                          router.push("/blood_bank/campaigns/reports/campaign-performance");
                        } else if (report.id === "donor-engagement") {
                          router.push("/blood_bank/campaigns/reports/donor-engagement");
                        }
                      }}
                    >
                      View Report
                      <FileText size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
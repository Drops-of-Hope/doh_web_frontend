"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  FileText,
  Users,
  Activity,
  Calendar,
  TrendingUp,
  UserCheck,
  UserX,
  Clock,
  MapPin,
} from "lucide-react";
import { BackButton } from "@/components";

export default function DonorReportsPage() {
  const [dateRange, setDateRange] = useState("month");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const router = useRouter();

  const reports = [
    {
      id: "donation-history",
      title: "Blood Donation Reports",
      description:
        "Complete history of all blood donations with donor details and blood types",
      icon: Activity,
      color: "bg-red-500",
    },
    {
      id: "active-inactive",
      title: "Active vs Inactive Donors",
      description: "Analysis of donor engagement and retention rates",
      icon: Users,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen p-4 pt-2 bg-gray-50">
      <div className="mb-6">
        <BackButton
          fallbackUrl="/blood_bank/donors"
          className="hover:shadow-md"
        />
      </div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Reports</h1>
        <p className="text-gray-600">
          Comprehensive analytics and reporting for blood donors and donations
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
                if (report.id === "donation-history") {
                  router.push("/blood_bank/donors/reports/donation-history");
                } else if (report.id === "active-inactive") {
                  router.push("/blood_bank/donors/reports/active-inactive");
                } else {
                  setSelectedReport(report.id);
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
                        if (report.id === "donation-history") {
                          router.push(
                            "/blood_bank/donors/reports/donation-history"
                          );
                        } else if (report.id === "active-inactive") {
                          router.push(
                            "/blood_bank/donors/reports/active-inactive"
                          );
                        } else if (report.id === "donor-registration") {
                          router.push(
                            "/blood_bank/donors/reports/donor-registration"
                          );
                        } else {
                          setSelectedReport(report.id);
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

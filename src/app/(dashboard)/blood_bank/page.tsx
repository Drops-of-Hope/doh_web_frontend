"use client";
import React from "react";
import {
  Button,
  StatCard,
  BloodRequestStats,
  PieChartWithLegend,
  BloodRequestsCard,
} from "@/components";
import { useRouter } from "next/navigation";
import { FaTint, FaClock, FaTruck } from "react-icons/fa";
import { useSession } from "next-auth/react";
import {
  useGetCountsMutation,
  useGetBloodTypeDistributionMutation,
  useGetDonationsTwoWeeksMutation,
} from "@/store/api/bloodBankHomeApi";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const given_name = session?.decodedIdToken?.given_name;
  const family_name = session?.decodedIdToken?.family_name;
  const handleRequestBlood = () => {
    router.push("/blood_bank/requests/request_form");
  };

  // Fetch dashboard counts
  const [
    getCounts,
    { data: countsData, isLoading: countsLoading },
  ] = useGetCountsMutation();

  React.useEffect(() => {
    getCounts();
  }, [getCounts]);

  // Fetch blood type distribution for pie chart
  const [
    getBloodTypeDistribution,
    { data: distributionData },
  ] = useGetBloodTypeDistributionMutation();

  React.useEffect(() => {
    getBloodTypeDistribution();
  }, [getBloodTypeDistribution]);

  const formatBloodGroup = React.useCallback((code: string) => {
    const map: Record<string, string> = {
      O_NEGATIVE: "O-",
      O_POSITIVE: "O+",
      A_NEGATIVE: "A-",
      A_POSITIVE: "A+",
      B_NEGATIVE: "B-",
      B_POSITIVE: "B+",
      AB_NEGATIVE: "AB-",
      AB_POSITIVE: "AB+",
    };
    return map[code] ?? code;
  }, []);

  const bloodTypeData = React.useMemo(() => {
    if (!distributionData) return [] as { name: string; value: number }[];
    return distributionData.data.map((item) => ({
      name: formatBloodGroup(item.blood_group),
      value: item.count,
    }));
  }, [distributionData, formatBloodGroup]);

  const bloodRequests = [
    {
      id: "#BR001",
      patientName: "John Doe",
      bloodType: "A+",
      unitsNeeded: 2,
      urgency: "High",
      hospital: "City General Hospital",
      location: "Downtown District",
      contactNumber: "+94 77 123 4567",
      requestTime: "2:15 PM",
      status: "Pending",
    },
    {
      id: "#BR002",
      patientName: "Sarah Wilson",
      bloodType: "O-",
      unitsNeeded: 1,
      urgency: "Critical",
      hospital: "Emergency Medical Center",
      location: "North Side",
      contactNumber: "+94 71 987 6543",
      requestTime: "1:45 PM",
      status: "Pending",
    },
    {
      id: "#BR003",
      patientName: "Sarah Wilson",
      bloodType: "O-",
      unitsNeeded: 1,
      urgency: "Critical",
      hospital: "Emergency Medical Center",
      location: "North Side",
      contactNumber: "+94 71 987 6543",
      requestTime: "1:45 PM",
      status: "Pending",
    },
  ];

  const emergencyRequests = [
    {
      id: "#ER001",
      bloodType: "O-",
      unitsNeeded: 3,
      urgency: "Critical",
      hospital: "National Hospital",
      location: "Colombo 07",
      contactNumber: "+94 11 269 1111",
      sentTime: "3:30 PM",
      donorsNotified: 15,
      responses: 3,
      status: "Active",
    },
    {
      id: "#ER002",
      bloodType: "AB+",
      unitsNeeded: 2,
      urgency: "High",
      hospital: "Teaching Hospital",
      location: "Peradeniya",
      contactNumber: "+94 81 238 8888",
      sentTime: "2:50 PM",
      donorsNotified: 8,
      responses: 2,
      status: "Active",
    },
  ];

  // Fetch two-week donations for BloodRequestStats
  const [getTwoWeeks, { data: twoWeeksData }] =
    useGetDonationsTwoWeeksMutation();

  React.useEffect(() => {
    getTwoWeeks();
  }, [getTwoWeeks]);

  const statsChartData = React.useMemo(() => {
    const mapCode = (code: string) => formatBloodGroup(code);
    if (!twoWeeksData) return [] as { type: string; count: number }[];
    return twoWeeksData.byBloodGroup.map((b) => ({
      type: mapCode(b.blood_group),
      count: b.count,
    }));
  }, [twoWeeksData, formatBloodGroup]);

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="text-[#2D3748] flex justify-between">
        <div>
          <h1 className="font-semibold">
            {given_name} {family_name}
          </h1>
          <p className="text-s text-gray-500">Your summary for the day</p>
        </div>
        <div className="mt-4">
          <Button
            title="Request Blood"
            containerStyles="bg-[#FB7373] hover:bg-red-800 text-white font-medium rounded-lg font-normal transition-colors duration-200 cursor-pointer"
            handleClick={handleRequestBlood}
          />
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-4">
        <StatCard
          title="Blood Units"
          count={countsLoading ? "…" : countsData?.totalBloodUnits ?? 0}
          icon={<FaTint />}
        />
        <StatCard
          title="Expiring Soon"
          count={countsLoading ? "…" : countsData?.expiringSoonUnits ?? 0}
          icon={<FaClock />}
        />
        <StatCard
          title="In Transit"
          count={countsLoading ? "…" : countsData?.transitRecords ?? 0}
          icon={<FaTruck />}
        />
      </div>

      <div className="flex justify-between gap-4 mt-4">
        <BloodRequestStats
          heading="Weekly Blood Donation Overview"
          data={statsChartData}
          percentChange={twoWeeksData?.percentChange}
        />
        <PieChartWithLegend
          title="Available Blood Packets"
          data={bloodTypeData}
        />
      </div>

      <div className="flex gap-4">
        <BloodRequestsCard
          title="Blood Requests Received"
          requests={bloodRequests}
          showEmergencyFormat={false}
        />
        <BloodRequestsCard
          title="Emergency Requests Sent to Donors"
          requests={emergencyRequests}
          showEmergencyFormat={true}
        />
      </div>
    </div>
  );
}

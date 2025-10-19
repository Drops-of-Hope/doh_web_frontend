"use client";
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
import { useGetIncomingPendingRequestsQuery } from "@/store/api/RequestsApi";


export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const given_name = session?.decodedIdToken?.given_name;
  const family_name = session?.decodedIdToken?.family_name;
  const medicalEstablishmentId = session?.decodedIdToken?.sub;
  const handleRequestBlood = () => {
    router.push("/blood_bank/requests/request_form");
  };

  const bloodTypeData = [
    { name: "O+", value: 45 },
    { name: "A+", value: 38 },
    { name: "B+", value: 28 },
    { name: "AB+", value: 15 },
    { name: "O-", value: 22 },
    { name: "A-", value: 18 },
  ];

  // Fetch incoming requests (received by this blood bank)
  const { data: incomingData } = useGetIncomingPendingRequestsQuery(
    { medicalEstablishmentId: medicalEstablishmentId ?? "" },
    { skip: !medicalEstablishmentId }
  );

  const toDisplayBloodGroup = (bg?: string): string => {
    if (!bg) return "";
    return bg.replace("_", " ").replace("POSITIVE", "+").replace("NEGATIVE", "-").replace(/\s+/g, "");
  };

  const toDisplayUrgency = (u?: string): string => {
    if (!u) return "";
    const v = u.toUpperCase();
    if (v === "HIGH") return "High";
    if (v === "MEDIUM") return "Medium";
    if (v === "LOW") return "Low";
    return u;
  };

  const bloodRequests = (incomingData?.data ?? []).map((req) => ({
    id: req.id,
    bloodType: toDisplayBloodGroup(req.bloodGroup),
    unitsNeeded: req.unitsRequired,
    urgency: toDisplayUrgency(req.urgencyLevel),
    hospital: req.requestingBloodBank?.name || req.medicalEstablishment?.name || "",
    location: req.requestingBloodBank?.address || req.medicalEstablishment?.address || "",
    contactNumber: "",
    requestTime: req.createdAt ? new Date(req.createdAt).toLocaleString() : "",
    status: req.status?.toUpperCase() === "PENDING" ? "Pending" : req.status || "Pending",
  }));

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

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="text-[#2D3748] flex justify-between">
        <div>
          <h1 className="font-semibold">{given_name} {family_name}</h1>
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
        <StatCard title="Blood Units" count="54" icon={<FaTint />} />
        <StatCard title="Expiring Soon" count="9" icon={<FaClock />} />
        <StatCard title="In Transit" count="0" icon={<FaTruck />} />
      </div>

      <div className="flex justify-between gap-4 mt-4">
        <BloodRequestStats heading="Weekly Blood Request Overview" />
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

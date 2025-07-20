"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components";

const BLOOD_BANK_NAME = "Central Blood Bank Narahenpita";
const CITY = "Colombo";
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const EMERGENCY_LEVELS = [
  { value: "low", label: "Low Priority", color: "bg-green-100 text-green-800" },
  {
    value: "medium",
    label: "Medium Priority",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "high",
    label: "High Priority",
    color: "bg-orange-100 text-orange-800",
  },
  {
    value: "critical",
    label: "Critical Emergency",
    color: "bg-red-100 text-red-800",
  },
];
const REQUEST_TYPES = [
  "Individual Patient",
  "Hospital Stock",
  "Emergency Reserve",
];
const REQUEST_SPEC_TO = ["Donors", "Hospitals", "Blood Banks"];
const TIME_UNITS = ["days", "hours", "minutes"];
const USAGE_PURPOSES = [
  "Surgery",
  "Trauma",
  "Cancer Treatment",
  "Chronic Disease",
  "Emergency",
  "Other",
];

export default function BloodRequestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [selectedGroups, setSelectedGroups] = useState<Record<string, string>>({});
  const [emergency, setEmergency] = useState(EMERGENCY_LEVELS[0].value);
  const [requestType, setRequestType] = useState(REQUEST_TYPES[0]);
  const [usagePurpose, setUsagePurpose] = useState(USAGE_PURPOSES[0]);
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    hospitalName: "",
    doctorName: "",
    contactNumber: "",
    additionalNotes: "",
  });
  const [selectedHospitals, setSelectedHospitals] = useState<string[]>([]);
  const [hospitalSearch, setHospitalSearch] = useState("");
  const [broadcastAll, setBroadcastAll] = useState(false);
  const [requestSpecTo, setRequestSpecTo] = useState(REQUEST_SPEC_TO[0]);
  const [autoForward, setAutoForward] = useState(false);
  const [autoForwardValue, setAutoForwardValue] = useState(1);
  const [autoForwardUnit, setAutoForwardUnit] = useState(TIME_UNITS[0]);

  const handleGroupChange = (group: string, checked: boolean) => {
    setSelectedGroups((prev) => {
      const updated = { ...prev };
      if (!checked) {
        delete updated[group];
      } else {
        updated[group] = "";
      }
      return updated;
    });
  };

  const handleAmountChange = (group: string, value: string) => {
    setSelectedGroups((prev) => ({ ...prev, [group]: value }));
  };

  const handlePatientInfoChange = (field: string, value: string) => {
    setPatientInfo((prev) => ({ ...prev, [field]: value }));
  };


  // Simulate hospital/blood bank search and add
  const handleAddHospital = () => {
    if (hospitalSearch && !selectedHospitals.includes(hospitalSearch)) {
      setSelectedHospitals((prev) => [...prev, hospitalSearch]);
      setHospitalSearch("");
    }
  };
  const handleRemoveHospital = (name: string) => {
    setSelectedHospitals((prev) => prev.filter((h) => h !== name));
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setCountdown(3);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      let c = 3;
      const interval = setInterval(() => {
        c--;
        setCountdown(c);
        if (c === 0) {
          clearInterval(interval);
          router.push("/blood_bank");
        }
      }, 1000);
    }, 2000);
    // Optionally log the request
    console.log("Request submitted:", {
      bloodBank: BLOOD_BANK_NAME,
      city: CITY,
      selectedGroups,
      emergency,
      requestType,
      usagePurpose,
      patientInfo: requestType === "Individual Patient" ? patientInfo : undefined,
      hospitals: selectedHospitals,
      broadcastAll,
      requestSpecTo,
      autoForward: requestSpecTo !== "Donors" ? { enabled: autoForward, value: autoForwardValue, unit: autoForwardUnit } : undefined,
    });
  };

  const selectedEmergency = EMERGENCY_LEVELS.find(
    (level) => level.value === emergency
  );
  const totalUnits = Object.values(selectedGroups).reduce(
    (sum, amount) => sum + (parseInt(amount) || 0),
    0
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800 mb-2">
            Blood Request Form
          </h1>
          <p className="text-gray-600">Submit your blood requirement request</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Blood Bank Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Requesting Blood Bank
                </h2>
                <p className="text-gray-600">
                  Your registered blood bank information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Bank Name
                </label>
                <input
                  type="text"
                  value={BLOOD_BANK_NAME}
                  readOnly
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-medium text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={CITY}
                  readOnly
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-medium text-black"
                />
              </div>
            </div>
          </div>

          {/* Blood Requirements */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Blood Groups & Quantities
                </h2>
                <p className="text-gray-600">
                  Select required blood groups and specify amounts
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {BLOOD_GROUPS.map((group) => (
                <div
                  key={group}
                  className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      id={group}
                      checked={group in selectedGroups}
                      onChange={(e) =>
                        handleGroupChange(group, e.target.checked)
                      }
                      className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                    />
                    <label
                      htmlFor={group}
                      className="text-lg font-bold text-gray-800"
                    >
                      {group}
                    </label>
                  </div>
                  <input
                    type="number"
                    min="0"
                    placeholder="Amount (ml)"
                    value={selectedGroups[group] || ""}
                    onChange={(e) => handleAmountChange(group, e.target.value)}
                    disabled={!(group in selectedGroups)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                  />
                </div>
              ))}
            </div>

            {totalUnits > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">
                  Total Blood Required: {totalUnits} ml
                </p>
              </div>
            )}
          </div>

          {/* Emergency Level & Request Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Request Priority & Details
                </h2>
                <p className="text-gray-600">
                  Specify urgency level and request type
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Level
                </label>
                <select
                  value={emergency}
                  onChange={(e) => setEmergency(e.target.value)}
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {EMERGENCY_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <div
                  className={`mt-2 px-3 py-1 rounded-full text-sm font-medium inline-block ${selectedEmergency?.color}`}
                >
                  {selectedEmergency?.label}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Type
                </label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {REQUEST_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usage Purpose
                </label>
                <select
                  value={usagePurpose}
                  onChange={(e) => setUsagePurpose(e.target.value)}
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {USAGE_PURPOSES.map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Patient Information (only for Individual Patient) */}
          {requestType === "Individual Patient" && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Patient Information
                  </h2>
                  <p className="text-gray-600">
                    Provide patient details for blood request
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    value={patientInfo.name}
                    onChange={(e) =>
                      handlePatientInfoChange("name", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                    placeholder="Enter patient's full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Age *
                  </label>
                  <input
                    type="number"
                    value={patientInfo.age}
                    onChange={(e) =>
                      handlePatientInfoChange("age", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                    placeholder="Age"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    value={patientInfo.hospitalName}
                    onChange={(e) =>
                      handlePatientInfoChange("hospitalName", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                    placeholder="Hospital where patient is admitted"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor Name *
                  </label>
                  <input
                    type="text"
                    value={patientInfo.doctorName}
                    onChange={(e) =>
                      handlePatientInfoChange("doctorName", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                    placeholder="Attending doctor's name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={patientInfo.contactNumber}
                    onChange={(e) =>
                      handlePatientInfoChange("contactNumber", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                    placeholder="Emergency contact number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={patientInfo.additionalNotes}
                    onChange={(e) =>
                      handlePatientInfoChange("additionalNotes", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 h-24 resize-none text-black"
                    placeholder="Any additional medical information or special requirements"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Requesting Hospital/Blood Bank Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Requesting Hospital/Blood Bank</h2>
                <p className="text-gray-600">Add specific hospitals/blood banks or broadcast to all in your area</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="broadcastAll"
                  checked={broadcastAll}
                  onChange={e => setBroadcastAll(e.target.checked)}
                  className="accent-red-600"
                />
                <label htmlFor="broadcastAll" className="text-gray-700">Broadcast to all hospitals/blood banks in current area</label>
              </div>
              <div className="flex gap-2 items-center">
                <SearchBar title="Search hospital or blood bank by name..." />
                <input
                  type="text"
                  value={hospitalSearch}
                  onChange={e => setHospitalSearch(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-black"
                  placeholder="Type name and click add"
                  disabled={broadcastAll}
                />
                <button
                  type="button"
                  onClick={handleAddHospital}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300"
                  disabled={!hospitalSearch || broadcastAll}
                >
                  Add
                </button>
              </div>
              {selectedHospitals.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedHospitals.map(h => (
                    <span key={h} className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center">
                      {h}
                      <button type="button" className="ml-2 text-red-600 hover:text-red-800" onClick={() => handleRemoveHospital(h)}>&times;</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Request Specification Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Request Specification</h2>
                <p className="text-gray-600">Specify who this request is for and urgency auto-forwarding</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Request To</label>
                <select
                  value={requestSpecTo}
                  onChange={e => setRequestSpecTo(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black"
                >
                  {REQUEST_SPEC_TO.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {requestSpecTo !== "Donors" && (
                <div className="flex items-center gap-2 mt-6 md:mt-0">
                  <input
                    type="checkbox"
                    id="autoForward"
                    checked={autoForward}
                    onChange={e => setAutoForward(e.target.checked)}
                    className="accent-red-600"
                  />
                  <label htmlFor="autoForward" className="text-gray-700">Auto-forward to donors if not accepted in</label>
                  <input
                    type="number"
                    min={1}
                    value={autoForwardValue}
                    onChange={e => setAutoForwardValue(Number(e.target.value))}
                    disabled={!autoForward}
                    className="w-16 px-2 py-1 rounded border border-gray-300 disabled:bg-gray-100 text-black"
                  />
                  <select
                    value={autoForwardUnit}
                    onChange={e => setAutoForwardUnit(e.target.value)}
                    disabled={!autoForward}
                    className="rounded px-2 py-1 border border-gray-300 disabled:bg-gray-100 text-black"
                  >
                    {TIME_UNITS.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button & Feedback */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center space-y-4 min-h-[100px] justify-center">
              {!loading && !success && (
                <>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Submit Blood Request
                  </button>
                  <p className="text-gray-600 text-center">
                    Please ensure all required information is accurate before submitting.
                  </p>
                </>
              )}
              {loading && (
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-10 w-10 text-red-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span className="text-red-700 font-semibold">Sending request...</span>
                </div>
              )}
              {success && (
                <div className="flex flex-col items-center">
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mb-2">Request sent! You will be redirected to the dashboard in {countdown}...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

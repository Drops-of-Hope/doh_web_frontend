"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateBloodDonationMutation } from "@/store/api/bloodDonationApi";
import { useGetInventoryByEstablishmentIdQuery } from "@/store/api/inventoryApi";
import { useGetDonationFormByAppointmentIdQuery } from "@/store/api/donationFormApi";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface FormData {
  bloodUnitCode: string;
  startTime: string;
  endTime: string;
  volumeCollected: string;
  bloodBagType: string;
}

interface FormErrors {
  bloodUnitCode?: string;
  startTime?: string;
  endTime?: string;
  volumeCollected?: string;
  bloodBagType?: string;
}

export default function AddBloodUnit() {
  const { appointmentId } = useParams();
  const appointmentIdStr = Array.isArray(appointmentId)
    ? appointmentId[0]
    : appointmentId;
  const { data: formsData } = useGetDonationFormByAppointmentIdQuery(
    appointmentIdStr || ""
  );
  const donationFormData = formsData?.[0];
  const bfId = donationFormData?.id;
  const userId = donationFormData?.userId;

  const { data: session } = useSession();
  const medicalEstablishmentId = session?.decodedIdToken?.sub;
  const { data: inventoryData } = useGetInventoryByEstablishmentIdQuery(
    medicalEstablishmentId ?? "",
    {
      skip: !medicalEstablishmentId,
    }
  );

  const inventoryId = "3d24eb85-dg27-4055-8f94-a712fa4ff1d2";
  const [createBloodDonation, { isLoading: isSubmitting }] =
    useCreateBloodDonationMutation();

  const [formData, setFormData] = useState<FormData>({
    bloodUnitCode: "",
    startTime: "",
    endTime: "",
    volumeCollected: "",
    bloodBagType: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );

  const bloodBagTypes = [
    { value: "Q", label: "Q - Quadruple Bag" },
    { value: "T", label: "T - Triple Bag" },
    { value: "D", label: "D - Double Bag" },
    { value: "S", label: "S - Single Bag" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.bloodUnitCode.trim())
      newErrors.bloodUnitCode = "Blood unit code is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    )
      newErrors.endTime = "End time must be after start time";
    if (!formData.volumeCollected)
      newErrors.volumeCollected = "Volume collected is required";
    else if (parseFloat(formData.volumeCollected) <= 0)
      newErrors.volumeCollected = "Volume must be greater than 0";
    if (!formData.bloodBagType)
      newErrors.bloodBagType = "Blood bag type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setStatusType(null);

    if (!validateForm()) return;

    if (!bfId || !userId || !inventoryId) {
      setStatusMessage(
        "Missing required data. Please ensure donation form and inventory data are loaded."
      );
      setStatusType("error");
      return;
    }

    try {
      const today = new Date();
      const [startHour, startMinute] = formData.startTime.split(":");
      const [endHour, endMinute] = formData.endTime.split(":");

      const startDateTime = new Date(today);
      startDateTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
      const endDateTime = new Date(today);
      endDateTime.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

      const payload = {
        bdfId: bfId,
        userId: userId,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        bloodUnits: [
          {
            id: formData.bloodUnitCode,
            inventoryId: inventoryId,
            volume: parseFloat(formData.volumeCollected),
          },
        ],
      };

      await createBloodDonation(payload).unwrap();

      setFormData({
        bloodUnitCode: "",
        startTime: "",
        endTime: "",
        volumeCollected: "",
        bloodBagType: "",
      });
      setErrors({});
      setStatusMessage("Blood unit added successfully!");
      setStatusType("success");
      toast.success("Blood unit added successfully!");
    } catch (error) {
      console.error("Failed to create blood donation:", error);
      setStatusMessage("Failed to add blood unit. Please try again.");
      setStatusType("error");
      toast.error("Failed to add blood unit. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Add Blood Unit</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="bloodUnitCode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Blood Unit Code *
          </label>
          <input
            type="text"
            id="bloodUnitCode"
            name="bloodUnitCode"
            value={formData.bloodUnitCode}
            onChange={handleInputChange}
            className={`w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 ${
              errors.bloodUnitCode ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter blood unit code (e.g., BU001234)"
          />
          {errors.bloodUnitCode && (
            <p className="mt-1 text-sm text-red-600">{errors.bloodUnitCode}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Start Time *
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 ${
                errors.startTime ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              End Time *
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 ${
                errors.endTime ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="volumeCollected"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Volume Collected (ml) *
            </label>
            <input
              type="number"
              id="volumeCollected"
              name="volumeCollected"
              value={formData.volumeCollected}
              onChange={handleInputChange}
              min="1"
              step="1"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 ${
                errors.volumeCollected ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter volume in ml (e.g., 450)"
            />
            {errors.volumeCollected && (
              <p className="mt-1 text-sm text-red-600">
                {errors.volumeCollected}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bloodBagType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Blood Bag Type *
            </label>
            <select
              id="bloodBagType"
              name="bloodBagType"
              value={formData.bloodBagType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 ${
                errors.bloodBagType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select blood bag type</option>
              {bloodBagTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.bloodBagType && (
              <p className="mt-1 text-sm text-red-600">{errors.bloodBagType}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                bloodUnitCode: "",
                startTime: "",
                endTime: "",
                volumeCollected: "",
                bloodBagType: "",
              });
              setErrors({});
              setStatusMessage(null);
              setStatusType(null);
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Add Blood Unit"}
          </button>
        </div>
      </form>
      {statusMessage && (
        <p
          className={`mt-4 text-center font-medium ${
            statusType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {statusMessage}
        </p>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

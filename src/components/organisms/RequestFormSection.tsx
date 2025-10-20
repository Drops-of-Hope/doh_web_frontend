import React from "react";
import { RequestFormSectionsProps } from "../../../types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Clock } from "lucide-react";
import { useGetAllMedicalEstablishmentsMutation } from "@/store/api/MedicalEstablishmentsApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RequestFormSections: React.FC<RequestFormSectionsProps> = ({
  formData,
  errors,
  onInputChange,
  urgencyLevels,
  reasonsForRequest,
  nearbyBloodBanks,
}) => {
  // Fetch medical establishments on mount; fall back to provided nearbyBloodBanks if none fetched
  const [fetchAllEstablishments, { data, isLoading, isError }] =
    useGetAllMedicalEstablishmentsMutation();

  React.useEffect(() => {
    fetchAllEstablishments();
  }, [fetchAllEstablishments]);

  const establishments = data?.data ?? [];
  const normalizedBanks =
    establishments.length > 0
      ? establishments.map((e) => ({
          value: e.id,
          label: e.name,
          location: e.address || e.region,
        }))
      : nearbyBloodBanks;

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.success(
      "Form submitted successfully! Your blood request has been processed.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Basic Urgency Level Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Urgency Level
        </h2>

        <div className="space-y-3">
          {urgencyLevels.map((level) => (
            <label key={level.value} className="block">
              <input
                type="radio"
                name="urgencyLevel"
                value={level.value}
                checked={formData.urgencyLevel === level.value}
                onChange={(e) => onInputChange("urgencyLevel", e.target.value)}
                className="mr-2"
              />
              <span className="text-gray-800">{level.label}</span>
            </label>
          ))}
        </div>
        {errors.urgencyLevel && (
          <p className="mt-2 text-sm text-red-600">{errors.urgencyLevel}</p>
        )}
      </div>

      {/* Original Reason for Request Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Reason for Request
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Reason *
            </label>
            <select
              value={formData.reasonForRequest}
              onChange={(e) =>
                onInputChange("reasonForRequest", e.target.value)
              }
              className={`w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                errors.reasonForRequest ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" className="text-gray-600">
                Select reason
              </option>
              {reasonsForRequest.map((reason) => (
                <option
                  key={reason.value}
                  value={reason.value}
                  className="text-gray-800"
                >
                  {reason.label}
                </option>
              ))}
            </select>
            {errors.reasonForRequest && (
              <p className="mt-1 text-sm text-red-600">
                {errors.reasonForRequest}
              </p>
            )}
          </div>

          {formData.reasonForRequest === "specific_patient" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Patient Need Details *
              </label>
              <textarea
                value={formData.specificPatientNeed}
                onChange={(e) =>
                  onInputChange("specificPatientNeed", e.target.value)
                }
                rows={3}
                placeholder="Please provide details about the specific patient need..."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600 ${
                  errors.specificPatientNeed
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.specificPatientNeed && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.specificPatientNeed}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Original Delivery Time Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="text-purple-600" />
          Delivery Time
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requested Delivery Time *
          </label>
          <input
            type="datetime-local"
            value={formData.requestedDeliveryTime}
            onChange={(e) =>
              onInputChange("requestedDeliveryTime", e.target.value)
            }
            className={`w-full md:w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
              errors.requestedDeliveryTime
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.requestedDeliveryTime && (
            <p className="mt-1 text-sm text-red-600">
              {errors.requestedDeliveryTime}
            </p>
          )}
        </div>
      </div>

      {/* Request From Section (populated via API, fallback to provided list) */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Request From
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              List of Nearby Blood Banks/Hospitals *
            </label>
            {isLoading && establishments.length === 0 && (
              <div className="text-sm text-gray-500">
                Loading medical establishments...
              </div>
            )}
            {isError && establishments.length === 0 && (
              <div className="text-sm text-red-600">
                Failed to load establishments. Showing defaults if any.
              </div>
            )}
            <div className="space-y-2">
              {normalizedBanks.map((bank) => (
                <label
                  key={bank.value}
                  className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="requestFrom"
                    value={bank.value}
                    checked={formData.requestFrom === bank.value}
                    onChange={(e) =>
                      onInputChange("requestFrom", e.target.value)
                    }
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {bank.label}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      {bank.location}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {errors.requestFrom && (
              <p className="mt-2 text-sm text-red-600">{errors.requestFrom}</p>
            )}
          </div>
        </div>
      </div>

      {/* Original Additional Notes Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Additional Notes
        </h2>

        <textarea
          value={formData.additionalNotes}
          onChange={(e) => onInputChange("additionalNotes", e.target.value)}
          rows={4}
          placeholder="Any additional information or special requirements..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600"
        />
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleSubmitClick}
            className="bg-[#FB7373] hover:bg-red-400 text-white font-medium rounded-lg transition-colors duration-200 px-6 py-2"
          >
            Submit Request
          </button>
        </div>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

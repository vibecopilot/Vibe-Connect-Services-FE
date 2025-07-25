import React from "react";
import Select from "../components/Select";
import ToggleSwitch from "../components/ToggleSwitch";

interface SlotsFormProps {
  formData: {
    serviceCategory: string;
    subCategory: string;
    startTime: string;
    endTime: string;
    maxBookings: string;
    active: boolean;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onToggleChange: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    serviceCategory?: string;
    subCategory?: string;
    startTime?: string;
    endTime?: string;
    maxBookings?: string;
  };
  isViewMode: boolean;
}

const SlotsForm: React.FC<SlotsFormProps> = ({
  formData,
  onChange,
  onToggleChange,
  onSubmit,
  onCancel,
  errors,
  isViewMode,
}) => {
  const serviceCategories = ["IT Services", "Consulting", "Support", "Maintenance"];
  const subCategories = ["Software Development", "Hardware Support", "Training", "Documentation"];



  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-md shadow-md border border-gray-200 max-w-md mx-auto"
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Create Service Slot
        </h2>
        <hr className="text-gray-500 mb-6" />

        <div className="space-y-2">
          {/* Service Category */}
          <Select
            label="Service Category"
            name="serviceCategory"
            value={formData.serviceCategory}
            onChange={onChange}
            options={serviceCategories}
            required
            error={errors.serviceCategory}
            placeholder="Select Service Category"
            disabled={isViewMode}
          />

          {/* Sub Category */}
          <Select
            label="Sub Category"
            name="subCategory"
            value={formData.subCategory}
            onChange={onChange}
            options={subCategories}
            required
            error={errors.subCategory}
            placeholder="Select Sub Category"
            disabled={isViewMode}
          />

          {/* Start Time */}
          <div className="mb-4">
            <label className="block text-sm text-[#5e5e5e] mb-1">
              Start Time <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={onChange}
                  disabled={isViewMode}
                  step="60"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.startTime ? 'border-red-500' : 'border-gray-300'
                  } ${isViewMode ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>
            {errors.startTime && (
              <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
            )}
          </div>

          {/* End Time */}
          <div className="mb-4">
            <label className="block text-sm text-[#5e5e5e] mb-1">
              End Time <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={onChange}
                  disabled={isViewMode}
                  step="60"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.endTime ? 'border-red-500' : 'border-gray-300'
                  } ${isViewMode ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>
            {errors.endTime && (
              <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
            )}
          </div>

          {/* Max Bookings */}
          <div className="mb-4">
            <label className="block text-sm text-[#5e5e5e] mb-1">
              Max Bookings <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="maxBookings"
              value={formData.maxBookings}
              onChange={onChange}
              disabled={isViewMode}
              placeholder="Enter Max Bookings"
              min="1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.maxBookings ? 'border-red-500' : 'border-gray-300'
              } ${isViewMode ? 'bg-gray-100' : ''}`}
            />
            {errors.maxBookings && (
              <p className="text-red-500 text-xs mt-1">{errors.maxBookings}</p>
            )}
          </div>

          {/* Active Toggle */}
          <div className="mb-4">
            <label className="block text-sm text-[#5e5e5e] mb-2">
              Active
            </label>
            <ToggleSwitch
              checked={formData.active}
              onChange={onToggleChange}
              disabled={isViewMode}
              label={formData.active ? "Active" : "Inactive"}
            />
          </div>
        </div>

        <div className="flex justify-center space-x-3 mt-8">
          {!isViewMode && (
            <button
              type="submit"
              className="bg-[#7991BB] hover:bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Create
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SlotsForm;
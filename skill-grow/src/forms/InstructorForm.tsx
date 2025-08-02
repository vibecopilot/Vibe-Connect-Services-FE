import React from "react";
import { ChevronLeft, Upload } from "lucide-react";
import TextInput from "../components/TextInput";
import DatePickerReact from "../components/ReactDatePicker";

interface InstructorFormData {
  name: string;
  courseLevel: string;
  employees: string;
  joinDate: Date | null;
  courseList: string;
  rating: string;
  description: string;
  image: File | null;
}

interface InstructorFormProps {
  formData: InstructorFormData;
  setFormData: React.Dispatch<React.SetStateAction<InstructorFormData>>;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  errorMessage: string;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const InstructorForm: React.FC<InstructorFormProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
  errorMessage,
  isEditing,
  onSubmit,
  onCancel,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDateChange = (e: {
    target: { name: string; value: Date | null };
  }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <div className=" mb-6">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Instructors
          </button>
          <h2 className="text-2xl font-semibold text-center">
            {isEditing ? "Edit Instructor" : "Add Instructor"}
          </h2>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Two-column row: Instructor Name + Course Level */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <TextInput
                label="Instructor Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                required
              />
            </div>
            <div>
              <TextInput
                label="Course Level"
                name="courseLevel"
                value={formData.courseLevel}
                onChange={handleInputChange}
                error={errors.courseLevel}
                required
              />
            </div>
            <div>
              <TextInput
                label="Employees"
                name="employees"
                type="number"
                value={formData.employees}
                onChange={handleInputChange}
                error={errors.employees}
                required
              />
            </div>
          </div>

          {/* Two-column row: Employees + Join Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <div className="space-y-1">
                <DatePickerReact
                  label="Join Date"
                  value={formData.joinDate}
                  onChange={handleDateChange}
                  minDate={new Date("1900-01-01")}
                  maxDate={new Date()}
                  name="joinDate"
                  error={errors.joinDate}
                />
              </div>
              
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course List *
              </label>
              <select
                name="courseList"
                value={formData.courseList}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Course</option>
                <option value="React Development">React Development</option>
                <option value="Node.js">Node.js</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
              {errors.courseList && (
                <p className="text-red-500 text-sm mt-1">{errors.courseList}</p>
              )}
            </div>
            <div>
              <TextInput
                label="Rating"
                name="rating"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleInputChange}
                error={errors.rating}
                required
              />
            </div>
            
            
          </div>

          {/* Two-column row: Course List + Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <label className="cursor-pointer">
                  <span className="text-sm text-blue-600 hover:text-blue-800">
                    Upload a file
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
              {formData.image && (
                <p className="text-sm text-green-600 mt-2">
                  {formData.image.name}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          </div>

          

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorForm;
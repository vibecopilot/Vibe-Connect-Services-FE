import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";

interface VendorSetupFormProps {
  formData: {
    serviceCategory: string;
    subCategory: string;
    serviceType: string;
    vendorName: string;
    contactInfo: string;
    alternateContactNo: string;
    emailId: string;
    website: string;
    description: string;
    attachments: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    serviceCategory?: string;
    subCategory?: string;
    serviceType?: string;
    vendorName?: string;
    contactInfo?: string;
    alternateContactNo?: string;
    emailId?: string;
    website?: string;
    description?: string;
    attachments?: string;
  };
  isViewMode: boolean;
}

const VendorSetupForm: React.FC<VendorSetupFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isViewMode,
}) => {
  const serviceCategories = ["IT Services", "Consulting", "Support", "Maintenance"];
  const subCategories = ["Software Development", "Hardware Support", "Training", "Documentation"];
  const serviceTypes = ["Web Development", "Mobile Development", "Desktop Application", "System Integration"];

  const [uploadedFile, setUploadedFile] = useState<{
    file: File | null;
    preview: string | null;
    name: string | null;
  }>({
    file: null,
    preview: null,
    name: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Call the original onChange to maintain form state
      onChange(e);
      
      // Handle file preview and state
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFile({
          file: file,
          preview: file.type.startsWith('image/') ? event.target?.result as string : null,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📁';
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Vendor Setup
      </h2>
      
      {/* Service Info Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-center py-2 bg-gray-200 text-gray-700 mb-4">
          Service Info
        </h3>
        <div className="grid grid-cols-3 gap-4">
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
          <Select
            label="Service Type"
            name="serviceType"
            value={formData.serviceType}
            onChange={onChange}
            options={serviceTypes}
            required
            error={errors.serviceType}
            placeholder="Select Service Type"
            disabled={isViewMode}
          />
        </div>
      </div>

      {/* Vendor Details Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-center py-2 bg-gray-200 text-gray-700 mb-4">
          Vendor Details
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <TextInput
            label="Vendor Name"
            name="vendorName"
            value={formData.vendorName}
            onChange={onChange}
            required
            error={errors.vendorName}
            minimum_length={2}
            maximum_length={100}
            placeholder="Enter Vendor Name"
            disabled={isViewMode}
          />
          <TextInput
            label="Contact Info"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={onChange}
            required
            error={errors.contactInfo}
            minimum_length={10}
            maximum_length={15}
            placeholder="Enter Contact Info"
            disabled={isViewMode}
          />
          <TextInput
            label="Alternate Contact No"
            name="alternateContactNo"
            value={formData.alternateContactNo}
            onChange={onChange}
            error={errors.alternateContactNo}
            minimum_length={10}
            maximum_length={15}
            placeholder="Enter Alternate Contact No"
            disabled={isViewMode}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <TextInput
            label="Email ID"
            name="emailId"
            value={formData.emailId}
            onChange={onChange}
            required
            error={errors.emailId}
            placeholder="Enter Email ID"
            disabled={isViewMode}
            type="email"
          />
          <TextInput
            label="Website"
            name="website"
            value={formData.website}
            onChange={onChange}
            error={errors.website}
            placeholder="Enter Website URL"
            disabled={isViewMode}
            type="url"
          />
          <TextInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={onChange}
            error={errors.description}
            placeholder="Enter Description"
            disabled={isViewMode}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Attachments
            </label>
            
            {/* Hidden file input */}
            <input
              type="file"
              name="attachments"
              onChange={handleFileChange}
              disabled={isViewMode}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              id="file-input"
            />

            {/* Upload Area - Show only when no file is uploaded */}
            {!uploadedFile.file && (
              <div 
                onClick={handleFileClick}
                className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer disabled:bg-gray-100"
              >
                <svg
                  className="w-8 h-8 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-sm text-gray-500 text-center">
                  Click to upload file
                </span>
              </div>
            )}

            {/* Uploaded File Display */}
            {uploadedFile.file && (
              <div 
                onClick={handleFileClick}
                className="cursor-pointer group"
              >
                {uploadedFile.preview ? (
                  // Image preview
                  <div className="relative inline-block">
                    <img
                      src={uploadedFile.preview}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm group-hover:border-blue-400 transition-colors"
                      alt="Uploaded file"
                    />
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all flex items-center justify-center">
                      <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  // Non-image file display
                  <div className="inline-flex items-center p-3 bg-gray-100 rounded-lg border group-hover:border-blue-400 transition-colors">
                    <span className="text-2xl mr-2">{getFileIcon(uploadedFile.name || '')}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 truncate max-w-32">
                        {uploadedFile.name}
                      </span>
                      <span className="text-xs text-gray-500">Click to change</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {errors.attachments && (
              <p className="text-red-500 text-xs mt-1">{errors.attachments}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-10">
        {!isViewMode && (
          <button
            type="submit"
            className="bg-[#7991BB] hover:bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default VendorSetupForm;
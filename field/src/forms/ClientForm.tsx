import React, { useState, useRef, useEffect } from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import Google Maps components

interface ClientFormProps {
  formData: {
    clientName: string;
    phone: string;
    email: string;
    industry: string;
    territory: string;
    addImage?: File | null;
    businessCard?: File | null;
    locationIdentifier: string;
    officeBuilding: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string | File | null } }
  ) => void;
  onFileChange: (name: string, files: FileList | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    clientName?: string;
    phone?: string;
    email?: string;
    industry?: string;
    territory?: string;
    addImage?: string;
    businessCard?: string;
    locationIdentifier?: string;
    officeBuilding?: string;
  };
  isEditing: boolean;
  isViewMode?: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({
  formData,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
  isViewMode = false,
}) => {
  const industries = ["Unknown", "IT", "Healthcare", "Finance", "Manufacturing", "Retail", "Education"];
  const territories = ["Unknown", "North", "South", "East", "West", "Central"];
  
  // State for map center and marker position
  const defaultCenter = {
    lat: 20.5937, // Default to India center
    lng: 78.9629,
  };
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const businessCardInputRef = useRef<HTMLInputElement>(null);

  // Parse existing officeBuilding coordinates if in view/edit mode
  useEffect(() => {
    if (formData.officeBuilding) {
      const coords = formData.officeBuilding.split(',').map(Number);
      if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        const parsedPosition = { lat: coords[0], lng: coords[1] };
        setMarkerPosition(parsedPosition);
        setMapCenter(parsedPosition); // Center map on existing marker
      }
    }
  }, [formData.officeBuilding]);


  const getFormTitle = () => {
    if (isViewMode) return "View Client Details";
    return isEditing ? "Edit Client" : "Add New Client";
  };

  const handleFileUpload = (name: string, files: FileList | null) => {
    onFileChange(name, files);
  };

  const removeFile = (name: string) => {
    onFileChange(name, null);
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!isViewMode && event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
      
      // Update form data with coordinates
      onChange({
        target: {
          name: 'officeBuilding',
          value: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
        }
      });
    }
  };

  const FileUploadField = ({ 
    name, 
    label, 
    file, 
    inputRef, 
    accept = "image/*" 
  }: {
    name: string;
    label: string;
    file: File | null | undefined;
    inputRef: React.RefObject<HTMLInputElement>;
    accept?: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {!file ? (
        <div
          onClick={() => !isViewMode && inputRef.current?.click()}
          className={`
            border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer
            hover:border-gray-400 transition-colors duration-200
            ${isViewMode ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}
          `}
        >
          <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Click to upload {label.toLowerCase()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      ) : (
        <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <FiImage className="h-8 w-8 text-blue-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {!isViewMode && (
              <button
                type="button"
                onClick={() => removeFile(name)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      )}
      
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleFileUpload(name, e.target.files)}
        className="hidden"
        disabled={isViewMode}
      />
    </div>
  );

  const mapContainerStyle = {
    width: '100%',
    height: '400px', // Adjusted height for better visibility within the form
    borderRadius: '8px',
    border: '1px solid #e2e8f0', // Added a subtle border
  };

  const API_KEY = "AIzaSyAzgDFPjpFcR06w41ONaaKat4zeveG6ONI"; // Replace with your actual Google Maps API Key

  const InteractiveMap = () => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Office Building Location <span className="text-red-500">*</span>
      </label>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={isViewMode && markerPosition ? 15 : 5} // Zoom in on marker if in view mode
          onClick={handleMapClick}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: true,
          }}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
      
      {/* Instructions */}
      <p className="text-sm text-gray-600 mt-2">
        {isViewMode 
          ? `Location: ${formData.officeBuilding || 'No location set'}`
          : 'Click on the map to drop a pin and set the office location'
        }
      </p>
      
      {/* Coordinates Display */}
      {formData.officeBuilding && formData.officeBuilding !== 'Interactive Map' && (
        <p className="text-xs text-gray-500">
          Coordinates: {formData.officeBuilding}
        </p>
      )}
      {errors.officeBuilding && <p className="text-red-500 text-sm mt-1">{errors.officeBuilding}</p>}
    </div>
  );

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-md shadow-md border border-gray-200 mt-4"
    >
      <h2 className="text-lg font-semibold mb-6 text-gray-900">
        {getFormTitle()}
      </h2>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput
            label="Client Name"
            name="clientName"
            value={formData.clientName}
            onChange={onChange}
            required
            error={errors.clientName}
            placeholder="Enter client name"
            disabled={isViewMode}
          />

          <TextInput
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
            error={errors.phone}
            type="tel"
            placeholder="Enter phone number"
            disabled={isViewMode}
          />

          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            error={errors.email}
            type="email"
            placeholder="Enter email address"
            disabled={isViewMode}
          />

          <Select
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={onChange}
            options={industries}
            required
            error={errors.industry}
            placeholder="Select Industry"
            disabled={isViewMode}
          />

          <Select
            label="Territory"
            name="territory"
            value={formData.territory}
            onChange={onChange}
            options={territories}
            required
            error={errors.territory}
            placeholder="Select Territory"
            disabled={isViewMode}
          />
        </div>

        {/* File Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadField
            name="addImage"
            label="Client Image"
            file={formData.addImage}
            inputRef={imageInputRef}
          />
          
          <FileUploadField
            name="businessCard"
            label="Business Card"
            file={formData.businessCard}
            inputRef={businessCardInputRef}
          />
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <TextArea
            label="Location Identifier"
            name="locationIdentifier"
            value={formData.locationIdentifier}
            onChange={onChange}
            required
            error={errors.locationIdentifier}
            placeholder="Enter complete address including street, city, state, and zip code"
            disabled={isViewMode}
            rows={3}
          />
        </div>

        {/* Interactive Map Section (now using Google Maps) */}
        <div className="space-y-4">
          <InteractiveMap />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-200">
        {!isViewMode && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors font-medium"
          >
            {isEditing ? "Update Client" : "Add Client"}
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors font-medium"
        >
          {isViewMode ? "Close" : "Cancel"}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
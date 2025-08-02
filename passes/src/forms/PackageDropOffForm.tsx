import React, { useState, forwardRef, useImperativeHandle } from "react";
import TextInput from "../components/TextInput";
import FileUpload from "../components/FileUpload";

export interface PackageDropOffFormHandle {
  getPayload: () => any;
}

const PackageDropOffForm = forwardRef<PackageDropOffFormHandle>((_, ref) => {
  const [deliveryPartnerName, setDeliveryPartnerName] = useState("");
  const [deliveryPartnerContact, setDeliveryPartnerContact] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [lockerNumber, setLockerNumber] = useState("");
  const [unitOwnerName, setUnitOwnerName] = useState("");
  const [unitOwnerContact, setUnitOwnerContact] = useState("");
  const [otp, setOtp] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  useImperativeHandle(ref, () => ({
    getPayload: () => ({
      deliveryPartnerName,
      deliveryPartnerContact,
      packageDescription,
      lockerNumber,
      unitOwnerName,
      unitOwnerContact,
      otp,
      files,
    }),
  }));

  const handleSendOtp = () => {
    console.log("Sending OTP to:", unitOwnerContact);
    // Placeholder for actual OTP logic
  };

  return (
    <div className="space-y-4 text-[#5E5E5E]">
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label="Delivery Partner Name"
          name="deliveryPartnerName"
          value={deliveryPartnerName}
          onChange={(e) => setDeliveryPartnerName(e.target.value)}
        />
        <TextInput
          label="Delivery Partner Contact"
          name="deliveryPartnerContact"
          value={deliveryPartnerContact}
          onChange={(e) => setDeliveryPartnerContact(e.target.value)}
        />
        <TextInput
          label="Package Description"
          name="packageDescription"
          value={packageDescription}
          onChange={(e) => setPackageDescription(e.target.value)}
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label="Locker Number"
          name="lockerNumber"
          value={lockerNumber}
          onChange={(e) => setLockerNumber(e.target.value)}
        />
        <TextInput
          label="Unit Owner Name"
          name="unitOwnerName"
          value={unitOwnerName}
          onChange={(e) => setUnitOwnerName(e.target.value)}
        />
        <TextInput
          label="Unit Owner Contact"
          name="unitOwnerContact"
          value={unitOwnerContact}
          onChange={(e) => setUnitOwnerContact(e.target.value)}
        />
      </div>

      {/* OTP Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <TextInput
          label="OTP Verification"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={handleSendOtp}
            className="mb-4 px-4 py-2 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
          >
            Send OTP
          </button>
        </div>
      </div>

      {/* File Upload */}
      <FileUpload label="Documents" onChange={setFiles} />
    </div>
  );
});

export default PackageDropOffForm;

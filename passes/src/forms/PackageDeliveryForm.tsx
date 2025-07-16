import React, { useState, forwardRef, useImperativeHandle } from "react";
import TextInput from "../components/TextInput";
import FileUpload from "../components/FileUpload";

export interface PackageDeliveryFormHandle {
  getPayload: () => any;
}

const PackageDeliveryForm = forwardRef<PackageDeliveryFormHandle>((_, ref) => {
  const [unitOwnerName, setUnitOwnerName] = useState("");
  const [deliveryPartnerName, setDeliveryPartnerName] = useState("");
  const [lockerNumber, setLockerNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  useImperativeHandle(ref, () => ({
    getPayload: () => ({
      unitOwnerName,
      deliveryPartnerName,
      lockerNumber,
      otp,
      files,
    }),
  }));

  const handleSendOtp = () => {
    console.log("Sending OTP to:", deliveryPartnerName);
    // Add real logic if needed
  };

  return (
    <div className="space-y-4 text-[#5E5E5E]">
      {/* First row: Unit Owner Name, Delivery Partner Name, Locker Number */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label="Unit Owner Name"
          name="unitOwnerName"
          value={unitOwnerName}
          onChange={(e) => setUnitOwnerName(e.target.value)}
        />
        <TextInput
          label="Delivery Partner Name"
          name="deliveryPartnerName"
          value={deliveryPartnerName}
          onChange={(e) => setDeliveryPartnerName(e.target.value)}
        />
        <TextInput
          label="Locker Number"
          name="lockerNumber"
          value={lockerNumber}
          onChange={(e) => setLockerNumber(e.target.value)}
        />
      </div>

      {/* Second row: OTP Verification and Send OTP */}
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
      <FileUpload
        label="Documents"
        onChange={setFiles}
      />
    </div>
  );
});

export default PackageDeliveryForm;

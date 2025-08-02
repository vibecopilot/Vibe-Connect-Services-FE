import React, { useState, forwardRef, useImperativeHandle } from "react";
import TextInput from "../components/TextInput";
import FileUpload from "../components/FileUpload";
import Select from "../components/Select";

export interface GoodsOutFormHandle {
  getPayload: () => any;
}

const GoodsOutForm = forwardRef<GoodsOutFormHandle>((_, ref) => {
  const [unitOwnerName, setUnitOwnerName] = useState("");
  const [unitOwnerContact, setUnitOwnerContact] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [securityStatus, setSecurityStatus] = useState("");
  const [securityConfirmation, setSecurityConfirmation] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  useImperativeHandle(ref, () => ({
    getPayload: () => ({
      unitOwnerName,
      unitOwnerContact,
      quantity,
      description,
      securityStatus,
      securityConfirmation,
      files,
    }),
  }));

  return (
    <div className="space-y-4 text-[#5E5E5E]">
      {/* First row: Unit Owner Name, Unit Owner Contact, Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <TextInput
          label="Quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      {/* Second row: Goods Description, Security Status, Security Guard Confirmation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label="Goods Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          label="Security Approval Status"
          name="securityStatus"
          value={securityStatus}
          onChange={(e) => setSecurityStatus(e.target.value)}
          options={[
            { value: "", label: "Select Status" },
            { value: "Approved", label: "Approved" },
            { value: "Pending", label: "Pending" },
            { value: "Rejected", label: "Rejected" },
          ]}
        />
        <Select
          label="Security Guard Confirmation"
          name="securityConfirmation"
          value={securityConfirmation}
          onChange={(e) => setSecurityConfirmation(e.target.value)}
          options={[
            { value: "", label: "Select Confirmation" },
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />
      </div>

      {/* File Upload */}
      <FileUpload
        label="Documents"
        onChange={setFiles}
      />
    </div>
  );
});

export default GoodsOutForm;

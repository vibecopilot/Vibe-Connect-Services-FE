// GoodsInForm.tsx
import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import TextInput from "../components/TextInput";
import FileUpload from "../components/FileUpload";
import Select from "../components/Select";

export interface GoodsInFormHandle {
  getPayload: () => any;
}

interface GoodsInFormProps {
  initialValues?: any;
}

const GoodsInForm = forwardRef<GoodsInFormHandle, GoodsInFormProps>(({ initialValues }, ref) => {
  const [visitorName, setVisitorName] = useState(initialValues?.visitorName || "");
  const [visitorContact, setVisitorContact] = useState(initialValues?.visitorContact || "");
  const [quantity, setQuantity] = useState(initialValues?.quantity ? String(initialValues.quantity) : "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [securityStatus, setSecurityStatus] = useState(initialValues?.securityStatus || "");
  const [unitOwnerName, setUnitOwnerName] = useState(initialValues?.unitOwnerName || "");
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (initialValues) {
      setVisitorName(initialValues.visitorName || "");
      setVisitorContact(initialValues.visitorContact || "");
      setQuantity(initialValues.quantity ? String(initialValues.quantity) : "");
      setDescription(initialValues.description || "");
      setSecurityStatus(initialValues.securityStatus || "");
      setUnitOwnerName(initialValues.unitOwnerName || "");
    }
  }, [initialValues]);

  useImperativeHandle(ref, () => ({
    getPayload: () => ({
      visitorName,
      visitorContact,
      quantity,
      description,
      securityStatus,
      unitOwnerName,
      files,
    }),
  }));

  return (
    <div className="space-y-4 text-[#5E5E5E]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label="Visitor Name"
          name="visitorName"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
        />
        <TextInput
          label="Visitor Contact"
          name="visitorContact"
          value={visitorContact}
          onChange={(e) => setVisitorContact(e.target.value)}
        />
        <TextInput
          label="Quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

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
        <TextInput
          label="Unit Owner Name"
          name="unitOwnerName"
          value={unitOwnerName}
          onChange={(e) => setUnitOwnerName(e.target.value)}
        />
      </div>

      <FileUpload
        label="Documents"
        onChange={setFiles}
      />
    </div>
  );
});

export default GoodsInForm;
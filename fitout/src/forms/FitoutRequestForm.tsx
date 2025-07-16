import React, { useState, useImperativeHandle, forwardRef } from "react";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import RadioButton from "../components/RadioButton";

export interface FitoutRequestFormHandle {
  getPayload: () => {
    onBehalfOf: string;
    tower: string;
    description: string;
    user: string;
    contractorMobile: string;
    flat: number;
    contractorName: string;
    refundDate: string;
    requestedDate: string;
    expiryDate: string;
    annexure: string;
    annexureInfo: string;
    amount: number;
    convenience: number;
    trait: number;
    paymentMode: string;
  } | null;
}

interface FitoutRequestFormProps {
  initialData?: {
    onBehalfOf?: string;
    tower?: string;
    description?: string;
    user?: string;
    contractorMobile?: string;
    flat?: number;
    contractorName?: string;
    refundDate?: string;
    requestedDate?: string;
    expiryDate?: string;
    annexure?: string;
    annexureInfo?: string;
    amount?: number;
    convenience?: number;
    trait?: number;
    paymentMode?: string;
  };
}

const FitoutRequestForm = forwardRef<FitoutRequestFormHandle, FitoutRequestFormProps>(
  ({ initialData }, ref) => {
    const [formData, setFormData] = useState({
      onBehalfOf: initialData?.onBehalfOf || "",
      tower: initialData?.tower || "",
      description: initialData?.description || "",
      user: initialData?.user || "",
      contractorMobile: initialData?.contractorMobile || "",
      flat: initialData?.flat || 0,
      contractorName: initialData?.contractorName || "",
      refundDate: initialData?.refundDate || "",
      requestedDate: initialData?.requestedDate || "",
      expiryDate: initialData?.expiryDate || "",
      annexure: initialData?.annexure || "",
      annexureInfo: initialData?.annexureInfo || "",
      amount: initialData?.amount || 0,
      convenience: initialData?.convenience || 0,
      trait: initialData?.trait || 0,
      paymentMode: initialData?.paymentMode || "",
    });

    const [errors, setErrors] = useState({
      onBehalfOf: "",
      tower: "",
      description: "",
      user: "",
      contractorMobile: "",
      flat: "",
      contractorName: "",
      refundDate: "",
      requestedDate: "",
      expiryDate: "",
      annexure: "",
      annexureInfo: "",
      amount: "",
      convenience: "",
      trait: "",
      paymentMode: "",
    });

    const validateForm = () => {
      let isValid = true;
      const newErrors = { ...errors };

      // Reset errors
      Object.keys(newErrors).forEach(key => {
        newErrors[key as keyof typeof newErrors] = "";
      });

      // Validate required fields
      if (!formData.onBehalfOf.trim()) {
        newErrors.onBehalfOf = "On Behalf Of is required";
        isValid = false;
      }
      
      if (!formData.tower) {
        newErrors.tower = "Tower selection is required";
        isValid = false;
      }

      if (formData.description.length < 15) {
        newErrors.description = "Description must be at least 15 characters";
        isValid = false;
      }

      if (!formData.user.trim()) {
        newErrors.user = "User is required";
        isValid = false;
      }

      if (!/^\d{10}$/.test(formData.contractorMobile)) {
        newErrors.contractorMobile = "Valid 10-digit mobile number required";
        isValid = false;
      }

      if (formData.flat <= 0) {
        newErrors.flat = "Valid flat number is required";
        isValid = false;
      }

      if (!formData.contractorName.trim()) {
        newErrors.contractorName = "Contractor name is required";
        isValid = false;
      }

      if (!formData.requestedDate) {
        newErrors.requestedDate = "Requested date is required";
        isValid = false;
      }

      if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
        isValid = false;
      }

      if (!formData.annexure.trim()) {
        newErrors.annexure = "Annexure is required";
        isValid = false;
      }

      if (formData.amount <= 0) {
        newErrors.amount = "Amount must be positive";
        isValid = false;
      }

      if (!formData.paymentMode) {
        newErrors.paymentMode = "Payment mode is required";
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'flat' || name === 'amount' || name === 'convenience' || name === 'trait' 
          ? Number(value) 
          : value
      }));
    };

    useImperativeHandle(ref, () => ({
      getPayload: () => {
        if (!validateForm()) return null;
        return formData;
      }
    }));

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RadioButton
          label="On Behalf Of"
          name="onBehalfOf"
          options={["Admin", "User"]}
          value={formData.onBehalfOf}
          onChange={e => setFormData(prev => ({ ...prev, onBehalfOf: e.target.value }))}
          error={errors.onBehalfOf}
        />

        <Select
          label="Tower"
          name="tower"
          required
          options={["Tower A", "Tower B", "Tower C"]}
          value={formData.tower}
          onChange={handleChange}
          error={errors.tower}
        />

        <div className="md:col-span-2">
          <TextArea
            label="Description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            minimum_length={15}
          />
        </div>

        <TextInput
          label="User"
          required
          name="user"
          value={formData.user}
          onChange={handleChange}
          error={errors.user}
        />

        <TextInput
          label="Contractor Mobile"
          required
          name="contractorMobile"
          value={formData.contractorMobile}
          onChange={handleChange}
          error={errors.contractorMobile}
          placeholder="10-digit number"
        />

        <TextInput
          label="Flat Number"
          type="number"
          required
          name="flat"
          value={formData.flat.toString()}
          onChange={handleChange}
          error={errors.flat}
        />

        <TextInput
          label="Contractor Name"
          required
          name="contractorName"
          value={formData.contractorName}
          onChange={handleChange}
          error={errors.contractorName}
        />

        <TextInput
          label="Refund Date"
          type="date"
          name="refundDate"
          value={formData.refundDate}
          onChange={handleChange}
          error={errors.refundDate}
        />

        <TextInput
          label="Requested Date"
          type="date"
          required
          name="requestedDate"
          value={formData.requestedDate}
          onChange={handleChange}
          error={errors.requestedDate}
        />

        <TextInput
          label="Expiry Date"
          type="date"
          required
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          error={errors.expiryDate}
        />

        <TextInput
          label="Annexure"
          required
          name="annexure"
          value={formData.annexure}
          onChange={handleChange}
          error={errors.annexure}
        />

        <div className="md:col-span-2">
          <TextArea
            label="Annexure Information"
            name="annexureInfo"
            value={formData.annexureInfo}
            onChange={handleChange}
            error={errors.annexureInfo}
          />
        </div>

        <TextInput
          label="Amount"
          type="number"
          required
          name="amount"
          value={formData.amount.toString()}
          onChange={handleChange}
          error={errors.amount}
        />

        <TextInput
          label="Convenience Fee"
          type="number"
          name="convenience"
          value={formData.convenience.toString()}
          onChange={handleChange}
          error={errors.convenience}
        />

        <TextInput
          label="Trait Fee"
          type="number"
          name="trait"
          value={formData.trait.toString()}
          onChange={handleChange}
          error={errors.trait}
        />

        <Select
          label="Payment Mode"
          name="paymentMode"
          required
          options={["Online", "Cash", "Cheque", "Bank Transfer"]}
          value={formData.paymentMode}
          onChange={handleChange}
          error={errors.paymentMode}
        />
      </div>
    );
  }
);

export default FitoutRequestForm;
// src/forms/CabForm.tsx
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ChangeEvent,
} from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import SwiggyLogo from "../assets/icons/Swiggy_logo.png";
import ZomatoLogo from "../assets/icons/Zomato_logo.png";
import RadioButton from "../components/RadioButton";
import Blinkit from "../assets/icons/blinkit_logo.png";

export interface CabFormData {
  cabName: string;
  cabType: string;
  active: boolean;
  icon: string;
}

export interface CabFormHandle {
  getPayload: () => CabFormData | null;
  resetForm: () => void;
}

interface CabFormProps {
  initialData?: Partial<CabFormData>;
  onSubmit?: (data: CabFormData) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const iconOptions = [
  { id: "zomato", label: "Zomato", image: ZomatoLogo },
  { id: "swiggy", label: "Swiggy", image: SwiggyLogo },
  { id: "blinkit", label: "Blinkit", image: Blinkit },
];

const CabForm = forwardRef<CabFormHandle, CabFormProps>(
  ({ initialData, onSubmit, onCancel, onDelete }, ref) => {
    const [cabName, setCabName] = useState(initialData?.cabName || "");
    const [cabType, setCabType] = useState(initialData?.cabType || "");
    const [active, setActive] = useState(initialData?.active ?? true);
    const [icon, setIcon] = useState(initialData?.icon || "");

    useImperativeHandle(ref, () => ({
      getPayload: () => {
        if (!cabName.trim()) {
          alert("Cab Name is required");
          return null;
        }
        if (!cabType) {
          alert("Please select a Cab Type");
          return null;
        }
        return {
          cabName: cabName.trim(),
          cabType,
          active,
          icon,
        };
      },
      resetForm: () => {
        setCabName("");
        setCabType("");
        setActive(true);
        setIcon("");
      },
    }));

    const handleChange =
      (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setter(e.target.value);
      };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (ref && "current" in ref && ref.current) {
        const payload = ref.current.getPayload();
        if (payload && onSubmit) {
          onSubmit(payload);
        }
      }
    };

    const groupOptions = [
      { value: "Sedan", label: "Sedan" },
      { value: "SUV", label: "SUV" },
      { value: "Van", label: "Van" },
      { value: "Truck", label: "Truck" },
    ];

    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white p-4 rounded-lg shadow">
          <TextInput
            label="Enter here"
            name="cabName"
            value={cabName}
            onChange={handleChange(setCabName)}
            required
          />
          <div className="flex items-center mt-3 mb-4">
            <input
              type="checkbox"
              id="active"
              checked={active}
              onChange={() => setActive(!active)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Cab Type</label>
            <Select
              name="cabType"
              value={cabType}
              onChange={handleChange(setCabType)}
              options={groupOptions}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Select icon</label>
            <RadioButton
              name="icon"
              options={iconOptions.map(option => option.label)}
              value={iconOptions.find(option => option.id === icon)?.label || ""}
              onChange={e => {
                const selected = iconOptions.find(option => option.label === e.target.value);
                if (selected) setIcon(selected.id);
              }}
            />
            <div className="flex space-x-4 mt-2">
              {iconOptions.map((option) => (
                <div key={option.id} className="flex flex-col items-center">
                  <label
                    htmlFor={option.id}
                    className={`cursor-pointer border-2 rounded-lg p-1 ${
                      icon === option.id ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <img
                      src={option.image}
                      alt={option.label}
                      className="w-12 h-12 object-contain"
                    />
                  </label>
                  <span className="mt-1 text-xs">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>

        {/* FORM FOOTER WITH BOTH BUTTONS */}
        <div className="flex justify-end pt-2 space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
);

export default CabForm;
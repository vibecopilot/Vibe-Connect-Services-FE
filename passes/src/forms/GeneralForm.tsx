import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import TextInput from "../components/TextInput";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select"; // Import the Select component

export interface GeneralFormHandle {
  getPayload: () => { name: string; status: string; workType?: string } | null;
  setInitialValues: (values: { name: string; status: string; workType?: string }) => void;
}

interface GeneralFormProps {
  initialName?: string;
  initialStatus?: string;
  initialWorkType?: string;
  fieldLabel?: string;
  showWorkTypeSelect?: boolean; // New prop to control visibility
}

const GeneralForm = forwardRef<GeneralFormHandle, GeneralFormProps>(
  ({ 
    initialName = "", 
    initialStatus = "Active",
    initialWorkType = "",
    fieldLabel = "Enter Name",
    showWorkTypeSelect = false // Default to hidden
  }, ref) => {
    const [name, setName] = useState(initialName);
    const [isActive, setIsActive] = useState(initialStatus === "Active");
    const [workType, setWorkType] = useState(initialWorkType);

    useEffect(() => {
      setName(initialName);
      setIsActive(initialStatus === "Active");
      setWorkType(initialWorkType || "");
    }, [initialName, initialStatus, initialWorkType]);

    useImperativeHandle(ref, () => ({
      getPayload: () => {
        if (!name.trim()) return null;
        
        const payload: { name: string; status: string; workType?: string } = {
          name: name.trim(),
          status: isActive ? "Active" : "Inactive"
        };
        
        if (showWorkTypeSelect) {
          payload.workType = workType;
        }
        
        return payload;
      },
      setInitialValues: (values) => {
        setName(values.name);
        setIsActive(values.status === "Active");
        if (values.workType) {
          setWorkType(values.workType);
        }
      },
    }));

    const handleCheckboxChange = (e: { target: { value: boolean } }) => {
      setIsActive(e.target.value);
    };

    const handleWorkTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setWorkType(e.target.value);
    };

    return (
      <form>
        <div className="mb-4">
          <label className="block mb-1">{fieldLabel}</label>
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {showWorkTypeSelect && (
          <div className="mb-4">
            <label className="block mb-1">Select work type</label>
            <Select
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Support", label: "Support" },
                { value: "Management", label: "Management" },
                { value: "Technical", label: "Technical" },
                { value: "Operations", label: "Operations" },
              ]}
              value={workType}
              onChange={handleWorkTypeChange}
            />
          </div>
        )}

        <div className="mb-4">
          <Checkbox
            label="Active"
            checked={isActive}
            onChange={handleCheckboxChange}
            name="status"
          />
        </div>
      </form>
    );
  }
);

export default GeneralForm;
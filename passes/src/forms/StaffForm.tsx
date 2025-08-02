import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ChangeEvent,
} from "react";
import { User, Briefcase } from "lucide-react";
import TextInput from "../components/TextInput";

export interface StaffFormData {
  categoryName: string;
  day: string;
  hours1: string;
  hours2: string;
  categoryType: "user" | "briefcase";
}

export interface StaffFormHandle {
  getPayload: () => StaffFormData | null;
  resetForm: () => void;
}

interface StaffFormProps {
  initialData?: Partial<StaffFormData>;
  onSubmit?: (data: StaffFormData) => void;
}

const StaffForm = forwardRef<StaffFormHandle, StaffFormProps>(
  ({ initialData, onSubmit }, ref) => {
    const [categoryName, setCategoryName] = useState(initialData?.categoryName || "");
    const [day, setDay] = useState(initialData?.day || "");
    const [hours1, setHours1] = useState(initialData?.hours1 || "");
    const [hours2, setHours2] = useState(initialData?.hours2 || "");
    const [categoryType, setCategoryType] = useState<"user" | "briefcase">(
      initialData?.categoryType || "user"
    );

    useImperativeHandle(ref, () => ({
      getPayload: () => {
        if (!categoryName.trim()) {
          alert("Category Name is required");
          return null;
        }
        return {
          categoryName: categoryName.trim(),
          day,
          hours1,
          hours2,
          categoryType,
        };
      },
      resetForm: () => {
        setCategoryName("");
        setDay("");
        setHours1("");
        setHours2("");
        setCategoryType("user");
      },
    }));

    const handleChange =
      (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement>) => {
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

    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextInput
          label="Category Name"
          name="categoryName"
          value={categoryName}
          onChange={handleChange(setCategoryName)}
          required
        />
        <TextInput
          label="Day"
          name="day"
          value={day}
          onChange={handleChange(setDay)}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Hours 1"
            name="hours1"
            value={hours1}
            onChange={handleChange(setHours1)}
          />
          <TextInput
            label="Hours 2"
            name="hours2"
            value={hours2}
            onChange={handleChange(setHours2)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Category Type</label>
          <div className="flex space-x-8">
            <label className="flex items-center cursor-pointer space-x-2">
              <TextInput
                type="radio"
                name="categoryType"
                value="user"
                checked={categoryType === "user"}
                onChange={() => setCategoryType("user")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <User size={20} />
              <span>User</span>
            </label>
            <label className="flex items-center cursor-pointer space-x-2">
              <TextInput
                type="radio"
                name="categoryType"
                value="briefcase"
                checked={categoryType === "briefcase"}
                onChange={() => setCategoryType("briefcase")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <Briefcase size={20} />
              <span>Briefcase</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
);

export default StaffForm;
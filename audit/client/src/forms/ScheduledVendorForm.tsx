// src/forms/ScheduledVendorForm.tsx
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ChangeEvent,
  useRef,
} from "react";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import ToggleSwitch from "../components/ToggleSwitch";
import Checkbox from "../components/Checkbox";
import RadioButton from "../components/RadioButton";
import Select from "../components/Select";
import DatePicker from "../components/DatePicker"; 
import { FiTrash2, FiPlus } from "react-icons/fi";

export interface ScheduledVendorFormData {
  id?: number;
  activityName: string;
  description: string;
  numAssociations: number;
  task: string;
  taskAssignedTo: string;
  createdOn: string;
  active: boolean;
  scanType: string;
  priority: string;
  planDuration: string;
  emailTriggerRule: string;
  supervisors: string;
  category: string;
  lockOverdueTask: string;
  frequency: string;
  startFrom: string;
  endAt: string;
  selectSupplier: string;
}

export interface ScheduledVendorFormHandle {
  getPayload: () => ScheduledVendorFormData | null;
  resetForm: () => void;
}

interface ScheduledVendorFormProps {
  initialData?: Partial<ScheduledVendorFormData>;
  onSubmit?: (data: ScheduledVendorFormData) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const ScheduledVendorForm = forwardRef<ScheduledVendorFormHandle, ScheduledVendorFormProps>(
  ({ initialData, onSubmit, onCancel, onDelete }, ref) => {
    const [activityName, setActivityName] = useState(initialData?.activityName || "");
    const [numAssociations, setNumAssociations] = useState<number>(initialData?.numAssociations || 0);
    const [task, setTask] = useState(initialData?.task || "");
    const [taskAssignedTo, setTaskAssignedTo] = useState(initialData?.taskAssignedTo || "");
    const [createdOn, setCreatedOn] = useState(initialData?.createdOn || "");
    const [active, setActive] = useState(initialData?.active ?? true);
    const [selectTemplate, setSelectTemplate] = useState(false);
    const [createTask, setCreateTask] = useState(false);
    const [weightage, setWeightage] = useState(false);
    const [description, setDescription] = useState(initialData?.description || "");
    const [allowObservations, setAllowObservations] = useState(false);
    const [group, setGroup] = useState("");
    const [assignTo, setAssignTo] = useState("Users");
    const [subgroup, setSubgroup] = useState("");
    const [inputType, setInputType] = useState("");
    const [mandatory, setMandatory] = useState(false);
    const [reading, setReading] = useState(false);
    const [helptext, setHelptext] = useState(false);
    const [checklistType, setChecklistType] = useState("Individual");
    const [scheduleGroup, setScheduleGroup] = useState("");
    const [selectedPeople, setSelectedPeople] = useState("");
    const [scanType, setScanType] = useState(initialData?.scanType || "");
    const [priority, setPriority] = useState(initialData?.priority || "");
    const [planDuration, setPlanDuration] = useState(initialData?.planDuration || "");
    const [emailTriggerRule, setEmailTriggerRule] = useState(initialData?.emailTriggerRule || "");
    const [supervisors, setSupervisors] = useState(initialData?.supervisors || "");
    const [category, setCategory] = useState(initialData?.category || "");
    const [lockOverdueTask, setLockOverdueTask] = useState(initialData?.lockOverdueTask || "");
    const [frequency, setFrequency] = useState(initialData?.frequency || "");
    const [startFrom, setStartFrom] = useState(initialData?.startFrom || "");
    const [endAt, setEndAt] = useState(initialData?.endAt || "");
    const [selectSupplier, setSelectSupplier] = useState(initialData?.selectSupplier || "");

    const getPayload = (): ScheduledVendorFormData | null => {
      if (!activityName.trim()) {
        return null;
      }
      if (!task) {
        return null;
      }
      return {
        activityName: activityName.trim(),
        description,
        numAssociations,
        task,
        taskAssignedTo,
        createdOn,
        active,
        scanType,
        priority,
        planDuration,
        emailTriggerRule,
        supervisors,
        category,
        lockOverdueTask,
        frequency,
        startFrom,
        endAt,
        selectSupplier
      };
    };

    const resetForm = () => {
      setActivityName("");
      setDescription("");
      setNumAssociations(0);
      setTask("");
      setTaskAssignedTo("");
      setCreatedOn("");
      setActive(true);
      setGroup("");
      setAssignTo("Users");
      setSubgroup("");
      setInputType("");
      setMandatory(false);
      setReading(false);
      setHelptext(false);
      setScheduleGroup("");
      setScanType("");
      setPriority("");
      setPlanDuration("");
      setEmailTriggerRule("");
      setSupervisors("");
      setCategory("");
      setLockOverdueTask("");
      setFrequency("");
      setStartFrom("");
      setEndAt("");
      setSelectSupplier("");
    };

    useImperativeHandle(ref, () => ({
      getPayload,
      resetForm,
    }));

    const handleChange =
      (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
      };

    const handleNumberChange =
      (setter: React.Dispatch<React.SetStateAction<number>>) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setter(Number(e.target.value));
      };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const payload = getPayload();
      if (!payload) {
        if (!activityName.trim()) alert("Activity Name is required");
        if (!task) alert("Task is required");
        return;
      }
      if (onSubmit) {
        onSubmit(payload);
      }
    };

    const handleAddSection = () => {
      console.log("Add Section button clicked");
    };

    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Toggle Switches Row */}
          <div className="flex flex-row gap-6 mb-6 w-full">
            <div className="flex-1 flex items-center gap-2 justify-start">
              <span className="font-medium">Select Template:</span>
              <ToggleSwitch isOn={selectTemplate} handleToggle={() => setSelectTemplate(!selectTemplate)} />
            </div>
            <div className="flex-1 flex items-center gap-2 justify-center">
              <span className="font-medium">Create Task:</span>
              <ToggleSwitch isOn={createTask} handleToggle={() => setCreateTask(!createTask)} />
            </div>
            <div className="flex-1 flex items-center gap-2 justify-end">
              <span className="font-medium">Weightage:</span>
              <ToggleSwitch isOn={weightage} handleToggle={() => setWeightage(!weightage)} />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4 text-center bg-gray-100 py-2 rounded">Basic Info</h2>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-4">Schedule For:</span>
              <div className="flex gap-2 flex-wrap">
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Asset</button>
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Services</button>
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Vendor</button>
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Training</button>
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Compliance</button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <TextInput
              label="Activity Name"
              name="activityName"
              value={activityName}
              onChange={handleChange(setActivityName)}
              required
            />
            <TextArea
              label="Description"
              name="description"
              value={description}
              onChange={handleChange(setDescription)}
              rows={3}
              required
            />
            <Checkbox
              label="Allow observations"
              name="allowObservations"
              checked={allowObservations}
              onChange={() => setAllowObservations(!allowObservations)}
            />
          </div>

          {/* Task Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 bg-gray-100 py-2 rounded px-4 text-center">Task</h2>

            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={handleAddSection}
                className="flex items-center px-4 py-2 bg-[#7991BB] text-white rounded cursor-pointer"
              >
                Add Section
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput label="Group" name="group" value={group} onChange={handleChange(setGroup)} />
                <Select
                  label="Assign To"
                  name="assignTo"
                  options={["Users", "Select People"]}
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                />
                <TextInput label="Subgroup" name="subgroup" value={subgroup} onChange={handleChange(setSubgroup)} />
                <TextInput label="Task" name="task" value={task} onChange={handleChange(setTask)} required />
                <TextInput label="Input Type" name="inputType" value={inputType} onChange={handleChange(setInputType)} />
              </div>

              <div className="flex-1 flex flex-row gap-4 items-center justify-center mt-4 md:mt-0">
                <Checkbox label="Mandatory" name="mandatory" checked={mandatory} onChange={() => setMandatory(!mandatory)} />
                <Checkbox label="Reading" name="reading" checked={reading} onChange={() => setReading(!reading)} />
                <Checkbox label="Helptext" name="helptext" checked={helptext} onChange={() => setHelptext(!helptext)} />
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <h2 className="text-xl font-bold mb-4 bg-gray-100 py-2 rounded px-4 text-center">Schedule</h2>
          <div className="mb-6">
            <div className="flex flex-row items-center gap-4 mb-4">
              <span className="font-semibold">Checklist Type:</span>
              <div className="flex gap-4">
                <RadioButton
                  label=""
                  name="checklistType"
                  options={["Individual", "Asset group"]}
                  value={checklistType}
                  onChange={e => setChecklistType(e.target.value)}
                  layout="horizontal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="Group"
                name="scheduleGroup"
                value={scheduleGroup}
                onChange={handleChange(setScheduleGroup)}
              />
              <Select
                label="Users"
                name="assignToSchedule"
                options={["Users", "Select People"]}
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
              />
              <Select
                label="Select People"
                name="selectPeopleSchedule"
                options={["Person A", "Person B", "Person C"]}
                value={selectedPeople}
                onChange={(e) => setSelectedPeople(e.target.value)}
              />
            </div>

            {/* NEW FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <Select
                  label="Scan type"
                  name="scanType"
                  options={["Full Scan", "Partial Scan", "Quick Scan"]}
                  value={scanType}
                  onChange={handleChange(setScanType)}
                />
                <Select
                  label="Priority"
                  name="priority"
                  options={["High", "Medium", "Low"]}
                  value={priority}
                  onChange={handleChange(setPriority)}
                />
                <Select
                  label="Plan duration"
                  name="planDuration"
                  options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
                  value={planDuration}
                  onChange={handleChange(setPlanDuration)}
                />
                <Select
                  label="Email Trigger Rule"
                  name="emailTriggerRule"
                  options={["On Failure", "On Success", "Always", "Never"]}
                  value={emailTriggerRule}
                  onChange={handleChange(setEmailTriggerRule)}
                />
                <Select
                  label="Supervisors"
                  name="supervisors"
                  options={["John Doe", "Jane Smith", "Mike Johnson"]}
                  value={supervisors}
                  onChange={handleChange(setSupervisors)}
                />
              </div>

              <div className="space-y-4">
                <Select
                  label="Category"
                  name="category"
                  options={["Maintenance", "Inspection", "Safety", "Compliance"]}
                  value={category}
                  onChange={handleChange(setCategory)}
                />
                <Select
                  label="Lock overdue Task"
                  name="lockOverdueTask"
                  options={["Yes", "No"]}
                  value={lockOverdueTask}
                  onChange={handleChange(setLockOverdueTask)}
                />
                <Select
                  label="Frequency"
                  name="frequency"
                  options={["Once", "Daily", "Weekly", "Monthly", "Custom"]}
                  value={frequency}
                  onChange={handleChange(setFrequency)}
                />
                <DatePicker
                  label="Start From"
                  name="startFrom"
                  value={startFrom}
                  onChange={handleChange(setStartFrom)}
                />
                <DatePicker
                  label="End At"
                  name="endAt"
                  value={endAt}
                  onChange={handleChange(setEndAt)}
                />
                <Select
                  label="Select Supplier"
                  name="selectSupplier"
                  options={["Supplier A", "Supplier B", "Supplier C"]}
                  value={selectSupplier}
                  onChange={handleChange(setSelectSupplier)}
                />
              </div>
            </div>
          </div>

          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              <FiTrash2 className="mr-2" />
              Delete Activity
            </button>
          )}
        </div>

        {/* FORM FOOTER WITH BOTH BUTTONS */}
        <div className="flex justify-center pt-2 space-x-3">
          <button
            type="submit"
            className="px-6 py-2 bg-[#7991BB] fle text-white rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
);

export default ScheduledVendorForm;
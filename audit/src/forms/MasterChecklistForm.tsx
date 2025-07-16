// src/forms/ScheduledVendorForm.tsx
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ChangeEvent,
} from "react";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import ToggleSwitch from "../components/ToggleSwitch";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";
import RadioButton from "../components/RadioButton";
import { FiTrash2, FiPlus } from "react-icons/fi";

export interface MasterChecklistFormData {
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

export interface MasterChecklistFormHandle {
  getPayload: () => MasterChecklistFormData | null;
  resetForm: () => void;
}

interface MasterChecklistFormProps {
  initialData?: Partial<MasterChecklistFormData>;
  onSubmit?: (data: MasterChecklistFormData) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const MasterChecklistForm = forwardRef<MasterChecklistFormHandle, MasterChecklistFormProps>(
  ({ initialData, onSubmit, onCancel, onDelete }, ref) => {
    const [activityName, setActivityName] = useState(initialData?.activityName || "");
    const [numAssociations, setNumAssociations] = useState<number>(initialData?.numAssociations || 0);
    const [task, setTask] = useState(initialData?.task || "");
    const [taskAssignedTo, setTaskAssignedTo] = useState(initialData?.taskAssignedTo || "");
    const [createdOn, setCreatedOn] = useState(initialData?.createdOn || "");
    const [active, setActive] = useState(initialData?.active ?? true);
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
    const [level, setLevel] = useState("Checklist Level");

    const getPayload = (): MasterChecklistFormData | null => {
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
      setLevel("Checklist Level");
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
          <div className="flex flex-row justify-between mb-6 w-full">
            <div className="flex items-center gap-2">
              <span className="font-medium">Create Task:</span>
              <ToggleSwitch isOn={createTask} handleToggle={() => setCreateTask(!createTask)} />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Weightage:</span>
              <ToggleSwitch isOn={weightage} handleToggle={() => setWeightage(!weightage)} />
            </div>
          </div>
          <div className="mb-4 flex flex-row items-center gap-6">
            <RadioButton
              name="level"
              options={["Checklist Level", "Question Level"]}
              value={level}
              onChange={e => setLevel(e.target.value)}
              layout="vertical"
            />
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
                <Select
                  label="Group"
                  name="group"
                  options={['Group 1', 'Group 2', 'Group 3']}
                  value={group}
                  onChange={e => setGroup(e.target.value)}
                />
                <Select
                  label="Subgroup"
                  name="subgroup"
                  options={['Subgroup 1', 'Subgroup 2', 'Subgroup 3']}
                  value={subgroup}
                  onChange={e => setSubgroup(e.target.value)}
                />
              </div>
            </div>
            {/* New black border section with selects and checkboxes */}
            <div className="border border-black rounded p-4 flex flex-col md:flex-row md:items-center md:gap-6 mt-6">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Task"
                  name="task"
                  options={['Task 1', 'Task 2', 'Task 3']}
                  value={task}
                  onChange={e => setTask(e.target.value)}
                />
                <Select
                  label="Input Type"
                  name="inputType"
                  options={['Input 1', 'Input 2', 'Input 3']}
                  value={inputType}
                  onChange={e => setInputType(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-4 items-center justify-center mt-4 md:mt-0">
                <Checkbox label="Mandatory" name="mandatory" checked={mandatory} onChange={() => setMandatory(!mandatory)} />
                <Checkbox label="Reading" name="reading" checked={reading} onChange={() => setReading(!reading)} />
                <Checkbox label="Helptext" name="helptext" checked={helptext} onChange={() => setHelptext(!helptext)} />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="flex items-center px-4 py-2 bg-[#7991BB] text-white rounded cursor-pointer"
                onClick={() => { /* Add question logic here */ }}
              >
                Add Question
              </button>
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
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-[#7991BB] text-white rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
);

export default MasterChecklistForm;
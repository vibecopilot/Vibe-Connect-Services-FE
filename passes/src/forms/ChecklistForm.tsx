import { forwardRef, useImperativeHandle, useState } from "react";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";
import TextInput from "../components/TextInput";

export interface ChecklistFormHandle {
  getPayload: () => {
    name: string;
    frequency: string;
    priorityLevel: string;
    startDate: string;
    endDate: string;
    optionType: string[];
  } | null;
}

interface ChecklistFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ChecklistForm = forwardRef<ChecklistFormHandle, ChecklistFormProps>(
  ({ onSubmit, onCancel }, ref) => {
    const [name, setName] = useState("");
    const [frequency, setFrequency] = useState("");
    const [priorityLevel, setPriorityLevel] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [optionType, setOptionType] = useState<string[]>([]);
    const [questionName, setQuestionName] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedAnswerType, setSelectedAnswerType] = useState("");

    const [allowedDay, setAllowedDay] = useState("");
    const [allowedHours, setAllowedHours] = useState("");
    const [allowedMinutes, setAllowedMinutes] = useState("");
    const [extensionDay, setExtensionDay] = useState("");
    const [extensionHours, setExtensionHours] = useState("");
    const [extensionMinutes, setExtensionMinutes] = useState("");
    const [lockOverdueGroup, setLockOverdueGroup] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [supplier, setSupplier] = useState("");
    const [cronFrequency, setCronFrequency] = useState("Day");
    const [cronHour, setCronHour] = useState("0");
    const [cronMinute, setCronMinute] = useState("0");

    const groupOptions = [
      { label: "Select Group", value: "Safety" },
      { label: "Maintenance", value: "Maintenance" },
      { label: "Operations", value: "Operations" }
    ];

    const supervisorOptions = [
      { label: "Select Supervisor", value: "" },
      { label: "Supervisor A", value: "Supervisor A" },
      { label: "Supervisor B", value: "Supervisor B" }
    ];

    const supplierOptions = [
      { label: "Select Supplier", value: "" },
      { label: "Supplier X", value: "Supplier X" },
      { label: "Supplier Y", value: "Supplier Y" }
    ];

    const answerTypeOptions = [
      { label: "Select Answer Type", value: "" },
      { label: "Checkbox", value: "Checkbox" },
      { label: "Radio", value: "Radio" }
    ];

    const cronFrequencyOptions = [
      { label: "Day", value: "Day" },
      { label: "Week", value: "Week" }
    ];

    const cronHourOptions = Array.from({ length: 14 }, (_, i) => ({
      label: `${i}`, value: `${i}`
    }));

    const cronMinuteOptions = Array.from({ length: 60 }, (_, i) => ({
      label: `${i}`, value: `${i}`
    }));

    const handleOptionTypeChange = (checked: boolean, value: string) => {
      setOptionType((prev) =>
        checked ? [...prev, value] : prev.filter((opt) => opt !== value)
      );
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        name,
        frequency,
        priorityLevel,
        startDate,
        endDate,
        optionType
      });
    };

    useImperativeHandle(ref, () => ({
      getPayload: () => {
        if (!name.trim()) return null;
        return {
          name: name.trim(),
          frequency,
          priorityLevel,
          startDate,
          endDate,
          optionType
        };
      }
    }));

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields */}
        <div className="grid grid-cols-2 gap-6">
          <TextInput label="Name" required value={name} onChange={(e) => setName(e.target.value)} name="name" />
          <TextInput label="Frequency" required value={frequency} onChange={(e) => setFrequency(e.target.value)} name="frequency" />
          <TextInput label="Start Date" type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} name="startDate" />
          <TextInput label="End Date" type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} name="endDate" />
        </div>

        <div className="w-1/2">
          <TextInput label="Priority Level" value={priorityLevel} onChange={(e) => setPriorityLevel(e.target.value)} name="priorityLevel" />
        </div>

        {/* Group Section */}
        <div className="space-y-2 mt-6">
          <h3>Add New Group</h3>
          <div className="border border-gray-300 p-4 space-y-4 rounded-md">
            <div className="flex gap-4">
              <div className="w-1/4">
                <TextInput label="Enter Question Name" value={questionName} onChange={(e) => setQuestionName(e.target.value)} name="questionName" />
              </div>
              <div className="mt-6 flex flex-1 justify-start gap-9">
              <div className="w-1/4">
                <Select label="" name="selectGroup" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} options={groupOptions} />
              </div>
              <div className="w-1/4">
                <Select label="" name="selectAnswerType" value={selectedAnswerType} onChange={(e) => setSelectedAnswerType(e.target.value)} options={answerTypeOptions} />
              </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {["Mandatory", "Reading", "Help Text"].map((option) => (
                <Checkbox key={option} label={option} name={`optionType-${option}`} checked={optionType.includes(option)} onChange={({ target }) => handleOptionTypeChange(target.checked, option)} />
              ))}
            </div>

            <div className="pt-4">
              <button type="button" onClick={() => console.log("Add question clicked")} className="px-4 py-2 bg-[#7991BB] text-white rounded">Add Question</button>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button type="submit" onClick={() => console.log("Group button clicked")} className="px-6 py-2 text-white bg-[#7991BB] rounded-lg">Add Group</button>
        </div>

        {/* Schedules Section */}
        <h3 className="text-xl mt-10">Schedules</h3>
        <div className="border border-gray-300 p-4 space-y-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Allowed time to submit</label>
              <div className="grid grid-cols-3 gap-4">
                <TextInput placeholder="Day" value={allowedDay} onChange={(e) => setAllowedDay(e.target.value)} name="allowedDay" type="number" />
                <TextInput placeholder="Hours" value={allowedHours} onChange={(e) => setAllowedHours(e.target.value)} name="allowedHours" type="number" />
                <TextInput placeholder="Minutes" value={allowedMinutes} onChange={(e) => setAllowedMinutes(e.target.value)} name="allowedMinutes" type="number" />
              </div>
            </div>

            <div className="w-[350px]">
              <label className="block font-medium mb-2">Supervisor</label>
              <Select
              name="supervisor"
              value={supervisor}
              onChange={(e) => setSupplier(e.target.value)}
              options={supervisorOptions}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Extension Time</label>
              <div className="grid grid-cols-3 gap-4">
                <TextInput placeholder="Day" value={extensionDay} onChange={(e) => setExtensionDay(e.target.value)} name="extensionDay" type="number" />
                <TextInput placeholder="Hours" value={extensionHours} onChange={(e) => setExtensionHours(e.target.value)} name="extensionHours" type="number" />
                <TextInput placeholder="Minutes" value={extensionMinutes} onChange={(e) => setExtensionMinutes(e.target.value)} name="extensionMinutes" type="number" />
              </div>
            </div>

            <div className="w-[350px]">
              <label className="block font-medium mb-2">Supplier</label>
              <Select
              name="supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              options={supplierOptions}
              />
            </div>
          </div>

          <div className="w-[350px]">
            <Select label="Lock Overdue Task" name="lockOverdueTask" value={lockOverdueGroup} onChange={(e) => setLockOverdueGroup(e.target.value)} options={groupOptions} />
          </div>

          <div className="w-[550px]">
            <label className="block font-medium mb-2">Cron Setting</label>
            <div className="flex items-center gap-4 border border-dashed px-3 py-1 rounded-md">
              <span>Every</span>
              <Select name="cronFrequency" value={cronFrequency} onChange={(e) => setCronFrequency(e.target.value)} options={cronFrequencyOptions} />
              <span>at</span>
              <Select name="cronHour" value={cronHour} onChange={(e) => setCronHour(e.target.value)} options={cronHourOptions} />
              <span>:</span>
              <Select name="cronMinute" value={cronMinute} onChange={(e) => setCronMinute(e.target.value)} options={cronMinuteOptions} />
              <button type="button" className="text-white bg-[#7991BB] px-4 py-1 rounded" onClick={() => { setCronFrequency("Day"); setCronHour("0"); setCronMinute("0"); }}>Clear</button>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button type="submit" className="px-6 py-2 text-white bg-[#7991BB] rounded-lg hover:bg-[#6a82b0]">Save</button>
        </div>
      </form>
    );
  }
);

export default ChecklistForm;

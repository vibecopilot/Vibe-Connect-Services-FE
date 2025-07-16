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
import RadioButton from "../components/RadioButton";
import Select from "../components/Select";
import { FiTrash2 } from "react-icons/fi";

// Define the Option type for Select components
interface Option {
  value: string;
  label: string;
}

export interface VendorFormData {
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
  planStart: string;
  planEnd: string;
  emailTriggerRule: string;
  supervisors: string;
  category: string;
  lockOverdueTask: string;
  frequency: string;
  startFrom: string;
  endAt: string;
  selectSupplier: string;
  selectedTemplate?: string;
  assetGroup?: string;
  subGroup?: string;
  selectedPeople?: string;
  taskLevel?: string;
  taskAssignTo?: string;
  taskCategory?: string;
  weightageValue?: string;
  ratingChecked?: boolean;
  additionalTask?: string;
  additionalInputType?: string;
  additionalMandatory?: boolean;
  additionalReading?: boolean;
  additionalHelptext?: boolean;
  option1?: string;
  option2?: string;
  option3?: string;
  option1Select?: string;
  option2Select?: string;
  option3Select?: string;
}

export interface VendorFormHandle {
  getPayload: () => VendorFormData | null;
  resetForm: () => void;
}

interface VendorFormProps {
  initialData?: Partial<VendorFormData>;
  onSubmit?: (data: VendorFormData) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const VendorForm = forwardRef<VendorFormHandle, VendorFormProps>(
  ({ initialData, onSubmit, onCancel, onDelete }, ref) => {
    // State variables
    const [activityName, setActivityName] = useState(initialData?.activityName || "");
    const [numAssociations, setNumAssociations] = useState<number>(initialData?.numAssociations || 0);
    const [task, setTask] = useState(initialData?.task || "");
    const [taskAssignedTo, setTaskAssignedTo] = useState(initialData?.taskAssignedTo || "");
    const [createdOn, setCreatedOn] = useState(initialData?.createdOn || "");
    const [active, setActive] = useState(initialData?.active ?? true);
    const [selectTemplate, setSelectTemplate] = useState(!!initialData?.selectedTemplate);
    const [createTask, setCreateTask] = useState(
      !!(initialData?.taskLevel || initialData?.taskAssignTo || initialData?.taskCategory || initialData?.additionalTask)
    );
    const [weightage, setWeightage] = useState(!!(initialData?.weightageValue || initialData?.ratingChecked));
    const [description, setDescription] = useState(initialData?.description || "");
    const [allowObservations, setAllowObservations] = useState(false);
    const [group, setGroup] = useState("");
    const [assignTo, setAssignTo] = useState("Users");
    const [inputType, setInputType] = useState("");
    const [mandatory, setMandatory] = useState(false);
    const [reading, setReading] = useState(false);
    const [helptext, setHelptext] = useState(false);
    const [checklistType, setChecklistType] = useState("Individual");
    const [scheduleGroup, setScheduleGroup] = useState("");
    const [selectedPeople, setSelectedPeople] = useState(initialData?.selectedPeople || "");
    const [scanType, setScanType] = useState(initialData?.scanType || "");
    const [priority, setPriority] = useState(initialData?.priority || "");
    const [emailTriggerRule, setEmailTriggerRule] = useState(initialData?.emailTriggerRule || "");
    const [supervisors, setSupervisors] = useState(initialData?.supervisors || "");
    const [category, setCategory] = useState(initialData?.category || "");
    const [lockOverdueTask, setLockOverdueTask] = useState(initialData?.lockOverdueTask || "");
    const [frequency, setFrequency] = useState(initialData?.frequency || "");
    const [startFrom, setStartFrom] = useState(initialData?.startFrom || "");
    const [endAt, setEndAt] = useState(initialData?.endAt || "");
    const [selectSupplier, setSelectSupplier] = useState(initialData?.selectSupplier || "");
    const [selectedTemplate, setSelectedTemplate] = useState(initialData?.selectedTemplate || "");
    const [assetGroup, setAssetGroup] = useState(initialData?.assetGroup || "");
    const [subGroup, setSubGroup] = useState(initialData?.subGroup || "");
    
    // New state for plan duration text inputs
    const [planStart, setPlanStart] = useState(initialData?.planStart || "");
    const [planEnd, setPlanEnd] = useState(initialData?.planEnd || "");

    // New state for Create Task section
    const [taskLevel, setTaskLevel] = useState(initialData?.taskLevel || "Checklist Level");
    const [taskAssignTo, setTaskAssignTo] = useState(initialData?.taskAssignTo || "");
    const [taskCategory, setTaskCategory] = useState(initialData?.taskCategory || "");

    // New state for weightage section
    const [weightageValue, setWeightageValue] = useState(initialData?.weightageValue || "");
    const [ratingChecked, setRatingChecked] = useState(initialData?.ratingChecked || false);

    // New state for additional task section
    const [additionalTask, setAdditionalTask] = useState(initialData?.additionalTask || "");
    const [additionalInputType, setAdditionalInputType] = useState(initialData?.additionalInputType || "");
    const [additionalMandatory, setAdditionalMandatory] = useState(initialData?.additionalMandatory || false);
    const [additionalReading, setAdditionalReading] = useState(initialData?.additionalReading || false);
    const [additionalHelptext, setAdditionalHelptext] = useState(initialData?.additionalHelptext || false);
    const [option1, setOption1] = useState(initialData?.option1 || "");
    const [option2, setOption2] = useState(initialData?.option2 || "");
    const [option3, setOption3] = useState(initialData?.option3 || "");
    
    // New states for P/N selects
    const [option1Select, setOption1Select] = useState(initialData?.option1Select || "P");
    const [option2Select, setOption2Select] = useState(initialData?.option2Select || "N");
    const [option3Select, setOption3Select] = useState(initialData?.option3Select || "P");

    // Define options for Select components
    const groupOptions: Option[] = [
      { value: "Group A", label: "Group A" },
      { value: "Group B", label: "Group B" },
      { value: "Group C", label: "Group C" }
    ];
    
    const assignToOptions: Option[] = [
      { value: "Users", label: "Select Assign To" },
      { value: "Select People", label: "Select People" }
    ];
    
    const taskOptions: Option[] = [
      { value: "Task 1", label: "Task 1" },
      { value: "Task 2", label: "Task 2" },
      { value: "Task 3", label: "Task 3" },
      { value: "Task 4", label: "Task 4" }
    ];
    
    const inputTypeOptions: Option[] = [
      { value: "Text", label: "Text" },
      { value: "Number", label: "Number" },
      { value: "Checkbox", label: "Checkbox" },
      { value: "Dropdown", label: "Dropdown" },
      { value: "Date", label: "Date" }
    ];
    
    const scanTypeOptions: Option[] = [
      { value: "Full Scan", label: "Select Scan Type" },
      { value: "Partial Scan", label: "Partial Scan" },
      { value: "Quick Scan", label: "Quick Scan" }
    ];
    
    const priorityOptions: Option[] = [
      { value: "High", label: "Select Priority" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" }
    ];
    
    const emailTriggerOptions: Option[] = [
      { value: "On Failure", label: "Select Email Trigger" },
      { value: "On Success", label: "On Success" },
      { value: "Always", label: "Always" },
      { value: "Never", label: "Never" }
    ];
    
    const supervisorsOptions: Option[] = [
      { value: "John Doe", label: "Select Supervisors" },
      { value: "Jane Smith", label: "Jane Smith" },
      { value: "Mike Johnson", label: "Mike Johnson" }
    ];
    
    const categoryOptions: Option[] = [
      { value: "Maintenance", label: "Select Category" },
      { value: "Inspection", label: "Inspection" },
      { value: "Safety", label: "Safety" },
      { value: "Compliance", label: "Compliance" }
    ];
    
    const lockOptions: Option[] = [
      { value: "Yes", label: "Select Lock Status" },
      { value: "No", label: "No" }
    ];
    
    const frequencyOptions: Option[] = [
      { value: "Once", label: "Select Frequency" },
      { value: "Daily", label: "Daily" },
      { value: "Weekly", label: "Weekly" },
      { value: "Monthly", label: "Monthly" },
      { value: "Custom", label: "Custom" }
    ];
    
    const supplierOptions: Option[] = [
      { value: "Supplier A", label: "Select Supplier" },
      { value: "Supplier B", label: "Supplier B" },
      { value: "Supplier C", label: "Supplier C" }
    ];
    
    const peopleOptions: Option[] = [
      { value: "Person A", label: "Person A" },
      { value: "Person B", label: "Person B" },
      { value: "Person C", label: "Person C" }
    ];

    // New options for Start Form and End At
    const startFormOptions: Option[] = [
      { value: "Immediately", label: "Select Start Date" },
      { value: "Next Week", label: "Next Week" },
      { value: "Next Month", label: "Next Month" },
      { value: "Specific Date", label: "Specific Date" }
    ];
    
    const endAtOptions: Option[] = [
      { value: "1 week", label: "Select End Date" },
      { value: "2 weeks", label: "2 weeks" },
      { value: "1 month", label: "1 month" },
      { value: "3 months", label: "3 months" },
      { value: "6 months", label: "6 months" },
      { value: "1 year", label: "1 year" },
      { value: "Specific Date", label: "Specific Date" }
    ];

    const templateOptions: Option[] = [
      { value: "template1", label: "Select from existing template" },
      { value: "template2", label: "Safety Inspection Template" },
      { value: "template3", label: "Vendor Compliance Template" },
      { value: "template4", label: "Training Checklist Template" },
    ];

    // Asset group options
    const assetGroupOptions: Option[] = [
      { value: "Asset Group 1", label: "Asset Group 1" },
      { value: "Asset Group 2", label: "Asset Group 2" },
      { value: "Asset Group 3", label: "Asset Group 3" }
    ];
    
    const subGroupOptions: Option[] = [
      { value: "Sub Group A", label: "Sub Group A" },
      { value: "Sub Group B", label: "Sub Group B" },
      { value: "Sub Group C", label: "Sub Group C" }
    ];

    // New options for Create Task section
    const taskAssignToOptions: Option[] = [
      { value: "Select Category", label: "Select Category" },
      { value: "User B", label: "User B" },
      { value: "User C", label: "User C" }
    ];
    
    const taskCategoryOptions: Option[] = [
      { value: "Select Assign To", label: "Select Assign To" },
      { value: "Category Y", label: "Category Y" },
      { value: "Category Z", label: "Category Z" }
    ];

    // P/N options for additional task section
    const pnOptions: Option[] = [
      { value: "P", label: "P" },
      { value: "N", label: "N" }
    ];

    // Form logic
    const getPayload = (): VendorFormData | null => {
      if (!activityName.trim()) return null;
      if (!task) return null;
      
      const payload: VendorFormData = {
        activityName: activityName.trim(),
        description,
        numAssociations,
        task,
        taskAssignedTo,
        createdOn,
        active,
        scanType,
        priority,
        planStart,
        planEnd,
        emailTriggerRule,
        supervisors,
        category,
        lockOverdueTask,
        frequency,
        startFrom,
        endAt,
        selectSupplier,
        selectedTemplate: selectTemplate ? selectedTemplate : undefined
      };
      
      // Add asset group specific fields
      if (checklistType === "Asset group") {
        payload.assetGroup = assetGroup;
        payload.subGroup = subGroup;
        payload.selectedPeople = selectedPeople;
      } else {
        payload.scheduleGroup = scheduleGroup;
      }
      
      // Add Create Task section fields if enabled
      if (createTask) {
        payload.taskLevel = taskLevel;
        payload.taskAssignTo = taskAssignTo;
        payload.taskCategory = taskCategory;
      }
      
      // Add weightage fields if enabled
      if (weightage) {
        payload.weightageValue = weightageValue;
        payload.ratingChecked = ratingChecked;
      }
      
      // Add additional task section fields if enabled
      if (createTask) {
        payload.additionalTask = additionalTask;
        payload.additionalInputType = additionalInputType;
        payload.additionalMandatory = additionalMandatory;
        payload.additionalReading = additionalReading;
        payload.additionalHelptext = additionalHelptext;
        payload.option1 = option1;
        payload.option2 = option2;
        payload.option3 = option3;
        payload.option1Select = option1Select;
        payload.option2Select = option2Select;
        payload.option3Select = option3Select;
      }
      
      return payload;
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
      setInputType("");
      setMandatory(false);
      setReading(false);
      setHelptext(false);
      setScheduleGroup("");
      setScanType("");
      setPriority("");
      setPlanStart("");
      setPlanEnd("");
      setEmailTriggerRule("");
      setSupervisors("");
      setCategory("");
      setLockOverdueTask("");
      setFrequency("");
      setStartFrom("");
      setEndAt("");
      setSelectSupplier("");
      setSelectedTemplate("");
      setSelectTemplate(false);
      setAssetGroup("");
      setSubGroup("");
      setSelectedPeople("");
      setTaskLevel("Checklist Level");
      setTaskAssignTo("");
      setTaskCategory("");
      setWeightageValue("");
      setRatingChecked(false);
      setAdditionalTask("");
      setAdditionalInputType("");
      setAdditionalMandatory(false);
      setAdditionalReading(false);
      setAdditionalHelptext(false);
      setOption1("");
      setOption2("");
      setOption3("");
      setOption1Select("P");
      setOption2Select("N");
      setOption3Select("P");
      setCreateTask(false);
      setWeightage(false);
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

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const payload = getPayload();
      if (!payload) {
        if (!activityName.trim()) alert("Activity Name is required");
        if (!task) alert("Task is required");
        return;
      }
      onSubmit?.(payload);
    };

    const handleAddSection = () => {
      console.log("Add Section button clicked");
    };

    const handleTemplateToggle = () => {
      const newValue = !selectTemplate;
      setSelectTemplate(newValue);
      if (!newValue) {
        setSelectedTemplate("");
      }
    };

    return (
      <form className="space-y-6 text-[#5E5E5E]" onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-row gap-6 mb-4 w-full">
            <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-2 justify-start">
              <div className="flex items-center gap-2">
                <span className="">Select Template:</span>
                <ToggleSwitch 
                  isOn={selectTemplate} 
                  handleToggle={handleTemplateToggle} 
                />
              </div>
              
              {selectTemplate && (
                <div className="mt-0 md:mt-5 md:ml-4 flex-1 min-w-[200px]">
                  <Select
                    label=""
                    name="template"
                    options={templateOptions}
                    value={selectedTemplate}
                    onChange={handleChange(setSelectedTemplate)}
                    required={selectTemplate}
                  />
                </div>
              )}
            </div>
            
            <div className="flex-1 flex items-center gap-2 justify-center">
              <span className="">Create Task:</span>
              <ToggleSwitch isOn={createTask} handleToggle={() => setCreateTask(!createTask)} />
            </div>
            
            <div className="flex-1 flex items-center gap-2 justify-end">
              <span className="">Weightage:</span>
              <ToggleSwitch isOn={weightage} handleToggle={() => setWeightage(!weightage)} />
            </div>
          </div>

          {/* CREATE TASK SECTION */}
          {createTask && (
            <div className="mb-6 mt-2">
              <div className="flex justify-center items-center mb-4">
                <RadioButton
                  label=""
                  name="taskLevel"
                  options={["Checklist Level", "Question Level"]}
                  value={taskLevel}
                  onChange={e => setTaskLevel(e.target.value)}
                  layout="vertical"
                />
              </div>
              
              <div className="flex flex-col justify-center items-center"> 
                <Select
                  label=" "
                  name="taskAssignTo"
                  options={taskAssignToOptions}
                  value={taskAssignTo}
                  onChange={handleChange(setTaskAssignTo)}
                />
                <Select
                  label=" "
                  name="taskCategory"
                  options={taskCategoryOptions}
                  value={taskCategory}
                  onChange={handleChange(setTaskCategory)}
                  
                />
              </div>
            </div>
          )}

          <h2 className="text-xl mb-4 text-center bg-gray-100 py-2 rounded">Basic Info</h2>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="mr-4">Schedule For:</span>
              <div className="flex gap-5 flex-wrap">
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Asset</button>
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Services</button>
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Vendor</button>
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Training</button>
                <button type="button" className="px-4 py-1 border rounded bg-white hover:bg-blue-50">Compliance</button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="max-w-6xl">
            <TextInput
              label="Activity Name"
              name="activityName"
              value={activityName}
              onChange={handleChange(setActivityName)}
              required
              placeholder="Activity name"
            />
            </div>
            <div className="max-w-6xl">
            <TextArea
              label="Description"
              name="description"
              value={description}
              onChange={handleChange(setDescription)}
              rows={3}
              required
              placeholder=""
            />
            </div>
            <div>
            <Checkbox
              label="Allow observations"
              name="allowObservations"
              checked={allowObservations}
              onChange={() => setAllowObservations(!allowObservations)}
            />
            </div>
          </div>

          {/* Task Section */}
          <div className="mb-6">
            <h2 className="text-xl mb-4 bg-gray-100 py-2 rounded px-4 text-center">Task</h2>

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
                  label="Group:"
                  name="group"
                  options={groupOptions}
                  value={group}
                  onChange={handleChange(setGroup)}
                />
                <Select
                  label="SubGroup: "
                  name="subGroup"
                  options={assignToOptions}
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                />
                <Select
                  label="Task:"
                  name="task"
                  options={taskOptions}
                  value={task}
                  onChange={handleChange(setTask)}
                  required
                />
                <Select
                  label="Input Type:"
                  name="inputType"
                  options={inputTypeOptions}
                  value={inputType}
                  onChange={handleChange(setInputType)}
                />
                
                {/* WEIGHTAGE FIELDS */}
                {weightage && (
                  <>
                    <div className="flex items-center gap-2">
                      <TextInput
                        type="number"
                        label="Weightage"
                        min={0}
                        value={weightageValue}
                        onChange={(e) => setWeightageValue(e.target.value)}
                        inputClassName="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        label="Rating"
                        name="ratingChecked"
                        checked={ratingChecked}
                        onChange={() => setRatingChecked(!ratingChecked)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex-1 flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
                <Checkbox label="Mandatory" name="mandatory" checked={mandatory} onChange={() => setMandatory(!mandatory)} />
                <Checkbox label="Reading" name="reading" checked={reading} onChange={() => setReading(!reading)} />
                <Checkbox label="Helptext" name="helptext" checked={helptext} onChange={() => setHelptext(!helptext)} />
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <h2 className="text-xl mb-4 bg-gray-100 py-2 rounded px-4 text-center">Schedule</h2>
          <div className="mb-6">
            <div className="flex items-center mb-6">
              <span className="mr-4 min-w-[120px]">Checklist Type:</span>
              <RadioButton
                label=""
                name="checklistType"
                options={["Individual", "Asset group"]}
                value={checklistType}
                onChange={e => setChecklistType(e.target.value)}
                layout="horizontal"
              />
            </div>

            {checklistType === "Individual" ? (
              <div className="space-y-6">
                {/* Asset - Full Width */}
                <div className="grid grid-cols-1">
                  <TextInput
                    label="Asset"
                    name="scheduleGroup"
                    value={scheduleGroup}
                    onChange={handleChange(setScheduleGroup)}
                    inlineLabel
                    inputWidth="650px"
                  />
                </div>

                {/* Assign to and Lock Overdue Task */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Assign to*"
                    name="assignToSchedule"
                    options={assignToOptions}
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                    required
                    inlineLabel
                  />
                  <Select
                    label="Lock Overdue Task"
                    name="lockOverdueTask"
                    options={lockOptions}
                    value={lockOverdueTask}
                    onChange={handleChange(setLockOverdueTask)}
                    inlineLabel
                  />
                </div>

                {/* Scan Type and Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Scan type"
                    name="scanType"
                    options={scanTypeOptions}
                    value={scanType}
                    onChange={handleChange(setScanType)}
                    inlineLabel
                  />
                  <Select
                    label="Frequency"
                    name="frequency"
                    options={frequencyOptions}
                    value={frequency}
                    onChange={handleChange(setFrequency)}
                    inlineLabel
                  />
                </div>

                {/* Plan Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 min-w-[150px]">
                      Plan Duration*
                    </label>
                    <div className="flex gap-3 flex-1">
                      <TextInput
                        name="planStart"
                        value={planStart}
                        onChange={handleChange(setPlanStart)}
                        required
                        placeholder="Select Plan Duration"
                        className="flex-1"
                        label=""
                      />
                      <TextInput
                        name="planEnd"
                        value={planEnd}
                        onChange={handleChange(setPlanEnd)}
                        required
                        placeholder=" "
                        className="flex-1"
                        label=""
                      />
                    </div>
                  </div>
                  <Select
                    label="Start Form*"
                    name="startFrom"
                    options={startFormOptions}
                    value={startFrom}
                    onChange={handleChange(setStartFrom)}
                    required
                    inlineLabel
                  />
                </div>

                {/* Priority and End At */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Priority"
                    name="priority"
                    options={priorityOptions}
                    value={priority}
                    onChange={handleChange(setPriority)}
                    inlineLabel
                  />
                  <Select
                    label="End At*"
                    name="endAt"
                    options={endAtOptions}
                    value={endAt}
                    onChange={handleChange(setEndAt)}
                    required
                    inlineLabel
                  />
                </div>

                {/* Email Trigger Rule and Select Supplier */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Email Trigger Rule"
                    name="emailTriggerRule"
                    options={emailTriggerOptions}
                    value={emailTriggerRule}
                    onChange={handleChange(setEmailTriggerRule)}
                    inlineLabel
                  />
                  <Select
                    label="Select Supplier"
                    name="selectSupplier"
                    options={supplierOptions}
                    value={selectSupplier}
                    onChange={handleChange(setSelectSupplier)}
                    inlineLabel
                  />
                </div>

                {/* Supervisors */}
                <div className="grid grid-cols-1">
                  <Select
                    label="Supervisors"
                    name="supervisors"
                    options={supervisorsOptions}
                    value={supervisors}
                    onChange={handleChange(setSupervisors)}
                    inlineLabel
                    inputWidth="490px"
                  />
                </div>

                {/* Category */}
                <div className="grid grid-cols-1">
                  <Select
                    label="Category"
                    name="category"
                    options={categoryOptions}
                    value={category}
                    onChange={handleChange(setCategory)}
                    inlineLabel
                    inputWidth="490px"
                  />
                </div>
              </div>
            ) : (
              // Asset Group Checklist Type
              <div className="space-y-6">
                {/* Group */}
                <div className="flex items-start gap-4">
                  <label className="text-sm text-gray-700 min-w-[150px] pt-2">
                    Group*
                  </label>
                  <div className="flex-1 grid grid-cols-1 gap-4">
                    <Select
                      name="assetGroup"
                      options={assetGroupOptions}
                      value={assetGroup}
                      onChange={handleChange(setAssetGroup)}
                      placeholder="Select Asset Group"
                      required
                      inputWidth="650px"
                    />
                    <Select
                      name="subGroup"
                      options={subGroupOptions}
                      value={subGroup}
                      onChange={handleChange(setSubGroup)}
                      placeholder="Select Sub Group"
                      required
                      inputWidth="650px"
                    />
                  </div>
                </div>

                {/* Assign to and Select People */}
                <div className="flex items-center gap-4 justify-center ">
                  <label className="text-sm text-gray-700 min-w-[150px] pt-2">
                    Assign to*
                  </label>
                  <div className="flex-1 grid grid-cols-1 gap-4">
                    <Select
                      name="assignToSchedule"
                      options={assignToOptions}
                      value={assignTo}
                      onChange={(e) => setAssignTo(e.target.value)}
                      required
                      inputWidth="570px"
                    />
                    <Select
                      name="selectedPeople"
                      options={peopleOptions}
                      value={selectedPeople}
                      onChange={handleChange(setSelectedPeople)}
                      placeholder="Select People"
                      required
                      inputWidth="570px"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-700 min-w-[150px]">
                    Lock Overdue Task
                  </label>
                  <div className="flex-1">
                    <Select
                      name="lockOverdueTask"
                      options={lockOptions}
                      value={lockOverdueTask}
                      onChange={handleChange(setLockOverdueTask)}
                      inputWidth="568px"
                    />
                  </div>
                </div>
                </div>

                {/* Lock Overdue Task */}
                

                {/* Scan Type and Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 min-w-[150px]">
                      Scan type
                    </label>
                    <div className="flex-1">
                      <Select
                        name="scanType"
                        options={scanTypeOptions}
                        value={scanType}
                        onChange={handleChange(setScanType)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 min-w-[150px]">
                      Frequency
                    </label>
                    <div className="flex-1">
                      <Select
                        name="frequency"
                        options={frequencyOptions}
                        value={frequency}
                        onChange={handleChange(setFrequency)}
                      />
                    </div>
                  </div>
                </div>

                {/* Plan Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 min-w-[150px]">
                      Plan Duration*
                    </label>
                    <div className="flex gap-3 flex-1">
                      <TextInput
                        name="planStart"
                        value={planStart}
                        onChange={handleChange(setPlanStart)}
                        required
                        placeholder="Start date/duration"
                        className="flex-1"
                      />
                      <TextInput
                        name="planEnd"
                        value={planEnd}
                        onChange={handleChange(setPlanEnd)}
                        required
                        placeholder=" "
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 min-w-[150px]">
                      Start Form*
                    </label>
                    <div className="flex-1">
                      <Select
                        name="startFrom"
                        options={startFormOptions}
                        value={startFrom}
                        onChange={handleChange(setStartFrom)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Priority and End At */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 min-w-[150px]">
                      Priority
                    </label>
                    <div className="flex-1">
                      <Select
                        name="priority"
                        options={priorityOptions}
                        value={priority}
                        onChange={handleChange(setPriority)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 min-w-[150px]">
                      End At*
                    </label>
                    <div className="flex-1">
                      <Select
                        name="endAt"
                        options={endAtOptions}
                        value={endAt}
                        onChange={handleChange(setEndAt)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email Trigger Rule and Select Supplier */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 min-w-[150px]">
                      Email Trigger Rule
                    </label>
                    <div className="flex-1">
                      <Select
                        name="emailTriggerRule"
                        options={emailTriggerOptions}
                        value={emailTriggerRule}
                        onChange={handleChange(setEmailTriggerRule)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 min-w-[150px]">
                      Select Supplier
                    </label>
                    <div className="flex-1">
                      <Select
                        name="selectSupplier"
                        options={supplierOptions}
                        value={selectSupplier}
                        onChange={handleChange(setSelectSupplier)}
                      />
                    </div>
                  </div>
                </div>

                {/* Supervisors */}
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-700 min-w-[150px]">
                    Supervisors
                  </label>
                  <div className="flex-1">
                    <Select
                      name="supervisors"
                      options={supervisorsOptions}
                      value={supervisors}
                      onChange={handleChange(setSupervisors)}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-700 min-w-[150px]">
                    Category
                  </label>
                  <div className="flex-1">
                    <Select
                      name="category"
                      options={categoryOptions}
                      value={category}
                      onChange={handleChange(setCategory)}
                    />
                  </div>
                </div>
              </div>
            )}
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

        {/* Form footer */}
        <div className="flex justify-center pt-2 space-x-3">
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

export default VendorForm;
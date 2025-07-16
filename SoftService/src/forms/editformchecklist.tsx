import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import DatePicker from '../components/DatePicker';
import { FiUpload } from 'react-icons/fi';
import Tabs from '../components/Tabs';

const EditFormChecklist = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State to hold form data, will be populated from fetched data
  const [formData, setFormData] = useState({
    name: '',
    frequency: '',
    startDate: '',
    endDate: '',
    priorityLevel: '',
    serviceSubGroups: '',
    supervisors: '',
    supplier: '',
    group: '',
    answerType: '',
    lockOverdueTask: '',
    cronFrequency: '',
    cronHour: '',
    cronMinute: '',
  });

  // State for the "Add New Group" section
  const [questionName, setQuestionName] = useState('');
  const [questionGroup, setQuestionGroup] = useState('');
  const [questionAnswerType, setQuestionAnswerType] = useState('');
  const [mandatory, setMandatory] = useState(false);
  const [reading, setReading] = useState(false);
  const [helpText, setHelpText] = useState(false);
  const [questionDescription, setQuestionDescription] = useState('');
  const [multipleChoiceType, setMultipleChoiceType] = useState('');

  // Removed state and handlers for internal tabs (activeFormTab, setActiveFormTab, formTabs, handleFormTabChange)

  useEffect(() => {
    console.log(`Fetching checklist data for ID: ${id}`);
    // Simulate fetching data
    setFormData({
      name: 'Master Test Checklist',
      frequency: 'Daily',
      startDate: '26/11/2024',
      endDate: '26/11/2024',
      priorityLevel: 'High',
      serviceSubGroups: '',
      supervisors: '',
      supplier: 'Vibe',
      group: '',
      answerType: '',
      lockOverdueTask: '',
      cronFrequency: 'Day',
      cronHour: '0',
      cronMinute: '00',
    });
    setQuestionName('Technical');
    setQuestionGroup('Group1');
    setQuestionAnswerType('Input Box');
    setMandatory(true);
    setReading(false);
    setHelpText(false);
    setQuestionDescription('This is Question No 1');
    setMultipleChoiceType('');

  }, [id]);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Handle input change for formData fields
    if (e.target.name in formData) {
        handleChange(e.target.name, e.target.value);
    } else {
        // Handle other input changes like question description if needed separately
        setQuestionDescription(e.target.value);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
     // Handle select change for formData fields
     if (e.target.name in formData) {
         handleChange(e.target.name, e.target.value);
     } else {
         // Handle other select changes like question group, answer type, multiple choice type
         if (e.target.name === 'questionGroup') {
             setQuestionGroup(e.target.value);
         } else if (e.target.name === 'questionAnswerType') {
             setQuestionAnswerType(e.target.value);
         } else if (e.target.name === 'multipleChoiceType') {
             setMultipleChoiceType(e.target.value);
         }
     }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name || 'date', e.target.value);
  };

  // Specific handlers for question section inputs
  const handleQuestionNameChange = (e: ChangeEvent<HTMLInputElement>) => setQuestionName(e.target.value);
  // handleQuestionGroupChange, handleQuestionAnswerTypeChange are now handled in handleSelectChange
  const handleMandatoryChange = (e: { target: { name: string; value: boolean } }) => setMandatory(e.target.value);
  const handleReadingChange = (e: { target: { name: string; value: boolean } }) => setReading(e.target.value);
  const handleHelpTextChange = (e: { target: { name: string; value: boolean } }) => setHelpText(e.target.value);
  // handleQuestionDescriptionChange is now handled in handleInputChange
  // handleMultipleChoiceTypeChange is now handled in handleSelectChange

  const handleSave = () => {
    console.log(`Saving checklist data for ID ${id}:`, { formData, questionName, questionGroup, questionAnswerType, mandatory, reading, helpText, questionDescription, multipleChoiceType });
    navigate('/softservice?tab=Checklist');
  };

  // Placeholder tabs for the main application wrapper (keeping this structure)
  const mainAppTabs = [
    { key: 'Service', label: 'Service' },
    { key: 'Checklist', label: 'Checklist' },
    { key: 'Task', label: 'Task' },
  ];
  // Assuming 'Checklist' is the active tab when viewing/editing a checklist
  const activeMainAppTab = 'Checklist';

  return (
    <div className="p-6 bg-white rounded-md shadow-md w-full" style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }} >
       {/* Rendering the main application tabs structure */}
       <Tabs activeTab={activeMainAppTab} onTabChange={()=>{}} tabs={mainAppTabs} /> {/* onTabChange is a no-op here as navigation is handled by routes */}

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
        <TextInput label="Name:" value={formData.name} onChange={handleInputChange} name="name" />
        <TextInput label="Frequency:" value={formData.frequency} onChange={handleInputChange} name="frequency" />
        <DatePicker label="Start Date:" value={formData.startDate} onChange={handleDateChange} name="startDate" />
        <DatePicker label="End Date:" value={formData.endDate} onChange={handleDateChange} name="endDate" />
        <TextInput label="Priority Level:" value={formData.priorityLevel} onChange={handleInputChange} name="priorityLevel" />
        <TextInput label="Service Sub Groups:" value={formData.serviceSubGroups} onChange={handleInputChange} name="serviceSubGroups" />
      </div>

      {/* Add New Group (Questions) Section */}
        <p className="text-sm font-medium mb-4 text-left">Add New Group</p>
      <div className="border rounded-md p-4 mb-6 text-left">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <TextInput
            label="Enter Question Name"
            value={questionName}
            onChange={handleQuestionNameChange}
            name="questionName"
          />
          <Select
            label="Group"
            placeholder="Group1"
            options={['Group1', 'Group B']}
            value={questionGroup}
            onChange={handleSelectChange}
            name="questionGroup"
          />
          <Select
            label="Answer Type"
            placeholder="Input Box"
            options={['Input Box', 'Yes/No', 'Option']}
            value={questionAnswerType}
            onChange={handleSelectChange}
            name="questionAnswerType"
          />
        </div>

        <div className="flex gap-4 mb-4 items-center text-left">
           <Checkbox label="Mandatory" checked={mandatory} onChange={handleMandatoryChange} name="mandatory" />
           <Checkbox label="Reading" checked={reading} onChange={handleReadingChange} name="reading" />
           <Checkbox label="Help Text" checked={helpText} onChange={handleHelpTextChange} name="helpText" />
        </div>

        <div className="flex gap-4 mb-4 items-center">
           <TextInput
              label=""
              value={questionDescription}
              onChange={handleInputChange} // Using general input handler
              name="questionDescription"
              className="flex-1"
           />
           <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded p-2 text-gray-500 cursor-pointer h-full">
              <FiUpload className="text-xl mb-1" />
              <span className="text-sm">Click to Upload</span>
           </div>
        </div>

        <div className="mb-4">
           <Select
              label=""
              placeholder="Multiple Choice Question"
              options={['Option 1', 'Option 2']}
              value={multipleChoiceType}
              onChange={handleSelectChange} // Using general select handler
              name="multipleChoiceType"
           />
           <div className="flex flex-wrap gap-4 mt-4 items-center">
              <div className="flex items-center gap-2">
                <TextInput label="" value="" onChange={()=>{}} name="mc-started" className="w-24" />
                <Select label="" options={['P', 'N']} value="P" onChange={()=>{}} name="mc-started-select" />
              </div>
               <div className="flex items-center gap-2">
                <TextInput label="" value="" onChange={()=>{}} name="mc-yes" className="w-24" />
                <Select label="" options={['P', 'N']} value="P" onChange={()=>{}} name="mc-yes-select" />
              </div>
               <div className="flex items-center gap-2">
                <TextInput label="" value="" onChange={()=>{}} name="mc-wip" className="w-24" />
                <Select label="" options={['P', 'N']} value="P" onChange={()=>{}} name="mc-wip-select" />
              </div>
                <div className="flex items-center gap-2">
                <TextInput label="" value="" onChange={()=>{}} name="mc-no" className="w-24" />
                <Select label="" options={['P', 'N']} value="N" onChange={()=>{}} name="mc-no-select" />
              </div>
           </div>
        </div>

        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
          Add Question
        </button>
      </div>

      {/* Schedules Section */}
        <h3 className="text-lg font-medium mb-4 text-left">Schedules</h3>
      <div className="border rounded-md p-4 mb-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="text-sm mb-2">Allowed time to submit</p>
            <div className="grid grid-cols-3 gap-2">
              <TextInput label="Hours" value="" onChange={()=>{}} name="hours" />
              <TextInput label="Minutes" value="" onChange={()=>{}} name="minutes" />
              <TextInput label="Seconds" value="" onChange={()=>{}} name="seconds" />
            </div>
          </div>
          <TextInput label="Supervisors" value={formData.supervisors} onChange={handleInputChange} name="supervisors" />
          <div>
            <p className="text-sm mb-2">Extension Time</p>
            <div className="grid grid-cols-3 gap-2">
              <TextInput label="Hours" value="" onChange={()=>{}} name="extHours" />
              <TextInput label="Minutes" value="" onChange={()=>{}} name="extMinutes" />
              <TextInput label="Seconds" value="" onChange={()=>{}} name="extSeconds" />
            </div>
          </div>
          <TextInput label="Supplier" value={formData.supplier} onChange={handleInputChange} name="supplier" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
           <Select label="Lock Overdue Task" placeholder="Select Group" options={['Group A', 'Group B']} value={formData.lockOverdueTask} onChange={handleSelectChange} name="lockOverdueTask" />
        </div>

        <div className="border p-4 rounded-md border-dashed border-gray-300 mb-4">
          <p className="text-sm font-medium mb-2">Cron Setting</p>
          <div className="flex flex-wrap gap-2 items-center">
            <span>Every</span>
            <Select options={['Day', 'Week', 'Month']} value={formData.cronFrequency} onChange={handleSelectChange} name="cronFrequency" />
            <span>at</span>
            <Select options={Array.from({ length: 24 }, (_, i) => String(i))} value={formData.cronHour} onChange={handleSelectChange} name="cronHour" />
            <span>:</span>
            <Select options={['00', '15', '30', '45']} value={formData.cronMinute} onChange={handleSelectChange} name="cronMinute" />
            <button className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition">
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-lg transition"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFormChecklist;

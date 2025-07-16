import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import DatePicker from '../components/DatePicker';
import { FiUpload } from 'react-icons/fi';
import TopSearch from '../components/TopSearch';

const ChecklistForm = () => {
  const navigate = useNavigate();
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

  const [questionName, setQuestionName] = useState('');
  const [questionGroup, setQuestionGroup] = useState('');
  const [questionAnswerType, setQuestionAnswerType] = useState('');
  const [mandatory, setMandatory] = useState(false);
  const [reading, setReading] = useState(false);
  const [helpText, setHelpText] = useState(false);
  const [questionDescription, setQuestionDescription] = useState('');
  const [multipleChoiceType, setMultipleChoiceType] = useState('');
  const [showFilterRow, setShowFilterRow] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name || 'date', e.target.value);
  };

  const handleQuestionNameChange = (e: ChangeEvent<HTMLInputElement>) => setQuestionName(e.target.value);
  const handleQuestionGroupChange = (e: ChangeEvent<HTMLSelectElement>) => setQuestionGroup(e.target.value);
  const handleQuestionAnswerTypeChange = (e: ChangeEvent<HTMLSelectElement>) => setQuestionAnswerType(e.target.value);
  const handleMandatoryChange = (e: { target: { name: string; value: boolean } }) => setMandatory(e.target.value);
  const handleReadingChange = (e: { target: { name: string; value: boolean } }) => setReading(e.target.value);
  const handleHelpTextChange = (e: { target: { name: string; value: boolean } }) => setHelpText(e.target.value);
  const handleQuestionDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setQuestionDescription(e.target.value);
  const handleMultipleChoiceTypeChange = (e: ChangeEvent<HTMLSelectElement>) => setMultipleChoiceType(e.target.value);

  return (
    <>
      {/* Tabs (Service, Checklist, and Task) */}
      <div className="flex gap-6 border-b pb-2 mb-4 text-blue-700 font-medium" style={{ fontFamily: "'PT Sans', sans-serif",color: 'gray' }}>
        <span className="cursor-pointer text-gray-400">Service</span>
        <span className="cursor-pointer border-b-2 border-blue-700 pb-1">Checklist</span>
        <span className="cursor-pointer text-gray-400">Task</span>
      </div>

      <div className="p-6 bg-white rounded-md shadow-md w-full" style={{ fontFamily: "'PT Sans', sans-serif" }}>
        {/* Main Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-6 text-left w-290">
          <TextInput  label="Name:" value={formData.name} onChange={handleInputChange} name="name" />
          <TextInput  label="Frequency:" value={formData.frequency} onChange={handleInputChange} name="frequency" />
          <DatePicker label="Start Date:" value={formData.startDate} onChange={handleDateChange} name="startDate" />
          <DatePicker  label="End Date:" value={formData.endDate} onChange={handleDateChange} name="endDate" />
          <TextInput label="Priority Level:" value={formData.priorityLevel} onChange={handleInputChange} name="priorityLevel" />
          <TextInput label="Service Sub Groups:" value={formData.serviceSubGroups} onChange={handleInputChange} name="serviceSubGroups" />
        </div>

        {/* Add New Group Section - Updated */}
          <p className="text-sm font-medium mb-4 text-left">Add New Group</p>
        <div className="border rounded-md p-4 mb-6 text-left">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <TextInput
              label="Enter Question Name"
              placeholder="Technical"
              value={questionName}
              onChange={handleQuestionNameChange}
              name="questionName"
            />
            <Select
              label="Group"
              placeholder="Group1"
              options={['Group1', 'Group B']}
              value={questionGroup}
              onChange={handleQuestionGroupChange}
              name="questionGroup"
            />
            <Select
              label="Answer Type"
              placeholder="Input Box"
              options={['Input Box', 'Yes/No', 'Option']}
              value={questionAnswerType}
              onChange={handleQuestionAnswerTypeChange}
              name="questionAnswerType"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-start">
            <div className="flex gap-4">
              <Checkbox label="Mandatory" checked={mandatory} onChange={handleMandatoryChange} name="mandatory" />
              <Checkbox label="Reading" checked={reading} onChange={handleReadingChange} name="reading" />
              <Checkbox label="Help Text" checked={helpText} onChange={handleHelpTextChange} name="helpText" />
            </div>

            <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded p-4 text-gray-500 cursor-pointer">
              <FiUpload className="text-2xl mb-1" />
              <span>Click to Upload</span>
            </div>
          </div>

          <div className="mb-4">
            <TextInput
              label=""
              placeholder="This is Question No 1"
              value={questionDescription}
              onChange={handleQuestionDescriptionChange}
              name="questionDescription"
            />
          </div>

          <div className="mb-4">
            <Select
              label=""
              placeholder="Multiple Choice Question"
              options={['Option 1', 'Option 2']}
              value={multipleChoiceType}
              onChange={handleMultipleChoiceTypeChange}
              name="multipleChoiceType"
            />
            <div className="flex flex-wrap gap-4 mt-4 items-center ">
              <div className="flex items-center gap-2">
                <TextInput label="" placeholder="Started" value="" onChange={()=>{}} name="mc-started" className="w-24" />
                <Select label="" options={['P', 'N']} value="P" onChange={()=>{}} name="mc-started-select" />
              </div>
              <div className="flex items-center gap-2">
                <TextInput label="" placeholder="Yes" value="" onChange={()=>{}} name="mc-yes" className="w-24" />
                <Select label="" options={['P', 'N']} value="P" onChange={()=>{}} name="mc-yes-select" />
              </div>
              <div className="flex items-center gap-2">
                <TextInput label="" placeholder="Work In Progress" value="" onChange={()=>{}} name="mc-wip" className="w-24" />
                <Select label="" options={['P', 'N']} value="P" onChange={()=>{}} name="mc-wip-select" />
              </div>
              <div className="flex items-center gap-2">
                <TextInput label="" placeholder="No" value="" onChange={()=>{}} name="mc-no" className="w-24" />
                <Select label="" options={['P', 'N']} value="N" onChange={()=>{}} name="mc-no-select" />
              </div>
            </div>
          </div>

          <button className="bg-[#7991BB] text-white px-4 py-1 rounded hover:bg-[#5e6e99] transition">
            Add Question
          </button>
        </div>
        <div className=" p-4 mb-6 text-left">
        <button className="bg-[#7991BB] text-white px-4 py-1 rounded mb-6 hover:bg-[#5e6e99] transition ">
          Add Group
        </button>
        </div>
        {/* Schedule Section */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-left">Schedules</h3>
          <div className="border rounded-md p-4 mb-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 items-start">
              
              {/* Allowed Time to Submit */}
              <div>
                <p className="text-sm mb-2">Allowed time to submit</p>
                <div className="grid grid-cols-3 gap-2">
                  <TextInput label="Hours" value="" onChange={handleInputChange} name="hours" />
                  <TextInput label="Minutes" value="" onChange={handleInputChange} name="minutes" />
                  <TextInput label="Seconds" value="" onChange={handleInputChange} name="seconds" />
                </div>
              </div>

              {/* Supervisors aligned with Allowed Time */}
              <div className="flex flex-col justify-center h-full pt-6">
                <TextInput label="Supervisors" value={formData.supervisors} onChange={handleInputChange} name="supervisors" />
              </div>

              {/* Extension Time */}
              <div>
                <p className="text-sm mb-2">Extension Time</p>
                <div className="grid grid-cols-3 gap-2">
                  <TextInput label="Hours" value="" onChange={handleInputChange} name="extHours" />
                  <TextInput label="Minutes" value="" onChange={handleInputChange} name="extMinutes" />
                  <TextInput label="Seconds" value="" onChange={handleInputChange} name="extSeconds" />
                </div>
              </div>

              {/* Supplier aligned with Extension Time */}
              <div className="flex flex-col justify-center h-full pt-6">
                <TextInput label="Supplier" value={formData.supplier} onChange={handleInputChange} name="supplier" />
              </div>

            </div>
          </div>
        </div>

        {/* Cron Settings */}
        <div className="border p-4 rounded-md border-dashed border-gray-300 mb-4 text-left">
          <p className="text-sm font-medium mb-2">Cron Setting</p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className='mb-4'>Every</span>
            <Select options={['Day', 'Week', 'Month']} value={formData.cronFrequency} onChange={handleSelectChange} name="cronFrequency" />
            <span className='mb-4'>at</span>
            <Select options={Array.from({ length: 24 }, (_, i) => String(i))} value={formData.cronHour} onChange={handleSelectChange} name="cronHour" />
            <span className='mb-4'>:</span>
            <Select options={['00', '15', '30', '45']} value={formData.cronMinute} onChange={handleSelectChange} name="cronMinute" />
            <button className="bg-red-100 text-red-700 mb-4 px-3 py-1 rounded hover:bg-red-200 transition">
              Clear
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button 
            className="bg-[#7991BB] text-white px-6 py-2 rounded hover:bg-[#5e6e99] text-lg transition"
            onClick={() => navigate('/softservice?tab=Checklist')}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ChecklistForm;

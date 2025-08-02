import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import { FiUpload } from 'react-icons/fi'; // Assuming FiUpload is used for the upload icon

const ViewFormChecklist = () => {
  const [questionName, setQuestionName] = useState('');
  const [group, setGroup] = useState('');
  const [answerType, setAnswerType] = useState('');
  const [mandatory, setMandatory] = useState(false);
  const [reading, setReading] = useState(false);
  const [helpText, setHelpText] = useState(false);
  const [questionDescription, setQuestionDescription] = useState('');
  const [multipleChoiceType, setMultipleChoiceType] = useState('');
  // State for multiple choice options would go here

  return (
    <div style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }} >

      <p className="text-sm font-medium mb-4 text-left">Add New Group</p>
 
    <div className="p-4 border rounded-md mb-6 text-left"> {/* Container for the section */}

      {/* Top row of inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-left">
        <TextInput
          label="Enter Question Name"
          value={questionName}
          onChange={(e) => setQuestionName(e.target.value)}
          name="questionName"
        />
        <Select
          label="Group"
          placeholder="Group1" // Using placeholder as label in image
          options={['Group1', 'Group B']} // Example options
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          name="group"
        />
        <Select
          label="Answer Type"
          placeholder="Input Box" // Using placeholder as label in image
          options={['Input Box', 'Yes/No', 'Option']} // Example options
          value={answerType}
          onChange={(e) => setAnswerType(e.target.value)}
          name="answerType"
        />
      </div>

      {/* Checkboxes and upload area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-start text-left">
         <div className="flex gap-4">
            <Checkbox label="Mandatory" checked={mandatory} onChange={() => setMandatory(!mandatory)} name="mandatory" />
            <Checkbox label="Reading" checked={reading} onChange={() => setReading(!reading)} name="reading" />
            <Checkbox label="Help Text" checked={helpText} onChange={() => setHelpText(!helpText)} name="helpText" />
         </div>

         {/* File upload placeholder */}
         <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded p-4 text-gray-500 cursor-pointer">
            <FiUpload className="text-2xl mb-1" />
            <span>Click to Upload</span>
         </div>
      </div>

      {/* Question description input */}
       <div className="mb-4">
           <TextInput
              label=""
              placeholder="This is Question No 1" // Using placeholder as label in image
              value={questionDescription}
              onChange={(e) => setQuestionDescription(e.target.value)}
              name="questionDescription"
           />
       </div>

      {/* Multiple choice section */}
      <div className="mb-4">
         <Select
            label=""
            placeholder="Multiple Choice Question" // Using placeholder as label in image
            options={['Option 1', 'Option 2']} // Example options
            value={multipleChoiceType}
            onChange={(e) => setMultipleChoiceType(e.target.value)}
            name="multipleChoiceType"
         />
         <div className="flex flex-wrap gap-4 mt-4 items-center text-left">
            {/* Example multiple choice inputs - repeat as needed */}
            <div className="flex items-center gap-2 text-left">
              <TextInput label="" placeholder="Started" value="" onChange={()=>{}} name="mc-started" className="w-24" />
              <Select label="" options={['P', 'N']} value="P" onChange={()=>{}} name="mc-started-select" />
            </div>
             <div className="flex items-center gap-2 text-left">
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

      {/* Add Question Button */}
      <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
        Add Question
      </button>
    </div>
       </div>
  );
};

export default ViewFormChecklist;

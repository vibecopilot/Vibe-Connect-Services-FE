import React, { useState, useRef } from 'react';
import Select from '../components/Select';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import ToggleSwitch from '../components/ToggleSwitch';
import FitoutChecklist from '../tabs/Fitoutchecklist'; 

import { FiPlus } from 'react-icons/fi';

interface AddChecklistProps {
  onBack: () => void;
  onCreated: () => void; // <-- add this prop
}

const AddChecklist: React.FC<AddChecklistProps> = ({ onBack, onCreated }) => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [title, setTitle] = useState('');
  const [addQuestionNum, setAddQuestionNum] = useState('01');
  const [questionNum, setQuestionNum] = useState(1);
  const [newQuestion, setNewQuestion] = useState('');
  const [answerType, setAnswerType] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const [showChecklist, setShowChecklist] = useState(false);


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // ... your form submission logic ...
    // After successful creation:
    onCreated();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
<Select
  label="Category:"
  name="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  options={[
    'Civil',
    'Flooring',
    'Door Shutter & Frame',
    'Window Frames/Glass',
    'Wall Dado Tile',
  ]}
  placeholder="Select Category"
/>
<Select
  label="Sub-Category:"
  name="subcategory"
  value={subCategory}
  onChange={(e) => setSubCategory(e.target.value)}
  options={[
    'Finishes',
    'Flooring',
    'Door Shutter & Frame',
    'Window Frame/Glass',
    'Wall Dado Tile', // fixed spelling
  ]}
  placeholder="Select Sub-Category"
/>
        <TextInput label="Title of the Checklist:" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Select label="Add No. of Question" name="add-q-num" value={addQuestionNum} onChange={(e) => setAddQuestionNum(e.target.value)} options={['01', '02', '03']} />
        <div className="flex items-end">
          <p className="text-2xl font-bold mr-4">→</p>
          <TextInput name="q-num" label="No. of Question" value={String(questionNum)} onChange={(e) => setQuestionNum(Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">New Question</h3>
          <TextInput name="new-question" label="" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Enter your question" />
          <div className="mt-4">
            <Select label="Select Answer Type" name="answer-type" value={answerType} onChange={(e) => setAnswerType(e.target.value)} options={[]} placeholder="Choose Answer Type" />
          </div>
          <div className="flex items-center mt-4">
            <span className="mr-4 text-gray-700">Mandatory</span>
            <ToggleSwitch checked={isMandatory} onChange={setIsMandatory} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <label htmlFor="file-upload" className="w-full h-48 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100">
            {selectedFile ? (
              <span className="text-sm text-gray-600 p-2 text-center">{selectedFile.name}</span>
            ) : (
              <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                <FiPlus size={32} className="text-gray-500" />
              </div>
            )}
          </label>
          <input id="file-upload" type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
<Button
  label="Create Checklist"
  variant="solid"
  className="bg-[#7991BB] hover:bg-[#6f84ad] text-white"
  onClick={handleSubmit} 
/>

        <Button label="Proceed" variant="outline" />
        {onBack && <Button label="Back" variant="gray-outline" onClick={onBack} />}
      </div>
    </div>
  );
};

export default AddChecklist;

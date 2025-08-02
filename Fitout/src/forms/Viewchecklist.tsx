import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import ToggleSwitch from '../components/ToggleSwitch';
import Button from '../components/Button';

const ViewChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState({
    title: '148',
    category: 'A',
    subCategory: '1000',
    numberOfQuestions: 2,
    status: true,
    questions: [
      {
        id: 1,
        text: 'Demo Question 1',
        answerType: 'Multiple Choice',
        mandatory: true,
        options: ['Yes', 'No'],
      },
      {
        id: 2,
        text: 'Demo Question 2',
        answerType: 'Multiple Choice',
        mandatory: true,
        options: ['Yes', 'No'],
      },
    ],
  });

  // Toggle status for the checklist
  const handleStatusToggle = (value: boolean) => {
    setChecklist((prev) => ({ ...prev, status: value }));
  };

  // Toggle mandatory for a specific question
  const handleMandatoryToggle = (id: number, value: boolean) => {
    setChecklist((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, mandatory: value } : q
      ),
    }));
  };

  return (
    <div className="p-6">
      {/* <h2 className="text-xl font-semibold mb-4">Fitout Checklists</h2> */}

      <div className="grid grid-cols-4 gap-4 bg-white p-4 rounded shadow">
        <TextInput label="Title of the Checklist:" value={checklist.title} onChange={() => {}} name="title" />
        <TextInput label="Category:" value={checklist.category} onChange={() => {}} name="category" />
        <TextInput label="Sub Category:" value={checklist.subCategory} onChange={() => {}} name="subCategory" />
        <TextInput label="No. Of Question:" value={String(checklist.numberOfQuestions)} onChange={() => {}} name="numberOfQuestions" />

        <div className="col-span-4 flex items-center gap-2 mt-2">
          <label className="font-medium">Status:</label>
          <ToggleSwitch checked={checklist.status} onChange={handleStatusToggle} />
        </div>
      </div>

      <div className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-semibold flex justify-center items-center">
        Association:
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {checklist.questions.map((q) => (
          <div key={q.id} className="bg-gray-100 p-4 rounded shadow">
            <TextInput label={`Question ${q.id}`} value={q.text} onChange={() => {}} name={`question_${q.id}`} />
            <TextInput label="Answer Type" value={q.answerType} onChange={() => {}} name={`answerType_${q.id}`} />

            <div className="flex items-center gap-2 mt-2">
              <label className="font-medium">Mandatory:</label>
              <ToggleSwitch
                checked={q.mandatory}
                onChange={(val) => handleMandatoryToggle(q.id, val)}
              />
            </div>

            <div className="mt-2 flex gap-2">
              {q.options.map((opt, idx) => (
                <TextInput
                  key={idx}
                  label={`Option ${idx + 1}`}
                  value={opt}
                  onChange={() => {}}
                  name={`option_${q.id}_${idx}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button label="Edit Checklist" />
      </div>
    </div>
  );
};

export default ViewChecklist;

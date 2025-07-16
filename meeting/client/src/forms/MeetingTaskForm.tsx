import React, { useState, forwardRef, useImperativeHandle } from 'react';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import FileUpload from '../components/FileUpload';
import ToggleSwitch from '../components/ToggleSwitch';

// Interface defining the structure of the form data
export interface MeetingTaskFormData {
  topic: string;
  description: string;
  assignee: string;
  dueDate: string;
  urgent: boolean;
  files: FileList | null;
}

// Interface defining the methods exposed by the form component via ref
export interface MeetingTaskFormHandle {
  getPayload: () => MeetingTaskFormData | null;
  resetForm: () => void;
}

// Interface defining the props for the MeetingTaskForm component
interface MeetingTaskFormProps {
  initialTopic?: string;
  onSubmit?: (data: MeetingTaskFormData) => void;
  taskMode: 'setTask' | 'assignTask';
  onTaskModeChange: (mode: 'setTask' | 'assignTask') => void;
}

// The MeetingTaskForm component, wrapped in forwardRef to expose methods via ref
const MeetingTaskForm = forwardRef<MeetingTaskFormHandle, MeetingTaskFormProps>(
  ({ initialTopic = "", onSubmit, taskMode, onTaskModeChange }, ref) => {
    // State management for all form fields
    const [topic, setTopic] = useState(initialTopic);
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);

    // Function to get the form data, returns null if required fields are empty
    const getPayload = (): MeetingTaskFormData | null => {
      if (!topic.trim()) {
        return null;
      }
      return {
        topic: topic.trim(),
        description,
        assignee,
        dueDate,
        urgent,
        files
      };
    };

    // Function to reset all form fields to their initial state
    const resetForm = () => {
      setTopic("");
      setDescription("");
      setAssignee("");
      setDueDate("");
      setUrgent(false);
      setFiles(null);
    };

    // Expose getPayload and resetForm methods via ref
    useImperativeHandle(ref, () => ({
      getPayload,
      resetForm,
    }));

    // Form submission handler
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const payload = getPayload();
      if (!payload) {
        alert("Task Topic is required");
        return;
      }
      if (onSubmit) {
        onSubmit(payload);
      }
    };

    // Toggle function for the urgent switch
    const toggleUrgent = () => {
      setUrgent(!urgent);
    };

    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          {/* Form header */}
          <h2 className="text-2xl p-2 text-center text-black">
            Create Task
          </h2>
          <div className="border-t border-gray-400 mb-4 -mx-4"></div>

          {/* Task Mode Toggle Buttons */}
          <div className="flex justify-start mb-6 space-x-4">
            <button
              type="button"
              className={`px-6 py-2 font-medium rounded-md transition-colors ${
                taskMode === 'setTask'
                  ? 'bg-[#7991BB] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } cursor-pointer`}
              onClick={() => onTaskModeChange('setTask')}
            >
              Set Task
            </button>
            <button
              type="button"
              className={`px-6 py-2 font-medium rounded-md transition-colors ${
                taskMode === 'assignTask'
                  ? 'bg-[#7991BB] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } cursor-pointer`}
              onClick={() => onTaskModeChange('assignTask')}
            >
              Assign To Others
            </button>
          </div>

          {/* Form Layout - split into two columns on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Task Topic input */}
              <TextInput
                label="Task Topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                name="taskTopic"
                required
              />

              {/* Task Description textarea */}
              <TextArea
                label="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="taskDescription"
                rows={5}
                placeholder="Enter task description"
              />

              {/* Assignee select (only shown in assignTask mode) */}
              {taskMode === 'assignTask' && (
                <Select
                  label="Assign"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  name="assignee"
                  options={[
                    { value: '', label: 'Select assignee' },
                    { value: 'team1', label: 'Team Member 1' },
                    { value: 'team2', label: 'Team Member 2' },
                    { value: 'team3', label: 'Team Member 3' },
                  ]}
                />
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Due Date input */}
              <TextInput
                label="Due Date"
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                name="dueDate"
                required
              />

              {/* File upload component */}
              <FileUpload
                label="Attachments"
                onChange={(files) => setFiles(files)}
                multiple
                fileSize="10MB"
              />

              {/* Urgent toggle (only shown in assignTask mode) */}
              {taskMode === 'assignTask' && (
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">Urgent</label>
                  <div>
                    <ToggleSwitch isOn={urgent} handleToggle={toggleUrgent} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center space-x-3 pt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
            >
              Create Task
            </button>
          </div>
        </div>
      </form>
    );
  }
);

export default MeetingTaskForm;
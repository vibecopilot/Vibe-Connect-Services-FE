import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import TextInput from '../components/TextInput';
import DatePickerReact from '../components/ReactDatePicker';
import TextArea from '../components/TextArea';
import RadioButton from '../components/RadioButton';
import Select from '../components/Select';

interface PointToDiscuss {
  id: string;
  pointsToDiscuss: string;
  responsiblePersonType: string;
  continueInProgress: boolean;
  responsiblePerson: string;
  responsiblePersonEmail: string;
  targetDate: Date | null;
  tag: string;
}

interface Attendee {
  id: string;
  attendeeType: string;
  name: string;
  organization: string;
  roll: string;
  email: string;
}

interface MOMFormData {
  title: string;
  dateOfMeeting: Date | null;
  tag: string;
  pointsToDiscuss: PointToDiscuss[];
  attendees: Attendee[];
  attachments: File[];
}

interface MOMFormProps {
  formData: any;
  onChange: (e: any) => void;
  onSubmit: (data: { 
    formData: any;
    isEditing: boolean;
  }) => void;
  onCancel: () => void;
  onSaveAndCreateNew: (data: {
    formData: any;
    resetForm: () => void;
  }) => void;
  errors: any;
  isEditing: boolean;
}

const MOMListForm: React.FC<MOMFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  onSaveAndCreateNew,
  errors,
  isEditing
}) => {
  const [momData, setMomData] = useState<MOMFormData>({
    title: '',
    dateOfMeeting: null,
    tag: '',
    pointsToDiscuss: [{
      id: '1',
      pointsToDiscuss: '',
      responsiblePersonType: '',
      continueInProgress: false,
      responsiblePerson: '',
      responsiblePersonEmail: '',
      targetDate: null,
      tag: ''
    }],
    attendees: [{
      id: '1',
      attendeeType: '',
      name: '',
      organization: '',
      roll: '',
      email: ''
    }],
    attachments: []
  });

  // Initialize form data from props when editing
  useEffect(() => {
    if (isEditing && formData) {
      setMomData(prev => ({
        ...prev,
        title: formData.title || '',
        dateOfMeeting: formData.dateOfMeeting || null,
        tag: formData.tag || '',
      }));
    }
  }, [isEditing, formData]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMomData(prev => ({
      ...prev,
      [name]: value
    }));
    // Also call the parent's onChange to keep the original formData updated
    onChange(e);
  };

  const handlePointToDiscussChange = (id: string, field: string, value: any) => {
    setMomData(prev => ({
      ...prev,
      pointsToDiscuss: prev.pointsToDiscuss.map(point =>
        point.id === id ? { ...point, [field]: value } : point
      )
    }));
  };

  const handleAttendeeChange = (id: string, field: string, value: string) => {
    setMomData(prev => ({
      ...prev,
      attendees: prev.attendees.map(attendee =>
        attendee.id === id ? { ...attendee, [field]: value } : attendee
      )
    }));
  };

  const addPointToDiscuss = () => {
    const newPoint: PointToDiscuss = {
      id: Date.now().toString(),
      pointsToDiscuss: '',
      responsiblePersonType: '',
      continueInProgress: false,
      responsiblePerson: '',
      responsiblePersonEmail: '',
      targetDate: null,
      tag: ''
    };
    setMomData(prev => ({
      ...prev,
      pointsToDiscuss: [...prev.pointsToDiscuss, newPoint]
    }));
  };

  const removePointToDiscuss = (id: string) => {
    setMomData(prev => ({
      ...prev,
      pointsToDiscuss: prev.pointsToDiscuss.filter(point => point.id !== id)
    }));
  };

  const addAttendee = () => {
    const newAttendee: Attendee = {
      id: Date.now().toString(),
      attendeeType: '',
      name: '',
      organization: '',
      roll: '',
      email: ''
    };
    setMomData(prev => ({
      ...prev,
      attendees: [...prev.attendees, newAttendee]
    }));
  };

  const removeAttendee = (id: string) => {
    setMomData(prev => ({
      ...prev,
      attendees: prev.attendees.filter(attendee => attendee.id !== id)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMomData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  // Fixed form submission handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  
  
  // Prepare the basic data structure the parent expects
  const submissionData = {
    title: momData.title,
    dateOfMeeting: momData.dateOfMeeting,
    tag: momData.tag,
    tasks: momData.pointsToDiscuss.map(p => p.pointsToDiscuss).join(', '),
    raisedBy: momData.pointsToDiscuss.map(p => p.responsiblePerson).join(', '),
    attendees: momData.attendees.map(a => a.name),
    pointsToDiscuss: momData.pointsToDiscuss,
    attendeesData: momData.attendees
  };

  // Call parent's onSubmit with the prepared data
  onSubmit(submissionData);
};

  // Fixed save and create new handler
  const handleSaveAndCreateNew = () => {
  // Prepare the same data structure
  const submissionData = {
    title: momData.title,
    dateOfMeeting: momData.dateOfMeeting,
    tag: momData.tag,
    tasks: momData.pointsToDiscuss.map(p => p.pointsToDiscuss).join(', '),
    raisedBy: momData.pointsToDiscuss.map(p => p.responsiblePerson).join(', '),
    attendees: momData.attendees.map(a => a.name),
    pointsToDiscuss: momData.pointsToDiscuss,
    attendeesData: momData.attendees
  };

  // Call parent's handler
  onSaveAndCreateNew(submissionData);

  // Reset the form
  setMomData({
    title: '',
    dateOfMeeting: null,
    tag: '',
    pointsToDiscuss: [{
      id: '1',
      pointsToDiscuss: '',
      responsiblePersonType: '',
      continueInProgress: false,
      responsiblePerson: '',
      responsiblePersonEmail: '',
      targetDate: null,
      tag: ''
    }],
    attendees: [{
      id: '1',
      attendeeType: '',
      name: '',
      organization: '',
      roll: '',
      email: ''
    }],
    attachments: []
  });
};

  const responsiblePersonOptions = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full mx-auto">
        <h1 className="text-2xl font-semibold text-gray-600 mb-6">New MOM</h1>
        
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Basic Details Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#7991BB] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                1
              </div>
              <h2 className="text-lg font-semibold text-gray-800">BASIC DETAILS</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextInput
                label="Title"
                name="title"
                value={momData.title}
                onChange={handleInputChange}
                required
                error={errors.title}
                placeholder='Add Title'
              />
              <DatePickerReact
                label="Date Of Meeting"
                name="dateOfMeeting"
                value={momData.dateOfMeeting}
                onChange={handleInputChange}
                required
                error={errors.dateOfMeeting}
              />
              <TextInput
                label="Tag"
                name="tag"
                value={momData.tag}
                onChange={handleInputChange}
                required
                error={errors.tag}
                placeholder='Add Tags'
              />
            </div>
          </div>

          {/* Points to Discuss Cards */}
          {momData.pointsToDiscuss.map((point, index) => (
            <div key={point.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#7991BB] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 2}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Points to Discuss</h2>
                </div>
                <button
                  type="button"
                  onClick={() => removePointToDiscuss(point.id)}
                  className="bg-[#D03033] text-white px-3 py-1 rounded-md hover:bg-red-600 transition flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <TextArea
                  label="Points to Discuss"
                  name="pointsToDiscuss"
                  value={point.pointsToDiscuss}
                  onChange={(e) => handlePointToDiscussChange(point.id, 'pointsToDiscuss', e.target.value)}
                  rows={3}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <RadioButton
                    label="Responsible Person Type"
                    name={`responsiblePersonType_${point.id}`}
                    value={point.responsiblePersonType}
                    onChange={(e) => handlePointToDiscussChange(point.id, 'responsiblePersonType', e.target.value)}
                    options={['Internal', 'External']}
                  />
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`continueInProgress_${point.id}`}
                      checked={point.continueInProgress}
                      onChange={(e) => handlePointToDiscussChange(point.id, 'continueInProgress', e.target.checked)}
                      className="h-4 w-4 accent-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`continueInProgress_${point.id}`} className="text-sm text-gray-700">
                      Continue / In Progress
                    </label>
                  </div>
                  
                  <Select
                    label="Responsible Person"
                    name={`responsiblePerson_${point.id}`}
                    value={point.responsiblePerson}
                    onChange={(e) => handlePointToDiscussChange(point.id, 'responsiblePerson', e.target.value)}
                    options={responsiblePersonOptions}
                    placeholder="Select responsible person"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <TextInput
                    label="Responsible Person Email"
                    name={`responsiblePersonEmail_${point.id}`}
                    type="email"
                    placeholder='Responsible Person Email'
                    value={point.responsiblePersonEmail}
                    onChange={(e) => handlePointToDiscussChange(point.id, 'responsiblePersonEmail', e.target.value)}
                  />
                  
                  <DatePickerReact
                    label="Target Date"
                    name={`targetDate_${point.id}`}
                    value={point.targetDate}
                    onChange={(e) => handlePointToDiscussChange(point.id, 'targetDate', e.target.value)}
                  />
                  
                  <TextInput
                    label="Tag"
                    name={`pointTag_${point.id}`}
                    value={point.tag}
                    placeholder='Add Tags'
                    onChange={(e) => handlePointToDiscussChange(point.id, 'tag', e.target.value)}
                  />
                </div>

                {index === momData.pointsToDiscuss.length - 1 && (
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={addPointToDiscuss}
                      className="bg-[#7991BB] text-white px-4 py-2 rounded-md cursor-pointer transition flex items-center"
                    >
                      <Plus size={16} className="mr-2" />
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Attendees Cards */}
          {momData.attendees.map((attendee, index) => (
            <div key={attendee.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#7991BB] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {momData.pointsToDiscuss.length + index + 2}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Attendees</h2>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttendee(attendee.id)}
                  className="bg-[#D03033] text-white px-3 py-1 rounded-md hover:bg-red-600 transition flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <RadioButton
                  label="Attendee Type"
                  name={`attendeeType_${attendee.id}`}
                  value={attendee.attendeeType}
                  onChange={(e) => handleAttendeeChange(attendee.id, 'attendeeType', e.target.value)}
                  options={['Internal', 'External']}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Name"
                    name={`attendeeName_${attendee.id}`}
                    value={attendee.name}
                    placeholder="Attendee's Name"
                    onChange={(e) => handleAttendeeChange(attendee.id, 'name', e.target.value)}
                  />
                  
                  <TextInput
                    label="Organization"
                    name={`attendeeOrganization_${attendee.id}`}
                    value={attendee.organization}
                    placeholder="Attendee's Organization"
                    onChange={(e) => handleAttendeeChange(attendee.id, 'organization', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Roll"
                    name={`attendeeRoll_${attendee.id}`}
                    value={attendee.roll}
                    placeholder="Attendee's Roll"
                    onChange={(e) => handleAttendeeChange(attendee.id, 'roll', e.target.value)}
                  />
                  
                  <TextInput
                    label="Email"
                    name={`attendeeEmail_${attendee.id}`}
                    type="email"
                    placeholder="Attendee's Email"
                    value={attendee.email}
                    onChange={(e) => handleAttendeeChange(attendee.id, 'email', e.target.value)}
                  />
                </div>

                {index === momData.attendees.length - 1 && (
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={addAttendee}
                      className="bg-[#7991BB] text-white px-4 py-2 rounded-md cursor-pointer transition flex items-center"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Attendee
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Attachments Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#7991BB] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                {momData.pointsToDiscuss.length + momData.attendees.length + 2}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Attachments</h2>
            </div>
            
            <div className="space-y-4">
              <input
                type="file"
                id="attachments"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('attachments')?.click()}
                className="bg-[#7991BB] text-white px-4 py-2 rounded-md cursor-pointer transition flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add Attachments
              </button>
              
              {momData.attachments.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                  <ul className="space-y-1">
                    {momData.attachments.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-[#7991BB] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              {isEditing ? 'Update MOM' : 'Create MOM'}
            </button>
            {!isEditing && (
              <button
                type="button"
                onClick={handleSaveAndCreateNew}
                className="bg-[#7991BB] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Save & Create New MOM
              </button>
            )}
            <button
              type="button"
              onClick={onCancel}
              className="bg-[#D03033] text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MOMListForm;
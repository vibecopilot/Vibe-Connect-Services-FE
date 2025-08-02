// Import React and necessary hooks
import React, {
  useImperativeHandle,  // Hook to customize instance value exposed with ref
  forwardRef,          // HOC to forward ref to child component
  useState,            // Hook to manage component state
  ChangeEvent,         // Type for change events
} from "react";

// Import custom form components
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import DatePicker from "../components/DatePicker";

// Import Feather icons
import { FiTrash2, FiLink, FiX } from "react-icons/fi";

// Import additional form components
import Select from "../components/Select";
import ToggleSwitch from "../components/ToggleSwitch";

// Define interface for meeting form data structure
export interface MymeetingsFormData {
  id?: number;  // Optional meeting ID for editing existing meetings
  meetingTopic: string;  // Required meeting topic
  description: string;   // Meeting description
  date: string;          // Meeting date
  startTime: string;     // Meeting start time
  endTime: string;       // Meeting end time
  internalAttendees: string[];  // List of internal attendees
  externalAttendees: string[];  // List of external attendees
  meetingLink: string;   // Generated meeting link
  meetingPlatform: "google" | "zoom" | "teams" | "";  // Selected meeting platform
}

// Define interface for component's ref methods
export interface MymeetingsFormHandle {
  getPayload: () => MymeetingsFormData | null;  // Method to get form data
  resetForm: () => void;  // Method to reset form fields
}

// Define props interface for the component
interface MymeetingsFormProps {
  initialData?: Partial<MymeetingsFormData>;  // Initial data for form population (used for editing)
  onSubmit?: (data: MymeetingsFormData) => void;  // Callback for form submission
  onCancel?: () => void;  // Callback for cancel action
  onDelete?: () => void;  // Callback for delete action
}

// Helper function to format time input as HH:MM
const formatTimeInput = (value: string): string => {
  // Remove non-digit characters
  let digits = value.replace(/\D/g, '');
  
  // Limit to 4 digits
  if (digits.length > 4) digits = digits.slice(0, 4);
  
  // Format as HH:MM if we have more than 2 digits
  if (digits.length > 2) {
    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  }
  return digits;
};

// Helper function to validate time format
const isValidTime = (time: string): boolean => {
  if (!time) return false;
  // Split time into hours and minutes
  const [hours, minutes] = time.split(':').map(Number);
  // Validate hours (0-23) and minutes (0-59)
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

// Main form component with forwardRef to expose methods
const MymeetingsForm = forwardRef<MymeetingsFormHandle, MymeetingsFormProps>(
  ({ initialData, onSubmit, onDelete }, ref) => {
    // State declarations for all form fields
    const [meetingTopic, setMeetingTopic] = useState(initialData?.meetingTopic || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [date, setDate] = useState(initialData?.date || "");
    const [startTime, setStartTime] = useState(initialData?.startTime || "");
    const [endTime, setEndTime] = useState(initialData?.endTime || "");
    const [internalAttendees, setInternalAttendees] = useState<string[]>(initialData?.internalAttendees || []);
    const [externalAttendees, setExternalAttendees] = useState<string[]>(initialData?.externalAttendees || []);
    const [externalEmail, setExternalEmail] = useState("");  // Input for adding external attendees
    const [meetingLink, setMeetingLink] = useState(initialData?.meetingLink || "");
    const [meetingPlatform, setMeetingPlatform] = useState<"google" | "zoom" | "teams" | "">(initialData?.meetingPlatform || "");
    const [repeat, setRepeat] = useState(false);  // Toggle for recurring meetings
    const [fromDate, setFromDate] = useState("");  // Start date for recurring meetings
    const [toDate, setToDate] = useState("");      // End date for recurring meetings
    const [selectedDays, setSelectedDays] = useState<string[]>([]);  // Selected days for recurring meetings

    // Function to construct form payload
    const getPayload = (): MymeetingsFormData | null => {
      // Validate required meeting topic
      if (!meetingTopic.trim()) {
        return null;
      }
      // Return structured meeting data
      return {
        meetingTopic: meetingTopic.trim(),
        description,
        date,
        startTime,
        endTime,
        internalAttendees,
        externalAttendees,
        meetingLink,
        meetingPlatform
      };
    };

    // Function to reset all form fields
    const resetForm = () => {
      setMeetingTopic("");
      setDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setInternalAttendees([]);
      setExternalAttendees([]);
      setExternalEmail("");
      setMeetingLink("");
      setMeetingPlatform("");
      setRepeat(false);
      setFromDate("");
      setToDate("");
      setSelectedDays([]);
    };

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getPayload,
      resetForm,
    }));

    // Generic change handler for form inputs
    const handleChange =
      (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setter(e.target.value);
      };

    // Custom handler for time inputs with formatting
    const handleTimeChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
      const formatted = formatTimeInput(value);
      setter(formatted);
    };

    // Form submission handler
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate time formats
      if (!isValidTime(startTime) || !isValidTime(endTime)) {
        alert("Please enter valid times in HH:MM format (e.g., 09:00)");
        return;
      }
      
      // Get form payload
      const payload = getPayload();
      // Validate payload exists
      if (!payload) {
        alert("Meeting Topic is required");
        return;
      }
      // Call submit callback if provided
      if (onSubmit) {
        onSubmit(payload);
      }
    };

    // Function to add external attendee
    const addExternalAttendee = () => {
      const trimmedEmail = externalEmail.trim();
      // Validate email presence
      if (!trimmedEmail) return;
      
      // Validate email format
      if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
        alert("Please enter a valid email address");
        return;
      }

      // Add email if not already in list
      if (!externalAttendees.includes(trimmedEmail)) {
        setExternalAttendees([...externalAttendees, trimmedEmail]);
        setExternalEmail("");
      }
    };

    // Function to remove external attendee
    const removeExternalAttendee = (index: number) => {
      setExternalAttendees(externalAttendees.filter((_, i) => i !== index));
    };

    // Function to generate meeting link
    const generateMeetingLink = (platform: "google" | "zoom" | "teams") => {
      setMeetingPlatform(platform);
      // Generate random meeting ID
      const link = `https://${platform}.com/meeting-${Math.random().toString(36).substring(7)}`;
      setMeetingLink(link);
    };

    // Function to copy meeting link to clipboard
    const copyLinkToClipboard = () => {
      if (meetingLink) {
        navigator.clipboard.writeText(meetingLink);
        alert("Link copied to clipboard!");
      } else {
        alert("No meeting link to copy");
      }
    };

    // Predefined list of internal attendees
    const internalAttendeesOptions = [
      "John Doe (john@example.com)",
      "Jane Smith (jane@example.com)",
      "Mike Johnson (mike@example.com)",
      "Sarah Williams (sarah@example.com)"
    ];

    // Helper function to determine platform button style
    const isPlatformActive = (platform: string) => 
      meetingPlatform === platform ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200";

    // Function to toggle day selection for recurring meetings
    const handleDayToggle = (day: string) => {
      setSelectedDays(prev =>
        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
      );
    };

    // Component rendering
    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          {/* Form header with conditional title */}
          <h2 className="text-2xl bg-gray-100 p-2  mb-6 text-center text-black">
            {initialData?.id ? "Edit Meeting" : "Create New Meeting"}
          </h2>
          
          {/* Main form grid */}
          <div style={{ color: '#5E5E5E' }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Left column - Meeting topic and description */}
            <div className="md:col-span-1 space-y-6">
              {/* Meeting topic input */}
              <div>
                <h4 className="text-lg mb-2">Meeting Topic:</h4>
                <TextInput
                  name="meetingTopic"
                  value={meetingTopic}
                  onChange={handleChange(setMeetingTopic)}
                  label=""
                />
              </div>
              
              {/* Description textarea */}
              <div>
                <h4 className="text-lg mb-2">Description:</h4>
                <TextArea
                  placeholder="Enter Description"
                  name="description"
                  value={description}
                  onChange={handleChange(setDescription)}
                  rows={5}
                />
              </div>
            </div>
            
            {/* Middle column - Date and internal attendees */}
            <div className="md:col-span-1 space-y-6">
              {/* Date picker */}
              <div className="w-full">
                <h4 className="text-lg mb-2">Date:</h4>
                <DatePicker
                  name="date"
                  value={date}
                  onChange={handleChange(setDate)}
                  label=""
                  className="w-full"
                />
              </div>
              
              {/* Internal attendees selector */}
              <div className="mt-10 w-full">
                <h4 className="font-medium mb-2">Invite Internal Attendees:</h4>
                <Select
                  options={["Select attendee", ...internalAttendeesOptions]}
                  value=""
                  onChange={(e) => {
                    // Add selected attendee if valid
                    if (e.target.value && !internalAttendees.includes(e.target.value)) {
                      setInternalAttendees([...internalAttendees, e.target.value]);
                    }
                  }}
                  className="w-full"
                />
                
                {/* Display selected internal attendees */}
                {internalAttendees.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {internalAttendees.map((attendee, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
                        <span className="truncate">{attendee}</span>
                        {/* Remove attendee button */}
                        <button 
                          type="button" 
                          onClick={() => setInternalAttendees(internalAttendees.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700 ml-2"
                          aria-label="Remove attendee"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column - Time and external attendees */}
            <div className="md:col-span-1 space-y-6">
              {/* Time inputs */}
              <div className="w-full">
                <h4 className="text-lg mb-2">Time:</h4>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {/* Start time input */}
                  <TextInput
                    type="time"
                    name="startTime"
                    value={startTime}
                    onChange={(e) => handleTimeChange(setStartTime, e.target.value)}
                    placeholder=""
                    label=""
                    className="w-full"
                  />
                  {/* End time input */}
                  <TextInput
                    type="time"
                    name="endTime"
                    value={endTime}
                    onChange={(e) => handleTimeChange(setEndTime, e.target.value)}
                    placeholder=""
                    label=""
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* External attendees management */}
              <div className="w-full">
                <h4 className="font-medium mb-2">Invite External Attendees:</h4>
                <div className="flex gap-2">
                  {/* Email input */}
                  <TextInput
                    type="email"
                    value={externalEmail}
                    onChange={handleChange(setExternalEmail)}
                    onKeyDown={(e) => e.key === "Enter" && addExternalAttendee()}
                    placeholder="Enter email"
                    label=""
                    className="flex-grow"
                  />
                  {/* Add email button */}
                  <button
                    type="button"
                    onClick={addExternalAttendee}
                    className="px-7 mb-4 bg-[#7991BB] text-white rounded-md">
                    Add
                  </button>
                </div>
                
                {/* Display added external emails */}
                {externalAttendees.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {externalAttendees.map((email, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
                        <span className="truncate">{email}</span>
                        {/* Remove email button */}
                        <button 
                          type="button" 
                          onClick={() => removeExternalAttendee(index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          aria-label="Remove email"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Meeting link and recurrence section */}
          <div style={{ color: '#5E5E5E' }} className="border-t border-gray-200 pt-6">
            {/* Link generation header */}
            <div className="flex flex-row justify-between items-center mb-4">
                {/* Generate link button */}
                <button
                type="button"
                className="flex items-center px-4 py-2 bg-[#7991BB] text-white rounded"
                onClick={() => {/* Generate meeting link logic here */}}
                >
                    Generate Meeting Link
                </button>
                {/* Platform selection buttons */}
                <div className="flex gap-2">
                    <button 
                      type="button" 
                      className="px-4 py-2 rounded border border-gray-300 bg-white hover:bg-blue-50"
                      onClick={() => generateMeetingLink("google")}
                    >
                      Google Meet
                    </button>
                    <button 
                      type="button" 
                      className="px-4 py-2 rounded border border-gray-300 bg-white hover:bg-blue-50"
                      onClick={() => generateMeetingLink("zoom")}
                    >
                      Zoom Meet
                    </button>
                    <button 
                      type="button" 
                      className="px-4 py-2 rounded border border-gray-300 bg-white hover:bg-blue-50"
                      onClick={() => generateMeetingLink("teams")}
                    >
                      Team Meet
                    </button>
                </div>
            </div>
            
            {/* Meeting link display and copy */}
            <div className="flex items-center gap-2 mb-6">
              <TextInput
                name="meetingLink"
                value={meetingLink}
                onChange={e => setMeetingLink(e.target.value)}
                className="flex-grow"
                label=""
                placeholder="Meeting link will appear here"
              />
              <button
                type="button"
                className="px-4 py-2 mb-4 bg-white text-[#7991BB] border border-[#7991BB] rounded hover:bg-[#7991BB] hover:text-white flex items-center justify-center gap-2"
                onClick={copyLinkToClipboard}
              >
                <FiLink size={16} />
                Copy Link
              </button>
            </div>
            
            {/* Recurrence toggle */}
            <div className="flex items-center gap-2 mb-6">
              <span className="font-medium">Repeat:</span>
              <ToggleSwitch isOn={repeat} handleToggle={() => setRepeat(!repeat)} />
            </div>
            
            {/* Recurrence options (conditionally rendered) */}
            {repeat && (
              <>
                {/* Date range for recurring meetings */}
                <div className="flex flex-row gap-4 mb-6">
                  <DatePicker
                    label="From"
                    name="fromDate"
                    value={fromDate}
                    onChange={handleChange(setFromDate)}
                    className="w-56"
                  />
                  <DatePicker
                    label="To"
                    name="toDate"
                    value={toDate}
                    onChange={handleChange(setToDate)}  
                    className="w-56"
                  />
                </div>
                {/* Day selection for recurring meetings */}
                <div className="flex flex-col mb-6">
                  <h2 className="text-l mb-2">Select days:</h2>
                  <div className="flex gap-2 mb-6">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <button
                        key={day}
                        type="button"
                        className={`px-3 py-1 rounded border border-gray-300 ${
                          selectedDays.includes(day) 
                            ? 'bg-[#7991BB] text-white' 
                            : 'bg-white hover:bg-blue-50'
                        }`}
                        onClick={() => handleDayToggle(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Delete button (conditionally rendered) */}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 mt-6 transition-colors"
            >
              <FiTrash2 className="mr-2" />
              Delete Meeting
            </button>
          )}
        </div>

        {/* Submit button */}
        <div className="flex justify-center pt-2 space-x-3">
          <button
            type="submit"
            className="px-6 py-2 bg-[#7991BB] text-white rounded cursor-pointer"
          >
            {initialData?.id ? "Update Meeting" : "Submit"}
          </button>
        </div>
      </form>
    );
  }
);

export default MymeetingsForm;
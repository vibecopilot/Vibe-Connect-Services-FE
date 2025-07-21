import React, { useState } from 'react';
import IconButton from '../components/IconButton'; // Assuming you have an IconButton component
import { IoCloseOutline } from 'react-icons/io5'; // For the close icon
import DatePickerReact from '../components/ReactDatePicker'; // Assuming you have a DatePickerReact component
import { FiClock, FiCalendar, FiTrash2, FiCopy } from 'react-icons/fi'; // For clock, calendar, trash and copy icons

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
} 

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'Task' | 'Event' | 'Meeting'>('Task');

  // Task states
  const [taskTopic, setTaskTopic] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState<Date | null>(new Date());
  const [assignTo, setAssignTo] = useState('');

  // Event states
  const [eventTopic, setEventTopic] = useState('');
  const [eventStartDate, setEventStartDate] = useState<Date | null>(new Date());
  const [eventEndDate, setEventEndDate] = useState<Date | null>(new Date());
  const [eventStartTime, setEventStartTime] = useState('00:00');
  const [eventEndTime, setEventEndTime] = useState('00:00');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [guests, setGuests] = useState('');
  const [reminderType, setReminderType] = useState('E-mail');
  const [reminderTime, setReminderTime] = useState('15 Mins');

  // Meeting states
  const [meetingTopic, setMeetingTopic] = useState('');
  const [meetingDate, setMeetingDate] = useState<Date | null>(new Date());
  const [meetingStartTime, setMeetingStartTime] = useState('00:00');
  const [meetingEndTime, setMeetingEndTime] = useState('00:00');
  const [meetingLink, setMeetingLink] = useState('');
  const [invites, setInvites] = useState('');
  const [otherEmails, setOtherEmails] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [repeatFromDate, setRepeatFromDate] = useState<Date | null>(new Date());
  const [repeatToDate, setRepeatToDate] = useState<Date | null>(new Date());
  const [selectedWorkingDays, setSelectedWorkingDays] = useState<string[]>([]);

  const clientId = "793172469677-nsm80kqihtnjuqrc7to2948vat543aoq.apps.googleusercontent.com";

  function getGoogleCalendarAccessToken(callback: (accessToken: string) => void) {
    // @ts-ignore
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/calendar',
      prompt: 'select_account', // <-- Add this line
      login_hint: 'patilaryaanil07@gmail.com', 
      callback: (tokenResponse: any) => {
        callback(tokenResponse.access_token);
      },
    });
    tokenClient.requestAccessToken();
  }

  function createGoogleCalendarEvent(accessToken: string, event: any) {
    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then(res => res.json())
      .then(data => {
        alert('Event created in Google Calendar!');
        console.log('Event created:', data);
      });
  }

  const handleCreate = () => {
    if (activeTab === 'Task') {
      getGoogleCalendarAccessToken((accessToken) => {
        const event = {
          summary: taskTopic,
          description: taskDescription,
          start: { dateTime: new Date(taskDate!).toISOString(), timeZone: "Asia/Kolkata" },
          end: { dateTime: new Date(new Date(taskDate!).getTime() + 60 * 60 * 1000).toISOString(), timeZone: "Asia/Kolkata" }, // You may want to add 1 hour or so
        };
        createGoogleCalendarEvent(accessToken, event);
      });
    } else if (activeTab === 'Event') {
      getGoogleCalendarAccessToken((accessToken) => {
        const event = {
          summary: eventTopic,
          description: eventDescription,
          start: { dateTime: new Date(eventStartDate!).toISOString(), timeZone: "Asia/Kolkata" },
          end: { dateTime: new Date(eventEndDate!).toISOString(), timeZone: "Asia/Kolkata" },
          location: eventLocation,
        };
        createGoogleCalendarEvent(accessToken, event);
      });
    } else if (activeTab === 'Meeting') {
      getGoogleCalendarAccessToken((accessToken) => {
        const event = {
          summary: meetingTopic,
          start: { dateTime: new Date(meetingDate!).toISOString(), timeZone: "Asia/Kolkata" },
          end: { dateTime: new Date(meetingDate!).toISOString(), timeZone: "Asia/Kolkata" }, // You may want to add 1 hour or so
          description: meetingLink,
        };
        createGoogleCalendarEvent(accessToken, event);
      });
    }
    onClose(); // Close modal after creation
  };

  const toggleWorkingDay = (day: string) => {
    setSelectedWorkingDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white-600 bg-opacity-50" style={{ fontFamily: "'PT Sans', sans-serif", color: '#444' }}>
      <div className="rounded-lg border border-gray-500 bg-white p-6 shadow-lg">
        {/* Tabs */}
        <div className="mb-6 relative flex items-center">
          <div className="flex justify-center w-full space-x-2">
            {['Task', 'Event', 'Meeting'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'Task' | 'Event' | 'Meeting')}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'border border-blue-500 bg-blue-50 text-blue-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="absolute right-0">
            <IconButton tooltip="Close" onClick={onClose}>
              <IoCloseOutline size={20} />
            </IconButton>
          </div>
        </div>

        {/* Form Fields */}
        {activeTab === 'Task' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="taskTopic" className="mb-1 block text-sm font-medium text-gray-700">
                  Task Topic
                </label>
                <input
                  type="text"
                  id="taskTopic"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder=""
                  value={taskTopic}
                  onChange={e => setTaskTopic(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="taskDate" className="mb-1 block text-sm font-medium text-gray-700">
                  Date
                </label>
                <DatePickerReact
                  label=""
                  value={taskDate}
                  onChange={e => setTaskDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="taskDescription" className="mb-1 block text-sm font-medium text-gray-700">
                Task Description
              </label>
              <textarea
                id="taskDescription"
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Describe Task"
                value={taskDescription}
                onChange={e => setTaskDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-1/2 pr-2">
                <label htmlFor="assignTo" className="sr-only">
                  Assign To
                </label>
                <select
                  id="assignTo"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  value={assignTo}
                  onChange={e => setAssignTo(e.target.value)}
                >
                  <option value="">Assign To</option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                </select>
              </div>
              <button className="flex w-1/2 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                <span className="mr-2 text-lg">+</span> Attachment
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Event' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="eventTopic" className="mb-1 block text-sm font-medium text-gray-700">
                Event Topic
              </label>
              <input
                type="text"
                id="eventTopic"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Enter Event Topic"
                value={eventTopic}
                onChange={e => setEventTopic(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventStartDate" className="mb-1 block text-sm font-medium text-gray-700">
                  Date
                </label>
                <DatePickerReact
                  label=""
                  value={eventStartDate}
                  onChange={e => setEventStartDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="eventEndDate" className="mb-1 block text-sm font-medium text-gray-700 opacity-0">
                  End Date (Hidden Label)
                </label>
                <DatePickerReact
                  label=""
                  value={eventEndDate}
                  onChange={e => setEventEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventStartTime" className="mb-1 block text-sm font-medium text-gray-700">
                  Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="eventStartTime"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    value={eventStartTime}
                    onChange={e => setEventStartTime(e.target.value)}
                  />
                  <FiClock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label htmlFor="eventEndTime" className="mb-1 block text-sm font-medium text-gray-700 opacity-0">
                  End Time (Hidden Label)
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="eventEndTime"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    value={eventEndTime}
                    onChange={e => setEventEndTime(e.target.value)}
                  />
                  <FiClock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventDescription" className="mb-1 block text-sm font-medium text-gray-700">
                  Event Description
                </label>
                <input
                  type="text"
                  id="eventDescription"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Describe Event"
                  value={eventDescription}
                  onChange={e => setEventDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="eventLocation" className="mb-1 block text-sm font-medium text-gray-700">
                  Event Location
                </label>
                <input
                  type="text"
                  id="eventLocation"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder=""
                  value={eventLocation}
                  onChange={e => setEventLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="guests" className="mb-1 block text-sm font-medium text-gray-700">
                  Guests
                </label>
                <select
                  id="guests"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="guest1">Guest 1</option>
                  <option value="guest2">Guest 2</option>
                </select>
              </div>
              <div>
                <label htmlFor="reminders" className="mb-1 block text-sm font-medium text-gray-700">
                  Add Reminders
                </label>
                <div className="flex items-center gap-2">
                  <select
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    value={reminderType}
                    onChange={e => setReminderType(e.target.value)}
                  >
                    <option>E-mail</option>
                    <option>SMS</option>
                  </select>
                  <select
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    value={reminderTime}
                    onChange={e => setReminderTime(e.target.value)}
                  >
                    <option>Before</option>
                    <option>After</option>
                  </select>
                  <select
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    value={reminderTime}
                    onChange={e => setReminderTime(e.target.value)}
                  >
                    <option>15 Mins</option>
                    <option>30 Mins</option>
                    <option>1 Hour</option>
                  </select>
                  <IconButton tooltip="Delete"><FiTrash2 /></IconButton>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button className="flex w-1/2 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                <span className="mr-2 text-lg">+</span> Attachment
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Meeting' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="meetingTopic" className="mb-1 block text-sm font-medium text-gray-700">
                Meeting Topic
              </label>
              <input
                type="text"
                id="meetingTopic"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Enter Event Topic"
                value={meetingTopic}
                onChange={e => setMeetingTopic(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="meetingDate" className="mb-1 block text-sm font-medium text-gray-700">
                  Date
                </label>
                <DatePickerReact
                  label=""
                  value={meetingDate}
                  onChange={e => setMeetingDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="meetingStartTime" className="mb-1 block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="meetingStartTime"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      value={meetingStartTime}
                      onChange={e => setMeetingStartTime(e.target.value)}
                    />
                    <FiClock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="meetingEndTime" className="mb-1 block text-sm font-medium text-gray-700 opacity-0">
                    End Time (Hidden Label)
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="meetingEndTime"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      value={meetingEndTime}
                      onChange={e => setMeetingEndTime(e.target.value)}
                    />
                    <FiClock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="meetingLink" className="mb-1 block text-sm font-medium text-gray-700">
                Meeting Link
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  id="meetingLink"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pr-10"
                  placeholder=""
                  value={meetingLink}
                  onChange={e => setMeetingLink(e.target.value)}
                />
                <FiCopy className="absolute right-3 text-gray-400 cursor-pointer" onClick={() => navigator.clipboard.writeText(meetingLink)} />
              </div>
            </div>
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Generate Link
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="invites" className="mb-1 block text-sm font-medium text-gray-700">
                  Invites
                </label>
                <select
                  id="invites"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  value={invites}
                  onChange={e => setInvites(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="invite1">Invite 1</option>
                  <option value="invite2">Invite 2</option>
                </select>
              </div>
              <div>
                <label htmlFor="otherEmails" className="mb-1 block text-sm font-medium text-gray-700">
                  Add Other Emails
                </label>
                <input
                  type="text"
                  id="otherEmails"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Enter"
                  value={otherEmails}
                  onChange={e => setOtherEmails(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="repeat" className="mb-1 block text-sm font-medium text-gray-700">
                Repeat
              </label>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" id="repeat" className="peer sr-only" checked={repeat} onChange={() => setRepeat(!repeat)} />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['\201D'] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>

            {repeat && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="repeatFromDate" className="mb-1 block text-sm font-medium text-gray-700">
                      From Date:
                    </label>
                    <DatePickerReact
                      label=""
                      value={repeatFromDate}
                      onChange={e => setRepeatFromDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="repeatToDate" className="mb-1 block text-sm font-medium text-gray-700">
                      To Date:
                    </label>
                    <DatePickerReact
                      label=""
                      value={repeatToDate}
                      onChange={e => setRepeatToDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Select Working Days:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[ 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map(day => (
                      <button
                        key={day}
                        className={`rounded-md px-3 py-1 text-sm ${selectedWorkingDays.includes(day) ? 'bg-blue-500 text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => toggleWorkingDay(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleCreate}
            className="rounded-md bg-[#7991BB] hover:bg-[#5D79A5] text-white px-6 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {activeTab === 'Task' ? 'Create Task' : activeTab === 'Event' ? 'Create Event' : 'Create Meeting'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal; 
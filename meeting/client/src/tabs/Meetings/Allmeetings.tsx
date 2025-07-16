import React, { useState, useRef } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import { 
  FiTrash2, FiEdit, FiPlay, FiDownload, FiFileText, FiList, 
  FiEye, FiCalendar, FiClock, FiX, FiPlusCircle 
} from "react-icons/fi";
import TopBar from '../../components/TopBar'; 
import MymeetingsForm from '../../forms/MymeetingsForm'; 
import type { MymeetingsFormHandle } from '../../forms/MymeetingsForm';
import MeetingTaskForm from '../../forms/MeetingTaskForm';
import type { MeetingTaskFormHandle } from '../../forms/MeetingTaskForm';
import AddToPlaylistForm from '../../forms/AddToPlaylistForm'; 
import Modal from '../../components/Modal';

interface Item {
  id: number;
  agenda: string;
  date: string;
  startTime: string;
  endTime: string;
  createdBy: string;
  meetingLink?: string;
  status: 'upcoming' | 'ready';
  summary?: string;
  transcript?: string;
}

const Allmeetings: React.FC = () => {
  // Dummy data for demonstration
  const dummyItems: Item[] = [
    {
      id: 1,
      agenda: 'Review Meeting',
      date: '2023-06-16',
      startTime: '12:00',
      endTime: '09:00',
      createdBy: 'Aniket',
      meetingLink: 'https://zoom.us/kitchen-inspection',
      status: 'upcoming'
    },
    {
      id: 2,
      agenda: 'Sales Pitch - Myciti ',
      date: '2023-06-04',
      startTime: '14:00',
      endTime: '15:30',
      createdBy: 'Sejal',
      status: 'ready',
      summary: 'Monthly performance review meeting where we discussed Q3 results and plans for Q4.',
      transcript: 'Director: Welcome everyone to our monthly review...\nManager: Thank you, I\'d like to start with our sales figures...'
    }
  ];

  // Start with empty array - dummy data will be added after first form submission
  const [scheduledItems, setScheduledItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [viewingItem, setViewingItem] = useState<Item | null>(null);
  const [viewingTaskItem, setViewingTaskItem] = useState<Item | null>(null);
  const [viewingTranscriptItem, setViewingTranscriptItem] = useState<Item | null>(null);
  const [addingToPlaylistItem, setAddingToPlaylistItem] = useState<Item | null>(null);
  const formRef = useRef<MymeetingsFormHandle>(null);
  const taskFormRef = useRef<MeetingTaskFormHandle>(null);
  
  // Task assignment state
  const [showTaskAssignment, setShowTaskAssignment] = useState(false);
  const [taskAssignmentStep, setTaskAssignmentStep] = useState(1);
  const [taskFormMode, setTaskFormMode] = useState<'setTask' | 'assignTask'>('setTask');

  const handleFormSubmit = (formData: any) => {
    // Add dummy data on first submission only
    let updatedItems = [...scheduledItems];
    if (scheduledItems.length === 0) {
      updatedItems = [...dummyItems];
    }

    if (editingItem) {
      updatedItems = updatedItems.map(item => 
        item.id === editingItem.id ? { 
          ...item, 
          agenda: formData.meetingTopic,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          meetingLink: formData.meetingLink
        } : item
      );
    } else {
      const newItem: Item = {
        id: Date.now(),
        agenda: formData.meetingTopic,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        createdBy: 'Admin',
        meetingLink: formData.meetingLink,
        status: 'upcoming'
      };
      updatedItems = [...updatedItems, newItem];
    }
    
    setScheduledItems(updatedItems);
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDelete = (id: number) => {
    setScheduledItems(scheduledItems.filter(item => item.id !== id));
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleViewDetails = (item: Item) => {
    setViewingItem(item);
  };

  const handleCloseView = () => {
    setViewingItem(null);
  };

  const handleCreateTask = (item: Item) => {
    setViewingTaskItem(item);
    setShowTaskAssignment(true);
    setTaskAssignmentStep(1);
  };

  const handleCloseTaskView = () => {
    setViewingTaskItem(null);
    setShowTaskAssignment(false);
    setTaskAssignmentStep(1);
  };

  const handleViewTranscript = (item: Item) => {
    setViewingTranscriptItem(item);
  };

  const handleCloseTranscript = () => {
    setViewingTranscriptItem(null);
  };

  const handleAddToPlaylist = (item: Item) => {
    setAddingToPlaylistItem(item);
  };

  const handleClosePlaylistForm = () => {
    setAddingToPlaylistItem(null);
  };

  const handlePlaylistSubmit = (data: any) => {
    console.log('Adding meeting to playlist:', addingToPlaylistItem?.id, data);
    setAddingToPlaylistItem(null);
  };

  const handleTaskSubmit = (data: any) => {
    console.log('Task created:', data);
    setViewingTaskItem(null);
    setShowTaskAssignment(false);
    setTaskAssignmentStep(1);
  };

  const handleButtonClick = (type: string) => {
    if (type === 'Meeting Invite') {
      setEditingItem(null);
      setShowForm(true);
    }
  };

  const handleJoinMeeting = (link: string) => {
    window.open(link, '_blank');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const mod = day % 100;
    const suffix = suffixes[(mod - 20) % 10] || suffixes[mod] || suffixes[0];
    
    return `${day}${suffix} ${month}`;
  };

  const formatLongDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const mod = day % 100;
    const suffix = suffixes[(mod - 20) % 10] || suffixes[mod] || suffixes[0];
    
    return `${day}${suffix} ${month} ${year}`;
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'Pm' : 'Am';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleDownloadTranscript = () => {
    if (!viewingTranscriptItem?.transcript) return;
    
    const blob = new Blob([viewingTranscriptItem.transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${viewingTranscriptItem.agenda.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const matchesSearchTerm = (item: Item) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const safeToString = (value: any) => String(value || '').toLowerCase();

    return (
      safeToString(item.agenda).includes(searchLower) ||
      safeToString(item.createdBy).includes(searchLower) ||
      safeToString(item.date).includes(searchTerm) ||
      safeToString(item.startTime).includes(searchTerm) ||
      safeToString(item.endTime).includes(searchTerm) ||
      safeToString(item.status).includes(searchLower)
    );
  };

  const filteredScheduled = scheduledItems.filter(matchesSearchTerm);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentScheduled = filteredScheduled.slice(indexOfFirstItem, indexOfLastItem);
  
  const scheduledTotalPages = Math.ceil(filteredScheduled.length / itemsPerPage);

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDeleteForm = () => {
    if (editingItem) {
      handleDelete(editingItem.id);
      setShowForm(false);
      setEditingItem(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2">
        <TopBar 
          onSearch={setSearchTerm}
          onButtonClick={handleButtonClick}
          buttons={['Meeting Invite']}
        />
      </div>
      
      {showForm && (
        <div className="">
          <MymeetingsForm 
            ref={formRef}
            initialData={editingItem || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            onDelete={editingItem ? handleDeleteForm : undefined}
          />
        </div>
      )}

      {/* Conditionally render table and pagination when form is closed */}
      {!showForm && (
        <>
          <div className="flex justify-end mb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={scheduledTotalPages}
              totalItems={filteredScheduled.length}
              onPageChange={setCurrentPage}
              showControls={true}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead 
                columns={[
                  { label: 'Actions', align: 'center' },
                  { label: 'Meeting Agenda', align: 'center' },
                  { label: 'Date', align: 'center' },
                  { label: 'Time', align: 'center' },
                  { label: 'Created By', align: 'center' },
                  { label: 'Status', align: 'center' },
                  { label: '', align: 'center' }
                ]}
              />
              <tbody>
                {currentScheduled.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="text-center py-3">
                      <div className="flex justify-center space-x-2">
                        <IconButton onClick={() => handleViewDetails(item)}>
                          <FiEye />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(item)}>
                          <FiEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(item.id)}>
                          <FiTrash2 />
                        </IconButton>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-center">{item.agenda}</td>
                    <td className="py-3 px-4 text-center">{formatDate(item.date)}</td>
                    <td className="py-3 px-4 text-center">{formatTime(item.startTime)}</td>
                    <td className="py-3 px-4 text-center">{item.createdBy}</td>
                    <td className="py-3 px-4 text-center">
                      {item.status === 'upcoming' ? (
                        <span>Upcoming</span>
                      ) : (
                        <span>Completed</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {item.status === 'upcoming' && item.meetingLink && (
                        <button
                          type="button"
                          className="px-3 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                          onClick={() => handleJoinMeeting(item.meetingLink!)}
                        >
                          Join Now
                        </button>
                      )}
                      {item.status === 'ready' && (
                        <div className="flex flex-wrap justify-start gap-2">
                          <button 
                            className="flex items-center px-2 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                            onClick={() => handleCreateTask(item)}
                          >
                            <FiPlay className="mr-1" /> Task
                          </button>
                          <button className="flex items-center px-2 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]">
                            <FiDownload className="mr-1" /> Recording
                          </button>
                          <button 
                            className="flex items-center px-2 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                            onClick={() => handleViewTranscript(item)}
                          >
                            <FiFileText className="mr-1" /> Meeting Transcript
                          </button>
                          <button 
                            className="flex items-center px-2 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                            onClick={() => handleAddToPlaylist(item)}
                          >
                            <FiList className="mr-1" /> Add To Playlist
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Updated Meeting Summary Modal */}
      <Modal
        isOpen={!!viewingItem}
        onClose={handleCloseView}
        title=""
        content={
          <div>
            <div>
              <h3 className="text-xl text-center pb-5">AI Meeting Summary</h3>
              <div className="border-t border-gray-500 mt-3 mb-4 -mx-4"></div>
              
              <div style={{ color: '#5E5E5E' }} className="mb-6">
                <p className="text-lg text-left mb-4">Meeting Topic - {viewingItem?.agenda}</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-2" />
                    <span>{viewingItem && formatLongDate(viewingItem.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="text-gray-500 mr-2" />
                    <span>
                      {viewingItem && formatTime(viewingItem.startTime)} - 
                      {viewingItem && formatTime(viewingItem.endTime)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-500 mt-3 mb-4 -mx-4"></div>
              
              {/* Summary enclosed in a box */}
              <div className="mt-6 border border-[#878787] rounded-lg p-4 bg-white">
                <p className="text-gray-700 leading-relaxed">
                  {viewingItem?.summary || 'No meeting summary available.'}
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleCloseView}
                  className="flex items-center px-6 py-2 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        }
        showFooter={false}
        width="max-w-4xl"
      />

      {/* Updated Transcript Modal */}
      <Modal
        isOpen={!!viewingTranscriptItem}
        onClose={handleCloseTranscript}
        title=""
        content={
          <div className="">
            <div className="mb-6">
              <div className="text-center">
                <h3 className="text-xl">Meeting Transcript</h3>
              </div>
              <div className="border-t border-gray-500 mt-3 mb-4 -mx-4"></div>
            </div>
            
            <div style={{ color: '#5E5E5E' }} className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex items-center">
                <FiCalendar className="text-gray-500 mr-2" />
                <p className="text-lg font-medium">
                  {viewingTranscriptItem && formatLongDate(viewingTranscriptItem.date)}
                </p>
              </div>
              <div className="flex items-center">
                <FiClock className="text-gray-500 mr-2" />
                <p className="text-gray-600">
                  {viewingTranscriptItem && formatTime(viewingTranscriptItem.startTime)} - 
                  {viewingTranscriptItem && formatTime(viewingTranscriptItem.endTime)}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-500 mt-3 mb-4 -mx-4"></div>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleDownloadTranscript}
                className="flex items-center px-3 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
              >
                <FiDownload className="mr-2" />
                Meeting Transcript
              </button>
            </div>

            <div className="border border-[#878787] rounded-lg p-4 max-h-[50vh] overflow-y-auto ">
              <pre className="whitespace-pre-wrap font-sans text-gray-700">
                {viewingTranscriptItem?.transcript || 'No meeting transcript available.'}
              </pre>
            </div>

            <div className="flex justify-center space-x-3 mt-4">
              <button
                onClick={handleCloseTranscript}
                className="px-4 py-2 border bg-[#7991BB] text-white rounded-md hover:bg-[#6a82b0]"
              >
                Close
              </button>
            </div>
          </div>
        }
        showFooter={false}
        width="max-w-5xl"
      />

      {/* Add to Playlist Modal */}
      <Modal
        isOpen={!!addingToPlaylistItem}
        onClose={handleClosePlaylistForm}
        title=""
        content={
          <div className="flex justify-center">
            <AddToPlaylistForm
              onSubmit={handlePlaylistSubmit}
              onCancel={handleClosePlaylistForm}
            />
          </div>
        }
        showFooter={false}
        width="max-w-xl"
      />

      {/* Task Assignment Modal */}
      {showTaskAssignment && viewingTaskItem && (
        <Modal
          isOpen={showTaskAssignment}
          onClose={handleCloseTaskView}
          title=""
          content={
            taskAssignmentStep === 1 ? (
              <div className="p-4">
                <div className="mb-6">
                  <div className="text-center">
                    <h3 className="">Meeting Task Title: {viewingTaskItem.agenda}</h3>
                  </div>
                  <div className="border-t border-gray-400 mt-3 mb-4 -mx-4"></div>
                </div>
                
                <div style={{ color: '#5E5E5E' }} className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-2" />
                    <p className="font-medium">
                      {formatLongDate(viewingTaskItem.date)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="text-gray-500 mr-2" />
                    <p className="text-gray-600">
                      {formatTime(viewingTaskItem.startTime)} - 
                      {formatTime(viewingTaskItem.endTime)}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-400 mb-4 -mx-4"></div>

                <div className="border border-gray-300 rounded-lg p-4 mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h4 className="text-lg">Task 1</h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTaskAssignmentStep(2)}
                        className="px-4 py-2 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={handleCloseTaskView}
                    className="px-6 py-2 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <MeetingTaskForm
                ref={taskFormRef}
                initialTopic={`Follow up: ${viewingTaskItem?.agenda || ''}`}
                onSubmit={handleTaskSubmit}
                taskMode={taskFormMode}
                onTaskModeChange={setTaskFormMode}
              />
            )
          }
          showFooter={false}
          width={taskAssignmentStep === 1 ? "max-w-4xl" : "max-w-6xl"}
        />
      )}
    </div>
  );
};

export default Allmeetings;
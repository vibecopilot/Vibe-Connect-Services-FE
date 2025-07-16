import React, { useState, useRef } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import { 
  FiTrash2, FiEdit, FiFileText, FiDownload, FiPlay, FiList, FiEye, 
  FiCalendar, FiClock, FiX, FiPlusCircle, FiUpload 
} from "react-icons/fi";
import Tabs from '../../components/Tabs';
import TopBar from '../../components/TopBar'; 
import MymeetingsForm from '../../forms/MymeetingsForm'; 
import type { MymeetingsFormHandle } from '../../forms/MymeetingsForm';
import type { MeetingTaskFormHandle } from '../../forms/MeetingTaskForm';
import MeetingTaskForm from '../../forms/MeetingTaskForm';
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
  status?: 'ready' | 'processing'; 
  summary?: string; 
  transcript?: string;
}

const Mymeetings: React.FC = () => {
  const [scheduledItems, setScheduledItems] = useState<Item[]>([]);
  const [conductedItems, setConductedItems] = useState<Item[]>([
    {
      id: 1,
      agenda: 'Review Meeting',
      date: '2025-06-04',
      startTime: '12:00',
      endTime: '15:30',
      createdBy: 'John Doe',
      status: 'processing',
      summary: 'The team reviewed Q2 milestones, noting that 80% of sprint goals were achieved. Key highlights included successful deployment of the new LMS integration and reduction in bug backlog by 35%. Delays in the mobile app update were discussed, with revised timelines proposed. Action items were assigned for final testing and UI enhancements before the next release cycle.',
      transcript: 'John: Welcome everyone to our quarterly review...\nSarah: Thank you John. I wanted to highlight...'
    },
    {
      id: 2,
      agenda: 'Review Meeting',
      date: '2025-06-04',
      startTime: '12:00',
      endTime: '13:00',
      createdBy: 'Jane Smith',
      status: 'ready',
      summary: 'The kickoff meeting for the new project was held. The project scope, timeline, and responsibilities were discussed.',
      transcript: `Rohan (PM):  \nLet’s start with quick updates. Kartik, how’s the Meeting Module backend coming along?  \nKartik (Backend):  \nAPI integration is 80% done. I’m finishing up the "Shared with Me" logic today. Facing one issue with token expiration – will check with DevOps.  \nRohan:  \nCool. Let me know if you need help escalating that. Ayesha, UI updates?  \nAyesha (UI/UX):`
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [viewingItem, setViewingItem] = useState<Item | null>(null); 
  const [viewingTaskItem, setViewingTaskItem] = useState<Item | null>(null);
  const [viewingTranscriptItem, setViewingTranscriptItem] = useState<Item | null>(null);
  const [addingToPlaylistItem, setAddingToPlaylistItem] = useState<Item | null>(null);
  const formRef = useRef<MymeetingsFormHandle>(null);
  const taskFormRef = useRef<MeetingTaskFormHandle>(null);
  const [showTaskAssignment, setShowTaskAssignment] = useState(false);
  const [taskAssignmentStep, setTaskAssignmentStep] = useState(1);
  const [taskFormMode, setTaskFormMode] = useState<'setTask' | 'assignTask'>('setTask');

  const handleFormSubmit = (formData: any) => {
    if (editingItem) {
      const updatedItems = scheduledItems.map(item => 
        item.id === editingItem.id ? { 
          ...item, 
          agenda: formData.meetingTopic,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          meetingLink: formData.meetingLink
        } : item
      );
      setScheduledItems(updatedItems);
    } else {
      const newItem: Item = {
        id: Date.now(),
        agenda: formData.meetingTopic,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        createdBy: 'Admin',
        meetingLink: formData.meetingLink
      };
      setScheduledItems([...scheduledItems, newItem]);
    }
    setIsFormVisible(false);
    setEditingItem(null);
  };

  const markAsCompleted = (id: number) => {
    const meeting = scheduledItems.find(item => item.id === id);
    if (meeting) {
      setScheduledItems(scheduledItems.filter(item => item.id !== id));
      setConductedItems([
        ...conductedItems,
        {
          ...meeting,
          status: 'processing',
          summary: '',
          transcript: ''
        }
      ]);
    }
  };

  const handleDelete = (id: number) => {
    if (activeTab === 'upcoming') {
      setScheduledItems(scheduledItems.filter(item => item.id !== id));
    } else {
      setConductedItems(conductedItems.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsFormVisible(true);
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
    setTaskFormMode('setTask');
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

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingItem(null);
  };

  const handleDeleteForm = () => {
    if (editingItem) {
      handleDelete(editingItem.id);
      setIsFormVisible(false);
      setEditingItem(null);
    }
  };

  const handleButtonClick = (type: string) => {
    switch(type) {
      case 'Meeting Invite':
        setActiveTab('upcoming');
        setEditingItem(null);
        setIsFormVisible(true);
        break;
      case 'Upload':
        console.log('Exporting data');
        break;
      default:
        break;
    }
  };

  const handleViewReport = (id: number) => {
    console.log('Viewing report for', id);
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
      safeToString(item.endTime).includes(searchTerm)
    );
  };

  const filteredScheduled = scheduledItems.filter(matchesSearchTerm);
  const filteredConducted = conductedItems.filter(matchesSearchTerm);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentScheduled = filteredScheduled.slice(indexOfFirstItem, indexOfLastItem);
  const currentConducted = filteredConducted.slice(indexOfFirstItem, indexOfLastItem);
  
  const scheduledTotalPages = Math.ceil(filteredScheduled.length / itemsPerPage);
  const conductedTotalPages = Math.ceil(filteredConducted.length / itemsPerPage);

  const tabs = [
    { label: 'Upcoming', key: 'upcoming' },
    { label: 'Completed', key: 'completed' }
  ];

  return (
    <div>
      {!isFormVisible && (
        <>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            orientation="horizontal"
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <TopBar 
              onSearch={setSearchTerm}
              onButtonClick={handleButtonClick}
              buttons={activeTab === 'upcoming' 
                ? [
                    { label: 'Meeting Invite', icon: <FiPlusCircle className="mr-2" /> },
                    { label: 'Upload', icon: <FiUpload className="mr-2" /> }
                  ] 
                : [
                    { label: 'Upload', icon: <FiUpload className="mr-2" /> }
                  ]}
            />
            <div className="ml-auto">
              <Pagination
                currentPage={currentPage}
                totalPages={activeTab === 'upcoming' ? scheduledTotalPages : conductedTotalPages}
                totalItems={activeTab === 'upcoming' ? filteredScheduled.length : filteredConducted.length}
                onPageChange={setCurrentPage}
                showControls={true}
              />
            </div>
          </div>
        </>
      )}

      {/* Added mt-6 (top margin) to this form container */}
      {isFormVisible && (
        <div className="mb-6 mt-1 rounded-lg">
          <MymeetingsForm 
            ref={formRef}
            initialData={editingItem || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            onDelete={editingItem ? handleDeleteForm : undefined}
          />
        </div>
      )}

      {!isFormVisible && activeTab === 'upcoming' && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead 
                columns={[
                  { label: 'Actions', align: 'center'},
                  { label: 'Agenda' , align: 'center'},
                  { label: 'Date' , align: 'center'},
                  { label: 'Start Time' , align: 'center'},
                  { label: 'End Time' , align: 'center'},
                  { label: 'Created By' , align: 'center'},
                  { label: '', align: 'center' }
                ]}
              />
              <tbody>
                {currentScheduled.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="text-center py-3 pl-0">
                      <div className="flex justify-center space-x-2">
                        <IconButton onClick={() => handleViewDetails(item)}>
                          <FiEye/>
                        </IconButton>
                        <IconButton onClick={() => handleEdit(item)}>
                          <FiEdit/>
                        </IconButton>
                        <IconButton onClick={() => handleDelete(item.id)}>
                          <FiTrash2/>
                        </IconButton>
                      </div>
                    </td>
                    <td style={{ color: '#5E5E5E' }} className="text-center ">{item.agenda}</td>
                    <td style={{ color: '#5E5E5E' }} className="text-center ">{item.date}</td>
                    <td style={{ color: '#5E5E5E' }} className="text-center ">{item.startTime}</td>
                    <td style={{ color: '#5E5E5E' }} className="text-center ">{item.endTime}</td>
                    <td style={{ color: '#5E5E5E' }} className="text-center ">{item.createdBy}</td>
                    <td style={{ color: '#5E5E5E' }} className="flex justify-center py-3">
                      {item.meetingLink && (
                        <button
                          type="button"
                          className="flex items-center gap-1 px-3 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                          onClick={() => handleJoinMeeting(item.meetingLink!)}
                          >
                            <FiPlay className="w-4 h-4" />
                            <span>Join Now</span></button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!isFormVisible && activeTab === 'completed' && 
        !viewingItem && 
        !viewingTaskItem && 
        !viewingTranscriptItem && 
        !addingToPlaylistItem && (
        <div className="mt-0">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead 
                columns={[
                  { label: 'Actions', align: 'center'},
                  { label: 'Meeting Agenda',align: 'center' },
                  { label: 'Date', align: 'center' },
                  { label: 'Time', align: 'center' },
                  { label: 'Status', align: 'left' }
                ]}
              />
              <tbody>
                {currentConducted.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="text-center py-3 pl-0">
                      <div className="flex justify-center space-x-2">
                        <IconButton onClick={() => handleViewDetails(item)}>
                          <FiEye/>
                        </IconButton>
                        <IconButton onClick={() => handleEdit(item)}>
                          <FiEdit/>
                        </IconButton>
                        <IconButton onClick={() => handleDelete(item.id)}>
                          <FiTrash2/>
                        </IconButton>
                      </div>
                    </td>
                    <td style={{ color: '#5E5E5E' }} className="py-3 px-4 font-medium text-center">{item.agenda}</td>
                    <td style={{ color: '#5E5E5E' }} className="py-3 px-4 text-center">{formatDate(item.date)}</td>
                    <td style={{ color: '#5E5E5E' }} className="py-3 px-4 text-center">{formatTime(item.startTime)}</td>
                    <td style={{ color: '#5E5E5E' }} className="py-3 px-4 text-center">
                      {item.status === 'ready' ? (
                        <div className="flex flex-wrap justify-start gap-2">
                          <button 
                            className="flex items-center px-2 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                            onClick={() => handleCreateTask(item)}
                          >
                            Task
                          </button>
                          <button className="flex items-center px-2 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]">
                             Recording
                          </button>
                          <button 
                            className="flex items-center px-2 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                            onClick={() => handleViewTranscript(item)}
                          >
                            Meeting Transcript
                          </button>
                          <button 
                            className="flex items-center px-2 py-1 bg-[#7991BB] text-white rounded hover:bg-[#6a82b0]"
                            onClick={() => handleAddToPlaylist(item)}
                          >
                            Add To Playlist
                          </button>
                        </div>
                      ) : (
                        <button className="bg-[#7991BB] text-white px-2 py-1 rounded flex justify-start">
                          Processing/Transcribing
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Meeting Details Modal - Updated with summary box */}
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

      {/* Transcript Modal */}
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
                    <h3 className="text-xl">Meeting Task Title: {viewingTaskItem.agenda}</h3>
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

export default Mymeetings;
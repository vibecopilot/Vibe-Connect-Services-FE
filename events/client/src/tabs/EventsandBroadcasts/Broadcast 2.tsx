import React, { useState, useRef } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import type { BroadcastFormHandle, BroadcastFormData } from '../../forms/BroadcastForm';
import BroadcastForm from '../../forms/BroadcastForm';

interface Item {
  id: number;
  title: string;
  venue: string;
  description: string;
  createdBy: string;
  startDate: string;
  endDate: string;
  eventType: string;
  status: string;
  attachments: string[];
  mediaTheme: string;
  phoneOrVideo: string;
  recommendedThemes: { 
    title: string; 
    words: string; 
    description: string 
  }[];
  important: boolean;
  email: string;
  url: string;
  shareMessage: string;
  displayedImage: string | null;
}

const Broadcast: React.FC = () => {
  const [editingEvent, setEditingEvent] = useState<Item | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<Item[]>([
    {
      id: 1,
      title: 'Fit Out Bounds/Checklist',
      venue: 'Fitout',
      description: 'Fit Out Bounds',
      createdBy: 'Admin',
      startDate: '2022-02-02',
      endDate: '2022-01-01',
      eventType: 'Fitout',
      status: 'Active',
      attachments: ['None'],
      mediaTheme: 'Professional',
      phoneOrVideo: '',
      recommendedThemes: [{ title: 'Standard', words: 'Fitout', description: 'Standard fitout theme' }],
      important: false,
      email: '',
      url: '',
      shareMessage: '',
      displayedImage: null
    }
  ]);
  
  const formRef = useRef<BroadcastFormHandle>(null);
  const itemsPerPage = 10;
  const totalItems = events.length; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };
  
  const handleEditClick = (event: Item) => {
    setEditingEvent(event);
    setShowForm(true);
  };
  
  const handleDeleteClick = (event: Item) => {
    const updatedEvents = events.filter(e => e.id !== event.id);
    setEvents(updatedEvents);
  };

  const handleFormSubmit = (formData: BroadcastFormData) => {
    if (editingEvent) {
      const updatedEvents = events.map(e => 
        e.id === editingEvent.id ? { 
          ...e, 
          ...formData,
          startDate: formData.startDate || e.startDate,
          endDate: formData.endDate || e.endDate
        } : e
      );
      setEvents(updatedEvents);
    } else {
      const newEvent: Item = {
        ...formData,
        id: events.length + 1,
        createdBy: 'Admin',
        startDate: formData.startDate || new Date().toISOString().split('T')[0],
        endDate: formData.endDate || new Date().toISOString().split('T')[0],
        recommendedThemes: [],
        displayedImage: formData.displayedImage || null
      };
      setEvents([...events, newEvent]);
    }
    setShowForm(false);
    setEditingEvent(null);
  };

  const currentEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Search">
              <FiSearch className="w-5 h-5 text-gray-500" />
            </button>
            <button 
              onClick={handleAddEvent}
              className="text-black border px-4 py-2 rounded-md"
            >
              Add Broadcast
            </button>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
              showControls={true}
            />
          </div>
        </div>
        {showForm ? (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <BroadcastForm 
              ref={formRef}
              initialData={editingEvent || undefined}
              onSubmit={handleFormSubmit}  
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead
                columns={[
                  { label: "Actions", align: "center" },
                  { label: "Title" },
                  { label: "Venue" },
                  { label: "Description" },
                  { label: "Created By" },
                  { label: "Start Date" },
                  { label: "End Date" },
                  { label: "Event Type" },
                  { label: "Status" },
                  { label: "Imp", align: "center" },
                  { label: "Attachments", align: "center" }
                ]}
              />
              <tbody>
                {currentEvents.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="text-center py-3">
                      <div className="flex justify-center space-x-2">
                        <IconButton 
                          tooltip="Edit" 
                          className="hover:text-green-600 transition-colors" 
                          onClick={() => handleEditClick(item)}
                        >
                          <FiEdit />
                        </IconButton>
                        <IconButton
                          tooltip="Delete"
                          className="hover:text-red-600 transition-colors"
                          onClick={() => handleDeleteClick(item)}
                        >
                          <FiTrash2 />
                        </IconButton>
                      </div>
                    </td>
                    <td className="py-3 px-4">{item.title}</td>
                    <td className="py-3 px-4">{item.venue}</td>
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4">{item.createdBy}</td>
                    <td className="py-3 px-4">{item.startDate}</td>
                    <td className="py-3 px-4">{item.endDate}</td>
                    <td className="py-3 px-4">{item.eventType}</td>
                    <td className="py-3 px-4">{item.status}</td>
                    <td className="text-center py-3 px-4">
                      {item.important ? "Yes" : "No"}
                    </td>
                    <td className="text-center py-3 px-4">
                      {item.attachments.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Broadcast;
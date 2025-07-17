import React, { useState, useRef } from 'react';
// Importing custom components
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
// Importing icons from react-icons
import { FiEdit, FiEye, FiPaperclip } from "react-icons/fi";
// Importing form types and component
import type { BroadcastFormHandle, BroadcastFormData } from '../../forms/BroadcastForm';
import BroadcastForm from '../../forms/BroadcastForm';
import TopBar from '../../components/TopBar';
import NoDataFound from '../../components/NoDataFound';

// Interface defining the structure of a broadcast item
interface Item {
  id: number;                     // Unique identifier
  title: string;                  // Broadcast title
  venue: string;                  // Location or context
  description: string;            // Detailed description
  createdBy: string;              // Creator name
  startDate: string;              // Event start date
  endDate: string;                // Event end date
  eventType: string;              // Type of event
  status: string;                 // Current status
  attachments: string[];          // List of attachment names
  mediaTheme: string;             // Visual theme
  phoneOrVideo: string;           // Media format
  recommendedThemes: {            // Suggested themes
    title: string; 
    words: string; 
    description: string 
  }[];
  important: boolean;             // Importance flag
  email: string;                  // Contact email
  url: string;                    // Related URL
  shareMessage: string;           // Sharing text
  displayedImage: string | null;  // Featured image
}

// Main Broadcast component
const Broadcast: React.FC = () => {
  // State management
  const [editingEvent, setEditingEvent] = useState<Item | null>(null); // Currently edited item
  const [showForm, setShowForm] = useState(false);                     // Form visibility
  const [currentPage, setCurrentPage] = useState(1);                   // Pagination current page
  const [searchValue, setSearchValue] = useState("");                  // Search filter value
  
  // Sample data - in a real app this would come from an API
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
  
  // Reference to form component for imperative actions
  const formRef = useRef<BroadcastFormHandle>(null);
  const itemsPerPage = 10;  // Items per page for pagination
  
  // Show form for adding a new broadcast
  const handleAddEvent = () => {
    setEditingEvent(null);  // Clear any editing state
    setShowForm(true);      // Show form
  };
  
  // Set up form for editing an existing broadcast
  const handleEditClick = (event: Item) => {
    setEditingEvent(event);  // Set the event to edit
    setShowForm(true);       // Show form
  };
  
  // Delete a broadcast from the list
  const handleDeleteClick = (event: Item) => {
    const updatedEvents = events.filter(e => e.id !== event.id);
    setEvents(updatedEvents);  // Update state
  };

  // Handle form submission (both create and update)
  const handleFormSubmit = (formData: BroadcastFormData) => {
    // Update existing event
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
    } 
    // Create new event
    else {
      const newEvent: Item = {
        ...formData,
        id: events.length + 1,  // Generate new ID
        createdBy: 'Admin',      // Default creator
        startDate: formData.startDate || new Date().toISOString().split('T')[0],
        endDate: formData.endDate || new Date().toISOString().split('T')[0],
        recommendedThemes: [],   // Empty themes for new items
        displayedImage: formData.displayedImage || null
      };
      setEvents([...events, newEvent]);  // Add to list
    }
    
    // Reset form state
    setShowForm(false);
    setEditingEvent(null);
  };

  // Filter events based on search value
  const filteredEvents = events.filter(event =>
  searchValue === "" ||
  Object.values(event).some(value =>
    String(value).toLowerCase().includes(searchValue.toLowerCase())
  ));
  
  // Pagination calculations
  const totalItems = filteredEvents.length; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current page items
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div>
        {/* Top Bar with search and controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
          <TopBar
            onSearch={setSearchValue}           // Set search filter
            onButtonClick={handleAddEvent}      // Handle add button
            buttons={["Add Broadcast"]}         // Button configuration
          />
          
          {/* Pagination controls */}
          <div className="flex items-center gap-4 ml-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={setCurrentPage}     // Handle page navigation
              showControls={true}               // Show page controls
            />
          </div>
        </div>

        {/* Conditionally render form or data table */}
        {showForm ? (
          <div className="mb-6 p-4">
            <BroadcastForm 
              ref={formRef}
              initialData={editingEvent || undefined}  // Pass data for editing
              onSubmit={handleFormSubmit}              // Handle submission
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Show table if data exists */}
            {currentEvents.length > 0 ? (
              <table className="min-w-full table-auto text-[#5E5E5E] border border-gray-200">
                {/* Table header */}
                <TableHead
                  columns={[
                    { label: "Actions", align: "center"},
                    { label: "Title", align: "center"},
                    { label: "Venue", align: "center"},
                    { label: "Description", align: "center"},
                    { label: "Created By", align: "center"},
                    { label: "Start Date", align: "center"},
                    { label: "End Date", align: "center"},
                    { label: "Event Type", align: "center"},
                    { label: "Status", align: "center"},
                    { label: "Imp", align: "center" },
                    { label: "Attachments", align: "center" }
                  ]}
                />
                {/* Table body */}
                <tbody>
                  {currentEvents.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      {/* Action buttons */}
                      <td className="text-center py-3">
                        <div className="flex justify-center space-x-2">
                          <IconButton tooltip="View" onClick={() => console.log("View")}> 
                            <FiEye /> 
                          </IconButton>
                          <IconButton 
                            tooltip="Edit" 
                            onClick={() => handleEditClick(item)}
                          >
                            <FiEdit />
                          </IconButton>
                        </div>
                      </td>
                      
                      {/* Data fields */}
                      <td className="py-3 px-4 text-center">{item.title}</td>
                      <td className="py-3 px-4 text-center">{item.venue}</td>
                      <td className="py-3 px-4 text-center">{item.description}</td>
                      <td className="py-3 px-4 text-center">{item.createdBy}</td>
                      <td className="py-3 px-4 text-center">{item.startDate}</td>
                      <td className="py-3 px-4 text-center">{item.endDate}</td>
                      <td className="py-3 px-4 text-center">{item.eventType}</td>
                      <td className="py-3 px-4 text-center">{item.status}</td>
                      <td className="text-center py-3 px-4">
                        {item.important ? "Yes" : "No"}
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex justify-center gap-2">
                          {item.attachments.map((_, index) => (
                            <FiPaperclip key={index} className="text-[#7991BB] w-5 h-5" />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // Show empty state when no data
              <NoDataFound />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Broadcast;
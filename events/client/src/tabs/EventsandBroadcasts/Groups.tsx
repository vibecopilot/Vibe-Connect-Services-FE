import React, { useState, useRef } from 'react';
// Importing custom components
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
// Importing icons from react-icons
import { FiEye, FiEdit } from "react-icons/fi";
// Importing form types and component
import type { GroupFormHandle } from '../../forms/GroupForm';
import GroupForm from '../../forms/GroupForm';
import TopBar from '../../components/TopBar';
import NoDataFound from '../../components/NoDataFound';

// Interface defining the structure of a group
interface Group {
  id: number;                 // Unique identifier
  groupName: string;          // Name of the group
  createdOn: string;          // Creation date
  createdBy: string;          // Creator name
  numberOfMembers: number;    // Member count
}

// Interface for form data structure (matches GroupForm component)
interface GroupFormData {
  groupName: string;
  description: string;
  profilePicture: string | null;
  members: {
    name: string;
    email: string;
    role: string;
  }[];
  privacySettings: {
    search: string;
    join: string;
  };
  groupDetails: string;
  fontStyle: string;
  fontSize: string;
  fontWeight: string;
  textColor: string;
  lineSpacing: string;
  bullets: string;
  dropCap: boolean;
  directlyAddMembers: boolean;
  groupEmail: string;
}

// Main Groups component
const Groups: React.FC = () => {
  // State management
  const [editingGroup, setEditingGroup] = useState<Group | null>(null); // Currently edited group
  const [showForm, setShowForm] = useState(false);                     // Form visibility toggle
  const [groups, setGroups] = useState<Group[]>([                     // Groups data
    {
      id: 1,
      groupName: 'Vibe sports team',
      createdOn: '2023-01-15',
      createdBy: 'Ravi Parmar',
      numberOfMembers: 25
    },
    {
      id: 2,
      groupName: 'Vibe Marketing team',
      createdOn: '2023-02-20',
      createdBy: 'Pankti',
      numberOfMembers: 10
    }
  ]);
  
  // Refs and pagination state
  const formRef = useRef<GroupFormHandle>(null);  // Form reference
  const [currentPage, setCurrentPage] = useState(1);  // Current page
  const [searchValue, setSearchValue] = useState(""); // Search filter
  const itemsPerPage = 10;  // Items per page

  // Show form for creating a new group
  const handleCreateGroup = () => {
    setEditingGroup(null);  // Clear any editing state
    setShowForm(true);      // Show form
  };

  // Handle form submission (create/update)
  const handleFormSubmit = (formData: GroupFormData) => {
    if (editingGroup) {
      // Update existing group
      const updatedGroups = groups.map(g => 
        g.id === editingGroup.id ? { 
          ...g, 
          groupName: formData.groupName,
          // In a real app, would update other fields too
        } : g
      );
      setGroups(updatedGroups);
    } else {
      // Create new group
      const newGroup: Group = {
        id: groups.length + 1,  // Generate new ID
        groupName: formData.groupName,
        createdOn: new Date().toISOString().split('T')[0], // Current date
        createdBy: 'Admin', // Would come from auth in real app
        numberOfMembers: formData.members.length // Count from form data
      };
      setGroups([...groups, newGroup]);
    }
    // Reset form state
    setShowForm(false);
    setEditingGroup(null);
  };

  // Delete a group
  const handleDeleteClick = (group: Group) => {
    const updatedGroups = groups.filter(g => g.id !== group.id);
    setGroups(updatedGroups);
  };

  // Filter groups based on search value (searches all string fields)
  const filteredGroups = groups.filter(group =>
    searchValue === "" ||
    Object.values(group).some(value =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
  );
  
  // Pagination calculations
  const totalItems = filteredGroups.length; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current page items
  const currentGroups = filteredGroups.slice(
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
            onButtonClick={handleCreateGroup}   // Handle create button
            buttons={["Create Group"]}         // Button configuration
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
            <GroupForm 
              ref={formRef}
              initialData={editingGroup || undefined}  // Pass data for editing
              onSubmit={handleFormSubmit}             // Handle submission
              onCancel={() => setShowForm(false)}     // Handle cancel
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Show table if groups exist */}
            {currentGroups.length > 0 ? (
              <table className="min-w-full table-auto border border-gray-200 text-[#5E5E5E]">
                {/* Table header */}
                <TableHead
                  columns={[
                    { label: "Actions", align: "center"},
                    { label: "Group Name", align: "center"},
                    { label: "Created On", align: "center"},
                    { label: "Created By", align: "center"},
                    { label: "Number of Members", align: "center" }
                  ]}
                />
                {/* Table body */}
                <tbody>
                  {currentGroups.map((group) => (
                    <tr key={group.id} className="border-b border-gray-200 hover:bg-gray-50">
                      {/* Action buttons */}
                      <td className="text-center py-3">
                        <div className="flex justify-center space-x-2">
                          <IconButton tooltip="View" onClick={() => console.log("View")}> 
                            <FiEye /> 
                          </IconButton>
                          <IconButton
                            tooltip="Edit Group"
                            onClick={() => {
                              setEditingGroup(group); // Set group to edit
                              setShowForm(true);      // Show form
                            }}
                          >
                            <FiEdit />
                          </IconButton>
                        </div>
                      </td>
                      
                      {/* Data fields */}
                      <td className="py-3 px-4 text-center">{group.groupName}</td>
                      <td className="py-3 px-4 text-center">{group.createdOn}</td>
                      <td className="py-3 px-4 text-center">{group.createdBy}</td>
                      <td className="py-3 px-4 text-center">{group.numberOfMembers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // Show empty state when no groups match filters
              <NoDataFound />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
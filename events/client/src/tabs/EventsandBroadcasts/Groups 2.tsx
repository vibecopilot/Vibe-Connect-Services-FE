import React, { useState, useRef } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import { FiTrash2, FiEdit, FiSearch } from "react-icons/fi";
import type { GroupFormHandle } from '../../forms/GroupForm';
import GroupForm from '../../forms/GroupForm';

interface Group {
  id: number;
  groupName: string;
  createdOn: string;
  createdBy: string;
  numberOfMembers: number;
  category: string;
}

const Groups: React.FC = () => {
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      groupName: 'Marketing Team',
      createdOn: '2023-01-15',
      createdBy: 'Admin',
      numberOfMembers: 12,
      category: 'Team'
    },
    {
      id: 2,
      groupName: 'Project Alpha',
      createdOn: '2023-02-20',
      createdBy: 'Manager',
      numberOfMembers: 8,
      category: 'Project'
    },
    {
      id: 3,
      groupName: 'Leadership Council',
      createdOn: '2023-03-10',
      createdBy: 'CEO',
      numberOfMembers: 5,
      category: 'Management'
    }
  ]);
  
  const formRef = useRef<GroupFormHandle>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = groups.length; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handleCreateGroup = () => {
    setEditingGroup(null);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: GroupFormData) => {
    if (editingGroup) {
      // Update existing group
      const updatedGroups = groups.map(g => 
        g.id === editingGroup.id ? { 
          ...g, 
          groupName: formData.groupName,
          // Update other fields as needed
        } : g
      );
      setGroups(updatedGroups);
    } else {
      // Create new group
      const newGroup: Group = {
        id: groups.length + 1,
        groupName: formData.groupName,
        createdOn: new Date().toISOString().split('T')[0],
        createdBy: 'Admin', // or get from auth context
        numberOfMembers: formData.members.length,
        category: 'General' // or get from form data if available
      };
      setGroups([...groups, newGroup]);
    }
    setShowForm(false);
    setEditingGroup(null);
  };

  const handleDeleteClick = (group: Group) => {
    const updatedGroups = groups.filter(g => g.id !== group.id);
    setGroups(updatedGroups);
  };

  const currentGroups = groups.slice(
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
              type="button"
              className="px-4 py-2 text-black border rounded-md"
              onClick={handleCreateGroup}
            >
              Create Group
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
            <GroupForm 
              ref={formRef}
              initialData={editingGroup || undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead
                columns={[
                  { label: "Actions", align: "center" },
                  { label: "Group Name" },
                  { label: "Created On" },
                  { label: "Created By" },
                  { label: "Number of Members", align: "center" },
                  { label: "Category" }
                ]}
              />
              <tbody>
                {currentGroups.map((group) => (
                  <tr key={group.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="text-center py-3">
                      <div className="flex justify-center space-x-2">
                        <IconButton
                          tooltip="Edit Group"
                          className="hover:text-green-600 transition-colors"
                          onClick={() => setEditingGroup(group)}
                        >
                          <FiEdit />
                        </IconButton>
                        <IconButton
                          tooltip="Delete Group"
                          className="hover:text-red-600 transition-colors"
                          onClick={() => handleDeleteClick(group)}
                        >
                          <FiTrash2 />
                        </IconButton>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{group.groupName}</td>
                    <td className="py-3 px-4">{group.createdOn}</td>
                    <td className="py-3 px-4">{group.createdBy}</td>
                    <td className="py-3 px-4 text-center">{group.numberOfMembers}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-black">
                        {group.category}
                      </span>
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

export default Groups;
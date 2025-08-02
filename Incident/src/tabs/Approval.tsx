import React, { useState, useEffect } from 'react';
import TextInput from '../components/TextInput';
import Pagination from '../components/Pagination';
import NoDataFound from '../components/NoDataFound'; 
import { FiTrash2 } from 'react-icons/fi';


const PAGE_SIZE = 5;

const userOptions = [
  'Anurag Sharma',
  'Aniket Parkar',
  'Vibe Connect Admin',
  'Ravindra Sahani',
  'Pankti Sheth',
  'Namrata Takale',
  'Sejal Meher',
  'Neeraj Shah',
  'Mayank More',
  'Sanket Pawar',
  'Mohit Pasi',
];

const Approval = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(userOptions);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const filtered = userOptions.filter((user) =>
      user.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAddClick = () => {
    setShowForm(true);
    setSubmitted(false);
  }; 
  const handleDeleteUser = (user: string) => {
    const updatedUsers = selectedUsers.filter((u) => u !== user);
    setSelectedUsers(updatedUsers);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedUsers(values);
  };

  const handleSubmit = () => {
    console.log('Submitted Users:', selectedUsers);
    setSubmitted(true);
    setShowForm(false);
    setSelectedUsers([]);
  };

  return (
    <div className="p-5 bg-white rounded-md shadow-sm">
      {/* Add Button */}
      {!showForm && !submitted && (
        <button
          className="bg-gray-200 border border-gray-400 px-4 py-2 text-sm rounded hover:bg-gray-300"
          onClick={handleAddClick}
        >
          Add Approval Setup
        </button>
      )}

      {/* Form Section */}
      {showForm && (
        <div className="mt-4 space-y-4 max-w-md">
          <TextInput
            name="search"
            label="Search Users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to filter users..."
          />

          <label className="block font-medium">Select Users</label>
          {paginatedUsers.length > 0 ? (
            <>
              <select
                multiple
                value={selectedUsers}
                onChange={handleSelectChange}
                className="w-full border rounded p-2 h-40"
              >
                {paginatedUsers.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={filteredUsers.length}
                onPageChange={setPage}
              />

              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSelectedUsers([]);
                  }}
                  className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <NoDataFound />
          )}
        </div>
      )}

      {/* Success Message */}
      {submitted && (
        <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded">
          Submitted Successfully ✔
        </div>
      )}

      {selectedUsers.length > 0 && (
        <div className="mt-6">
          <table className="min-w-[300px] border border-gray-200 rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedUsers.map((user) => (
                <tr key={user}>
                  <td className="px-4 py-2">{user}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Approval;

import React, { useState } from 'react';
import { FiPhone, FiVideo, FiMoreVertical } from 'react-icons/fi';
import TopSearch from '../../components/TopSearch';

interface TeamMember {
  id: string;
  name: string;
  domain: string;
  avatar: string;
}

const Team: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      domain: 'Frontend Developer',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: '2',
      name: 'Michael Chen',
      domain: 'Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      domain: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
    }
  ]);

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleButtonClick = (type: string) => {
    console.log(`Button clicked: ${type}`);
  };

  const handleCall = (member: TeamMember) => {
    console.log(`Calling ${member.name}`);
  };

  const handleVideoCall = (member: TeamMember) => {
    console.log(`Video calling ${member.name}`);
  };

  const handleMenu = (member: TeamMember) => {
    console.log(`Menu clicked for ${member.name}`);
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TopSearch
        onSearch={handleSearch}
        onButtonClick={handleButtonClick}
        buttons={[]}
        isSearchOpen={isSearchOpen}
        searchTerm={searchTerm}
        placehoder="Search Contacts"
        setSearchTerm={setSearchTerm}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-gray-100 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Header with Menu */}
            <div className="flex justify-end">
              <button
                onClick={() => handleMenu(member)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiMoreVertical size={16} />
              </button>
            </div>

            {/* Avatar and Info */}
            <div className="flex items-center mb-4 -mt-6">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-xs">
                  {member.domain}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-start gap-3">
              <button
                onClick={() => handleCall(member)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Call"
              >
                <FiPhone size={18} />
              </button>
              <button
                onClick={() => handleVideoCall(member)}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                title="Video Call"
              >
                <FiVideo size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          No contacts found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default Team;
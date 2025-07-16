import Pagination from '../../components/Pagination';
import React, { useState, useRef } from 'react';
import TopBar from '../../components/TopBar';
import AddToPlaylistForm from '../../forms/AddToPlaylistForm';
import type { PlaylistFormHandle, PlaylistFormData } from '../../forms/AddToPlaylistForm';
import Modal from '../../components/Modal'; // Import Modal component

interface Playlist {
  id: string;
  name: string;
  access: string;
  meetingCount: number;
  createdDate: string;
}

const Playlist: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const playlistFormRef = useRef<PlaylistFormHandle>(null);

  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Sales Pitch- My Citi',
      access: 'Private',
      meetingCount: 12,
      createdDate: '2023-07-15',
    }
  ]);

  const handleButtonClick = (type: string) => {
    if (type === 'Create Playlist') {
      setShowPlaylistForm(true);
    }
  };

  const handleCreatePlaylist = (data: PlaylistFormData) => {
    if (data.type === 'new') {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: data.name!,
        access: data.access!,
        meetingCount: 0,
        createdDate: new Date().toISOString().split('T')[0],
      };
      setPlaylists([newPlaylist, ...playlists]);
      setShowPlaylistForm(false);
    }
  };

  const filteredPlaylists = playlists.filter(
    (playlist) =>
      playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.access.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlaylists = filteredPlaylists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPlaylists.length / itemsPerPage);

  return (
    <div>
      <div className="flex flex-col justify-between items-start mt-2">
        <TopBar
          onSearch={setSearchTerm}
          onButtonClick={handleButtonClick}
          buttons={['Create Playlist']}
          className="w-full"
        />
        <div className="mt-1 w-full flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredPlaylists.length}
            onPageChange={setCurrentPage}
            showControls={true}
          />
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="mt-2 ml-13">
        {filteredPlaylists.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="mx-auto h-16 w-16 bg-gray-200 rounded-md mb-4" />
            <p className="text-lg">No playlists found</p>
            <button
              onClick={() => setShowPlaylistForm(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create New Playlist
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
            {currentPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="w-full max-w-xs border border-[#878787] rounded-lg overflow-hidden flex flex-col"
              >
                <div className="bg-gray-100 border-b border-[#878787] h-40 flex items-center justify-center" />
                <div className="p-4 bg-white">
                  <h3 className="text-lg text-gray-800 truncate">
                    {playlist.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Playlist Modal */}
      <Modal
        isOpen={showPlaylistForm}
        onClose={() => setShowPlaylistForm(false)}
        title=""
        content={
          <div className="p-4">
            <AddToPlaylistForm
              ref={playlistFormRef}
              onCancel={() => setShowPlaylistForm(false)}
              onSubmit={handleCreatePlaylist}
              creationMode={true}
            />
          </div>
        }
        showFooter={false}
        width="max-w-xl"
      />
    </div>
  );
};

export default Playlist;
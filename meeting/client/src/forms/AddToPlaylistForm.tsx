import React, { 
  forwardRef, 
  useImperativeHandle, 
  useState, 
  useEffect 
} from 'react';
// Importing custom form components
import TextInput from '../components/TextInput';
import Checkbox from '../components/Checkbox';
import Select from '../components/Select';

// Interface defining the structure of playlist form data
export interface PlaylistFormData {
  type: 'existing' | 'new';  // Determines if using existing or creating new playlist
  playlistId?: string;       // ID of existing playlist (if type is 'existing')
  name?: string;            // Name of new playlist (if type is 'new')
  access?: string;          // Access level for new playlist
}

// Interface for methods exposed via component ref
export interface PlaylistFormHandle {
  getPayload: () => PlaylistFormData | null;  // Returns form data or null if invalid
  resetForm: () => void;                     // Resets form to initial state
}

// Component props definition
interface PlaylistFormProps {
  onCancel: () => void;                      // Cancel callback
  onSubmit?: (data: PlaylistFormData) => void; // Submit callback
  existingPlaylists?: { id: string; name: string }[]; // Optional list of existing playlists
}

const AddToPlaylistForm = forwardRef<PlaylistFormHandle, PlaylistFormProps>(
  ({ onCancel, onSubmit, existingPlaylists = [
    // Default playlists if none provided
    { id: '1', name: 'Weekly Meetings' },
    { id: '2', name: 'Client Reviews' },
    { id: '3', name: 'Team Updates' },
  ] }, ref) => {
    // Form state management
    const [useExistingPlaylist, setUseExistingPlaylist] = useState(true);
    const [useNewPlaylist, setUseNewPlaylist] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [newPlaylistAccess, setNewPlaylistAccess] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Clear errors when switching between existing/new playlist options
    useEffect(() => {
      setErrors({});
    }, [useExistingPlaylist, useNewPlaylist]);

    // Prepare options for Select dropdown
    const playlistOptions = [
      { value: '', label: 'Choose a playlist' }, // Default option
      ...existingPlaylists.map(p => ({ value: p.id, label: p.name }))
    ];

    // Handle checkbox toggle between existing/new playlist
    const handleCheckboxChange = (type: 'existing' | 'new') => {
      if (type === 'existing') {
        setUseExistingPlaylist(true);
        setUseNewPlaylist(false);
      } else {
        setUseExistingPlaylist(false);
        setUseNewPlaylist(true);
      }
    };

    // Validate form and prepare data for submission
    const getPayload = (): PlaylistFormData | null => {
      const newErrors: Record<string, string> = {};
      
      // Validation for existing playlist selection
      if (useExistingPlaylist && !selectedPlaylist) {
        newErrors.playlist = 'Please select a playlist';
      }
      
      // Validation for new playlist
      if (useNewPlaylist && !newPlaylistName.trim()) {
        newErrors.name = 'Playlist name is required';
      }
      
      if (useNewPlaylist && !newPlaylistAccess.trim()) {
        newErrors.access = 'Playlist access is required';
      }
      
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return null;

      // Return appropriate payload based on selection
      return useExistingPlaylist
        ? { type: 'existing', playlistId: selectedPlaylist }
        : { 
            type: 'new', 
            name: newPlaylistName, 
            access: newPlaylistAccess 
          };
    };

    // Reset form to initial state
    const resetForm = () => {
      setUseExistingPlaylist(true);
      setUseNewPlaylist(false);
      setSelectedPlaylist('');
      setNewPlaylistName('');
      setNewPlaylistAccess('');
      setErrors({});
    };

    // Expose form methods to parent via ref
    useImperativeHandle(ref, () => ({
      getPayload,
      resetForm
    }));

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const payload = getPayload();
      if (!payload) return;
      
      if (onSubmit) onSubmit(payload);
    };

    return (
      <form onSubmit={handleSubmit} className="w-full">
        {/* Form Header */}
        <div className="mb-2">
          <h2 className="text-xl text-gray-800 text-center">
            Add Meeting To Playlist
          </h2>
        </div>
        <div className="border-t border-gray-400 mb-4 -mx-4"></div>

        <div className="space-y-5">
          {/* Existing Playlist Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Checkbox
                label={<span className="text-lg">Save To Existing Playlist</span>}
                name="useExisting"
                checked={useExistingPlaylist}
                onChange={() => handleCheckboxChange('existing')}
              />
            </div>
            
            {/* Show playlist dropdown if existing playlist is selected */}
            {useExistingPlaylist && (
              <div className="ml-7">
                <Select
                  label={<span className="text-lg">Select Playlist</span>}
                  value={selectedPlaylist}
                  onChange={(e) => {
                    setSelectedPlaylist(e.target.value);
                    setErrors(prev => ({ ...prev, playlist: '' }));
                  }}
                  name="playlist"
                  options={playlistOptions}
                  error={errors.playlist}
                />
              </div>
            )}
          </div>

          {/* New Playlist Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Checkbox
                label={<span className="text-lg">Create New Playlist</span>}
                name="useNew"
                checked={useNewPlaylist}
                onChange={() => handleCheckboxChange('new')}
              />
            </div>
            
            {/* Show new playlist fields if new playlist is selected */}
            {useNewPlaylist && (
              <div className="ml-7 space-y-4">
                <TextInput
                  label={<span className="text-lg">Playlist Name</span>}
                  value={newPlaylistName}
                  onChange={(e) => {
                    setNewPlaylistName(e.target.value);
                    setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  error={errors.name}
                  placeholder="Enter Playlist Name"
                />
                
                <TextInput
                  label={<span className="text-lg font-medium">Playlist Access</span>}
                  value={newPlaylistAccess}
                  onChange={(e) => {
                    setNewPlaylistAccess(e.target.value);
                    setErrors(prev => ({ ...prev, access: '' }));
                  }}
                  error={errors.access}
                  placeholder="Teammates or anyone with the link"
                />
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-center space-x-3 pt-6">
            {useExistingPlaylist ? (
              <>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7991BB] text-white rounded-md text-base"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-base"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7991BB] text-white rounded-md text-base"
                >
                  Create
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    );
  }
);

export default AddToPlaylistForm;
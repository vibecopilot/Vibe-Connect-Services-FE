import type React from "react"
import { Plus } from "lucide-react"
import Avatar from "./Avatar"
import FileUpload from "./FileUpload"

interface ProfilePictureUploadProps {
  profilePicture: string | undefined
  firstName: string
  lastName: string
  onFileUpload: (files: FileList | null) => void
  onRemovePicture: () => void
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  profilePicture,
  firstName,
  lastName,
  onFileUpload,
  onRemovePicture,
}) => {
  return (
    <div className="flex items-center gap-4">
      {profilePicture ? (
        <div className="relative group">
          <Avatar src={profilePicture} name={`${firstName} ${lastName}`} size="lg" />
          <button
            type="button"
            onClick={onRemovePicture}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove profile picture"
          >
            &#x2715;
          </button>
        </div>
      ) : (
        <FileUpload
          label="Upload Doctor's Profile Picture"
          accept="image/*"
          onChange={onFileUpload}
          icon={<Plus className="w-4 h-4" />}
        />
      )}
    </div>
  )
}

export default ProfilePictureUpload
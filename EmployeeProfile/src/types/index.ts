export interface Employee {
  id: string
  name: string
  email: string
  contactNumber: string
  department: string
  team: string
  jobTitle: string
  position: string
  manager: string
  supervisor: string
  bio: string
  profileImage: string
  connections: number
  followers: number
}

export interface Post {
  id: string
  authorId: string
  author: {
    name: string
    profileImage: string
    position: string
    company: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  certificate?: string
  hasNotificationSettings?: boolean
  notificationSettings?: {
    includesAll: boolean
    workAnniversaries: boolean
  }
}

export interface Invitation {
  id: string
  name: string
  position: string
  mutualConnections: number
  profileImage: string
}

export interface Recommendation {
  id: string
  name: string
  position: string
  mutualConnections: number
  followers: number
  profileImage: string
}

export interface AppContextType {
  currentEmployee: Employee
  posts: Post[]
  invitations: Invitation[]
  recommendations: Recommendation[]
  updateEmployee: (employee: Partial<Employee>) => void
  likePost: (postId: string) => void
  acceptInvitation: (invitationId: string) => void
  ignoreInvitation: (invitationId: string) => void
  toggleNotificationSetting: (postId: string, setting: "includesAll" | "workAnniversaries") => void
}

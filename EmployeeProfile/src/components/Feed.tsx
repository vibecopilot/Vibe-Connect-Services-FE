import type React from "react"
import { useAppContext } from "../context/AppContext"
import PostCard from "./PostCard"
import InvitationsCard from "./InvitationsCard"
import RecommendationsCard from "./RecommendationsCard" // Uncommented

interface FeedProps {
  showInvitations: boolean
  showBhaktiRaut: boolean
  showRecommendations: boolean // New prop
}

const Feed: React.FC<FeedProps> = ({ showInvitations, showBhaktiRaut, showRecommendations }) => {
  const { posts } = useAppContext()

  // Find Bhakti Raut's post (author.name === "Bhakti Raut")
  const bhaktiRautPost = posts.find((post: any) => post.author && post.author.name === "Bhakti Raut")
  // Find Aryan's certificate post (author.name === "Aryan")
  const aryanPost = posts.find((post: any) => post.author && post.author.name === "Aryan")

  return (
    <div className="space-y-6" data-testid="feed-container">
      {showInvitations && <InvitationsCard />}
      {showRecommendations && <RecommendationsCard />} {/* Conditionally render RecommendationsCard */}
      {showBhaktiRaut && bhaktiRautPost && <PostCard post={bhaktiRautPost} />}
      {aryanPost && <PostCard post={aryanPost} />}
    </div>
  )
}

export default Feed

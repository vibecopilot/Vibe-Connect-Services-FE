import type React from "react"
import { useAppContext } from "../context/AppContext"

type Recommendation = {
  id: string
  name: string
  position: string
  profileImage?: string
  mutualConnections: number
  followers: number
}

const RecommendationsCard: React.FC = () => {
  const { recommendations } = useAppContext() as { recommendations: Recommendation[] }

  return (
    <div
      className="bg-white rounded-[8.94px] border-[0.89px] border-[#878787] pl-[32.18px] pr-6 py-6 transition-shadow"
      data-testid="recommendations-card"
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-[#5E5E5E]"
          style={{ fontFamily: "PT Sans", fontWeight: 700, fontSize: "30.18px", lineHeight: "100%" }} // Decreased by 2px
        >
          People To Follow Based On Your Activity
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {recommendations.map((person) => (
          <div
            key={person.id}
            className="bg-white rounded-[17.88px] p-0 text-left hover:bg-gray-50 transition-colors cursor-pointer border-[0.89px] border-[#878787] hover:shadow-sm overflow-hidden"
            data-testid={`recommendation-${person.id}`}
            style={{ height: "492.5765075683594px" }} // Explicit height for individual card
          >
            {/* Background for profile image */}
            <div className="relative h-[206.5066680908203px] bg-[#D9D9D9] rounded-t-[17.88px] rounded-bl-[18px] rounded-br-[18px]">
              {/* Profile Image */}
              <img
                src={person.profileImage || "https://randomuser.me/api/portraits/men/75.jpg"}
                alt={person.name}
                className="w-[146.61px] h-[141.25px] rounded-full object-cover shadow-md absolute left-[25px]" // Removed border-4 border-white
                style={{ top: "114.69px" }} // Positioned for 65% in shaded, 35% in white
                data-testid={`recommendation-image-${person.id}`}
              />
            </div>
            {/* Content below image */}
            <div className="pl-[25px] pr-4 pb-4 pt-[70px]">
              {" "}
              {/* Adjusted padding-top and horizontal padding */}
              <h3
                className="font-bold text-[#5E5E5E] mb-1"
                style={{ fontSize: "32.18px" }} // Updated font size for name
                data-testid={`recommendation-name-${person.id}`}
              >
                {person.name}
              </h3>
              <p
                className="text-[#5E5E5E] mb-1 whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ fontSize: "23.34px" }} // Updated font size
                data-testid={`recommendation-position-${person.id}`}
              >
                {person.position}
              </p>
              <p
                className="text-[#5E5E5E] mb-2" // Added mb-2 for gap
                style={{ fontSize: "23.34px" }} // Updated font size
                data-testid={`recommendation-connections-${person.id}`}
              >
                {person.mutualConnections} Mutual Connections
              </p>
              <p
                className="text-[#5E5E5E] mb-3"
                style={{ fontSize: "23.34px" }} // Updated font size
                data-testid={`recommendation-followers-${person.id}`}
              >
                {person.followers} Followers
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-4">
        <button
          className="text-[#5E5E5E] hover:text-blue-700 font-normal transition-colors focus:outline-none"
          style={{ fontFamily: "PT Sans", fontSize: "28.61px", lineHeight: "100%" }}
          data-testid="see-more-recommendations"
        >
          See More
        </button>
      </div>
    </div>
  )
}

export default RecommendationsCard

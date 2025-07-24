import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronsLeft } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

const navigationTabs = [
  { name: "Flight / Train Ticket Request", path: "/flight-train" },
  { name: "Hotel Request", path: "/hotel" },
  { name: "Transportation Request", path: "/transportation" },
  { name: "Travelling Allowance Request", path: "/travelling-allowance" },
]

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()

  // Determine active tab
  const getActiveTab = () => {
    if (location.pathname === "/" || location.pathname.startsWith("/flight-train")) return "/flight-train"
    if (location.pathname.startsWith("/hotel")) return "/hotel"
    if (location.pathname.startsWith("/transportation")) return "/transportation"
    if (location.pathname.startsWith("/travelling-allowance")) return "/travelling-allowance"
    return ""
  }
  const activeTab = getActiveTab()

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <header className="bg-white w-full pl-[87px]">
        <div className="flex items-center px-0 pt-4 pb-1 gap-1">
          <ChevronsLeft className="w-5 h-5 text-gray-500 ml-2" />
          <span className="ml-1 text-[15px] text-gray-500 font-normal">Setup</span>
          <ChevronsLeft className="w-5 h-5 text-gray-500 ml-4" />
          <span className="ml-1 text-[15px] text-gray-700 font-semibold">Booking Request</span>
        </div>
      </header>

      {/* Navigation Tabs - Always show them */}
      <nav className="bg-white border-b border-gray-200 w-full pl-[87px]" aria-label="Main Navigation">
        <ul className="flex flex-row items-end h-12 pl-0 ml-0">
          {navigationTabs.map((tab) => {
            const isActive = activeTab === tab.path
            return (
              <li key={tab.path} className="list-none">
                <Link
                  to={tab.path}
                  className={`inline-block px-4 pt-3 pb-2 text-base font-normal whitespace-nowrap border-b-2 transition-colors duration-200 focus:outline-none align-bottom ${
                    isActive
                      ? "border-blue-800 text-blue-800 font-medium"
                      : "border-transparent text-gray-700 hover:text-blue-800 hover:border-blue-200"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                    borderRadius: 0,
                    minWidth: "unset",
                  }}
                >
                  {tab.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 ml-[87px]">{children}</main>
    </div>
  )
}

export default Layout

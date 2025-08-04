
import { useState, useEffect } from "react"
import Tabs from "../components/Tabs"
import PrioritySettings from "../priority/PrioritySettings"
import PriorityMatrix from "../priority/PriorityMatrix"
import SLATab from "../priority/SLATab"
import HolidayTab from "../priority/HolidayTab"
import OperationalHoursTab from "../priority/OperationalHoursTab"

// Mock router functions for non-Next.js environments
const createMockRouter = () => ({
  push: (url: string) => {
    console.log("Navigate to:", url)
    // In a real app, you might want to update browser history
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", url)
    }
  },
  replace: (url: string) => {
    console.log("Replace with:", url)
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", url)
    }
  },
  back: () => {
    if (typeof window !== "undefined") {
      window.history.back()
    }
  },
})

// Mock search params for non-Next.js environments
const createMockSearchParams = () => ({
  get: (key: string) => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get(key)
    }
    return null
  },
})

// Check if we're in a Next.js environment
const isNextJS = () => {
  try {
    require("next/navigation")
    return true
  } catch {
    return false
  }
}

const priorityTabs = [
  { label: "Priority Settings", key: "settings" },
  { label: "Priority Matrix", key: "matrix" },
  { label: "SLA", key: "sla" },
  { label: "Holidays", key: "holidays" },
  { label: "Operational Hours", key: "operational-hours" },
]

interface PriorityTabProps {
  searchQuery: string
}

export default function PriorityTab({ searchQuery }: PriorityTabProps) {
  const routerInstance = isNextJS() ? require("next/navigation").useRouter() : createMockRouter()
  const searchParamsInstance = isNextJS() ? require("next/navigation").useSearchParams() : createMockSearchParams()

  const [activePriorityTab, setActivePriorityTab] = useState("settings")
  const [router, setRouter] = useState<any>(routerInstance)
  const [searchParams, setSearchParams] = useState<any>(searchParamsInstance)

  useEffect(() => {
    setActivePriorityTab(searchParams.get("priority") || "settings")
  }, [searchParams])

  const handlePriorityTabChange = (tabKey: string | number) => {
    const tabKeyString = tabKey as string
    setActivePriorityTab(tabKeyString)

    if (router) {
      router.push(`/service-desk-setup?tab=escalation&subtab=priority&priority=${tabKeyString}`)
    }
  }

  const renderPriorityContent = () => {
    switch (activePriorityTab) {
      case "settings":
        return <PrioritySettings searchQuery={searchQuery} />
      case "matrix":
        return <PriorityMatrix searchQuery={searchQuery} />
      case "sla":
        return <SLATab searchQuery={searchQuery} />
      case "holidays":
        return <HolidayTab searchQuery={searchQuery} />
      case "operational-hours":
        return <OperationalHoursTab searchQuery={searchQuery} />
      default:
        return <PrioritySettings searchQuery={searchQuery} />
    }
  }

  if (!router || !searchParams) {
    return (
      <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <Tabs
        tabs={priorityTabs}
        activeTab={activePriorityTab}
        onTabChange={handlePriorityTabChange}
        renderContent={() => <div className="mt-4">{renderPriorityContent()}</div>}
      />
    </div>
  )
}

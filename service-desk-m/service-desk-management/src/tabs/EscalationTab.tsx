
import { useState, useEffect } from "react"
import Tabs from "../components/Tabs"
// import Breadcrumb from "../components/Breadcrumb"
import ImpactTab from "../escalation/ImpactTab"
import UrgencyTab from "../escalation/UrgencyTab"
import PriorityTab from "../escalation/PriorityTab"

const escalationTabs = [
  { label: "Impact", key: "impact" },
  { label: "Urgency", key: "urgency" },
  { label: "Priority", key: "priority" },
]

const breadcrumbItems = [
  { label: "Service Desk Setup", href: "/service-desk-setup" },
  { label: "Escalation & Resolve Matrix", href: "/service-desk-setup?tab=escalation" },
]

interface EscalationTabProps {
  searchQuery: string
}

export default function EscalationTab({ searchQuery }: EscalationTabProps) {
  const [activeSubTab, setActiveSubTab] = useState("impact")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const subtab = urlParams.get("subtab")
    if (subtab && ["impact", "urgency", "priority"].includes(subtab)) {
      setActiveSubTab(subtab)
    }
  }, [])

  const handleSubTabChange = (tabKey: string | number) => {
    setActiveSubTab(tabKey as string)

    const url = new URL(window.location.href)
    url.searchParams.set("tab", "escalation")
    url.searchParams.set("subtab", tabKey as string)
    window.history.pushState({}, "", url.toString())
  }

  const handleBreadcrumbClick = (item: any) => {
    window.location.href = item.href
  }

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "impact":
        return <ImpactTab searchQuery={searchQuery} />
      case "urgency":
        return <UrgencyTab searchQuery={searchQuery} />
      case "priority":
        return <PriorityTab searchQuery={searchQuery} />
      default:
        return <ImpactTab searchQuery={searchQuery} />
    }
  }

  return (
    <div className="space-y-2" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} /> */}

      <div>
        <Tabs
          tabs={escalationTabs}
          activeTab={activeSubTab}
          onTabChange={handleSubTabChange}
          renderContent={() => <div className="mt-4">{renderSubTabContent()}</div>}
        />
      </div>
    </div>
  )
}

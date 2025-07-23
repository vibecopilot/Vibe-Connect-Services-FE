
import type React from "react"
import type { ReactNode } from "react"

interface Tab {
  label: string
  key: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (key: string) => void
  disabledTabs?: string[]
  renderContent?: (activeTab: string) => ReactNode
  orientation?: "horizontal" | "vertical"
  className?: string
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  disabledTabs = [],
  renderContent,
  orientation = "horizontal",
  className = "",
}) => {
  const isVertical = orientation === "vertical"

  return (
    <div className={`flex ${isVertical ? "flex-row" : "flex-col"} ${className}`}>
      <div
        role="tablist"
        aria-orientation={isVertical ? "vertical" : "horizontal"}
        className={`${isVertical ? "flex flex-col w-40 space-y-2 mr-4" : "flex flex-row border-b space-x-6 mb-2"}`}
      >
        {tabs.map((tab) => {
          const isDisabled = disabledTabs.includes(tab.key)
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={tab.key === activeTab}
              aria-disabled={isDisabled}
              className={`px-4 py-2 text-sm border-b-2 font-medium
                ${
                  isDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : tab.key === activeTab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-blue-600"
                }`}
              onClick={() => !isDisabled && onTabChange(tab.key)}
              disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {renderContent && (
        <div className="p-4 w-full" role="tabpanel">
          {renderContent(activeTab)}
        </div>
      )}
    </div>
  )
}

export default Tabs

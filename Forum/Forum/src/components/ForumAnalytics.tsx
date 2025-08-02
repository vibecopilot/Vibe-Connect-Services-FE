"use client"

import type React from "react"
import { FiArrowLeft } from "react-icons/fi"

interface ForumAnalyticsProps {
  onBack: () => void
}

// Mock analytics data
const analyticsData = {
  metrics: [
    { label: "Views", value: "650" },
    { label: "Likes", value: "380" },
    { label: "Comments", value: "200" },
    { label: "Share", value: "29" },
    { label: "Engagement Rate", value: "800" },
  ],
  dailyEngagement: [
    { day: "Mon", value: 650 },
    { day: "Tue", value: 400 },
    { day: "Wed", value: 250 },
    { day: "Thu", value: 80 },
    { day: "Fri", value: 850 },
  ],
  weeklyEngagement: [
    { date: "2 May 25", value: 400 },
    { date: "3 May 25", value: 300 },
    { date: "4 May 25", value: 200 },
    { date: "5 May 25", value: 250 },
    { date: "6 May 25", value: 600 },
    { date: "7 May 25", value: 350 },
    { date: "8 May 25", value: 200 },
    { date: "9 May 25", value: 150 },
    { date: "10 May 25", value: 100 },
  ],
}

const ForumAnalytics: React.FC<ForumAnalyticsProps> = ({ onBack }) => {
  const maxDailyValue = Math.max(...analyticsData.dailyEngagement.map((d) => d.value))
  const maxWeeklyValue = Math.max(...analyticsData.weeklyEngagement.map((d) => d.value))

  return (
    <div className="bg-white rounded-md shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Forum Analytics</h1>
          <button
            onClick={onBack}
            className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded hover:bg-blue-200"
          >
            <FiArrowLeft className="w-4 h-4 mr-1" />
            Go Back
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-5 gap-4">
          {analyticsData.metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Daily Engagement Chart */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between h-64 pr-4 text-sm text-gray-600">
                <span>1000</span>
                <span>800</span>
                <span>600</span>
                <span>400</span>
                <span>200</span>
                <span>0</span>
              </div>

              {/* Chart bars */}
              <div className="flex-1">
                <div className="flex items-end justify-between h-64 space-x-4">
                  {analyticsData.dailyEngagement.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-400 rounded-t max-w-16"
                        style={{
                          height: `${(data.value / maxDailyValue) * 240}px`,
                          minHeight: "20px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900">Post's Day wise Engagement</h3>
        </div>

        {/* Weekly Engagement Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-end justify-between h-48 space-x-2">
            {analyticsData.weeklyEngagement.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-blue-400 rounded-t mb-2"
                  style={{
                    height: `${(data.value / maxWeeklyValue) * 150}px`,
                    minHeight: "20px",
                  }}
                />
                <div className="text-xs text-gray-600 text-center whitespace-nowrap">{data.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumAnalytics

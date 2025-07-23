import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import React from "react"

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"] // Red to Blue spectrum for ratings

interface DataItem {
  name: string  // "0", "1", etc. for bar charts or category name
  value: number  // bar height for simple bar charts
}

interface StackedDataItem {
  name: string  // Category name (e.g., "Q2", "Q4", "Q5")
  rating0: number  // Lowest rating
  rating1: number
  rating2: number
  rating3: number
  rating4: number  // Highest rating
}

interface ChartProps {
  type: "bar" | "stacked-bar"
  data: DataItem[] | StackedDataItem[]
  height: number
  answered?: number
  skipped?: number
}

// Custom tooltip for stacked bar charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const Chart: React.FC<ChartProps> = ({ type, data, height, answered, skipped }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height }}>
        <p className="text-gray-500">No data available</p>
      </div>
    )
  }

  if (type === "stacked-bar") {
    const stackedData = data as StackedDataItem[]
    return (
      <div className="w-full">
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stackedData} layout="horizontal">
              <CartesianGrid stroke="#eee" />
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rating0" stackId="a" fill={COLORS[0]} />
              <Bar dataKey="rating1" stackId="a" fill={COLORS[1]} />
              <Bar dataKey="rating2" stackId="a" fill={COLORS[2]} />
              <Bar dataKey="rating3" stackId="a" fill={COLORS[3]} />
              <Bar dataKey="rating4" stackId="a" fill={COLORS[4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {(answered !== undefined || skipped !== undefined) && (
          <div className="text-sm text-gray-500 text-center mt-2">
            {answered !== undefined && <>Answered: {answered.toLocaleString()}</>}
            {answered !== undefined && skipped !== undefined && " | "}
            {skipped !== undefined && <>Skipped: {skipped}</>}
          </div>
        )}
      </div>
    )
  }

  // Default bar chart
  const barData = data as DataItem[]
  return (
    <div className="w-full">
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid stroke="#eee" />
            <XAxis 
              dataKey="name" 
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide />
            <Tooltip 
              formatter={(value: any) => [value.toLocaleString(), 'Responses']}
              labelFormatter={(label) => `Rating: ${label}`}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {(answered !== undefined || skipped !== undefined) && (
        <div className="text-sm text-gray-500 text-center mt-2">
          {answered !== undefined && <>Answered: {answered.toLocaleString()}</>}
          {answered !== undefined && skipped !== undefined && " | "}
          {skipped !== undefined && <>Skipped: {skipped}</>}
        </div>
      )}
    </div>
  )
}

export default Chart
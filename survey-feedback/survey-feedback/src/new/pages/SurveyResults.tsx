
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Chart from "../components/Chart"
import { Card, CardContent } from "../components/Card"
import Tabs from "../components/Tabs"
import Pagination from "../components/Pagination"
import Tooltip from "../components/Tooltip"
import Breadcrumb from "../components/Breadcrumb"
import RadioButton from "../components/RadioButton"
import Checkbox from "../components/Checkbox"
import Badge from "../components/Badge"
import NoDataFound from "../components/NoDataFound"

// Survey data
const npsData = [
  { score: "0", responses: 5965, percentage: 11.03 },
  { score: "1", responses: 2900, percentage: 5.36 },
  { score: "2", responses: 2228, percentage: 4.12 },
  { score: "3", responses: 2088, percentage: 3.86 },
  { score: "4", responses: 2747, percentage: 5.08 },
  { score: "5", responses: 5469, percentage: 10.12 },
  { score: "6", responses: 4211, percentage: 7.79 },
  { score: "7", responses: 5184, percentage: 9.59 },
  { score: "8", responses: 5930, percentage: 10.98 },
  { score: "9", responses: 8234, percentage: 15.23 },
  { score: "10", responses: 8170, percentage: 15.11 },
]

const satisfactionData = [
  { category: "Very satisfied", percentage: 46, responses: 22537, color: "#22C55E" },
  { category: "Somewhat satisfied", percentage: 25, responses: 12453, color: "#3B82F6" },
  { category: "Neither satisfied nor dissatisfied", percentage: 10, responses: 4749, color: "#6B7280" },
  { category: "Somewhat dissatisfied", percentage: 9, responses: 4284, color: "#F59E0B" },
  { category: "Very dissatisfied", percentage: 10, responses: 5101, color: "#EF4444" },
]

const productDescriptors = [
  { descriptor: "Reliable", percentage: 20, responses: 18228, color: "#22C55E" },
  { descriptor: "High quality", percentage: 19, responses: 16575, color: "#3B82F6" },
  { descriptor: "Useful", percentage: 15, responses: 13757, color: "#06B6D4" },
  { descriptor: "Unique", percentage: 9, responses: 8233, color: "#8B5CF6" },
  { descriptor: "Good value for money", percentage: 11, responses: 9976, color: "#F59E0B" },
  { descriptor: "Overpriced", percentage: 6, responses: 5502, color: "#F97316" },
  { descriptor: "Impractical", percentage: 5, responses: 4823, color: "#EF4444" },
  { descriptor: "Ineffective", percentage: 5, responses: 4779, color: "#DC2626" },
  { descriptor: "Poor quality", percentage: 4, responses: 3768, color: "#B91C1C" },
  { descriptor: "Unreliable", percentage: 4, responses: 3560, color: "#6B7280" },
]

const productNeedsData = [
  { category: "Extremely well", percentage: 38, responses: 17699, color: "#22C55E" },
  { category: "Very well", percentage: 32, responses: 15153, color: "#3B82F6" },
  { category: "Somewhat well", percentage: 16, responses: 7592, color: "#8B5CF6" },
  { category: "Not so well", percentage: 7, responses: 3264, color: "#F59E0B" },
  { category: "Not at all well", percentage: 7, responses: 3330, color: "#EF4444" },
]

const qualityRatingData = [
  { category: "Very high quality", percentage: 35, responses: 15606, color: "#22C55E" },
  { category: "High quality", percentage: 34, responses: 15352, color: "#3B82F6" },
  { category: "Neither high nor low quality", percentage: 17, responses: 7654, color: "#8B5CF6" },
  { category: "Low quality", percentage: 6, responses: 2869, color: "#F59E0B" },
  { category: "Very low quality", percentage: 8, responses: 3422, color: "#EF4444" },
]

function NPSChart() {
  return (
    <div className="w-full">
      {/* Enhanced green bar with Y-axis lines */}
      <div className="flex justify-center mb-6 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 h-80 flex flex-col justify-between text-xs text-gray-600 pr-2">
          <span>40</span>
          <span>30</span>
          <span>20</span>
          <span>10</span>
          <span>0</span>
        </div>

        {/* Chart area with grid lines */}
        <div className="relative ml-8">
          {/* Grid lines */}
          <div className="absolute inset-0 w-40">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="absolute w-full border-t border-gray-200" style={{ top: `${i * 20}%` }} />
            ))}
          </div>

          {/* Enhanced green bar */}
          <div className="w-40 h-80 bg-green-500 rounded flex items-end justify-center relative">
          
          </div>
        </div>
      </div>

      {/* Total text below chart */}
      <div className="text-center mb-4">
        <span className="text-lg font-medium">Total</span>
      </div>

      {/* Answered and Skipped below Total */}
      <div className="text-center text-sm text-gray-600 mb-4">
        <span className="font-medium">Answered: 108,126</span>
        <span className="mx-4">|</span>
        <span>Skipped: 10,292</span>
      </div>

      {/* Scale at bottom */}
      <div className="grid grid-cols-8 gap-1 text-xs text-center">
        <div className="border p-2 bg-gray-50">
          <div className="font-medium">Not at all likely - 0</div>
          <div className="font-medium">{npsData[0].responses.toLocaleString()}</div>
          <div className="text-gray-600">{npsData[0].percentage}%</div>
        </div>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <div key={num} className="border p-2">
            <div className="font-medium">{num}</div>
            <div className="font-medium">{npsData[num].responses.toLocaleString()}</div>
            <div className="text-gray-600">{npsData[num].percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VerticalStackedBarChartWithAxis({
  data,
  totalResponses,
  maxValue = 50000,
}: { data: any[]; totalResponses: number; maxValue?: number }) {
  const chartHeight = 300
  let cumulativeHeight = 0

  return (
    <div className="w-full">
      <div className="flex">
        {/* Y-axis */}
        <div className="flex flex-col justify-between h-80 w-16 text-xs text-gray-600 pr-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="text-right">
              {((5 - i) * (maxValue / 5)).toLocaleString()}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="absolute w-full border-t border-gray-200" style={{ top: `${i * 20}%` }} />
            ))}
          </div>

          {/* Stacked bar */}
          <div className="flex justify-center pt-4">
            <div className="relative bg-gray-100 rounded" style={{ width: "80px", height: `${chartHeight}px` }}>
              {data.map((item, index) => {
                const height = (item.responses / totalResponses) * chartHeight
                const currentPosition = chartHeight - cumulativeHeight - height
                cumulativeHeight += height

                return (
                  <div
                    key={index}
                    className="absolute w-full"
                    style={{
                      top: `${currentPosition}px`,
                      height: `${height}px`,
                      backgroundColor: item.color,
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Total text below chart */}
      <div className="text-center mt-4 mb-2">
        <span className="text-lg font-medium">Total Respondents: {totalResponses.toLocaleString()}</span>
      </div>

      {/* Answered and Skipped below Total */}
      <div className="text-center text-sm text-gray-600 mb-4">
        <span className="font-medium">Answered: 49,124</span>
        <span className="mx-4">|</span>
        <span>Skipped: 10,292</span>
      </div>

      {/* Legend below answered/skipped */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-gray-700">{item.category}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-medium">{item.percentage}%</span>
              <span className="text-gray-600">{item.responses.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VerticalStackedBarChartLarge({ data, totalResponses }: { data: any[]; totalResponses: number }) {
  const chartHeight = 400
  let cumulativeHeight = 0

  return (
    <div className="w-full">
      <div className="flex">
        {/* Y-axis */}
        <div className="flex flex-col justify-between h-96 w-16 text-xs text-gray-600 pr-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="text-right">
              {((5 - i) * 20000).toLocaleString()}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="absolute w-full border-t border-gray-200" style={{ top: `${i * 20}%` }} />
            ))}
          </div>

          {/* Stacked bar */}
          <div className="flex justify-center pt-4">
            <div className="relative bg-gray-100 rounded" style={{ width: "100px", height: `${chartHeight}px` }}>
              {data.map((item, index) => {
                const height = (item.responses / totalResponses) * chartHeight
                const currentPosition = chartHeight - cumulativeHeight - height
                cumulativeHeight += height

                return (
                  <div
                    key={index}
                    className="absolute w-full"
                    style={{
                      top: `${currentPosition}px`,
                      height: `${height}px`,
                      backgroundColor: item.color,
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Total text below chart */}
      <div className="text-center mt-4 mb-2">
        <span className="text-lg font-medium">Total Respondents: {totalResponses.toLocaleString()}</span>
      </div>

      {/* Answered and Skipped below Total */}
      <div className="text-center text-sm text-gray-600 mb-4">
        <span className="font-medium">Answered: 89,201</span>
        <span className="mx-4">|</span>
        <span>Skipped: 10,292</span>
      </div>

      {/* Single column legend below answered/skipped */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-gray-700">{item.descriptor}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-medium">{item.percentage}%</span>
              <span className="text-gray-600">{item.responses.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SurveyResults: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string | number>("Preview")
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5
  const totalItems = 50

  // Form state for the survey template
  const [formData, setFormData] = useState({
    recommendation: "",
    satisfaction: "",
    productDescriptors: [] as string[],
    needsMet: "",
    quality: "",
  })

  const handleRadioChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: { target: { name: string; value: boolean } }) => {
    const { name, value } = e.target
    const option = name // Using name as the option value
    setFormData((prev) => ({
      ...prev,
      productDescriptors: value
        ? [...prev.productDescriptors, option]
        : prev.productDescriptors.filter((item) => item !== option),
    }))
  }

  // Fixed handleTabChange function to match Tabs component signature
  const handleTabChange = (tabKey: string | number) => {
    setActiveTab(tabKey)
  }

  // Sample data for charts - using proper format for API/backend
  const question1Data = [
    { name: "0", value: 965 },
    { name: "1", value: 1200 },
    { name: "2", value: 890 },
    { name: "3", value: 1450 },
    { name: "4", value: 2100 },
    { name: "5", value: 3200 },
    { name: "6", value: 4500 },
    { name: "7", value: 5200 },
    { name: "8", value: 6800 },
    { name: "9", value: 4200 },
    { name: "10", value: 8500 },
  ]

  // Stacked bar data for multi-category questions
  const question2Data = [
    {
      name: "Q2",
      rating0: 240, // Very unsatisfied
      rating1: 960, // Unsatisfied
      rating2: 1800, // Neutral
      rating3: 3600, // Satisfied
      rating4: 5400, // Very satisfied
    },
  ]

  const question3Data = [
    { name: "Reliable", value: 7800 },
    { name: "High quality", value: 6960 },
    { name: "Useful", value: 8640 },
    { name: "Unique", value: 5400 },
    { name: "Good value", value: 6240 },
    { name: "Overpriced", value: 2760 },
    { name: "Impractical", value: 1440 },
  ]

  const question4Data = [
    {
      name: "Q4",
      rating0: 120, // Not at all well
      rating1: 480, // Not so well
      rating2: 2400, // Somewhat well
      rating3: 4800, // Very well
      rating4: 4200, // Extremely well
    },
  ]

  const question5Data = [
    {
      name: "Q5",
      rating0: 120, // Very low quality
      rating1: 480, // Low quality
      rating2: 1800, // Neither high nor low
      rating3: 4560, // High quality
      rating4: 5040, // Very high quality
    },
  ]

  // Total responses and answered/skipped counts
  const totalResponses = 12000
  const q1Answered = 11850
  const q1Skipped = 150
  const q2Answered = 12000
  const q2Skipped = 0
  const q3Answered = 12000
  const q3Skipped = 0
  const q4Answered = 12000
  const q4Skipped = 0
  const q5Answered = 12000
  const q5Skipped = 0

  const handleBreadcrumbClick = (item: { label: string; href: string }) => {
    if (item.label === "Setup") {
      navigate("/survey-feedback")
    } else if (item.label === "Survey Feedback") {
      navigate("/survey-feedback")
    }
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Survey Feedback", href: "/survey-feedback" },
  ]

  const tabs = [
    { label: "Preview", key: "Preview" },
    { label: "Simple Result", key: "Simple Result" },
  ]

  const renderTabContent = (activeTab: string | number) => {
    if (activeTab === "Preview") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Survey Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question 1 - NPS Scale */}
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-base font-medium text-gray-900 mb-4">
                1. How likely is it that you would recommend this company to a friend or colleague?
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center space-x-2 overflow-x-auto pb-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <div key={num} className="flex flex-col items-center flex-shrink-0">
                      <input
                        type="radio"
                        name="recommendation"
                        value={num.toString()}
                        checked={formData.recommendation === num.toString()}
                        onChange={(e) =>
                          handleRadioChange({ target: { name: "recommendation", value: e.target.value } })
                        }
                        className="sr-only"
                        id={`recommendation-${num}`}
                      />
                      <label htmlFor={`recommendation-${num}`} className="cursor-pointer">
                        <span
                          className={`w-8 h-6 border-2 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                            formData.recommendation === num.toString()
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-gray-300 bg-white hover:bg-gray-50"
                          }`}
                        >
                          {num}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>NOT AT ALL LIKELY</span>
                  <span>EXTREMELY LIKELY</span>
                </div>
              </div>
            </div>

            {/* Question 2 - Satisfaction */}
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-base font-medium text-gray-900 mb-4">
                2. Overall, how satisfied or dissatisfied are you with our company?
              </p>

              <RadioButton
                label=""
                name="satisfaction"
                value={formData.satisfaction}
                onChange={handleRadioChange}
                options={["Very satisfied", "Satisfied", "Undecided", "Unsatisfied", "Very unsatisfied"]}
              />
            </div>

            {/* Question 3 - Product Descriptors */}
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-base font-medium text-gray-900 mb-4">
                3. Which of the following words would you use to describe our products? Select all that apply.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <div className="space-y-3">
                  {["Reliable", "High quality", "Useful", "Unique", "Good value for money"].map((option) => (
                    <Checkbox
                      key={option}
                      label={option}
                      name={option}
                      checked={formData.productDescriptors.includes(option)}
                      onChange={handleCheckboxChange}
                    />
                  ))}
                </div>
                <div className="space-y-3">
                  {["Overpriced", "Impractical", "Ineffective", "Poor quality", "Unreliable"].map((option) => (
                    <Checkbox
                      key={option}
                      label={option}
                      name={option}
                      checked={formData.productDescriptors.includes(option)}
                      onChange={handleCheckboxChange}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Question 4 - Needs Met */}
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-base font-medium text-gray-900 mb-4">4. How well do our products meet your needs?</p>

              <RadioButton
                label=""
                name="needsMet"
                value={formData.needsMet}
                onChange={handleRadioChange}
                options={["Extremely well", "Very well", "Somewhat well", "Not so well", "Not at all well"]}
              />
            </div>

            {/* Question 5 - Quality Rating */}
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-base font-medium text-gray-900 mb-4">
                5. How would you rate the quality of the product?
              </p>

              <RadioButton
                label=""
                name="quality"
                value={formData.quality}
                onChange={handleRadioChange}
                options={[
                  "Very high quality",
                  "High quality",
                  "Neither high nor low quality",
                  "Low quality",
                  "Very low quality",
                ]}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                className="text-white px-6 py-2 rounded-md hover:opacity-90 transition-colors font-medium"
                style={{ backgroundColor: "#7991BB" }}
              >
                Submit
              </button>
            </div>
          </div>

          {/* Right Column - Info Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent>
                <div className="p-6 space-y-4" style={{ backgroundColor: "#EBEBEB" }}>
                  <h3 className="text-lg font-medium text-gray-900">Customer Satisfaction Template</h3>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      📊 Benchmarks available
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your customers' happiness directly influences your company's longevity. Be sure you can handle
                    friction points that pop up no matter what. Our Customer Satisfaction Survey Template will help
                    measure your product's value and quality, helping you gauge opportunities for improvement.
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    You can always make changes to the theme and template.
                  </p>

                  <div className="pt-4">
                    <button
                      className="w-full text-white px-4 py-3 rounded-md hover:opacity-90 transition-colors font-medium"
                      style={{ backgroundColor: "#7991BB" }}
                    >
                      Use This Template
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    if (activeTab === "Simple Result") {
      return (
        <div className="space-y-8">
          {totalResponses > 0 ? (
            <>
              {/* Question 1 - NPS Scale */}
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  1. How likely is it that you would recommend this company to a friend or colleague?
                </h3>

                <NPSChart />
              </div>

              {/* Question 2 - Company Recommendation (Satisfaction) */}
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  2. How likely is it that you would recommend this company to a friend or colleague?
                </h3>

                <VerticalStackedBarChartWithAxis data={satisfactionData} totalResponses={49124} />
              </div>

              {/* Question 3 - Product Descriptors */}
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  3. Which of the following words would you use to describe our products? Select all that apply.
                </h3>

                <VerticalStackedBarChartLarge data={productDescriptors} totalResponses={89201} />
              </div>

              {/* Question 4 - Product Needs Assessment */}
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">4. How well do our products meet your needs?</h3>

                <VerticalStackedBarChartWithAxis data={productNeedsData} totalResponses={47038} />
              </div>

              {/* Question 5 - Product Quality Rating */}
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">5. How would you rate the quality of the product?</h3>

                <VerticalStackedBarChartWithAxis data={qualityRatingData} totalResponses={44903} />
              </div>
            </>
          ) : (
            <NoDataFound message="No survey responses found" />
          )}
        </div>
      )
    }

    return (
      <div className="space-y-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Survey Results</h2>
          <p className="text-gray-600">Detailed Analytics & Response Breakdown</p>
        </div>

        {totalResponses > 0 ? (
          <>
            {/* Question 1 - NPS Scale */}
            <Card>
              <CardContent>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    1. How likely is it that you would recommend this company to a friend or colleague?
                  </h3>

                  {/* Chart Block */}
                  <div className="mb-6">
                    <Chart type="bar" data={question1Data} height={300} />
                  </div>

                  {/* Metadata & Summary */}
                  <div className="flex gap-4 mb-4">
                    <Badge content={`Answered: ${q1Answered.toLocaleString()}`} variant="solid" />
                    <Badge content={`Skipped: ${q1Skipped}`} variant="outline" />
                  </div>

                  {/* Response Breakdown Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Rating</th>
                          <th className="text-right py-2">Percentage</th>
                          <th className="text-right py-2">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {question1Data.map((item, index) => {
                          const percentage = ((item.value / q1Answered) * 100).toFixed(1)
                          return (
                            <tr key={index} className="border-b">
                              <td className="py-2">{item.name}</td>
                              <Tooltip content={`${percentage}% of responses`}>
                                <td className="text-right py-2 cursor-help">{percentage}%</td>
                              </Tooltip>
                              <td className="text-right py-2">{item.value.toLocaleString()}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question 2 - Satisfaction (Stacked Bar) */}
            <Card>
              <CardContent>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    2. Overall, how satisfied or dissatisfied are you with our company?
                  </h3>

                  {/* Chart Block */}
                  <div className="mb-6">
                    <Chart type="stacked-bar" data={question2Data} height={200} />
                  </div>

                  {/* Metadata & Summary */}
                  <div className="flex gap-4 mb-4">
                    <Badge content={`Answered: ${q2Answered.toLocaleString()}`} variant="solid" />
                    <Badge content={`Skipped: ${q2Skipped}`} variant="outline" />
                  </div>

                  {/* Response Breakdown Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Response</th>
                          <th className="text-right py-2">Percentage</th>
                          <th className="text-right py-2">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Very unsatisfied", value: question2Data[0].rating0 },
                          { name: "Unsatisfied", value: question2Data[0].rating1 },
                          { name: "Neutral", value: question2Data[0].rating2 },
                          { name: "Satisfied", value: question2Data[0].rating3 },
                          { name: "Very satisfied", value: question2Data[0].rating4 },
                        ].map((item, index) => {
                          const percentage = ((item.value / q2Answered) * 100).toFixed(1)
                          return (
                            <tr key={index} className="border-b">
                              <td className="py-2">{item.name}</td>
                              <Tooltip content={`${percentage}% of responses`}>
                                <td className="text-right py-2 cursor-help">{percentage}%</td>
                              </Tooltip>
                              <td className="text-right py-2">{item.value.toLocaleString()}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question 3 - Product Descriptors */}
            <Card>
              <CardContent>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    3. Which of the following words would you use to describe our products?
                  </h3>

                  {/* Chart Block */}
                  <div className="mb-6">
                    <Chart type="bar" data={question3Data} height={300} />
                  </div>

                  {/* Metadata & Summary */}
                  <div className="flex gap-4 mb-4">
                    <Badge content={`Answered: ${q3Answered.toLocaleString()}`} variant="solid" />
                    <Badge content={`Skipped: ${q3Skipped}`} variant="outline" />
                  </div>

                  {/* Response Breakdown Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Descriptor</th>
                          <th className="text-right py-2">Percentage</th>
                          <th className="text-right py-2">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {question3Data.map((item, index) => {
                          const percentage = ((item.value / q3Answered) * 100).toFixed(1)
                          return (
                            <tr key={index} className="border-b">
                              <td className="py-2">{item.name}</td>
                              <Tooltip content={`${percentage}% selected this option`}>
                                <td className="text-right py-2 cursor-help">{percentage}%</td>
                              </Tooltip>
                              <td className="text-right py-2">{item.value.toLocaleString()}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question 4 - Needs Met (Stacked Bar) */}
            <Card>
              <CardContent>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">4. How well do our products meet your needs?</h3>

                  {/* Chart Block */}
                  <div className="mb-6">
                    <Chart type="stacked-bar" data={question4Data} height={200} />
                  </div>

                  {/* Metadata & Summary */}
                  <div className="flex gap-4 mb-4">
                    <Badge content={`Answered: ${q4Answered.toLocaleString()}`} variant="solid" />
                    <Badge content={`Skipped: ${q4Skipped}`} variant="outline" />
                  </div>

                  {/* Response Breakdown Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Response</th>
                          <th className="text-right py-2">Percentage</th>
                          <th className="text-right py-2">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Not at all well", value: question4Data[0].rating0 },
                          { name: "Not so well", value: question4Data[0].rating1 },
                          { name: "Somewhat well", value: question4Data[0].rating2 },
                          { name: "Very well", value: question4Data[0].rating3 },
                          { name: "Extremely well", value: question4Data[0].rating4 },
                        ].map((item, index) => {
                          const percentage = ((item.value / q4Answered) * 100).toFixed(1)
                          return (
                            <tr key={index} className="border-b">
                              <td className="py-2">{item.name}</td>
                              <Tooltip content={`${percentage}% of responses`}>
                                <td className="text-right py-2 cursor-help">{percentage}%</td>
                              </Tooltip>
                              <td className="text-right py-2">{item.value.toLocaleString()}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question 5 - Quality Rating (Stacked Bar) */}
            <Card>
              <CardContent>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">5. How would you rate the quality of the product?</h3>

                  {/* Chart Block */}
                  <div className="mb-6">
                    <Chart type="stacked-bar" data={question5Data} height={200} />
                  </div>

                  {/* Metadata & Summary */}
                  <div className="flex gap-4 mb-4">
                    <Badge content={`Answered: ${q5Answered.toLocaleString()}`} variant="solid" />
                    <Badge content={`Skipped: ${q5Skipped}`} variant="outline" />
                  </div>

                  {/* Response Breakdown Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Quality Rating</th>
                          <th className="text-right py-2">Percentage</th>
                          <th className="text-right py-2">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Very low quality", value: question5Data[0].rating0 },
                          { name: "Low quality", value: question5Data[0].rating1 },
                          { name: "Neither high nor low", value: question5Data[0].rating2 },
                          { name: "High quality", value: question5Data[0].rating3 },
                          { name: "Very high quality", value: question5Data[0].rating4 },
                        ].map((item, index) => {
                          const percentage = ((item.value / q5Answered) * 100).toFixed(1)
                          return (
                            <tr key={index} className="border-b">
                              <td className="py-2">{item.name}</td>
                              <Tooltip content={`${percentage}% of responses`}>
                                <td className="text-right py-2 cursor-help">{percentage}%</td>
                              </Tooltip>
                              <td className="text-right py-2">{item.value.toLocaleString()}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <NoDataFound message="No survey responses found" />
        )}
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} />
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Customer Satisfaction Template</h1>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} renderContent={renderTabContent} />
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default SurveyResults

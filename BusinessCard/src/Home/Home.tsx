"use client"

import { useNavigate } from "react-router-dom"
import { Edit3, Calendar } from "lucide-react"

const Home = () => {
  const navigate = useNavigate()

  const handleStartFromScratch = () => {
    navigate("/theme-selection")
  }

  const handlePickTemplate = () => {
    navigate("/category-selection")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">Create a Business card in seconds</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Start From Scratch Card */}
          <div
            onClick={handleStartFromScratch}
            className="bg-white rounded-2xl border-2 border-gray-200 p-8 cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Edit3 className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Start From Scratch</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Customize every detail from layout, colors, fonts, and branding to match your exact style.
              </p>
            </div>
          </div>

          {/* Pick a Template Card */}
          <div
            onClick={handlePickTemplate}
            className="bg-white rounded-2xl border-2 border-gray-200 p-8 cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pick a template</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Choose from curated designs and simply add your information to create a clean, professional card.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

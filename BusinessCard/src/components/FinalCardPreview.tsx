"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useTemplate } from "../context/TemplateContext"
import { useCardEditor } from "../context/CardEditorContext"
import {
  EditableSalesMarketingFront,
  EditableSalesMarketingBack,
  EditableModernCorporateFront,
  EditableModernCorporateBack,
  EditableSimpleProfessionalFront,
  EditableSimpleProfessionalBack,
  EditableCreativeDesignFront,
  EditableCreativeDesignBack,
  EditableServiceProfessionalFront,
  EditableServiceProfessionalBack,
} from "./EditableCard"

const FinalCardPreview = () => {
  const navigate = useNavigate()
  const { selectedTemplate } = useTemplate()
  useCardEditor()

  const handlePrevious = () => {
    navigate("/card-editor")
  }

  const handleNext = () => {
    navigate("/card-completion")
  }

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No template selected</p>
          <button onClick={() => navigate("/template-selection")} className="text-blue-600 hover:text-blue-700">
            Go back to template selection
          </button>
        </div>
      </div>
    )
  }

  // Render business cards based on template category
  const renderBusinessCards = () => {
    if (selectedTemplate.category === "Sales & Marketing") {
      return (
        <>
          <EditableSalesMarketingFront />
          <EditableSalesMarketingBack />
        </>
      )
    } else if (selectedTemplate.category === "Simple Professional") {
      return (
        <>
          <EditableSimpleProfessionalFront />
          <EditableSimpleProfessionalBack />
        </>
      )
    } else if (selectedTemplate.category === "Creative & Design") {
      return (
        <>
          <EditableCreativeDesignFront />
          <EditableCreativeDesignBack />
        </>
      )
    } else if (selectedTemplate.category === "Service Professionals") {
      return (
        <>
          <EditableServiceProfessionalFront />
          <EditableServiceProfessionalBack />
        </>
      )
    } else {
      return (
        <>
          <EditableModernCorporateFront />
          <EditableModernCorporateBack />
        </>
      )
    }
  }

  // Render digital card (same as front card but in digital format)
  const renderDigitalCard = () => {
    if (selectedTemplate.category === "Sales & Marketing") {
      return <EditableSalesMarketingFront />
    } else if (selectedTemplate.category === "Simple Professional") {
      return <EditableSimpleProfessionalFront />
    } else if (selectedTemplate.category === "Creative & Design") {
      return <EditableCreativeDesignFront />
    } else if (selectedTemplate.category === "Service Professionals") {
      return <EditableServiceProfessionalFront />
    } else {
      return <EditableModernCorporateFront />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Left Side - Business Card */}
          <div className="flex flex-col">
            <div className="flex items-center mb-12">
              <span className="text-4xl mr-4">👏</span>
              <h1 className="text-3xl font-bold text-gray-800">Your Business Card is ready!</h1>
            </div>

            <div className="flex gap-12 justify-center">{renderBusinessCards()}</div>
          </div>

          {/* Right Side - Digital ID */}
          <div className="flex flex-col">
            <div className="flex items-center mb-12">
              <span className="text-4xl mr-4">👏</span>
              <h1 className="text-3xl font-bold text-gray-800">Your Digital ID is ready!</h1>
            </div>

            <div className="flex justify-center">
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8">
                <div className="transform scale-75">{renderDigitalCard()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 right-8 flex gap-4">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Previous</span>
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg font-medium"
        >
          <span>Next</span>
          <ArrowLeft className="w-5 h-5 rotate-180" />
        </button>
      </div>
    </div>
  )
}

export default FinalCardPreview

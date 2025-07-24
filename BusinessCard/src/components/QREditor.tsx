"use client"

import { useState } from "react"
import { Globe, Mail, Phone, Settings, MessageSquare, Calendar } from "lucide-react"
import { useCardEditor } from "../context/CardEditorContext"

const QREditor = () => {
  const { editorState, updateQR } = useCardEditor()
  const [qrData, setQrData] = useState({
    website: "",
    email: { address: "", subject: "", message: "" },
    phone: "",
    ar: "",
    sms: { phone: "", message: "" },
    event: { title: "", location: "", start: "", end: "" },
  })

  const qrTypes = [
    { id: "website", icon: Globe, label: "Website" },
    { id: "email", icon: Mail, label: "Email" },
    { id: "phone", icon: Phone, label: "Phone" },
    { id: "ar", icon: Settings, label: "AR" },
    { id: "sms", icon: MessageSquare, label: "SMS" },
    { id: "event", icon: Calendar, label: "Event" },
  ]

  const handleQRTypeChange = (type: string) => {
    updateQR({ qrType: type as any })
  }

  const handleQRDataChange = (field: string, value: string) => {
    const newQrData = { ...qrData }
    if (editorState.qrType === "email") {
      newQrData.email = { ...newQrData.email, [field]: value }
    } else {
      newQrData[editorState.qrType as keyof typeof newQrData] = value as any
    }
    setQrData(newQrData)
    updateQR({ qrContent: newQrData })
  }

  const handleGenerateQR = () => {
    // Generate static QR code without animation
    const qrCode = `data:image/svg+xml,${encodeURIComponent(`
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="white"/>
        <g fill="black">
          ${Array.from({ length: 25 }, (_, i) => {
            const x = (i % 5) * 20
            const y = Math.floor(i / 5) * 20
            const shouldFill = (i + Math.floor(i / 5)) % 2 === 0
            return shouldFill ? `<rect x="${x}" y="${y}" width="20" height="20"/>` : ""
          }).join("")}
        </g>
      </svg>
    `)}`

    updateQR({ qrCode })
  }

  const handleUpdateContent = () => {
    updateQR({ qrContent: qrData })
  }

  const renderQRForm = () => {
    switch (editorState.qrType) {
      case "website":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <input
                type="url"
                placeholder="https://example.com"
                value={qrData.website}
                onChange={(e) => handleQRDataChange("website", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleUpdateContent}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-600 font-semibold mb-2 bg-white"
            >
              Update Content
            </button>
            <button
              onClick={handleGenerateQR}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Generate QR
            </button>
          </div>
        )
      case "email":
        return (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Add Email"
              value={qrData.email.address}
              onChange={(e) => handleQRDataChange("address", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Add Subject"
              value={qrData.email.subject}
              onChange={(e) => handleQRDataChange("subject", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Add Message"
              rows={3}
              value={qrData.email.message}
              onChange={(e) => handleQRDataChange("message", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              onClick={handleUpdateContent}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-600 font-semibold mb-2 bg-white"
            >
              Update Content
            </button>
            <button
              onClick={handleGenerateQR}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Generate QR
            </button>
          </div>
        )
      case "phone":
        return (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="+91 1234567890"
              value={qrData.phone}
              onChange={(e) => handleQRDataChange("phone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpdateContent}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-600 font-semibold mb-2 bg-white"
            >
              Update Content
            </button>
            <button
              onClick={handleGenerateQR}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Generate QR
            </button>
          </div>
        )
      case "sms":
        return (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="+91"
              value={qrData.sms?.phone || ''}
              onChange={e => setQrData({ ...qrData, sms: { ...qrData.sms, phone: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter message"
              value={qrData.sms?.message || ''}
              onChange={e => setQrData({ ...qrData, sms: { ...qrData.sms, message: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpdateContent}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-600 font-semibold mb-2 bg-white"
            >
              Update Content
            </button>
            <button
              onClick={handleGenerateQR}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Generate QR
            </button>
          </div>
        )
      case "event":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Title"
              value={qrData.event?.title || ''}
              onChange={e => setQrData({ ...qrData, event: { ...qrData.event, title: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter Location"
              value={qrData.event?.location || ''}
              onChange={e => setQrData({ ...qrData, event: { ...qrData.event, location: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="datetime-local"
              value={qrData.event?.start || ''}
              onChange={e => setQrData({ ...qrData, event: { ...qrData.event, start: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="datetime-local"
              value={qrData.event?.end || ''}
              onChange={e => setQrData({ ...qrData, event: { ...qrData.event, end: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpdateContent}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-600 font-semibold mb-2 bg-white"
            >
              Update Content
            </button>
            <button
              onClick={handleGenerateQR}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Generate QR
            </button>
          </div>
        )
      default:
        return (
          <div className="space-y-4">
            <input
              placeholder="Enter URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpdateContent}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-600 font-semibold mb-2 bg-white"
            >
              Update Content
            </button>
            <button
              onClick={handleGenerateQR}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Generate QR
            </button>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* QR Type Selection */}
      <div className="grid grid-cols-3 gap-3">
        {qrTypes.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => handleQRTypeChange(id)}
            className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
              editorState.qrType === id
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>

      {/* QR Form */}
      {renderQRForm()}

      {/* QR Preview - Static, no animation */}
      {editorState.qrCode && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">QR Code Preview</h4>
          <div className="flex justify-center">
            <div className="w-24 h-24 border border-gray-200 rounded bg-white p-2">
              <img
                src={editorState.qrCode || "/placeholder.svg"}
                alt="Generated QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QREditor

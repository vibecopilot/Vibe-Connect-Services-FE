"use client"

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"
import { useCardEditor } from "../context/CardEditorContext"
import { QRCodeSVG } from 'qrcode.react';

// Company Logo Component that responds to editor state
const EditableCompanyLogo = ({ size = 64 }: { size?: number }) => {
  const { editorState } = useCardEditor()

  if (editorState.logoImage) {
    return (
      <img
        src={editorState.logoImage || "/placeholder.svg"}
        alt="Company Logo"
        width={size}
        height={size * 0.8}
        className="object-contain"
      />
    )
  }

  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="32" rx="35" ry="28" fill="#3B82F6" />
      <ellipse cx="40" cy="32" rx="28" ry="22" fill="#F97316" />
      <ellipse cx="40" cy="32" rx="21" ry="16" fill="#EC4899" />
      <ellipse cx="40" cy="32" rx="14" ry="10" fill="#1E40AF" />
      <ellipse cx="40" cy="32" rx="7" ry="5" fill="#60A5FA" />
    </svg>
  )
}

// Sales & Marketing Template Components with real-time editing
const EditableSalesMarketingFront = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      {/* QR Code - Top Left */}
      <div className="absolute top-10 left-10">
        <div className="w-20 h-20 bg-[#1cd5b7] rounded-lg grid grid-cols-4 grid-rows-4 gap-1 p-2">
          <QRCodeSVG value={editorState.qrContent?.website || editorState.qrContent?.email?.address || editorState.qrContent?.phone || 'https://example.com'} size={80} />
        </div>
      </div>

      {/* Profile and Name - Top Right */}
      <div className="absolute top-10 right-10">
        <div className="flex flex-col items-center">
          <div
            className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mb-3 cursor-pointer"
            onClick={() => selectElement("name")}
          >
            {editorState.profileImage ? (
              <img
                src={editorState.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">+</div>
            )}
          </div>
          <h3
            className="text-lg text-center cursor-pointer hover:bg-blue-50 px-2 py-1 rounded font-bold"
            style={{
              fontFamily: editorState.nameFont,
              fontSize: `${editorState.nameFontSize + 2}px`,
              color: editorState.nameColor,
              fontWeight: editorState.nameBold ? "bold" : "bold",
              letterSpacing: `${editorState.nameSpacing}px`,
              textAlign: editorState.nameAlign,
            }}
            onClick={() => selectElement("name")}
          >
            {editorState.name.split(" ").map((word: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined, i: number) => (
              <span key={i}>
                {i === 0 ? word : <span className="text-[#1cd5b7]">{word}</span>}
                {typeof i === "number" && i < editorState.name.split(" ").length - 1 && " "}
              </span>
            ))}
          </h3>
          <p
            className="text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded text-gray-600"
            style={{
              fontFamily: editorState.positionFont,
              fontSize: `${editorState.positionFontSize}px`,
              color: editorState.positionColor || "#6B7280",
              fontWeight: editorState.positionBold ? "bold" : "normal",
              letterSpacing: `${editorState.positionSpacing}px`,
              textAlign: editorState.positionAlign,
            }}
            onClick={() => selectElement("position")}
          >
            {editorState.position}
          </p>
        </div>
      </div>

      {/* Contact Information - Middle Left */}
      <div className="absolute top-40 left-10 space-y-3">
        <div
          className="flex items-center gap-3 text-base cursor-pointer hover:bg-blue-50 px-2 py-1 rounded"
          onClick={() => selectElement("phone")}
        >
          <div className="w-5 h-5">📞</div>
          <span
            style={{
              fontFamily: editorState.contactFont,
              fontSize: `${editorState.contactFontSize + 2}px`,
              color: editorState.contactColor,
              fontWeight: editorState.contactBold ? "bold" : "normal",
              letterSpacing: `${editorState.contactSpacing}px`,
              textAlign: editorState.contactAlign,
            }}
          >
            {editorState.phone}
          </span>
        </div>
        <div
          className="flex items-center gap-3 text-base cursor-pointer hover:bg-blue-50 px-2 py-1 rounded"
          onClick={() => selectElement("email")}
        >
          <div className="w-5 h-5">✉️</div>
          <span
            style={{
              fontFamily: editorState.contactFont,
              fontSize: `${editorState.contactFontSize + 2}px`,
              color: editorState.contactColor,
              fontWeight: editorState.contactBold ? "bold" : "normal",
              letterSpacing: `${editorState.contactSpacing}px`,
              textAlign: editorState.contactAlign,
            }}
          >
            {editorState.email}
          </span>
        </div>
        <div
          className="flex items-center gap-3 text-base cursor-pointer hover:bg-blue-50 px-2 py-1 rounded"
          onClick={() => selectElement("address")}
        >
          <div className="w-5 h-5">📍</div>
          <div>
            {editorState.address.split("\n").map((line: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, i: Key | null | undefined) => (
              <div
                key={i}
                style={{
                  fontFamily: editorState.contactFont,
                  fontSize: `${editorState.contactFontSize + 2}px`,
                  color: i === 0 ? editorState.contactColor : "#6B7280",
                  fontWeight: editorState.contactBold ? "bold" : "normal",
                  letterSpacing: `${editorState.contactSpacing}px`,
                  textAlign: editorState.contactAlign,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Design - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-44">
        <svg
          className="absolute bottom-20 left-0 w-full h-28"
          viewBox="0 0 384 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 112C0 112 96 38 192 56C288 74 384 18 384 18V112H0Z" fill={editorState.backgroundColor} />
        </svg>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-black" />

        <div className="absolute bottom-6 left-10 flex items-center gap-4 text-white z-10">
          <div className="w-12 h-12 flex-shrink-0">
            <EditableCompanyLogo size={48} />
          </div>
          <div className="cursor-pointer hover:bg-gray-800 px-2 py-1 rounded" onClick={() => selectElement("company")}>
            <h4
              className="text-lg tracking-wide"
              style={{
                fontFamily: editorState.companyFont,
                fontSize: `${editorState.companyFontSize + 2}px`,
                color: editorState.companyColor,
                fontWeight: editorState.companyBold ? "bold" : "bold",
                letterSpacing: `${editorState.companySpacing}px`,
                textAlign: editorState.companyAlign,
              }}
            >
              {editorState.logoText || editorState.companyName}
            </h4>
            <p className="text-sm opacity-90 font-medium">Tag Line Goes Here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const EditableSalesMarketingBack = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 384 576"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 0L144 0C168 144 168 432 144 576L0 576V0Z" fill={editorState.backgroundColor} />
        <path d="M144 0C168 144 168 432 144 576L384 576L384 0L144 0Z" fill="#000000" />
      </svg>

      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 cursor-pointer hover:bg-gray-800 px-6 py-3 rounded"
        onClick={() => selectElement("company")}
      >
        <div className="mb-8 flex justify-center">
          <EditableCompanyLogo size={96} />
        </div>
        <h3
          className="mb-4 tracking-wide"
          style={{
            fontFamily: editorState.companyFont,
            fontSize: `${editorState.companyFontSize + 12}px`,
            color: editorState.companyColor,
            fontWeight: editorState.companyBold ? "bold" : "bold",
            letterSpacing: `${editorState.companySpacing}px`,
            textAlign: editorState.companyAlign,
          }}
        >
          {editorState.logoText || editorState.companyName}
        </h3>
        <p className="text-lg opacity-90 font-medium">Tag Line Goes Here</p>
      </div>
    </div>
  )
}

// Modern Corporate Template Components with real-time editing
const EditableModernCorporateFront = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      <div
        className="absolute top-0 left-0 w-20 h-20"
        style={{
          backgroundColor: editorState.backgroundColor,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />

      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 384 576"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 0L384 0L384 240L192 336L0 240V0Z" fill="#1e3a5f" />
      </svg>

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <div
          className="w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white/30 cursor-pointer"
          onClick={() => selectElement("name")}
        >
          {editorState.profileImage ? (
            <img
              src={editorState.profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">+</div>
          )}
        </div>
      </div>

      <div className="absolute top-52 left-1/2 transform -translate-x-1/2 text-center text-white">
        <h3
          className="mb-2 cursor-pointer hover:bg-blue-900 px-3 py-2 rounded"
          style={{
            fontFamily: editorState.nameFont,
            fontSize: `${editorState.nameFontSize + 6}px`,
            color: editorState.nameColor,
            fontWeight: editorState.nameBold ? "bold" : "bold",
            letterSpacing: `${editorState.nameSpacing}px`,
            textAlign: editorState.nameAlign,
          }}
          onClick={() => selectElement("name")}
        >
          {editorState.name
            .toUpperCase()
            .split(" ")
            .map((word: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined, i: number) => (
              <span key={i}>
                {i === 0 ? word : <span style={{ color: editorState.backgroundColor }}>{word}</span>}
                {i < editorState.name.split(" ").length - 1 && " "}
              </span>
            ))}
        </h3>
        <p
          className="text-base opacity-90 cursor-pointer hover:bg-blue-900 px-3 py-2 rounded"
          style={{
            fontFamily: editorState.positionFont,
            fontSize: `${editorState.positionFontSize + 2}px`,
            color: editorState.positionColor,
            fontWeight: editorState.positionBold ? "bold" : "normal",
            letterSpacing: `${editorState.positionSpacing}px`,
            textAlign: editorState.positionAlign,
          }}
          onClick={() => selectElement("position")}
        >
          {editorState.position.toUpperCase()}
        </p>
        <div className="w-20 h-1 bg-gray-300 mx-auto mt-3" />
      </div>

      <div className="absolute bottom-24 left-10 right-10 space-y-3">
        <div
          className="flex items-center gap-4 text-base text-gray-700 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded"
          onClick={() => selectElement("phone")}
        >
          <div className="w-5 h-5 text-[#1e3a5f]">📞</div>
          <span
            style={{
              fontFamily: editorState.contactFont,
              fontSize: `${editorState.contactFontSize + 2}px`,
              color: "#374151",
              fontWeight: editorState.contactBold ? "bold" : "normal",
              letterSpacing: `${editorState.contactSpacing}px`,
              textAlign: editorState.contactAlign,
            }}
          >
            {editorState.phone}
          </span>
        </div>
        <div
          className="flex items-center gap-4 text-base text-gray-700 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded"
          onClick={() => selectElement("email")}
        >
          <div className="w-5 h-5 text-[#1e3a5f]">✉️</div>
          <span
            style={{
              fontFamily: editorState.contactFont,
              fontSize: `${editorState.contactFontSize + 2}px`,
              color: "#374151",
              fontWeight: editorState.contactBold ? "bold" : "normal",
              letterSpacing: `${editorState.contactSpacing}px`,
              textAlign: editorState.contactAlign,
            }}
          >
            {editorState.email}
          </span>
        </div>
        <div
          className="flex items-center gap-4 text-base text-gray-700 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded"
          onClick={() => selectElement("address")}
        >
          <div className="w-5 h-5 text-[#1e3a5f]">📍</div>
          <div>
            {editorState.address.split("\n").map((line: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, i: Key | null | undefined) => (
              <div
                key={i}
                style={{
                  fontFamily: editorState.contactFont,
                  fontSize: `${editorState.contactFontSize + 2}px`,
                  color: i === 0 ? "#374151" : "#6B7280",
                  fontWeight: editorState.contactBold ? "bold" : "normal",
                  letterSpacing: `${editorState.contactSpacing}px`,
                  textAlign: editorState.contactAlign,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 flex gap-2">
        <div className="h-2 w-40 bg-[#1e3a5f] rounded-full" />
        <div className="h-2 w-16 rounded-full" style={{ backgroundColor: editorState.backgroundColor }} />
      </div>

      <div
        className="absolute bottom-0 right-0 w-16 h-16 bg-[#1e3a5f]"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      >
        <div
          className="absolute bottom-0 right-0 w-10 h-10"
          style={{
            backgroundColor: editorState.backgroundColor,
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>
    </div>
  )
}

const EditableModernCorporateBack = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      <div
        className="absolute top-0 left-0 w-20 h-20"
        style={{
          backgroundColor: editorState.backgroundColor,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />

      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 384 576"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 0L384 0L384 240L192 336L0 240V0Z" fill="#1e3a5f" />
      </svg>

      <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
        <EditableCompanyLogo size={80} />
      </div>

      <div
        className="absolute top-48 left-1/2 transform -translate-x-1/2 text-center text-white cursor-pointer hover:bg-blue-900 px-6 py-3 rounded"
        onClick={() => selectElement("company")}
      >
        <h3
          className="mb-2"
          style={{
            fontFamily: editorState.companyFont,
            fontSize: `${editorState.companyFontSize + 4}px`,
            color: editorState.companyColor,
            fontWeight: editorState.companyBold ? "bold" : "bold",
            letterSpacing: `${editorState.companySpacing}px`,
            textAlign: editorState.companyAlign,
          }}
        >
          {(editorState.logoText || editorState.companyName).toUpperCase()}
        </h3>
        <p className="text-sm opacity-80">TAG LINE GOES HERE</p>
      </div>

      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
        <div className="w-28 h-28 bg-white p-3 rounded-lg border border-gray-200">
          <QRCodeSVG value={editorState.qrContent?.website || editorState.qrContent?.email?.address || editorState.qrContent?.phone || 'https://example.com'} size={80} />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
        <div className="h-2 w-28 bg-[#1e3a5f] rounded-full" />
        <div className="h-2 w-10 rounded-full" style={{ backgroundColor: editorState.backgroundColor }} />
      </div>

      <div
        className="absolute bottom-0 right-0 w-16 h-16 bg-[#1e3a5f]"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      >
        <div
          className="absolute bottom-0 right-0 w-10 h-10"
          style={{
            backgroundColor: editorState.backgroundColor,
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>
    </div>
  )
}

// EXACT REPLICA: Simple Professional Editable Templates - Diagonal Slice Design
const EditableSimpleProfessionalFront = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      {/* Blue diagonal stripe - exact slice design */}
      <div className="absolute inset-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 384 576"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Main diagonal blue stripe */}
          <path d="M0 192L384 0L384 144L0 336Z" fill="#2563EB" />
          {/* Dark section at bottom */}
          <path d="M0 336L384 144L384 576L0 576Z" fill="#1E293B" />
        </svg>
      </div>

      {/* Company logo and name - top left */}
      <div className="absolute top-8 left-8 z-10">
        <div
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 cursor-pointer shadow-lg"
          onClick={() => selectElement("company")}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#2563EB" />
            <circle cx="16" cy="16" r="8" fill="#60A5FA" />
          </svg>
        </div>
        <div
          className="text-white cursor-pointer hover:bg-blue-900 px-2 py-1 rounded"
          onClick={() => selectElement("company")}
        >
          <h3
            className="text-base font-bold"
            style={{
              fontFamily: editorState.companyFont,
              fontSize: `${editorState.companyFontSize}px`,
              color: editorState.companyColor || "#FFFFFF",
              fontWeight: editorState.companyBold ? "bold" : "bold",
              letterSpacing: `${editorState.companySpacing}px`,
              textAlign: editorState.companyAlign,
            }}
          >
            {(editorState.logoText || editorState.companyName).toUpperCase()}
          </h3>
          <p className="text-xs opacity-80">TAG LINE GOES HERE</p>
        </div>
      </div>

      {/* Name and title - center right */}
      <div className="absolute top-40 right-10 text-right z-10">
        <h2
          className="mb-2 cursor-pointer hover:bg-blue-900 px-3 py-2 rounded"
          style={{
            fontFamily: editorState.nameFont,
            fontSize: `${editorState.nameFontSize + 8}px`,
            color: editorState.nameColor || "#FFFFFF",
            fontWeight: editorState.nameBold ? "bold" : "bold",
            letterSpacing: `${editorState.nameSpacing}px`,
            textAlign: editorState.nameAlign,
          }}
          onClick={() => selectElement("name")}
        >
          {editorState.name.toUpperCase()}
        </h2>
        <p
          className="text-blue-200 cursor-pointer hover:bg-blue-900 px-3 py-2 rounded"
          style={{
            fontFamily: editorState.positionFont,
            fontSize: `${editorState.positionFontSize + 2}px`,
            color: editorState.positionColor || "#BFDBFE",
            fontWeight: editorState.positionBold ? "bold" : "normal",
            letterSpacing: `${editorState.positionSpacing}px`,
            textAlign: editorState.positionAlign,
          }}
          onClick={() => selectElement("position")}
        >
          {editorState.position.toUpperCase()}
        </p>
      </div>

      {/* QR Code - bottom left */}
      <div className="absolute bottom-10 left-8 z-10">
        <div className="w-20 h-20 bg-white rounded-lg p-3">
          <QRCodeSVG value={editorState.qrContent?.website || editorState.qrContent?.email?.address || editorState.qrContent?.phone || 'https://example.com'} size={80} />
        </div>
      </div>

      {/* Contact information - bottom right with blue icons */}
      <div className="absolute bottom-10 right-8 text-right text-white z-10 space-y-2">
        <div
          className="flex items-center justify-end gap-3 text-sm cursor-pointer hover:bg-blue-900 px-2 py-1 rounded"
          onClick={() => selectElement("phone")}
        >
          <span
            style={{
              fontFamily: editorState.contactFont,
              fontSize: `${editorState.contactFontSize}px`,
              color: "#FFFFFF",
              fontWeight: editorState.contactBold ? "bold" : "normal",
              letterSpacing: `${editorState.contactSpacing}px`,
              textAlign: editorState.contactAlign,
            }}
          >
            {editorState.phone}
          </span>
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">📞</span>
          </div>
        </div>
        <div
          className="flex items-center justify-end gap-3 text-sm cursor-pointer hover:bg-blue-900 px-2 py-1 rounded"
          onClick={() => selectElement("email")}
        >
          <span
            style={{
              fontFamily: editorState.contactFont,
              fontSize: `${editorState.contactFontSize}px`,
              color: "#FFFFFF",
              fontWeight: editorState.contactBold ? "bold" : "normal",
              letterSpacing: `${editorState.contactSpacing}px`,
              textAlign: editorState.contactAlign,
            }}
          >
            {editorState.email}
          </span>
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">✉️</span>
          </div>
        </div>
        <div
          className="flex items-center justify-end gap-3 text-sm cursor-pointer hover:bg-blue-900 px-2 py-1 rounded"
          onClick={() => selectElement("address")}
        >
          <div className="text-right">
            {editorState.address.split("\n").map((line: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, i: Key | null | undefined) => (
              <div
                key={i}
                style={{
                  fontFamily: editorState.contactFont,
                  fontSize: `${editorState.contactFontSize}px`,
                  color: i === 0 ? "#FFFFFF" : "#BFDBFE",
                  fontWeight: editorState.contactBold ? "bold" : "normal",
                  letterSpacing: `${editorState.contactSpacing}px`,
                  textAlign: editorState.contactAlign,
                }}
              >
                {line}
              </div>
            ))}
          </div>
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">📍</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const EditableSimpleProfessionalBack = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      {/* Blue diagonal stripe - top right corner */}
      <div className="absolute top-0 right-0">
        <svg width="144" height="144" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M144 0L144 144L0 0Z" fill="#2563EB" />
        </svg>
      </div>

      {/* Company logo - center */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer hover:bg-blue-50 px-6 py-4 rounded-lg"
        onClick={() => selectElement("company")}
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="#2563EB" />
            <circle cx="24" cy="24" r="14" fill="#60A5FA" />
          </svg>
        </div>
        <h3
          className="mb-3"
          style={{
            fontFamily: editorState.companyFont,
            fontSize: `${editorState.companyFontSize + 6}px`,
            color: editorState.companyColor || "#1F2937",
            fontWeight: editorState.companyBold ? "bold" : "bold",
            letterSpacing: `${editorState.companySpacing}px`,
            textAlign: editorState.companyAlign,
          }}
        >
          {(editorState.logoText || editorState.companyName).toUpperCase()}
        </h3>
        <p className="text-base text-gray-600">TAG LINE GOES HERE</p>
      </div>
    </div>
  )
}

// EXACT REPLICA: Creative & Design Editable Templates - U-Shape Design
const EditableCreativeDesignFront = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      {/* Orange-Yellow U-shaped section at top 75% */}
      <div className="absolute top-0 left-0 right-0 h-[75%]">
        <svg
          className="w-full h-full"
          viewBox="0 0 384 432"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="orangeYellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
          </defs>
          <path d="M0 0L384 0L384 288C288 360 96 360 0 288Z" fill="url(#orangeYellowGradient)" />
        </svg>
      </div>

      {/* Navy blue bottom section (25%) */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-[#1E3A8A] rounded-b-3xl">
        {/* Profile photo - positioned above the U-shape curve */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div
            className="w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer"
            onClick={() => selectElement("name")}
          >
            {editorState.profileImage ? (
              <img
                src={editorState.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">+</div>
            )}
          </div>
        </div>

        {/* Name and title - in the orange section */}
        <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h2
            className="mb-2 cursor-pointer hover:bg-orange-600 px-3 py-2 rounded"
            style={{
              fontFamily: editorState.nameFont,
              fontSize: `${editorState.nameFontSize + 4}px`,
              color: editorState.nameColor || "#1E3A8A",
              fontWeight: editorState.nameBold ? "bold" : "bold",
              letterSpacing: `${editorState.nameSpacing}px`,
              textAlign: editorState.nameAlign,
            }}
            onClick={() => selectElement("name")}
          >
            {editorState.name.toUpperCase()}
          </h2>
          <p
            className="cursor-pointer hover:bg-orange-600 px-3 py-2 rounded"
            style={{
              fontFamily: editorState.positionFont,
              fontSize: `${editorState.positionFontSize + 2}px`,
              color: editorState.positionColor || "#1E3A8A",
              fontWeight: editorState.positionBold ? "bold" : "normal",
              letterSpacing: `${editorState.positionSpacing}px`,
              textAlign: editorState.positionAlign,
            }}
            onClick={() => selectElement("position")}
          >
            {editorState.position.toUpperCase()}
          </p>
        </div>

        {/* QR Code - bottom left in blue section */}
        <div className="absolute bottom-6 left-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-lg p-3">
            <QRCodeSVG value={editorState.qrContent?.website || editorState.qrContent?.email?.address || editorState.qrContent?.phone || 'https://example.com'} size={80} />
          </div>
        </div>

        {/* Contact information - bottom right in blue section with yellow icons */}
        <div className="absolute bottom-6 right-8 space-y-2">
          <div
            className="flex items-center gap-3 text-sm text-white cursor-pointer hover:bg-blue-900 px-2 py-1 rounded"
            onClick={() => selectElement("phone")}
          >
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-[#1E3A8A] text-xs">📞</span>
            </div>
            <span
              style={{
                fontFamily: editorState.contactFont,
                fontSize: `${editorState.contactFontSize}px`,
                color: "#FFFFFF",
                fontWeight: editorState.contactBold ? "bold" : "normal",
                letterSpacing: `${editorState.contactSpacing}px`,
                textAlign: editorState.contactAlign,
              }}
            >
              {editorState.phone}
            </span>
          </div>
          <div
            className="flex items-center gap-3 text-sm text-white cursor-pointer hover:bg-blue-900 px-2 py-1 rounded"
            onClick={() => selectElement("email")}
          >
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-[#1E3A8A] text-xs">✉️</span>
            </div>
            <span
              style={{
                fontFamily: editorState.contactFont,
                fontSize: `${editorState.contactFontSize}px`,
                color: "#FFFFFF",
                fontWeight: editorState.contactBold ? "bold" : "normal",
                letterSpacing: `${editorState.contactSpacing}px`,
                textAlign: editorState.contactAlign,
              }}
            >
              {editorState.email}
            </span>
          </div>
          <div
            className="flex items-center gap-3 text-sm text-white cursor-pointer hover:bg-blue-900 px-2 py-1 rounded"
            onClick={() => selectElement("address")}
          >
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-[#1E3A8A] text-xs">📍</span>
            </div>
            <div>
              {editorState.address.split("\n").map((line: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, i: Key | null | undefined) => (
                <div
                  key={i}
                  style={{
                    fontFamily: editorState.contactFont,
                    fontSize: `${editorState.contactFontSize}px`,
                    color: i === 0 ? "#FFFFFF" : "#BFDBFE",
                    fontWeight: editorState.contactBold ? "bold" : "normal",
                    letterSpacing: `${editorState.contactSpacing}px`,
                    textAlign: editorState.contactAlign,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const EditableCreativeDesignBack = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] bg-[#1E3A8A] rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      {/* Yellow corner accent */}
      <div className="absolute top-0 right-0">
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M96 0L96 96L0 0Z" fill="#F59E0B" />
        </svg>
      </div>

      {/* Company logo and name - center */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white cursor-pointer hover:bg-blue-900 px-6 py-4 rounded"
        onClick={() => selectElement("company")}
      >
        <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="#1E3A8A" />
            <circle cx="24" cy="24" r="14" fill="#60A5FA" />
          </svg>
        </div>
        <h3
          className="mb-3"
          style={{
            fontFamily: editorState.companyFont,
            fontSize: `${editorState.companyFontSize + 6}px`,
            color: editorState.companyColor || "#F59E0B",
            fontWeight: editorState.companyBold ? "bold" : "bold",
            letterSpacing: `${editorState.companySpacing}px`,
            textAlign: editorState.companyAlign,
          }}
        >
          {(editorState.logoText || editorState.companyName).toUpperCase()}
        </h3>
        <p className="text-base text-white opacity-90">TAG LINE GOES HERE</p>
      </div>
    </div>
  )
}

// EXACT REPLICA: Service Professional Editable Templates - V-Badge Design
const EditableServiceProfessionalFront = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      {/* Purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95] to-[#7C3AED]">
        {/* Pink name/title card - top left */}
        <div className="absolute top-10 left-8">
          <div
            className="w-32 h-20 bg-[#EC4899] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#DB2777] transition-colors"
            onClick={() => selectElement("name")}
          >
            <div className="text-white text-sm font-bold text-center">
              <div
                style={{
                  fontFamily: editorState.nameFont,
                  fontSize: `${editorState.nameFontSize}px`,
                  color: editorState.nameColor || "#FFFFFF",
                  fontWeight: editorState.nameBold ? "bold" : "bold",
                  letterSpacing: `${editorState.nameSpacing}px`,
                  textAlign: editorState.nameAlign,
                }}
              >
                {editorState.name}
              </div>
              <div
                className="text-xs opacity-90"
                style={{
                  fontFamily: editorState.positionFont,
                  fontSize: `${editorState.positionFontSize - 2}px`,
                  color: editorState.positionColor || "#FFFFFF",
                  fontWeight: editorState.positionBold ? "bold" : "normal",
                  letterSpacing: `${editorState.positionSpacing}px`,
                  textAlign: editorState.positionAlign,
                }}
              >
                {editorState.position}
              </div>
            </div>
          </div>
        </div>

        {/* QR Code - top right */}
        <div className="absolute top-10 right-8">
          <div className="w-20 h-20 bg-[#EC4899] rounded-lg p-3">
            <QRCodeSVG value={editorState.qrContent?.website || editorState.qrContent?.email?.address || editorState.qrContent?.phone || 'https://example.com'} size={80} />
          </div>
        </div>

        {/* Pink V-badge section at bottom - upside down V */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-48"
            viewBox="0 0 384 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0 192L192 0L384 192Z" fill="#EC4899" />
          </svg>
        </div>

        {/* Contact information in pink V-badge section */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 space-y-3 text-white z-10">
          <div
            className="flex items-center gap-3 text-base cursor-pointer hover:bg-pink-600 px-3 py-2 rounded"
            onClick={() => selectElement("phone")}
          >
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[#EC4899] text-sm">📞</span>
            </div>
            <span
              style={{
                fontFamily: editorState.contactFont,
                fontSize: `${editorState.contactFontSize + 2}px`,
                color: "#FFFFFF",
                fontWeight: editorState.contactBold ? "bold" : "normal",
                letterSpacing: `${editorState.contactSpacing}px`,
                textAlign: editorState.contactAlign,
              }}
            >
              {editorState.phone}
            </span>
          </div>
          <div
            className="flex items-center gap-3 text-base cursor-pointer hover:bg-pink-600 px-3 py-2 rounded"
            onClick={() => selectElement("email")}
          >
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[#EC4899] text-sm">✉️</span>
            </div>
            <span
              style={{
                fontFamily: editorState.contactFont,
                fontSize: `${editorState.contactFontSize + 2}px`,
                color: "#FFFFFF",
                fontWeight: editorState.contactBold ? "bold" : "normal",
                letterSpacing: `${editorState.contactSpacing}px`,
                textAlign: editorState.contactAlign,
              }}
            >
              {editorState.email}
            </span>
          </div>
          <div
            className="flex items-center gap-3 text-base cursor-pointer hover:bg-pink-600 px-3 py-2 rounded"
            onClick={() => selectElement("address")}
          >
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[#EC4899] text-sm">📍</span>
            </div>
            <div className="text-center">
              {editorState.address.split("\n").map((line: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, i: Key | null | undefined) => (
                <div
                  key={i}
                  style={{
                    fontFamily: editorState.contactFont,
                    fontSize: `${editorState.contactFontSize + 2}px`,
                    color: i === 0 ? "#FFFFFF" : "#F3E8FF",
                    fontWeight: editorState.contactBold ? "bold" : "normal",
                    letterSpacing: `${editorState.contactSpacing}px`,
                    textAlign: editorState.contactAlign,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const EditableServiceProfessionalBack = () => {
  const { editorState, selectElement } = useCardEditor()

  return (
    <div className="w-96 h-[36rem] rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
      {/* Split design - pink left, purple right */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 384 576"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Pink section */}
          <path d="M0 0L192 0L240 288L192 576L0 576Z" fill="#EC4899" />
          {/* Purple section */}
          <path d="M192 0L384 0L384 576L192 576L240 288Z" fill="#4C1D95" />
        </svg>
      </div>

      {/* Company logo and name - center */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 cursor-pointer hover:bg-black/20 px-6 py-4 rounded"
        onClick={() => selectElement("company")}
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="#EC4899" />
            <circle cx="24" cy="24" r="14" fill="#4C1D95" />
          </svg>
        </div>
        <h3
          className="mb-3"
          style={{
            fontFamily: editorState.companyFont,
            fontSize: `${editorState.companyFontSize + 6}px`,
            color: editorState.companyColor || "#FFFFFF",
            fontWeight: editorState.companyBold ? "bold" : "bold",
            letterSpacing: `${editorState.companySpacing}px`,
            textAlign: editorState.companyAlign,
          }}
        >
          {editorState.logoText || editorState.companyName}
        </h3>
        <p className="text-base opacity-90">Tag Line Goes Here</p>
      </div>
    </div>
  )
}

export {
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
}

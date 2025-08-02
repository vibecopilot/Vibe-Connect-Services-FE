"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

export interface Template {
  id: string
  name: string
  category: string
  preview: {
    front: React.ComponentType
    back: React.ComponentType
  }
  selected?: boolean
}

interface TemplateContextType {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  selectedTemplate: Template | null
  setSelectedTemplate: (template: Template | null) => void
  templates: Template[]
  getTemplatesByCategory: (category: string) => Template[]
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined)

// Company Logo Component - Professional multi-ring design
const CompanyLogo = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer blue ring */}
    <ellipse cx="40" cy="32" rx="35" ry="28" fill="#3B82F6" />
    {/* Middle orange ring */}
    <ellipse cx="40" cy="32" rx="28" ry="22" fill="#F97316" />
    {/* Inner pink ring */}
    <ellipse cx="40" cy="32" rx="21" ry="16" fill="#EC4899" />
    {/* Center blue dot */}
    <ellipse cx="40" cy="32" rx="14" ry="10" fill="#1E40AF" />
    {/* Inner highlight */}
    <ellipse cx="40" cy="32" rx="7" ry="5" fill="#60A5FA" />
  </svg>
)

// Modern Corporate Template Components
const ModernCorporateFront = () => (
  <div className="w-80 h-[30rem] bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    {/* Orange corner accent - Top left */}
    <div
      className="absolute top-0 left-0 w-16 h-16 bg-orange-500"
      style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
    />

    {/* Vertical Ribbon Banner */}
    <svg
      className="absolute top-0 left-0 w-full h-full"
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M0 0L320 0L320 200L160 280L0 200V0Z" fill="#1e3a5f" />
    </svg>

    {/* Profile photo */}
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
      <div className="w-20 h-20 bg-white rounded-full overflow-hidden border-3 border-white/30">
        <img
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Name and title */}
    <div className="absolute top-44 left-1/2 transform -translate-x-1/2 text-center text-white">
      <h3 className="text-xl font-bold mb-1">
        JHON <span className="text-orange-500">DOE</span>
      </h3>
      <p className="text-sm opacity-90">DESIGNER</p>
      <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-2" />
    </div>

    {/* Contact information */}
    <div className="absolute bottom-20 left-8 right-8 space-y-2">
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <div className="w-4 h-4 text-[#1e3a5f]">📞</div>
        <span>000-123-456-7890</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <div className="w-4 h-4 text-[#1e3a5f]">✉️</div>
        <span>email@yourdomain.com</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <div className="w-4 h-4 text-[#1e3a5f]">📍</div>
        <div>
          <div>Your address goes here</div>
          <div className="text-xs text-gray-500">125 Street, USA</div>
        </div>
      </div>
    </div>

    {/* Bottom accent bars */}
    <div className="absolute bottom-8 left-8 flex gap-1">
      <div className="h-1.5 w-32 bg-[#1e3a5f] rounded-full" />
      <div className="h-1.5 w-12 bg-orange-500 rounded-full" />
    </div>

    {/* Bottom right corner accent */}
    <div
      className="absolute bottom-0 right-0 w-12 h-12 bg-[#1e3a5f]"
      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
    >
      <div
        className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  </div>
)

const ModernCorporateBack = () => (
  <div className="w-80 h-[30rem] bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    {/* Orange corner accent */}
    <div
      className="absolute top-0 left-0 w-16 h-16 bg-orange-500"
      style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
    />

    {/* Vertical Ribbon Banner */}
    <svg
      className="absolute top-0 left-0 w-full h-full"
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M0 0L320 0L320 200L160 280L0 200V0Z" fill="#1e3a5f" />
    </svg>

    {/* Company logo */}
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
      <CompanyLogo size={64} />
    </div>

    {/* Company name and tagline */}
    <div className="absolute top-40 left-1/2 transform -translate-x-1/2 text-center text-white">
      <h3 className="text-lg font-bold mb-1">COMPANY NAME</h3>
      <p className="text-xs opacity-80">TAG LINE GOES HERE</p>
    </div>

    {/* QR Code */}
    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
      <div className="w-24 h-24 bg-white p-2 rounded-lg border border-gray-200">
        <div className="w-full h-full bg-black rounded grid grid-cols-7 grid-rows-7 gap-0.5 p-1">
          {Array.from({ length: 49 }).map((_, i) => (
            <div key={i} className={`${Math.random() > 0.5 ? "bg-white" : "bg-black"} rounded-sm`} />
          ))}
        </div>
      </div>
    </div>

    {/* Bottom accent bars */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
      <div className="h-1.5 w-24 bg-[#1e3a5f] rounded-full" />
      <div className="h-1.5 w-8 bg-orange-500 rounded-full" />
    </div>

    {/* Bottom right corner accent */}
    <div
      className="absolute bottom-0 right-0 w-12 h-12 bg-[#1e3a5f]"
      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
    >
      <div
        className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  </div>
)

// Sales & Marketing Template Components
const SalesMarketingFront = () => (
  <div className="w-80 h-[30rem] bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    {/* QR Code - Top Left */}
    <div className="absolute top-8 left-8">
      <div className="w-16 h-16 bg-[#1cd5b7] rounded-lg grid grid-cols-4 grid-rows-4 gap-0.5 p-1">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={`${Math.random() > 0.5 ? "bg-white" : "bg-[#1cd5b7]"} rounded-sm`} />
        ))}
      </div>
    </div>

    {/* Profile and Name - Top Right */}
    <div className="absolute top-8 right-8">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mb-2">
          <img
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-base font-bold text-center">
          Jhon <span className="text-[#1cd5b7]">Doe</span>
        </h3>
        <p className="text-xs text-gray-600">Sales Executive</p>
      </div>
    </div>

    {/* Contact Information */}
    <div className="absolute top-32 left-8 space-y-2">
      <div className="flex items-center gap-2 text-sm text-[#1cd5b7]">
        <div className="w-4 h-4">📞</div>
        <span>000-123-456-7890</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#1cd5b7]">
        <div className="w-4 h-4">✉️</div>
        <span>email@yourdomain.com</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#1cd5b7]">
        <div className="w-4 h-4">📍</div>
        <div>
          <div>Your address goes here</div>
          <div className="text-xs text-gray-500">125 Street, USA</div>
        </div>
      </div>
    </div>

    {/* Wave Design */}
    <div className="absolute bottom-0 left-0 right-0 h-36">
      <svg
        className="absolute bottom-16 left-0 w-full h-24"
        viewBox="0 0 320 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 96C0 96 80 32 160 48C240 64 320 16 320 16V96H0Z" fill="#1cd5b7" />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black" />

      <div className="absolute bottom-4 left-8 flex items-center gap-3 text-white z-10">
        <div className="w-10 h-10 flex-shrink-0">
          <CompanyLogo size={40} />
        </div>
        <div>
          <h4 className="text-base font-bold tracking-wide">Company Name</h4>
          <p className="text-xs opacity-90 font-medium">Tag Line Goes Here</p>
        </div>
      </div>
    </div>
  </div>
)

const SalesMarketingBack = () => (
  <div className="w-80 h-[30rem] rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    <svg
      className="absolute top-0 left-0 w-full h-full"
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M0 0L120 0C140 120 140 360 120 480L0 480V0Z" fill="#1cd5b7" />
      <path d="M120 0C140 120 140 360 120 480L320 480L320 0L120 0Z" fill="#000000" />
    </svg>

    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
      <div className="mb-6 flex justify-center">
        <CompanyLogo size={80} />
      </div>
      <h3 className="text-2xl font-bold mb-3 tracking-wide">Company Name</h3>
      <p className="text-base opacity-90 font-medium">Tag Line Goes Here</p>
    </div>
  </div>
)

// EXACT REPLICA: Simple Professional Template - Based on screenshot
const SimpleProfessionalFront = () => (
  <div className="w-80 h-[30rem] bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    {/* Blue diagonal stripe - top left to bottom right */}
    <div className="absolute inset-0">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 320 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Main diagonal blue stripe */}
        <path d="M0 160L320 0L320 120L0 280Z" fill="#2563EB" />
        {/* Dark section at bottom */}
        <path d="M0 280L320 120L320 480L0 480Z" fill="#1E293B" />
      </svg>
    </div>

    {/* Company logo and name - top left */}
    <div className="absolute top-6 left-6 z-10">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#2563EB" />
          <circle cx="12" cy="12" r="6" fill="#60A5FA" />
        </svg>
      </div>
      <div className="text-white">
        <h3 className="text-sm font-bold">COMPANY NAME</h3>
        <p className="text-xs opacity-80">TAG LINE GOES HERE</p>
      </div>
    </div>

    {/* Name and title - center right */}
    <div className="absolute top-32 right-8 text-right z-10">
      <h2 className="text-2xl font-bold text-white mb-1">JOHN DOE</h2>
      <p className="text-sm text-blue-200">DESIGNER</p>
    </div>

    {/* QR Code - bottom left */}
    <div className="absolute bottom-8 left-6 z-10">
      <div className="w-16 h-16 bg-white rounded p-2">
        <div className="w-full h-full bg-gray-800 grid grid-cols-4 grid-rows-4 gap-0.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={`${Math.random() > 0.5 ? "bg-white" : "bg-gray-800"}`} />
          ))}
        </div>
      </div>
    </div>

    {/* Contact information - bottom right */}
    <div className="absolute bottom-8 right-6 text-right text-white z-10 space-y-1">
      <div className="flex items-center justify-end gap-2 text-xs">
        <span>000-123-456-7890</span>
        <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white text-xs">📞</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 text-xs">
        <span>email@yourdomain.com</span>
        <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white text-xs">✉️</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 text-xs">
        <div className="text-right">
          <div>Your address goes here</div>
          <div className="opacity-80">125 Street, USA</div>
        </div>
        <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white text-xs">📍</span>
        </div>
      </div>
    </div>
  </div>
)

const SimpleProfessionalBack = () => (
  <div className="w-80 h-[30rem] bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    {/* Blue diagonal stripe - top right corner */}
    <div className="absolute top-0 right-0">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M120 0L120 120L0 0Z" fill="#2563EB" />
      </svg>
    </div>

    {/* Company logo - center */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#2563EB" />
          <circle cx="20" cy="20" r="12" fill="#60A5FA" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">COMPANY NAME</h3>
      <p className="text-sm text-gray-600">TAG LINE GOES HERE</p>
    </div>
  </div>
)

// EXACT REPLICA: Creative & Design Template - Based on screenshot
const CreativeDesignFront = () => (
  <div className="w-80 h-[30rem] bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    {/* Yellow curved section at top */}
    <div className="absolute top-0 left-0 right-0">
      <svg
        className="w-full h-32"
        viewBox="0 0 320 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 0L320 0L320 64C240 96 80 96 0 64Z" fill="#F59E0B" />
      </svg>
    </div>

    {/* Navy blue main section */}
    <div className="absolute top-16 left-0 right-0 bottom-0 bg-[#1E3A8A] rounded-b-2xl">
      {/* Profile photo - centered in yellow section */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-20 h-20 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name and title */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center text-white">
        <h2 className="text-xl font-bold text-yellow-400 mb-1">JOHN DOE</h2>
        <p className="text-sm text-white">DESIGNER</p>
      </div>

      {/* QR Code - bottom left */}
      <div className="absolute bottom-8 left-6">
        <div className="w-16 h-16 bg-yellow-400 rounded p-2">
          <div className="w-full h-full bg-[#1E3A8A] grid grid-cols-4 grid-rows-4 gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`${Math.random() > 0.5 ? "bg-yellow-400" : "bg-[#1E3A8A]"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Contact information */}
      <div className="absolute bottom-8 right-6 space-y-2">
        <div className="flex items-center gap-2 text-sm text-white">
          <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
            <span className="text-[#1E3A8A] text-xs">📞</span>
          </div>
          <span>000-123-456-7890</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white">
          <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
            <span className="text-[#1E3A8A] text-xs">✉️</span>
          </div>
          <span>email@yourdomain.com</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white">
          <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
            <span className="text-[#1E3A8A] text-xs">📍</span>
          </div>
          <div>
            <div>Your address goes here</div>
            <div className="text-xs opacity-80">125 Street, USA</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const CreativeDesignBack = () => (
  <div className="w-80 h-[30rem] bg-[#1E3A8A] rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    {/* Yellow corner accent */}
    <div className="absolute top-0 right-0">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 0L80 80L0 0Z" fill="#F59E0B" />
      </svg>
    </div>

    {/* Company logo and name - center */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
      <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#1E3A8A" />
          <circle cx="20" cy="20" r="12" fill="#60A5FA" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-yellow-400 mb-2">COMPANY NAME</h3>
      <p className="text-sm text-white opacity-90">TAG LINE GOES HERE</p>
    </div>
  </div>
)

// EXACT REPLICA: Service Professionals Template - Based on screenshot
const ServiceProfessionalFront = () => (
  <div className="w-80 h-[30rem] rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    {/* Purple gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95] to-[#7C3AED]">
      {/* Pink geometric shapes */}
      <div className="absolute top-8 left-6">
        <div className="w-24 h-16 bg-[#EC4899] rounded-lg flex items-center justify-center">
          <div className="text-white text-sm font-bold">
            <div>John Doe</div>
            <div className="text-xs opacity-90">Designer, Freelancer</div>
          </div>
        </div>
      </div>

      {/* QR Code - top right */}
      <div className="absolute top-8 right-6">
        <div className="w-16 h-16 bg-[#EC4899] rounded p-2">
          <div className="w-full h-full bg-[#4C1D95] grid grid-cols-4 grid-rows-4 gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`${Math.random() > 0.5 ? "bg-[#EC4899]" : "bg-[#4C1D95]"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Pink diagonal section */}
      <div className="absolute bottom-0 left-0">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200L200 0L200 200Z" fill="#EC4899" />
        </svg>
      </div>

      {/* Contact information in pink section */}
      <div className="absolute bottom-8 left-6 space-y-2 text-white z-10">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
            <span className="text-[#EC4899] text-xs">📞</span>
          </div>
          <span>000-123-456-7890</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
            <span className="text-[#EC4899] text-xs">✉️</span>
          </div>
          <span>email@yourdomain.com</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
            <span className="text-[#EC4899] text-xs">📍</span>
          </div>
          <div>
            <div>Your address goes here</div>
            <div className="text-xs opacity-80">125 Street, USA</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ServiceProfessionalBack = () => (
  <div className="w-80 h-[30rem] rounded-2xl shadow-xl overflow-hidden relative border border-gray-200">
    {/* Split design - pink left, purple right */}
    <div className="absolute inset-0">
      <svg
        className="w-full h-full"
        viewBox="0 0 320 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Pink section */}
        <path d="M0 0L160 0L200 240L160 480L0 480Z" fill="#EC4899" />
        {/* Purple section */}
        <path d="M160 0L320 0L320 480L160 480L200 240Z" fill="#4C1D95" />
      </svg>
    </div>

    {/* Company logo and name - center */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#EC4899" />
          <circle cx="20" cy="20" r="12" fill="#4C1D95" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">Company Name</h3>
      <p className="text-sm opacity-90">Tag Line Goes Here</p>
    </div>
  </div>
)

// Create templates for all categories
const createTemplateForCategory = (category: string): Template => {
  if (category === "Modern Corporate") {
    return {
      id: "modern-corporate-1",
      name: "Modern Corporate",
      category: "Modern Corporate",
      preview: {
        front: ModernCorporateFront,
        back: ModernCorporateBack,
      },
    }
  } else if (category === "Sales & Marketing") {
    return {
      id: "sales-marketing-1",
      name: "Sales & Marketing",
      category: "Sales & Marketing",
      preview: {
        front: SalesMarketingFront,
        back: SalesMarketingBack,
      },
    }
  } else if (category === "Simple Professional") {
    return {
      id: "simple-professional-1",
      name: "Simple Professional",
      category: "Simple Professional",
      preview: {
        front: SimpleProfessionalFront,
        back: SimpleProfessionalBack,
      },
    }
  } else if (category === "Creative & Design") {
    return {
      id: "creative-design-1",
      name: "Creative & Design",
      category: "Creative & Design",
      preview: {
        front: CreativeDesignFront,
        back: CreativeDesignBack,
      },
    }
  } else if (category === "Service Professionals") {
    return {
      id: "service-professionals-1",
      name: "Service Professionals",
      category: "Service Professionals",
      preview: {
        front: ServiceProfessionalFront,
        back: ServiceProfessionalBack,
      },
    }
  } else {
    return {
      id: `${category.toLowerCase().replace(/\s+/g, "-")}-1`,
      name: category,
      category: category,
      preview: {
        front: ModernCorporateFront,
        back: ModernCorporateBack,
      },
    }
  }
}

const templates: Template[] = [
  "Modern Corporate",
  "Sales & Marketing",
  "Simple Professional",
  "Creative & Design",
  "Service Professionals",
].map(createTemplateForCategory)

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const getTemplatesByCategory = (category: string) => {
    return templates.filter((template) => template.category === category)
  }

  return (
    <TemplateContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedTemplate,
        setSelectedTemplate,
        templates,
        getTemplatesByCategory,
      }}
    >
      {children}
    </TemplateContext.Provider>
  )
}

export const useTemplate = () => {
  const context = useContext(TemplateContext)
  if (context === undefined) {
    throw new Error("useTemplate must be used within a TemplateProvider")
  }
  return context
}

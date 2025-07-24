'use client'

import type React from 'react'
import { Eye, Phone, Mail, Globe } from 'lucide-react'
import { useBusinessCard } from '../context/BusinessCardContext'

interface BusinessCardProps {
  showQR?: boolean
  isDigital?: boolean
  onClick?: () => void
  onProfileClick?: () => void
}

const BusinessCard = ({ showQR = false, onClick, onProfileClick }: BusinessCardProps) => {
  const { data } = useBusinessCard()

  const getCardGradient = () => {
    const themes = {
      blue: 'from-blue-900 to-blue-600',
      red: 'from-red-500 to-red-400',
      green: 'from-green-600 to-green-400',
      orange: 'from-orange-500 to-yellow-400',
      nature: 'from-teal-400 to-blue-500',
    }
    return themes[data.theme as keyof typeof themes] || 'from-blue-900 to-blue-600'
  }

  const handleProfileClick = (e: React.MouseEvent) => {
    if (onProfileClick) {
      e.stopPropagation()
      onProfileClick()
    }
  }

  const renderQRCode = () => {
    return (
      <div className="bg-white rounded p-2 flex items-center justify-center">
        <div className="grid grid-cols-5 grid-rows-5 gap-0.5 w-16 h-16">
          <div className="col-span-2 row-span-2 bg-blue-900 rounded-sm"></div>
          <div className="bg-transparent"></div>
          <div className="col-span-2 row-span-2 bg-blue-900 rounded-sm"></div>
          <div className="bg-transparent"></div>
          <div className="bg-blue-900 rounded-sm"></div>
          <div className="bg-transparent"></div>
          <div className="bg-blue-900 rounded-sm"></div>
          <div className="bg-transparent"></div>
          <div className="col-span-2 row-span-2 bg-blue-900 rounded-sm"></div>
          <div className="bg-transparent"></div>
          <div className="col-span-2 row-span-2 bg-blue-900 rounded-sm"></div>
        </div>
      </div>
    )
  }

  if (showQR) {
    return (
      <div
        className={`w-64 h-80 bg-gradient-to-br ${getCardGradient()} rounded-2xl p-6 text-white relative shadow-xl overflow-hidden flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-32 h-32 bg-white rounded-lg mb-4 flex items-center justify-center">{renderQRCode()}</div>
          <span className="text-white text-lg font-medium">Scan Here</span>
        </div>

        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 288 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0 64C96 44 192 44 288 64V64H0V64Z" fill="white" fillOpacity="0.3" />
            <path d="M0 64C96 48 192 48 288 64V64H0V64Z" fill="white" fillOpacity="0.25" />
            <path d="M0 64C96 52 192 52 288 64V64H0V64Z" fill="white" fillOpacity="0.2" />
            <path d="M0 64C96 56 192 56 288 64V64H0V64Z" fill="white" fillOpacity="0.15" />
            <path d="M0 64C96 60 192 60 288 64V64H0V64Z" fill="white" fillOpacity="0.1" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`w-64 h-80 bg-gradient-to-br ${getCardGradient()} rounded-2xl text-white relative shadow-xl overflow-hidden ${
        onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''
      }`}
      onClick={onClick}
    >
      {/* Company Logo and Name - Top Right */}
      <div className="absolute top-4 right-4 flex flex-col items-center">
        {data.companyLogo ? (
          <img
            src={data.companyLogo || '/placeholder.svg'}
            alt="Company Logo"
            className="w-8 h-8 rounded object-contain mb-1"
          />
        ) : (
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center mb-1">
            <Eye className="w-4 h-4" />
          </div>
        )}
        <span className="text-xs text-center leading-tight">{data.companyName || 'vibe'}</span>
      </div>

      {/* Main Content Area - Using flexbox for proper spacing */}
      <div className="flex flex-col h-full pt-12 pb-16">
        {/* Profile Photo Section */}
        <div className="flex justify-center mb-4">
          {data.profileImage ? (
            <img
              src={data.profileImage || '/placeholder.svg'}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-3 border-white/30"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-3 border-white/30 cursor-pointer hover:bg-white/30 transition-colors"
              onClick={handleProfileClick}
            >
              <span className="text-white text-3xl font-light">+</span>
            </div>
          )}
        </div>

        {/* Name and Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-1 text-white">{data.name || 'Pavan Sheth'}</h2>
          <p className="text-sm opacity-90 text-white">{data.position || 'Marketing Head'}</p>
        </div>

        {/* Contact Information Section - Positioned to avoid overlap */}
        <div className="flex-1 flex flex-col justify-end px-6 pb-4">
          <div className="space-y-3 text-xs text-white">
            <div className="flex items-center gap-3">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{data.phone || '+ 91 9764035729'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{data.email || 'john@gmail.com'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{data.websiteUrl || 'website.com'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Pattern - Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 288 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 64C96 44 192 44 288 64V64H0V64Z" fill="white" fillOpacity="0.3" />
          <path d="M0 64C96 48 192 48 288 64V64H0V64Z" fill="white" fillOpacity="0.25" />
          <path d="M0 64C96 52 192 52 288 64V64H0V64Z" fill="white" fillOpacity="0.2" />
          <path d="M0 64C96 56 192 56 288 64V64H0V64Z" fill="white" fillOpacity="0.15" />
          <path d="M0 64C96 60 192 60 288 64V64H0V64Z" fill="white" fillOpacity="0.1" />
        </svg>
      </div>
    </div>
  )
}

export default BusinessCard
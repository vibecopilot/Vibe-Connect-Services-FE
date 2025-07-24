"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface BusinessCardData {
  phone: string
  email: string
  name: string
  theme: string
  profileImage: string | null
  companyLogo: string | null
  companyName: string
  position: string
  websiteUrl: string
  linkedinUrl: string
  otherUrl: string
}

interface BusinessCardContextType {
  data: BusinessCardData
  updateName: (name: string) => void
  updateTheme: (theme: string) => void
  updateProfileImage: (image: string | null) => void
  updateCompanyLogo: (logo: string | null) => void
  updateWorkDetails: (companyName: string, position: string) => void
  updateContactLinks: (websiteUrl: string, linkedinUrl: string, otherUrl: string) => void
  resetData: () => void
}

const BusinessCardContext = createContext<BusinessCardContextType | undefined>(undefined)

const initialData: BusinessCardData = {
  name: "Pavan Sheth",
  theme: "blue",
  profileImage: null,
  companyLogo: null,
  companyName: "vibe",
  position: "Marketing Head",
  websiteUrl: "website.com",
  linkedinUrl: "",
  otherUrl: "",
  phone: "",
  email: ""
}

export const BusinessCardProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<BusinessCardData>(initialData)

  const updateName = (name: string) => {
    setData((prev) => ({ ...prev, name }))
  }

  const updateTheme = (theme: string) => {
    setData((prev) => ({ ...prev, theme }))
  }

  const updateProfileImage = (image: string | null) => {
    setData((prev) => ({ ...prev, profileImage: image }))
  }

  const updateCompanyLogo = (logo: string | null) => {
    setData((prev) => ({ ...prev, companyLogo: logo }))
  }

  const updateWorkDetails = (companyName: string, position: string) => {
    setData((prev) => ({ ...prev, companyName, position }))
  }

  const updateContactLinks = (websiteUrl: string, linkedinUrl: string, otherUrl: string) => {
    setData((prev) => ({ ...prev, websiteUrl, linkedinUrl, otherUrl }))
  }

  const resetData = () => {
    setData(initialData)
  }

  return (
    <BusinessCardContext.Provider
      value={{
        data,
        updateName,
        updateTheme,
        updateProfileImage,
        updateCompanyLogo,
        updateWorkDetails,
        updateContactLinks,
        resetData,
      }}
    >
      {children}
    </BusinessCardContext.Provider>
  )
}

export const useBusinessCard = () => {
  const context = useContext(BusinessCardContext)
  if (context === undefined) {
    throw new Error("useBusinessCard must be used within a BusinessCardProvider")
  }
  return context
}

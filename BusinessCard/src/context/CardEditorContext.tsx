"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CardEditorState {
  // Text editing
  selectedElement: "name" | "position" | "company" | "phone" | "email" | "address" | "website" | null

  // Card content
  name: string
  position: string
  companyName: string
  phone: string
  email: string
  address: string
  website: string

  // Text styling
  nameFont: string
  positionFont: string
  companyFont: string
  contactFont: string

  nameFontSize: number
  positionFontSize: number
  companyFontSize: number
  contactFontSize: number

  nameColor: string
  positionColor: string
  companyColor: string
  contactColor: string

  nameBold: boolean
  positionBold: boolean
  companyBold: boolean
  contactBold: boolean

  // New: Spacing and Alignment
  nameSpacing: number
  positionSpacing: number
  companySpacing: number
  contactSpacing: number

  nameAlign: "left" | "center" | "right"
  positionAlign: "left" | "center" | "right"
  companyAlign: "left" | "center" | "right"
  contactAlign: "left" | "center" | "right"

  // Background
  backgroundColor: string
  backgroundType: "solid" | "gradient"
  gradientColors: string[]

  // Logo
  logoImage: string | null
  logoText: string
  logoFont: string
  logoFontSize: number
  logoColor: string
  logoBold: boolean

  // QR Code
  qrType: "website" | "email" | "phone" | "ar" | "sms" | "event"
  qrContent: {
    website?: string
    email?: { address: string; subject: string; message: string }
    phone?: string
    ar?: string
    sms?: string | { phone: string; message: string }
    event?: string | { title: string; location: string; start: string; end: string }
  }
  qrCode: string | null

  // Profile image
  profileImage: string | null

  // General
  zoom: number
}

interface CardEditorContextType {
  editorState: CardEditorState
  updateCardContent: (content: Partial<CardEditorState>) => void
  updateTextStyling: (styling: Partial<CardEditorState>) => void
  updateBackground: (background: Partial<CardEditorState>) => void
  updateLogo: (logo: Partial<CardEditorState>) => void
  updateQR: (qr: Partial<CardEditorState>) => void
  selectElement: (element: CardEditorState["selectedElement"]) => void
  generateQRCode: () => void
  resetEditor: () => void
  undo: () => void
  redo: () => void
  deleteSelected: () => void
}

const CardEditorContext = createContext<CardEditorContextType | undefined>(undefined)

const initialState: CardEditorState = {
  selectedElement: null,

  // Card content
  name: "Jhon Doe",
  position: "Sales Executive",
  companyName: "Company Name",
  phone: "000-123-456-7890",
  email: "email@yourdomain.com",
  address: "Your address goes here\n125 Street, USA",
  website: "https://",

  // Text styling
  nameFont: "PT Sans",
  positionFont: "PT Sans",
  companyFont: "PT Sans",
  contactFont: "PT Sans",

  nameFontSize: 18,
  positionFontSize: 12,
  companyFontSize: 16,
  contactFontSize: 12,

  nameColor: "#FFFFFF",
  positionColor: "#FFFFFF",
  companyColor: "#FFFFFF",
  contactColor: "#1cd5b7",

  nameBold: true,
  positionBold: false,
  companyBold: true,
  contactBold: false,

  // New: Spacing and Alignment
  nameSpacing: 0,
  positionSpacing: 0,
  companySpacing: 0,
  contactSpacing: 0,

  nameAlign: "left",
  positionAlign: "left",
  companyAlign: "left",
  contactAlign: "left",

  // Background
  backgroundColor: "#1cd5b7",
  backgroundType: "solid",
  gradientColors: ["#1cd5b7", "#000000"],

  // Logo
  logoImage: null,
  logoText: "Company Name",
  logoFont: "PT Sans",
  logoFontSize: 14,
  logoColor: "#FFFFFF",
  logoBold: true,

  // QR Code
  qrType: "website",
  qrContent: {
    website: "https://example.com",
  },
  qrCode: null,

  // Profile image
  profileImage:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",

  // General
  zoom: 100,
}

export const CardEditorProvider = ({ children }: { children: ReactNode }) => {
  const [editorState, setEditorState] = useState<CardEditorState>(initialState)
  const [history, setHistory] = useState<CardEditorState[]>([initialState])
  const [historyIndex, setHistoryIndex] = useState(0)

  const updateState = (updates: Partial<CardEditorState>) => {
    const newState = { ...editorState, ...updates }
    setEditorState(newState)
    addToHistory(newState)
  }

  const updateCardContent = (content: Partial<CardEditorState>) => {
    updateState(content)
  }

  const updateTextStyling = (styling: Partial<CardEditorState>) => {
    updateState(styling)
  }

  const updateBackground = (background: Partial<CardEditorState>) => {
    updateState(background)
  }

  const updateLogo = (logo: Partial<CardEditorState>) => {
    updateState(logo)
  }

  const updateQR = (qr: Partial<CardEditorState>) => {
    updateState(qr)
  }

  const selectElement = (element: CardEditorState["selectedElement"]) => {
    setEditorState((prev) => ({ ...prev, selectedElement: element }))
  }

  const generateQRCode = () => {
    // Only generate a new QR code if the QR content or type changes
    // Use a deterministic pattern based on qrType and qrContent
    const qrKey = JSON.stringify({ type: editorState.qrType, content: editorState.qrContent });
    const hash = Array.from(qrKey).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let pattern = '';
    for (let i = 0; i < 25; i++) {
      pattern += (hash >> (i % 8)) & 1 ? `<rect x="${(i % 5) * 20}" y="${Math.floor(i / 5) * 20}" width="20" height="20"/>` : '';
    }
    const qrCode = `data:image/svg+xml,${encodeURIComponent(`
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="white"/>
        <g fill="black">
          ${pattern}
        </g>
      </svg>
    `)}`;
    updateState({ qrCode });
  }

  const addToHistory = (state: CardEditorState) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(state)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setEditorState(history[newIndex])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setEditorState(history[newIndex])
    }
  }

  const deleteSelected = () => {
    if (editorState.selectedElement) {
      const updates: Partial<CardEditorState> = {}
      switch (editorState.selectedElement) {
        case "name":
          updates.name = ""
          break
        case "position":
          updates.position = ""
          break
        case "company":
          updates.companyName = ""
          break
        case "phone":
          updates.phone = ""
          break
        case "email":
          updates.email = ""
          break
        case "address":
          updates.address = ""
          break
        case "website":
          updates.website = ""
          break
      }
      updateState(updates)
    }
  }

  const resetEditor = () => {
    setEditorState(initialState)
    setHistory([initialState])
    setHistoryIndex(0)
  }

  return (
    <CardEditorContext.Provider
      value={{
        editorState,
        updateCardContent,
        updateTextStyling,
        updateBackground,
        updateLogo,
        updateQR,
        selectElement,
        generateQRCode,
        resetEditor,
        undo,
        redo,
        deleteSelected,
      }}
    >
      {children}
    </CardEditorContext.Provider>
  )
}

export const useCardEditor = () => {
  const context = useContext(CardEditorContext)
  if (context === undefined) {
    throw new Error("useCardEditor must be used within a CardEditorProvider")
  }
  return context
}

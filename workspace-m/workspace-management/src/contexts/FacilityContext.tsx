
import { createContext, useContext, useState, type ReactNode } from "react"

interface FacilityData {
  id: number
  name: string
  active: boolean
  bookingType: string
  createdOn: string
}

interface FacilityContextType {
  facilities: FacilityData[]
  setFacilities: (facilities: FacilityData[]) => void
  addFacility: (facility: Omit<FacilityData, "id">) => void
  updateFacility: (id: number, facility: Partial<FacilityData>) => void
  getFacilityById: (id: number) => FacilityData | undefined
}

const FacilityContext = createContext<FacilityContextType>({
  facilities: [],
  setFacilities: () => {},
  addFacility: () => {},
  updateFacility: () => {},
  getFacilityById: () => undefined,
})

export const useFacilityContext = () => useContext(FacilityContext)

interface FacilityProviderProps {
  children: ReactNode
}

export function FacilityProvider({ children }: FacilityProviderProps) {
  // Initial facilities data
  const [facilities, setFacilities] = useState<FacilityData[]>([
    { id: 32, name: "Conference Room 1", active: false, bookingType: "Bookable", createdOn: "2023-05-15" },
    { id: 50, name: "Conference Room 2", active: false, bookingType: "Request", createdOn: "2023-05-16" },
  ])

  // Add new facility
  const addFacility = (facilityData: Omit<FacilityData, "id">) => {
    console.log("FacilityContext: Adding facility", facilityData)
    console.log("Current facilities before add:", facilities)

    const newId = Math.max(...facilities.map((f) => f.id), 0) + 1
    const newFacility = { ...facilityData, id: newId }

    setFacilities((prev) => {
      const updated = [...prev, newFacility]
      console.log("FacilityContext: Updated facilities list", updated)
      return updated
    })

    console.log("FacilityContext: Facility added successfully:", newFacility)
  }

  // Update existing facility
  const updateFacility = (id: number, facilityData: Partial<FacilityData>) => {
    console.log("FacilityContext: Updating facility", id, facilityData)
    console.log("Current facilities before update:", facilities)

    setFacilities((prev) => {
      const updated = prev.map((f) => (f.id === id ? { ...f, ...facilityData } : f))
      console.log("FacilityContext: Updated facilities list", updated)
      return updated
    })

    console.log("FacilityContext: Facility updated successfully")
  }

  // Get facility by ID
  const getFacilityById = (id: number) => {
    return facilities.find((facility) => facility.id === id)
  }

  const contextValue = {
    facilities,
    setFacilities,
    addFacility,
    updateFacility,
    getFacilityById,
  }

  return <FacilityContext.Provider value={contextValue}>{children}</FacilityContext.Provider>
}

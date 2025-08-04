
import type React from "react"

import { useState } from "react"
import { Card } from "../components/Card"
import Modal from "../components/Modal"
import TextInput from "../components/TextInput"
import Select from "../components/Select"
import RadioButton from "../components/RadioButton"
import Checkbox from "../components/Checkbox"
import ReactDatePicker from "../components/ReactDatePicker"
import NotificationToaster from "../components/NotificationToaster"
import NoDataFound from "../components/NoDataFound"
import Tabs from "../components/Tabs"
import SpecialOperationalHoursTab from "./SpecialOperationalHoursTab"
import TableHead from "../components/TopHead"
import { FiPlus, FiSearch } from "react-icons/fi"
import Pagination from "../components/Pagination"
import { Eye, Edit, Trash2 } from "lucide-react"

// Define the weekday type
type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

interface ScheduleDay {
  enabled: boolean
  mode: string
  startTime: string
  startMinute: string
  endTime: string
  endMinute: string
}

interface OperationalHour {
  id: string
  name: string
  description: string
  appliesTo: string
  workingTime: "Round the Clock" | "Standard Hours"
  schedule: Record<Weekday, ScheduleDay>
  selected: boolean
  isDefault: boolean
}

interface OperationalHoursTabProps {
  searchQuery: string
}

const operationalTabs = [
  { key: "operational-hours", label: "Operational Hours" },
  { key: "special-operational-hours", label: "Special Operational Hours" },
]

export default function OperationalHoursTab({ searchQuery }: OperationalHoursTabProps) {
  const [activeTab, setActiveTab] = useState("operational-hours")
  const [operationalHours, setOperationalHours] = useState<OperationalHour[]>([
    {
      id: "1",
      name: "Default Operational Hour",
      description: "Operational Hours configuration for all sites and groups",
      appliesTo: "All Sites",
      workingTime: "Standard Hours",
      schedule: {
        monday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        tuesday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        wednesday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        thursday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        friday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        saturday: {
          enabled: false,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        sunday: {
          enabled: false,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
      },
      selected: false,
      isDefault: true,
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<OperationalHour | null>(null)
  const [viewingItem, setViewingItem] = useState<OperationalHour | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    appliesTo: "",
    workingTime: "Standard Hours" as "Round the Clock" | "Standard Hours",
    schedule: {
      monday: {
        enabled: true,
        mode: "Standard Hours",
        startTime: "09",
        startMinute: "00",
        endTime: "18",
        endMinute: "00",
      },
      tuesday: {
        enabled: true,
        mode: "Standard Hours",
        startTime: "09",
        startMinute: "00",
        endTime: "18",
        endMinute: "00",
      },
      wednesday: {
        enabled: true,
        mode: "Standard Hours",
        startTime: "09",
        startMinute: "00",
        endTime: "18",
        endMinute: "00",
      },
      thursday: {
        enabled: true,
        mode: "Standard Hours",
        startTime: "09",
        startMinute: "00",
        endTime: "18",
        endMinute: "00",
      },
      friday: {
        enabled: true,
        mode: "Standard Hours",
        startTime: "09",
        startMinute: "00",
        endTime: "18",
        endMinute: "00",
      },
      saturday: {
        enabled: false,
        mode: "Standard Hours",
        startTime: "09",
        startMinute: "00",
        endTime: "18",
        endMinute: "00",
      },
      sunday: {
        enabled: false,
        mode: "Standard Hours",
        startTime: "09",
        startMinute: "00",
        endTime: "18",
        endMinute: "00",
      },
    } as Record<Weekday, ScheduleDay>,
    startDate: null as Date | null,
    endDate: null as Date | null,
    repeatEveryYear: false,
    exceptions: [],
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    schedule: "",
    appliesTo: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

  const siteOptions = ["All Sites", "US Sites", "UK Sites", "EU Sites", "APAC Sites"]
  const modeOptions = ["Standard Hours", "Non-working Day"]
  const workingTimeRadioOptions = ["Round the Clock", "Standard Hours"]
  const frequencyOptions = ["Daily", "Weekly", "Monthly", "Yearly"]
  const daysOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const weekdays: Weekday[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const weekdaysDisplay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const hourOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
  const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))

  const filteredOperationalHours = operationalHours.filter(
    (hour) =>
      hour.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      (hour.appliesTo?.toLowerCase().includes(searchFilters.appliesTo.toLowerCase()) || "") &&
      (searchFilters.schedule === "" ||
        Object.values(hour.schedule).some(
          (day) =>
            day.enabled &&
            `${day.startTime}:${day.startMinute} - ${day.endTime}:${day.endMinute}`.includes(searchFilters.schedule),
        )),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleDateChange = (e: { target: { name: string; value: Date | null } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRadioChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({ ...prev, workingTime: e.target.value as "Round the Clock" | "Standard Hours" }))
  }

  const handleRepeatEveryYearCheckboxChange = (checked: boolean) => {
    // Updated signature
    setFormData((prev) => ({ ...prev, repeatEveryYear: checked }))
  }

  const handleScheduleChange = (day: Weekday, field: keyof ScheduleDay, value: any) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [field]: value,
        },
      },
    }))
  }

  const handleScheduleCheckboxChange = (day: Weekday, checked: boolean) => {
    // Updated signature
    handleScheduleChange(day, "enabled", checked)
  }

  const handleScheduleModeChange = (day: Weekday, e: { target: { name: string; value: string } }) => {
    handleScheduleChange(day, "mode", e.target.value)
  }

  const handleTimePartChange = (
    day: Weekday,
    part: "startTime" | "startMinute" | "endTime" | "endMinute",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [part]: value,
        },
      },
    }))
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    const newOperationalHour: OperationalHour = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: formData.name,
      description: formData.description,
      appliesTo: formData.appliesTo,
      workingTime: formData.workingTime,
      schedule: formData.schedule,
      selected: false,
      isDefault: false,
    }

    if (editingItem) {
      setOperationalHours((prev) => prev.map((hour) => (hour.id === editingItem.id ? newOperationalHour : hour)))
      setToastMessage("Operational hours updated successfully!")
    } else {
      setOperationalHours((prev) => [...prev, newOperationalHour])
      setToastMessage("Operational hours created successfully!")
    }

    setFormData({
      name: "",
      description: "",
      appliesTo: "",
      workingTime: "Standard Hours",
      schedule: {
        monday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        tuesday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        wednesday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        thursday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        friday: {
          enabled: true,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        saturday: {
          enabled: false,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
        sunday: {
          enabled: false,
          mode: "Standard Hours",
          startTime: "09",
          startMinute: "00",
          endTime: "18",
          endMinute: "00",
        },
      },
      startDate: null,
      endDate: null,
      repeatEveryYear: false,
      exceptions: [],
    })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (hour: OperationalHour) => {
    setViewingItem(hour)
    setShowViewModal(true)
  }

  const handleEdit = (hour: OperationalHour) => {
    setEditingItem(hour)
    setFormData({
      name: hour.name,
      description: hour.description,
      appliesTo: hour.appliesTo,
      workingTime: hour.workingTime,
      schedule: hour.schedule,
      startDate: null,
      endDate: null,
      repeatEveryYear: false,
      exceptions: [],
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    setOperationalHours((prev) => prev.filter((hour) => hour.id !== id))
    setToastMessage("Operational hour deleted successfully!")
    setShowToast(true)
  }

  const handleSearchFilterChange = (field: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSearchToggle = (isVisible: boolean) => {
    setSearchVisible(isVisible)
    if (!isVisible) {
      setSearchFilters({ name: "", schedule: "", appliesTo: "" })
    }
  }

  const calculateHoursDifference = (startHour: string, startMinute: string, endHour: string, endMinute: string) => {
    const startDate = new Date(0, 0, 0, Number(startHour), Number(startMinute))
    const endDate = new Date(0, 0, 0, Number(endHour), Number(endMinute))

    let diff = endDate.getTime() - startDate.getTime()
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000
    }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours} Hours ${minutes > 0 ? `${minutes} Minutes` : ""}`.trim()
  }

  const tableColumns = [
    { label: "Actions", align: "left" as const },
    { label: "Name", align: "left" as const },
    { label: "Schedule", align: "center" as const },
    { label: "Applies To", align: "center" as const },
  ]

  const modalContent = (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">New Operational Hour</h3> */}

      {/* Name, Description, Applies To Row */}
      <div className="grid grid-cols-3 gap-4 items-start">
        <div className="text-left">
          <TextInput label="Name*" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="text-left">
          <TextInput label="Description" name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <div className="text-left">
          <Select
            label="Applies to*"
            name="appliesTo"
            value={formData.appliesTo}
            options={siteOptions}
            onChange={handleSelectChange}
            placeholder="Select site group"
            required
          />
        </div>
      </div>

      {/* Schedule Section */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm text-gray-900 text-left">Schedule</h4>

        {/* Start Date and End Date */}
        <div className="grid grid-cols-2 gap-4 text-left">
          <ReactDatePicker
            label="Start Date*"
            name="startDate"
            value={formData.startDate}
            onChange={handleDateChange}
            required
            className="w-full" // Ensure it takes full width of its grid column
          />
          <ReactDatePicker
            label="End Date*"
            name="endDate"
            value={formData.endDate}
            onChange={handleDateChange}
            required
            className="w-full" // Ensure it takes full width of its grid column
          />
        </div>

        {/* Repeat Every Year */}
        <div className="text-left">
          <Checkbox
            label="Repeat Every Year"
            name="repeatEveryYear"
            checked={formData.repeatEveryYear}
            onChange={(checked) => handleRepeatEveryYearCheckboxChange} // Updated onChange
          />
        </div>
      </div>

      {/* Working Time Section */}
      <div className="space-y-4">
        <h4 className="font-bold text-sm text-gray-900 text-left pt-4">Working Time</h4>

        {/* Header Row for Working Time */}
        <div className="grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 items-end mb-2 bg-gray-100 p-2 rounded-md">
          <div className="font-medium text-sm text-gray-700 text-left">Working Time</div>
          <div className="font-medium text-sm text-gray-700 text-left">Start Time</div>
          <div className="font-medium text-sm text-gray-700 text-left">End Time</div>
          <div></div>
          <div></div>
          <div className="col-start-2 text-xs text-gray-500 text-left">Hours : Minutes</div>
          <div className="col-start-3 text-xs text-gray-500 text-left">Hours : Minutes</div>
        </div>

        {/* Radio Buttons and Time Selectors */}
        <div className="grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 items-center">
          <div className="col-span-1 flex flex-col space-y-2">
            <RadioButton
              label=""
              name="workingTime"
              value={formData.workingTime}
              options={workingTimeRadioOptions}
              onChange={handleRadioChange}
            />
          </div>
          {formData.workingTime === "Standard Hours" && (
            <>
              <div className="flex gap-2">
                <Select
                  label=""
                  name="startHour"
                  value={formData.schedule.monday.startTime}
                  options={hourOptions}
                  onChange={(e) => handleTimePartChange("monday", "startTime", e.target.value)}
                  className="w-1/2"
                />
                <Select
                  label=""
                  name="startMinute"
                  value={formData.schedule.monday.startMinute}
                  options={minuteOptions}
                  onChange={(e) => handleTimePartChange("monday", "startMinute", e.target.value)}
                  className="w-1/2"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  label=""
                  name="endHour"
                  value={formData.schedule.monday.endTime}
                  options={hourOptions}
                  onChange={(e) => handleTimePartChange("monday", "endTime", e.target.value)}
                  className="w-1/2"
                />
                <Select
                  label=""
                  name="endMinute"
                  value={formData.schedule.monday.endMinute}
                  options={minuteOptions}
                  onChange={(e) => handleTimePartChange("monday", "endMinute", e.target.value)}
                  className="w-1/2"
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap text-center">
                {calculateHoursDifference(
                  formData.schedule.monday.startTime,
                  formData.schedule.monday.startMinute,
                  formData.schedule.monday.endTime,
                  formData.schedule.monday.endMinute,
                )}
              </span>
              <button className="text-blue-600 text-sm hover:underline whitespace-nowrap flex items-center gap-1 justify-end">
                <FiPlus size={16} /> Break Hours
              </button>
            </>
          )}
        </div>
      </div>

      {/* Working Days Configuration */}
      <div className="space-y-4">
        <h4 className="font-bold text-sm text-gray-900 text-left pt-4">Working Days</h4>
        <div className="space-y-3">
          {weekdays.map((day, index) => (
            <div key={day} className="grid grid-cols-[280px_180px_460px_60px_280px] gap-4 items-center py-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  label={weekdaysDisplay[index]}
                  name={`${day}-enabled`}
                  checked={formData.schedule[day]?.enabled || false}
                  onChange={(checked) => handleScheduleCheckboxChange(day, checked)} // Updated onChange
                />
              </div>

              {day === "saturday" || day === "sunday" ? (
                <span className="text-sm text-gray-500 text-center col-start-2 col-span-3">Non-working Day</span>
              ) : (
                <div>
                  <Select
                    label=""
                    name={`${day}-mode`}
                    value={formData.schedule[day]?.mode || "Standard Hours"}
                    options={modeOptions}
                    onChange={(e) => handleScheduleModeChange(day, e)}
                    disabled={!formData.schedule[day]?.enabled}
                  />
                </div>
              )}

              {formData.schedule[day]?.enabled && formData.schedule[day]?.mode === "Standard Hours" ? (
                <>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600">
                      {formData.schedule[day]?.startTime}:{formData.schedule[day]?.startMinute}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600">
                      {formData.schedule[day]?.endTime}:{formData.schedule[day]?.endMinute}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap text-right">
                    {calculateHoursDifference(
                      formData.schedule[day].startTime,
                      formData.schedule[day].startMinute,
                      formData.schedule[day].endTime,
                      formData.schedule[day].endMinute,
                    )}
                  </span>
                </>
              ) : (
                // This ensures alignment for non-working days that are not Sat/Sun
                day !== "saturday" &&
                day !== "sunday" && <div className="col-span-3 text-sm text-gray-500 text-center">Non-working Day</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSpecialOperationalHoursContent = () => <SpecialOperationalHoursTab searchQuery={searchQuery} />

  const renderOperationalHoursContent = () => (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSearchToggle(!searchVisible)}
            className={`p-2 rounded-md hover:bg-gray-200 ${searchVisible ? "bg-gray-200" : ""}`}
          >
            <FiSearch size={20} className="text-gray-600" />
          </button>
          <button
            onClick={() => {
              setEditingItem(null)
              setFormData({
                name: "",
                description: "",
                appliesTo: "",
                workingTime: "Standard Hours",
                schedule: {
                  monday: {
                    enabled: true,
                    mode: "Standard Hours",
                    startTime: "09",
                    startMinute: "00",
                    endTime: "18",
                    endMinute: "00",
                  },
                  tuesday: {
                    enabled: true,
                    mode: "Standard Hours",
                    startTime: "09",
                    startMinute: "00",
                    endTime: "18",
                    endMinute: "00",
                  },
                  wednesday: {
                    enabled: true,
                    mode: "Standard Hours",
                    startTime: "09",
                    startMinute: "00",
                    endTime: "18",
                    endMinute: "00",
                  },
                  thursday: {
                    enabled: true,
                    mode: "Standard Hours",
                    startTime: "09",
                    startMinute: "00",
                    endTime: "18",
                    endMinute: "00",
                  },
                  friday: {
                    enabled: true,
                    mode: "Standard Hours",
                    startTime: "09",
                    startMinute: "00",
                    endTime: "18",
                    endMinute: "00",
                  },
                  saturday: {
                    enabled: false,
                    mode: "Standard Hours",
                    startTime: "09",
                    startMinute: "00",
                    endTime: "18",
                    endMinute: "00",
                  },
                  sunday: {
                    enabled: false,
                    mode: "Standard Hours",
                    startTime: "09",
                    startMinute: "00",
                    endTime: "18",
                    endMinute: "00",
                  },
                },
                startDate: null,
                endDate: null,
                repeatEveryYear: false,
                exceptions: [],
              })
              setShowModal(true)
            }}
            className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 border border-gray-300"
          >
            New
          </button>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredOperationalHours.length / 10)}
          totalItems={filteredOperationalHours.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Operational Hours List */}
      <Card className="border-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <TableHead columns={tableColumns} />
            {searchVisible && (
              <tr>
                <td className="p-2 border-r border-gray-300"></td>
                <td className="p-2 border-r border-gray-300">
                  <TextInput
                    label=""
                    name="nameSearch"
                    value={searchFilters.name}
                    onChange={(e) => handleSearchFilterChange("name", e.target.value)}
                    className="text-sm"
                    placeholder="Search Name..."
                  />
                </td>
                <td className="p-2 border-r border-gray-300">
                  <TextInput
                    label=""
                    name="scheduleSearch"
                    value={searchFilters.schedule}
                    onChange={(e) => handleSearchFilterChange("schedule", e.target.value)}
                    className="text-sm"
                    placeholder="Search Schedule..."
                  />
                </td>
                <td className="p-2 border-r border-gray-300">
                  <TextInput
                    label=""
                    name="appliesToSearch"
                    value={searchFilters.appliesTo}
                    onChange={(e) => handleSearchFilterChange("appliesTo", e.target.value)}
                    className="text-sm"
                    placeholder="Search Applies To..."
                  />
                </td>
              </tr>
            )}
            <tbody>
              {filteredOperationalHours.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No operational hours found. Create your first operational hours to get started." />
                  </td>
                </tr>
              ) : (
                filteredOperationalHours.map((hour) => (
                  <tr key={hour.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-32 border-r border-gray-300">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(hour)}
                          className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(hour)}
                          className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(hour.id)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-center text-gray-600 border-r border-gray-300">
                      <div className="font-medium text-gray-600">{hour.name}</div>
                      <div className="text-sm text-gray-600">{hour.description}</div>
                    </td>
                    <td className="p-4 text-center text-gray-600 border-r border-gray-300">
                      {hour.workingTime === "Round the Clock"
                        ? "24/7"
                        : `${hour.schedule.monday.startTime}:${hour.schedule.monday.startMinute} - ${hour.schedule.monday.endTime}:${hour.schedule.monday.endMinute}`}
                    </td>
                    <td className="p-4 text-center text-gray-600 border-r border-gray-300">{hour.appliesTo || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="space-y-2" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <Tabs
        tabs={operationalTabs}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(String(key))}
        renderContent={() => {
          switch (activeTab) {
            case "operational-hours":
              return renderOperationalHoursContent()
            case "special-operational-hours":
              return renderSpecialOperationalHoursContent()
            default:
              return renderOperationalHoursContent()
          }
        }}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Operational Hour" : "New Operational Hour"}
        content={modalContent}
        showFooter={true}
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSave}
        onCancel={() => setShowModal(false)}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6a82a8]"
        width="80vw"
        height="720px"
        enableScrolling={true}
      />

      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="View Operational Hour"
        content={
          viewingItem ? (
            <div className="space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-600">{viewingItem.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-600">{viewingItem.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applies To</label>
                <p className="text-gray-600">{viewingItem.appliesTo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Working Time</label>
                <p className="text-gray-600">{viewingItem.workingTime}</p>
              </div>
              {viewingItem.workingTime === "Standard Hours" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Standard Hours Schedule</label>
                  {weekdays.map((day) => (
                    <p key={day} className="text-gray-600">
                      {weekdaysDisplay[weekdays.indexOf(day)]}:{" "}
                      {viewingItem.schedule[day].enabled
                        ? `${viewingItem.schedule[day].startTime}:${viewingItem.schedule[day].startMinute} - ${viewingItem.schedule[day].endTime}:${viewingItem.schedule[day].endMinute} (${calculateHoursDifference(viewingItem.schedule[day].startTime, viewingItem.schedule[day].startMinute, viewingItem.schedule[day].endTime, viewingItem.schedule[day].endMinute)})`
                        : "Non-working Day"}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ) : null
        }
        showFooter={false}
      />

      <NotificationToaster
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        position="top-right"
      />
    </div>
  )
}

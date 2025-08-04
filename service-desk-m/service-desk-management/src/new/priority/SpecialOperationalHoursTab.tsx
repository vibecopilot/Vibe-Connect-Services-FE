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
  endTime: string
}

interface Exception {
  id: string
  frequency: string
  days: string[]
}

interface SpecialOperationalHour {
  id: string
  name: string
  description: string
  associatedOperationalHours: string
  startDate: Date | null
  endDate: Date | null
  repeatEveryYear: boolean
  workingTime: "Round the Clock" | "Standard Hours"
  schedule: Record<Weekday, ScheduleDay>
  exceptions: Exception[]
  selected: boolean
}

interface SpecialOperationalHoursTabProps {
  searchQuery: string
}

export default function SpecialOperationalHoursTab({ searchQuery }: SpecialOperationalHoursTabProps) {
  const [specialOperationalHours, setSpecialOperationalHours] = useState<SpecialOperationalHour[]>([])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<SpecialOperationalHour | null>(null)
  const [viewingItem, setViewingItem] = useState<SpecialOperationalHour | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    associatedOperationalHours: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    repeatEveryYear: false,
    workingTime: "Standard Hours" as "Round the Clock" | "Standard Hours",
    schedule: {
      monday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
      tuesday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
      wednesday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
      thursday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
      friday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
      saturday: { enabled: false, mode: "Standard", startTime: "09:00", endTime: "18:00" },
      sunday: { enabled: false, mode: "Standard", startTime: "09:00", endTime: "18:00" },
    } as Record<Weekday, ScheduleDay>,
    exceptions: [] as Exception[],
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    schedule: "",
    operationalHours: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

  const operationalHoursOptions = ["Default Operational Hour", "US Business Hours", "EU Business Hours", "24/7 Support"]
  const modeOptions = ["Standard", "Extended", "Reduced"]
  const workingTimeRadioOptions = ["Round the Clock", "Standard Hours"]
  const frequencyOptions = ["Daily", "Weekly", "Monthly", "Yearly"]
  const daysOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const weekdays: Weekday[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const weekdaysDisplay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const hourOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
  const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))

  const timeOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0") + ":00")

  const filteredSpecialOperationalHours = specialOperationalHours.filter(
    (hour) =>
      hour.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      (hour.associatedOperationalHours?.toLowerCase().includes(searchFilters.operationalHours.toLowerCase()) || "") &&
      (searchFilters.schedule === "" ||
        hour.startDate?.toLocaleDateString().includes(searchFilters.schedule) ||
        hour.endDate?.toLocaleDateString().includes(searchFilters.schedule)),
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

  const handleCheckboxChange = (e: { target: { name: string; value: boolean } }) => {
    setFormData((prev) => ({ ...prev, repeatEveryYear: e.target.value }))
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

  const handleScheduleCheckboxChange = (day: Weekday, e: { target: { name: string; value: boolean } }) => {
    handleScheduleChange(day, "enabled", e.target.value)
  }

  const handleScheduleSelectChange = (
    day: Weekday,
    field: "mode" | "startTime" | "endTime",
    e: { target: { name: string; value: string } },
  ) => {
    handleScheduleChange(day, field, e.target.value)
  }

  const handleTimePartChange = (day: Weekday, part: "startTime" | "endTime", value: string) => {
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

    const newSpecialOperationalHour: SpecialOperationalHour = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: formData.name,
      description: formData.description,
      associatedOperationalHours: formData.associatedOperationalHours,
      startDate: formData.startDate,
      endDate: formData.endDate,
      repeatEveryYear: formData.repeatEveryYear,
      workingTime: formData.workingTime,
      schedule: formData.schedule,
      exceptions: formData.exceptions,
      selected: false,
    }

    if (editingItem) {
      setSpecialOperationalHours((prev) =>
        prev.map((hour) => (hour.id === editingItem.id ? newSpecialOperationalHour : hour)),
      )
      setToastMessage("Special operational hours updated successfully!")
    } else {
      setSpecialOperationalHours((prev) => [...prev, newSpecialOperationalHour])
      setToastMessage("Special operational hours created successfully!")
    }

    setFormData({
      name: "",
      description: "",
      associatedOperationalHours: "",
      startDate: null,
      endDate: null,
      repeatEveryYear: false,
      workingTime: "Standard Hours",
      schedule: {
        monday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
        tuesday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
        wednesday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
        thursday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
        friday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
        saturday: { enabled: false, mode: "Standard", startTime: "09:00", endTime: "18:00" },
        sunday: { enabled: false, mode: "Standard", startTime: "09:00", endTime: "18:00" },
      },
      exceptions: [],
    })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (hour: SpecialOperationalHour) => {
    setViewingItem(hour)
    setShowViewModal(true)
  }

  const handleEdit = (hour: SpecialOperationalHour) => {
    setEditingItem(hour)
    setFormData({
      name: hour.name,
      description: hour.description,
      associatedOperationalHours: hour.associatedOperationalHours,
      startDate: hour.startDate,
      endDate: hour.endDate,
      repeatEveryYear: hour.repeatEveryYear,
      workingTime: hour.workingTime,
      schedule: hour.schedule,
      exceptions: hour.exceptions,
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    setSpecialOperationalHours((prev) => prev.filter((hour) => hour.id !== id))
    setToastMessage("Special operational hour deleted successfully!")
    setShowToast(true)
  }

  const addException = () => {
    const newException: Exception = {
      id: Date.now().toString(),
      frequency: "",
      days: [],
    }
    setFormData((prev) => ({
      ...prev,
      exceptions: [...prev.exceptions, newException],
    }))
  }

  const updateException = (id: string, field: keyof Exception, value: any) => {
    setFormData((prev) => ({
      ...prev,
      exceptions: prev.exceptions.map((exception) =>
        exception.id === id ? { ...exception, [field]: value } : exception,
      ),
    }))
  }

  const removeException = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      exceptions: prev.exceptions.filter((exception) => exception.id !== id),
    }))
  }

  const handleSearchFilterChange = (field: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSearchToggle = (isVisible: boolean) => {
    setSearchVisible(isVisible)
    if (!isVisible) {
      setSearchFilters({ name: "", schedule: "", operationalHours: "" })
    }
  }

  const calculateHoursDifference = (startTime: string, endTime: string) => {
    const [startH, startM] = startTime.split(":").map(Number)
    const [endH, endM] = endTime.split(":").map(Number)

    const startDate = new Date(0, 0, 0, startH, startM)
    const endDate = new Date(0, 0, 0, endH, endM)

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
    { label: "Operational Hours", align: "center" as const },
  ]

  const modalContent = (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">New Special Operational Hour</h3> */}

      {/* Name, Description, Associated Operational Hours Row */}
      <div className="grid grid-cols-3 gap-4 items-start">
        <div className="text-left">
          <TextInput label="Name*" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="text-left">
          <TextInput label="Description" name="description" value={formData.description} onChange={handleInputChange} />
        </div>
     <div className="text-left">
          <Select
            label="Associated Operational Hours*"
            name="associatedOperationalHours"
            value={formData.associatedOperationalHours}
            options={operationalHoursOptions}
            onChange={handleSelectChange}
            placeholder="Select Associated Operational Hours"
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
            onChange={handleCheckboxChange}
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
                  value={formData.schedule.monday.startTime.split(":")[0]}
                  options={hourOptions}
                  onChange={(e) => handleTimePartChange("monday", "startTime", `${e.target.value}:00`)}
                  className="w-1/2"
                />
                <Select
                  label=""
                  name="startMinute"
                  value={formData.schedule.monday.startTime.split(":")[1]}
                  options={minuteOptions}
                  onChange={(e) =>
                    handleTimePartChange(
                      "monday",
                      "startTime",
                      `${formData.schedule.monday.startTime.split(":")[0]}:${e.target.value}`,
                    )
                  }
                  className="w-1/2"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  label=""
                  name="endHour"
                  value={formData.schedule.monday.endTime.split(":")[0]}
                  options={hourOptions}
                  onChange={(e) => handleTimePartChange("monday", "endTime", `${e.target.value}:00`)}
                  className="w-1/2"
                />
                <Select
                  label=""
                  name="endMinute"
                  value={formData.schedule.monday.endTime.split(":")[1]}
                  options={minuteOptions}
                  onChange={(e) =>
                    handleTimePartChange(
                      "monday",
                      "endTime",
                      `${formData.schedule.monday.endTime.split(":")[0]}:${e.target.value}`,
                    )
                  }
                  className="w-1/2"
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap text-center">
                {calculateHoursDifference(formData.schedule.monday.startTime, formData.schedule.monday.endTime)}
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
            <div key={day} className="grid grid-cols-[120px_180px_600px_60px_580px] gap-4 items-center py-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  label={weekdaysDisplay[index]}
                  name={`${day}-enabled`}
                  checked={formData.schedule[day]?.enabled || false}
                  onChange={(e) => handleScheduleCheckboxChange(day, e)}
                />
              </div>

              {day === "saturday" || day === "sunday" ? (
                <span className="text-sm text-gray-500 text-center col-start-2 col-span-3">Non-working Day</span>
              ) : (
                <div>
                  <Select
                    label=""
                    name={`${day}-mode`}
                    value={formData.schedule[day]?.mode || "Standard"}
                    options={modeOptions}
                    onChange={(e) => handleScheduleSelectChange(day, "mode", e)}
                    disabled={!formData.schedule[day]?.enabled}
                  />
                </div>
              )}

              {formData.schedule[day]?.enabled && formData.schedule[day]?.mode === "Standard" ? (
                <>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600 w-[340px]">{formData.schedule[day]?.startTime}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600">{formData.schedule[day]?.endTime}</span>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap text-center">
                    {calculateHoursDifference(formData.schedule[day].startTime, formData.schedule[day].endTime)}
                  </span>
                </>
              ) : (
                day !== "saturday" &&
                day !== "sunday" && <div className="col-span-3 text-sm text-gray-500 text-center">Non-working Day</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Configure Exceptions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-900">Configure Exceptions</h4>
          <button
            type="button"
            onClick={addException}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
          >
            <FiPlus size={16} />
            Add Exception
          </button>
        </div>

        {formData.exceptions.map((exception) => (
          <div key={exception.id} className="flex items-center gap-4 p-3 border rounded-md">
            <div className="flex-1">
              <Select
                label=""
                name={`exception-frequency-${exception.id}`}
                value={exception.frequency}
                options={frequencyOptions}
                onChange={(e) => updateException(exception.id, "frequency", e.target.value)}
                placeholder="Select Frequency"
              />
            </div>
            <div className="flex-1">
              <Select
                label=""
                name={`exception-days-${exception.id}`}
                value={exception.days.join(",")}
                options={daysOptions}
                onChange={(e) => updateException(exception.id, "days", e.target.value.split(","))}
                placeholder="Select Days"
              />
            </div>
            <button
              type="button"
              onClick={() => removeException(exception.id)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
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
                associatedOperationalHours: "",
                startDate: null,
                endDate: null,
                repeatEveryYear: false,
                workingTime: "Standard Hours",
                schedule: {
                  monday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
                  tuesday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
                  wednesday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
                  thursday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
                  friday: { enabled: true, mode: "Standard", startTime: "09:00", endTime: "18:00" },
                  saturday: { enabled: false, mode: "Standard", startTime: "09:00", endTime: "18:00" },
                  sunday: { enabled: false, mode: "Standard", startTime: "09:00", endTime: "18:00" },
                },
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
          totalPages={Math.ceil(filteredSpecialOperationalHours.length / 10)}
          totalItems={filteredSpecialOperationalHours.length}
          onPageChange={setCurrentPage}
        />
      </div>

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
                    name="operationalHoursSearch"
                    value={searchFilters.operationalHours}
                    onChange={(e) => handleSearchFilterChange("operationalHours", e.target.value)}
                    className="text-sm"
                    placeholder="Search Operational Hours..."
                  />
                </td>
              </tr>
            )}
            <tbody>
              {filteredSpecialOperationalHours.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No data available" />
                  </td>
                </tr>
              ) : (
                filteredSpecialOperationalHours.map((hour) => (
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
                      {hour.startDate && hour.endDate
                        ? `${hour.startDate.toLocaleDateString()} - ${hour.endDate.toLocaleDateString()}`
                        : "-"}
                    </td>
                    <td className="p-4 text-center text-gray-600 border-r border-gray-300">
                      {hour.associatedOperationalHours || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Special Operational Hour" : "New Special Operational Hour"}
        content={modalContent}
        showFooter={true}
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSave}
        onCancel={() => setShowModal(false)}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6a82a8]"
        cancelButtonClassName="text-gray-700 border border-gray-300 hover:bg-gray-100"
        width="80vw"
        height="90vh"
        enableScrolling={true}
      />

      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="View Special Operational Hour"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Associated Operational Hours</label>
                <p className="text-gray-600">{viewingItem.associatedOperationalHours}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Dates</label>
                <p className="text-gray-600">
                  {viewingItem.startDate?.toLocaleDateString()} - {viewingItem.endDate?.toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Repeat Every Year</label>
                <p className="text-gray-600">{viewingItem.repeatEveryYear ? "Yes" : "No"}</p>
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
                        ? `${viewingItem.schedule[day].startTime} - ${viewingItem.schedule[day].endTime} (${calculateHoursDifference(viewingItem.schedule[day].startTime, viewingItem.schedule[day].endTime)})`
                        : "Non-working Day"}
                    </p>
                  ))}
                </div>
              )}
              {viewingItem.exceptions.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exceptions</label>
                  {viewingItem.exceptions.map((exception) => (
                    <p key={exception.id} className="text-gray-600">
                      {exception.frequency} - {exception.days.join(", ")}
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

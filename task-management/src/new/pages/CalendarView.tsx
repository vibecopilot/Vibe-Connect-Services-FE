
import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import Breadcrumb from "../components/Breadcrumb"
import Tabs from "../components/Tabs"
import Modal from "../components/Modal"
import TextArea from "../components/TextArea"
import Checkbox from "../components/Checkbox"
import FileUpload from "../components/FileUpload"
import Badge from "../components/Badge"
import TextInput from "../components/TextInput"
import NoDataFound from "../components/NoDataFound"
import DropdownMenu from "../components/DropdownMenu"

import NotificationToaster from "../components/NotificationToaster"
import { Bell, FileText, Hash, ChevronLeft, ChevronRight, Plus, X } from "lucide-react"

// Extend Window interface for Google APIs
declare global {
  interface Window {
    google: any
    gapi: any
  }
}

interface Task {
  id: string
  title: string
  completed: boolean
  notes?: string
  subTasks?: SubTask[]
  date: string
}

interface SubTask {
  id: string
  title: string
  completed: boolean
}

interface GoogleCalendarEvent {
  id: string
  summary: string
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
}

const CalendarView = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState("my-calendar")
  const [activeSubTab, setActiveSubTab] = useState("none")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [showUnsavedModal, setShowUnsavedModal] = useState(false)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDateForTask] = useState<Date | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"month" | "year" | "decade">("month")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false)
  const [googleEvents, setGoogleEvents] = useState<GoogleCalendarEvent[]>([])
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // New task form state
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    notes: "",
    attachments: null as FileList | null,
  })

  // Local tasks
  const [localTasks, setLocalTasks] = useState<Task[]>([
    { id: "cal1", title: "Connect Your Cal", completed: false, date: "2024-12-04", notes: "", subTasks: [] },
    { id: "cal2", title: "Test21", completed: false, date: "2024-12-05", notes: "", subTasks: [] },
  ])

  // Google Calendar integration
  useEffect(() => {
    // Load Google API script
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    // Load Google API client
    const gapiScript = document.createElement("script")
    gapiScript.src = "https://apis.google.com/js/api.js"
    gapiScript.async = true
    gapiScript.defer = true
    gapiScript.onload = () => {
      if (window.gapi) {
        window.gapi.load("client", () => {
          window.gapi.client.init({
            apiKey: "YOUR_API_KEY", // Replace with your API key
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          })
        })
      }
    }
    document.body.appendChild(gapiScript)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      if (document.body.contains(gapiScript)) {
        document.body.removeChild(gapiScript)
      }
    }
  }, [])

  // Fetch Google Calendar events
  const fetchGoogleCalendarEvents = async (token: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${new Date().toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched Google Calendar events:", data.items)
        setGoogleEvents(data.items || [])
      } else {
        console.error("Failed to fetch events:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("Error fetching Google Calendar events:", error)
    }
  }

  // Add event to Google Calendar
  const addEventToGoogleCalendar = async (task: Task, date: Date) => {
    if (!accessToken) return

    try {
      const event = {
        summary: task.title,
        description: task.notes || "",
        start: {
          date: date.toISOString().split("T")[0],
        },
        end: {
          date: date.toISOString().split("T")[0],
        },
      }

      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Event added to Google Calendar:", result)
        // Refresh events
        fetchGoogleCalendarEvents(accessToken)
      } else {
        console.error("Failed to add event:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("Error adding event to Google Calendar:", error)
    }
  }

  const handleGoogleCalendarConnect = () => {
    if (window.google) {
      window.google.accounts.oauth2
        .initTokenClient({
          client_id: "1072639880664-450329ph1pd7flpt3lt28ph5ha86a13b.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
          callback: (tokenResponse: any) => {
            console.log("Access Token:", tokenResponse.access_token)
            setAccessToken(tokenResponse.access_token)
            setIsGoogleCalendarConnected(true)
            setShowConnectModal(false)
            // Store token and fetch events
            localStorage.setItem("google_calendar_token", tokenResponse.access_token)
            fetchGoogleCalendarEvents(tokenResponse.access_token)
            // Show success notification
            setShowSuccessAlert(true)
            setShowToast(true)
            setTimeout(() => setShowSuccessAlert(false), 5000)
            setTimeout(() => setShowToast(false), 3000)
          },
        })
        .requestAccessToken()
    } else {
      console.error("Google API not loaded")
    }
  }

  // Load stored token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("google_calendar_token")
    if (storedToken) {
      setAccessToken(storedToken)
      setIsGoogleCalendarConnected(true)
      fetchGoogleCalendarEvents(storedToken)
    }
  }, [])

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    // Combine local tasks and Google events
    const localTasksForDate = localTasks.filter((task) => task.date === dateStr)
    const googleEventsForDate = googleEvents.filter((event) => {
      const eventDate = event.start.date || event.start.dateTime?.split("T")[0]
      return eventDate === dateStr
    })

    return {
      localTasks: localTasksForDate,
      googleEvents: googleEventsForDate,
    }
  }

  // Custom tile content for react-calendar
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const { localTasks, googleEvents } = getEventsForDate(date)
      const allEvents = [...localTasks, ...googleEvents]
      if (allEvents.length > 0) {
        return (
          <div className="mt-1">
            {allEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-700 text-xs px-1 py-0.5 rounded mb-1 truncate"
                onClick={(e) => {
                  e.stopPropagation()
                  if ("title" in event) {
                    handleTaskClick(event as Task)
                  }
                }}
              >
                {"title" in event ? event.title : event.summary}
              </div>
            ))}
            {allEvents.length > 2 && <div className="text-xs text-gray-500">+{allEvents.length - 2} more</div>}
          </div>
        )
      }
    }
    return null
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Task Management", href: "/taskmanagement" },
  ]

  const mainTabs = [
    { label: "My day", key: "my-day" },
    { label: "My Calendar", key: "my-calendar" },
  ]

  const subTabs = [
    { label: "All My Task", key: "all-tasks" },
    { label: "Next 7 Days", key: "next-7-days" },
  ]

  const viewOptions = [
    { label: "Month", onClick: () => setViewMode("month") },
    { label: "Year", onClick: () => setViewMode("year") },
    { label: "Decade", onClick: () => setViewMode("decade") },
  ]

  const handleMainTabChange = (key: string | number) => {
    setActiveMainTab(key.toString())
    if (key === "my-day") {
      navigate("/taskmanagement/list")
    }
  }

  const handleSubTabChange = (key: string | number) => {
    setActiveSubTab(key.toString())
    if (key === "all-tasks") {
      navigate("/taskmanagement/all-my-task")
    } else if (key === "next-7-days") {
      navigate("/taskmanagement/next-7-days")
    }
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const handleCalendarDayClick = (date: Date) => {
    setSelectedDateForTask(date)
    setNewTaskData({ title: "", notes: "", attachments: null })
    setHasUnsavedChanges(false)
    setShowNewTaskModal(true)
  }

  const handleAddNewTask = () => {
    setSelectedDateForTask(new Date())
    setNewTaskData({ title: "", notes: "", attachments: null })
    setHasUnsavedChanges(false)
    setShowNewTaskModal(true)
  }

  const handleNewTaskInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTaskData((prev) => ({ ...prev, [name]: value }))
    setHasUnsavedChanges(true)
  }

  const handleNewTaskFileUpload = (files: FileList | null) => {
    setNewTaskData((prev) => ({ ...prev, attachments: files }))
    setHasUnsavedChanges(true)
  }

  const handleSaveNewTask = () => {
    if (newTaskData.title.trim() && selectedDate) {
      const taskDate = selectedDate.toISOString().split("T")[0]
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: newTaskData.title,
        completed: false,
        date: taskDate,
        notes: newTaskData.notes,
        subTasks: [],
      }
      setLocalTasks([...localTasks, newTask])

      // Add to Google Calendar if connected
      if (isGoogleCalendarConnected && accessToken) {
        addEventToGoogleCalendar(newTask, selectedDate)
      }
    }
    setShowNewTaskModal(false)
    setHasUnsavedChanges(false)
    setNewTaskData({ title: "", notes: "", attachments: null })
    setSelectedDateForTask(null)
  }

  const handleCloseNewTaskModal = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedModal(true)
    } else {
      setShowNewTaskModal(false)
      setSelectedDateForTask(null)
    }
  }

  const handleConfirmDiscard = () => {
    setShowUnsavedModal(false)
    setShowNewTaskModal(false)
    setHasUnsavedChanges(false)
    setNewTaskData({ title: "", notes: "", attachments: null })
    setSelectedDateForTask(null)
  }

  const handleCancelDiscard = () => {
    setShowUnsavedModal(false)
  }

  const handleCloseTaskModal = () => {
    setShowTaskModal(false)
  }

  const handleNotesChange = (taskId: string, notes: string) => {
    if (selectedTask) {
      setSelectedTask({
        ...selectedTask,
        notes,
      })
    }
  }

  const handleSubtaskToggle = (taskId: string, subtaskId: string, checked: boolean) => {
    if (selectedTask && selectedTask.subTasks) {
      setSelectedTask({
        ...selectedTask,
        subTasks: selectedTask.subTasks.map((subtask) =>
          subtask.id === subtaskId ? { ...subtask, completed: checked } : subtask,
        ),
      })
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return "Next Week, Jun 11, 2025"
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'PT Sans', sans-serif", color: "#5E5E5E" }}>
      <div className="p-6">

        {/* Toast Notification */}
        <NotificationToaster
          message="Google Calendar connected successfully!"
          type="success"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
          position="top-right"
        />

        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbItems} onClick={(item) => navigate(item.href)} />
        </div>

        {/* Main Tabs */}
        <div className="mb-2">
          <Tabs tabs={mainTabs} activeTab={activeMainTab} onTabChange={handleMainTabChange} />
        </div>

        {/* Sub Tabs - with no active selection for calendar */}
        <div className="mb-6">
          <Tabs tabs={subTabs} activeTab={activeSubTab} onTabChange={handleSubTabChange} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Calendar (3 columns) */}
          <div className="md:col-span-3 bg-white rounded-lg shadow relative">
            {/* Calendar Header */}
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex items-center space-x-2">
                <span className="font-medium" style={{ color: "#5E5E5E" }}>
                  {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-1"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-1"
                  aria-label="Next month"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowConnectModal(true)}
                  className="text-white px-4 py-2 rounded"
                  style={{ backgroundColor: "#7991BB" }}
                >
                  Connect
                </button>
                <DropdownMenu
                  trigger={
                    <button className="border px-4 py-2 rounded flex items-center" style={{ color: "#5E5E5E" }}>
                      Month <ChevronDown size={16} className="ml-2" />
                    </button>
                  }
                  items={viewOptions}
                  position="bottom-right"
                  open={dropdownOpen}
                  onToggle={setDropdownOpen}
                  className="bg-white border shadow-lg rounded-md w-32"
                />
              </div>
            </div>

            {/* React Calendar */}
            <div className="p-4">
              <Calendar
                value={currentDate}
                onChange={(date) => setCurrentDate(date as Date)}
                onClickDay={handleCalendarDayClick}
                tileContent={tileContent}
                className="react-calendar-custom"
                view={viewMode}
                prev2Label={null}
                next2Label={null}
                prevLabel={<ChevronLeft size={16} />}
                nextLabel={<ChevronRight size={16} />}
                locale="en-US"
                // calendarType="US"
              />
            </div>

            {/* Plus Button positioned as shown in image */}
            <button
              onClick={handleAddNewTask}
              className="absolute bottom-6 right-6 text-white rounded-full p-4 shadow-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#7991BB" }}
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Right Sidebar */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 p-1 rounded">
                  <Mail size={16} />
                </span>
                <span className="ml-2 font-medium" style={{ color: "#5E5E5E" }}>
                  No Due Date
                </span>
              </div>
            </div>
            <div className="mb-4">
              <TextInput
                label=""
                name="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                type="search"
                searchIcon
              />
            </div>
            <div className="flex items-center justify-center h-40 text-center">
              <NoDataFound message="You're all set!" />
            </div>
          </div>
        </div>

        {/* Connect Calendar Modal */}
        {showConnectModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-lg shadow-xl w-96 max-w-full relative">
              <button
                onClick={() => setShowConnectModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2
                className="text-2xl font-semibold text-left mb-6 mt-10"
                style={{ fontFamily: "'PT Sans', sans-serif" }}
              >
                Connect your Calendar
              </h2>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-1">
                  <span className="text-gray-700" style={{ fontFamily: "'PT Sans', sans-serif" }}>
                    1. Connect your Google or Outlook Calendar
                  </span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-gray-700" style={{ fontFamily: "'PT Sans', sans-serif" }}>
                    2. Schedule your personal and workspace tasks
                  </span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-gray-700" style={{ fontFamily: "'PT Sans', sans-serif" }}>
                    3. Easily create, edit and delete events
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleGoogleCalendarConnect}
                  className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-sm font-bold">
                    G
                  </div>
                  <span className="font-medium" style={{ fontFamily: "'PT Sans', sans-serif" }}>
                    Connect Google Calendar
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
                    O
                  </div>
                  <span className="font-medium" style={{ fontFamily: "'PT Sans', sans-serif" }}>
                    Connect Outlook Calendar
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-white text-sm font-bold">
                    i
                  </div>
                  <span className="font-medium" style={{ fontFamily: "'PT Sans', sans-serif" }}>
                    Connect iCloud Calendar
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Task Modal */}
        {showNewTaskModal && (
          <Modal
            isOpen={showNewTaskModal}
            onClose={handleCloseNewTaskModal}
            title="Task"
            content={
              <div className="space-y-6">
                {/* Task Title */}
                <div>
                  <TextInput
                    label=""
                    name="title"
                    value={newTaskData.title}
                    onChange={handleNewTaskInputChange}
                    placeholder="Add Title"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Badge
                    content={formatSelectedDate(selectedDate)}
                    icon={<Bell size={16} />}
                    variant="subtle"
                    color="bg-red-100"
                    className="text-red-600"
                  />
                  <Badge
                    content="Personal"
                    icon={<FileText size={16} />}
                    variant="subtle"
                    color="bg-amber-100"
                    className="text-amber-600"
                  />
                  <Badge
                    content="Tags"
                    icon={<Hash size={16} />}
                    variant="subtle"
                    color="bg-blue-100"
                    className="text-blue-600"
                  />
                </div>

                {/* Notes */}
                <div>
                  <TextInput
                    label=""
                    name="notes"
                    value={newTaskData.notes}
                    onChange={handleNewTaskInputChange}
                    placeholder="Add Notes......"
                  />
                </div>

                {/* Attachments */}
                <div>
                  <h3 className="text-sm font-medium mb-2" style={{ color: "#5E5E5E" }}>
                    Attachments
                  </h3>
                  <FileUpload onChange={handleNewTaskFileUpload} />
                </div>
              </div>
            }
            confirmText="Save"
            cancelText="Cancel"
            onConfirm={handleSaveNewTask}
            onCancel={handleCloseNewTaskModal}
            confirmButtonClassName="text-white"
            style={{ backgroundColor: "#7991BB" }}
          />
        )}

        {/* Unsaved Changes Modal */}
        {showUnsavedModal && (
          <Modal
            isOpen={showUnsavedModal}
            onClose={handleCancelDiscard}
            title=""
            content={
              <div className="text-center py-4">
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: "#5E5E5E", fontFamily: "'PT Sans', sans-serif" }}
                >
                  Are you sure?
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
                  Unsaved data will be discard.
                </p>
              </div>
            }
            confirmText="Yes"
            cancelText="Cancel"
            onConfirm={handleConfirmDiscard}
            onCancel={handleCancelDiscard}
            confirmButtonClassName="text-white"
            style={{ backgroundColor: "#7991BB" }}
          />
        )}

        {/* Task Modal */}
        {showTaskModal && selectedTask && (
          <Modal
            isOpen={showTaskModal}
            onClose={handleCloseTaskModal}
            title={selectedTask.title}
            content={
              <div className="space-y-6">
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Badge
                    content="Remind Me"
                    icon={<Bell size={16} />}
                    variant="subtle"
                    color="bg-red-100"
                    className="text-red-600"
                  />
                  <Badge
                    content="Personal"
                    icon={<FileText size={16} />}
                    variant="subtle"
                    color="bg-amber-100"
                    className="text-amber-600"
                  />
                  <Badge
                    content="Tags"
                    icon={<Hash size={16} />}
                    variant="subtle"
                    color="bg-blue-100"
                    className="text-blue-600"
                  />
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-sm font-medium mb-2" style={{ color: "#5E5E5E" }}>
                    Notes
                  </h3>
                  <TextArea
                    label=""
                    name="notes"
                    value={selectedTask.notes || ""}
                    onChange={(e) => handleNotesChange(selectedTask.id, e.target.value)}
                    placeholder="Text......."
                  />
                </div>

                {/* Sub Tasks */}
                <div>
                  <h3 className="text-sm font-medium mb-2" style={{ color: "#5E5E5E" }}>
                    Sub Tasks
                  </h3>
                  <div className="space-y-2">
                    {selectedTask.subTasks?.map((subtask) => (
                      <div key={subtask.id} className="flex items-center">
                        <Checkbox
                          label={subtask.title}
                          checked={subtask.completed}
                          onChange={(e) => handleSubtaskToggle(selectedTask.id, subtask.id, e.target.value)}
                          name={`subtask-${subtask.id}`}
                        />
                      </div>
                    ))}
                    <div className="flex items-center">
                      <Checkbox label="Add a new subtask" checked={false} onChange={() => {}} name="new-subtask" />
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <h3 className="text-sm font-medium mb-2" style={{ color: "#5E5E5E" }}>
                    Attachments
                  </h3>
                  <FileUpload onChange={() => {}} />
                </div>
              </div>
            }
            showFooter={false}
          />
        )}
      </div>

      {/* Custom CSS for react-calendar */}
      <style>{`
        .react-calendar-custom {
          width: 100%;
          border: none;
          font-family: 'PT Sans', sans-serif;
        }
        
        .react-calendar-custom .react-calendar__navigation {
          display: none;
        }
        
        .react-calendar-custom .react-calendar__month-view__weekdays {
          background-color: #7991BB;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .react-calendar-custom .react-calendar__month-view__weekdays__weekday {
          padding: 0.75rem;
          text-align: center;
          font-weight: 500;
          color: white;
          border-right: 1px solid #e5e7eb;
        }
        
        .react-calendar-custom .react-calendar__tile {
          min-height: 100px;
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
          background: white;
          position: relative;
          color: #6b7280;
        }
        
        .react-calendar-custom .react-calendar__tile:hover {
          background-color: #f9fafb;
        }
        
        .react-calendar-custom .react-calendar__tile--active {
          background-color: #dbeafe;
        }
        
        .react-calendar-custom .react-calendar__month-view__days__day--neighboringMonth {
          color: #d1d5db;
          background-color: white;
        }
        
        .react-calendar-custom .react-calendar__tile--now {
          background-color: white;
          color: #6b7280;
        }
      `}</style>
    </div>
  )
}

// Missing ChevronDown component
const ChevronDown = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

// Missing Mail component
const Mail = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
)

export default CalendarView

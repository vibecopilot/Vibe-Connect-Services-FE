import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import Tabs from "../components/Tabs"
import Modal from "../components/Modal"
import TextArea from "../components/TextArea"
import TextInput from "../components/TextInput"
import RadioButton from "../components/RadioButton"
import Checkbox from "../components/Checkbox"
import FileUpload from "../components/FileUpload"
import Badge from "../components/Badge"
import { Bell, FileText, Hash, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react"

interface Task {
  id: string
  title: string
  completed: boolean
  notes?: string
  subTasks?: SubTask[]
  day: string
}

interface SubTask {
  id: string
  title: string
  completed: boolean
}

interface DaySection {
  id: string
  title: string
  subtitle: string
}

const Next7DaysView = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState("my-day")
  const [activeSubTab, setActiveSubTab] = useState("next-7-days")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [showTagsModal, setShowTagsModal] = useState(false)
  const [showDateModal, setShowDateModal] = useState(false)
  const [expandedTask, setExpandedTask] = useState<string | null>(null)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [addingTaskToDay, setAddingTaskToDay] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  // List modal state
  const [selectedList, setSelectedList] = useState("Personal")

  // Tags modal state
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>({
    Priority: false,
    Important: false,
    Family: false,
    Deadline: false,
    Nothing: false,
    "Track Back": false,
    "Science Project": false,
  })

  // Date picker state
  const [selectedDate, setSelectedDate] = useState("5/06/2025")
  const [selectedTime, setSelectedTime] = useState("11:23 AM")
  const [currentMonth, setCurrentMonth] = useState("June 2025")

  // Days of the week - extended to 7 days
  const days: DaySection[] = [
    { id: "today", title: "Today", subtitle: "Thursday" },
    { id: "tomorrow", title: "Tomorrow", subtitle: "Friday" },
    { id: "saturday", title: "Saturday", subtitle: "" },
    { id: "sunday", title: "Sunday", subtitle: "" },
    { id: "monday", title: "Monday", subtitle: "" },
    { id: "tuesday", title: "Tuesday", subtitle: "" },
    { id: "wednesday", title: "Wednesday", subtitle: "" },
  ]

  // Task state
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Demo", completed: false, day: "today", notes: "", subTasks: [] },
    { id: "2", title: "Test1", completed: false, day: "today", notes: "", subTasks: [] },
  ])

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

  const handleMainTabChange = (key: string | number) => {
    setActiveMainTab(key.toString())
    if (key === "my-day") {
      navigate("/taskmanagement/list")
    } else if (key === "my-calendar") {
      navigate("/taskmanagement/calendar")
    }
  }

  const handleSubTabChange = (key: string | number) => {
    setActiveSubTab(key.toString())
    if (key === "all-tasks") {
      navigate("/taskmanagement/all-my-task")
    }
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
  }

  const handleTaskToggle = (taskId: string, checked: boolean) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: checked } : task)))
  }

  const handleSubtaskToggle = (taskId: string, subtaskId: string, checked: boolean) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks?.map((subtask) =>
                subtask.id === subtaskId ? { ...subtask, completed: checked } : subtask,
              ),
            }
          : task,
      ),
    )
  }

  const handleAddTask = (day: string) => {
    setAddingTaskToDay(day)
    setNewTaskTitle("")
  }

  const handleSaveNewTask = () => {
    if (newTaskTitle.trim() && addingTaskToDay) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: newTaskTitle.trim(),
        completed: false,
        day: addingTaskToDay,
        notes: "",
        subTasks: [],
      }
      setTasks([...tasks, newTask])
      setAddingTaskToDay(null)
      setNewTaskTitle("")
    }
  }

  const handleCancelAddTask = () => {
    setAddingTaskToDay(null)
    setNewTaskTitle("")
  }

  const handleExpandTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }

  const handleOpenTaskModal = (task: Task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const handleCloseTaskModal = () => {
    setShowTaskModal(false)
  }

  const handleNotesChange = (taskId: string, notes: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, notes } : task)))
  }

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetDay: string) => {
    e.preventDefault()
    if (!draggedTask) return
    setTasks(tasks.map((task) => (task.id === draggedTask.id ? { ...task, day: targetDay } : task)))
    setDraggedTask(null)
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveNewTask()
    } else if (e.key === "Escape") {
      handleCancelAddTask()
    }
  }

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedList(e.target.value)
  }

  const handleTagChange = (tagName: string) => (e: { target: { name: string; value: boolean } }) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tagName]: e.target.value,
    }))
  }

  // Calendar helper functions
  const getDaysInMonth = () => {
    return [
      { date: 1, isCurrentMonth: true },
      { date: 2, isCurrentMonth: true },
      { date: 3, isCurrentMonth: true },
      { date: 4, isCurrentMonth: true },
      { date: 5, isCurrentMonth: true, isSelected: true },
      { date: 6, isCurrentMonth: true },
      { date: 7, isCurrentMonth: true },
      { date: 8, isCurrentMonth: true },
      { date: 9, isCurrentMonth: true },
      { date: 10, isCurrentMonth: true },
      { date: 11, isCurrentMonth: true },
      { date: 12, isCurrentMonth: true },
      { date: 13, isCurrentMonth: true },
      { date: 14, isCurrentMonth: true },
      { date: 15, isCurrentMonth: true },
      { date: 16, isCurrentMonth: true },
      { date: 17, isCurrentMonth: true },
      { date: 18, isCurrentMonth: true },
      { date: 19, isCurrentMonth: true },
      { date: 20, isCurrentMonth: true },
      { date: 21, isCurrentMonth: true },
      { date: 22, isCurrentMonth: true },
      { date: 23, isCurrentMonth: true },
      { date: 24, isCurrentMonth: true },
      { date: 25, isCurrentMonth: true },
      { date: 26, isCurrentMonth: true },
      { date: 27, isCurrentMonth: true },
      { date: 28, isCurrentMonth: true },
      { date: 29, isCurrentMonth: true },
      { date: 30, isCurrentMonth: true },
      { date: 31, isCurrentMonth: false },
    ]
  }

  // Dynamic height calculation for each day column
  const getDayColumnHeight = (dayId: string) => {
    // Keep Today column at a constant height of 500px
    if (dayId === "today") {
      return 500
    }

    const dayTasks = tasks.filter((task) => task.day === dayId)

    // Smaller base height for days without tasks
    if (dayTasks.length === 0) {
      return 200 // Reduced height for empty columns
    }

    const baseHeight = 150
    const taskHeight = 80
    const isAddingTask = addingTaskToDay === dayId
    const addTaskInputHeight = isAddingTask ? 120 : 0

    return Math.max(300, baseHeight + dayTasks.length * taskHeight + addTaskInputHeight)
  }

  const getDayTitleStyle = (dayId: string) => {
    if (dayId === "today") {
      return { fontWeight: "bold", fontSize: "1.25rem", color: "#000000" } // Black color for Today
    } else if (dayId === "tomorrow") {
      return { fontWeight: "bold", fontSize: "1.125rem", color: "#000000" } // Black color for Tomorrow
    }
    return { fontWeight: "normal", fontSize: "1rem", color: "#5E5E5E" } // Original color for other days
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'PT Sans', sans-serif", color: "#5E5E5E" }}>
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbItems} onClick={(item) => navigate(item.href)} />
        </div>

        {/* Main Tabs */}
        <div className="mb-2">
          <Tabs tabs={mainTabs} activeTab={activeMainTab} onTabChange={handleMainTabChange} />
        </div>

        {/* Sub Tabs */}
        <div className="mb-6">
          <Tabs tabs={subTabs} activeTab={activeSubTab} onTabChange={handleSubTabChange} />
        </div>

        {/* Main Content */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {days.map((day) => {
            const dayTasks = tasks.filter((task) => task.day === day.id)
            const isAddingTask = addingTaskToDay === day.id

            return (
              <div
                key={day.id}
                className="bg-white rounded-xl min-h-[200px] flex flex-col flex-shrink-0 border border-gray-200"
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  width: "320px", // Increased from 200px to 320px
                  minWidth: "320px", // Added minimum width
                  height: `${getDayColumnHeight(day.id)}px`,
                }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day.id)}
              >
                {/* Day Header */}
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-medium" style={getDayTitleStyle(day.id)}>
                    {day.title}{" "}
                    {day.subtitle && <span className="text-gray-500 font-normal text-sm">{day.subtitle}</span>}
                  </h2>
                </div>

                {/* Tasks Container */}
                <div className="flex-1 p-4 space-y-3">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-xl p-4 cursor-move hover:bg-gray-50 transition-colors flex items-center border border-gray-200"
                      style={{
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        minHeight: "50px", // Added minimum height for tasks
                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                      onClick={() => handleTaskClick(task)}
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-300 mr-4 flex-shrink-0"></div>
                      <span style={{ color: "#5E5E5E" }} className="font-medium text-sm">
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Task Button or Input */}
                {isAddingTask ? (
                  <div className="p-4 border-t bg-gray-50 rounded-b-xl">
                    {/* Icons Row */}
                    <div className="flex items-center justify-center space-x-6 mb-3">
                      <button
                        onClick={() => setShowDateModal(true)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Bell size={18} className="text-red-400" />
                      </button>
                      <button
                        onClick={() => setShowListModal(true)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <FileText size={18} className="text-amber-400" />
                      </button>
                      <button
                        onClick={() => setShowTagsModal(true)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Hash size={18} className="text-blue-400" />
                      </button>
                    </div>

                    {/* Text Input with Arrow */}
                    <div className="relative">
                      <TextInput
                        label=""
                        name="newTask"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter task title..."
                        autoFocus
                      />
                      <div className="absolute -bottom-1 right-2">
                        <ChevronUp size={14} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddTask(day.id)}
                    className="w-full py-3 bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors rounded-b-xl"
                    style={{ color: "#5E5E5E" }}
                  >
                    <span className="mr-2">+</span> Add Task
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Date Picker Modal - Updated Layout */}
        {showDateModal && (
          <Modal
            isOpen={showDateModal}
            onClose={() => setShowDateModal(false)}
            title="Pick Date"
            content={
              <div className="space-y-4">
                {/* Date and Time Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="text"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input
                      type="text"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Calendar and Quick Options Side by Side */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Side - Calendar */}
                  <div>
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ChevronLeft size={16} />
                      </button>
                      <h3 className="font-medium text-sm">{currentMonth}</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Calendar Grid - Smaller */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {/* Day Headers */}
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="p-1 font-medium text-gray-600">
                          {day}
                        </div>
                      ))}

                      {/* Calendar Days */}
                      {getDaysInMonth().map((day, index) => (
                        <button
                          key={index}
                          className={`p-1 hover:bg-gray-100 rounded text-xs ${
                            day.isSelected ? "bg-blue-500 text-white" : ""
                          } ${!day.isCurrentMonth ? "text-gray-300" : ""}`}
                        >
                          {day.date}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Quick Options */}
                  <div className="space-y-2">
                    {["Later Today", "Tomorrow", "Next Week", "Someday"].map((option) => (
                      <button
                        key={option}
                        className="w-full p-2 text-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm text-gray-600"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    onClick={() => setShowDateModal(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowDateModal(false)}
                    className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                    style={{ backgroundColor: "#7991BB" }}
                  >
                    Set
                  </button>
                </div>
              </div>
            }
            showFooter={false}
          />
        )}

        {/* List Modal */}
        {showListModal && (
          <Modal
            isOpen={showListModal}
            onClose={() => setShowListModal(false)}
            title="List"
            content={
              <div className="space-y-4">
                <RadioButton
                  label="My Lists"
                  options={["Personal", "Work"]}
                  value={selectedList}
                  onChange={handleListChange}
                  name="listSelection"
                />
              </div>
            }
            showFooter={false}
          />
        )}

        {/* Tags Modal */}
        {showTagsModal && (
          <Modal
            isOpen={showTagsModal}
            onClose={() => setShowTagsModal(false)}
            title="Tags"
            content={
              <div className="space-y-4">
                <div className="space-y-2">
                  {[
                    { name: "Priority", color: "bg-yellow-400" },
                    { name: "Important", color: "bg-red-400" },
                    { name: "Family", color: "bg-orange-400" },
                    { name: "Deadline", color: "bg-yellow-400" },
                    { name: "Nothing", color: "bg-orange-400" },
                    { name: "Track Back", color: "bg-green-500" },
                    { name: "Science Project", color: "bg-green-400" },
                  ].map((tag) => (
                    <div key={tag.name} className={`p-3 rounded-lg ${tag.color} flex items-center`}>
                      <Checkbox
                        label={tag.name}
                        checked={selectedTags[tag.name]}
                        onChange={handleTagChange(tag.name)}
                        name={tag.name}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <button
                    onClick={() => setShowTagsModal(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowTagsModal(false)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            }
            showFooter={false}
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

        {/* Expanded Task at Bottom */}
        {expandedTask && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-200 border-t p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center" style={{ color: "#5E5E5E" }}>
                {tasks.find((t) => t.id === expandedTask)?.title}
              </div>
              <button onClick={() => setExpandedTask(null)} className="text-gray-500">
                <ChevronUp size={18} />
              </button>
            </div>
            <div className="flex space-x-4 mt-2">
              <button className="flex items-center">
                <Bell size={18} className="text-red-400" />
              </button>
              <button className="flex items-center">
                <FileText size={18} className="text-amber-400" />
              </button>
              <button className="flex items-center">
                <Hash size={18} className="text-blue-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Next7DaysView
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import Tabs from "../components/Tabs"
import Modal from "../components/Modal"
import { Card } from "../components/Card"
import ProgressBar from "../components/ProgressBar"
import IconButton from "../components/IconButton"
import RadioButton from "../components/RadioButton"
import Checkbox from "../components/Checkbox"
import { Trash2, Plus, Bell, FileText, Hash, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"

interface KanbanTask {
  id: string
  title: string
  createdBy: string
  timeAgo: string
  progress: number
  status: "Open" | "WIP" | "Action Pending" | "Complete" | "Closed" | "Re-Open"
}

interface KanbanColumn {
  id: string
  title: string
  tasks: KanbanTask[]
}

const KanbanView = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState("my-day")
  const [activeSubTab, setActiveSubTab] = useState("all-tasks")
  const [draggedTask, setDraggedTask] = useState<KanbanTask | null>(null)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [showTagsModal, setShowTagsModal] = useState(false)
  const [showDateModal, setShowDateModal] = useState(false)
  const [showAddTaskIcons, setShowAddTaskIcons] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState<string>("")

  // Modal states
  const [selectedList, setSelectedList] = useState("Personal")
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>({
    Priority: false,
    Important: false,
    Family: false,
    Deadline: false,
    Nothing: false,
    "Track Back": false,
    "Science Project": false,
  })
  const [selectedDate, setSelectedDate] = useState("5/06/2025")
  const [selectedTime, setSelectedTime] = useState("11:23 AM")
  const [currentMonth, setCurrentMonth] = useState("June 2025")

  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: "open",
      title: "Open",
      tasks: [
        {
          id: "1",
          title: "Team Meeting",
          createdBy: "Parker Aniket",
          timeAgo: "83 d,22h ago",
          progress: 0,
          status: "Open",
        },
      ],
    },
    {
      id: "wip",
      title: "WIP",
      tasks: [],
    },
    {
      id: "action-pending",
      title: "Action Pending",
      tasks: [],
    },
    {
      id: "complete",
      title: "Complete",
      tasks: [],
    },
    {
      id: "closed",
      title: "Closed",
      tasks: [],
    },
    {
      id: "re-open",
      title: "Re-Open",
      tasks: [],
    },
  ])

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Task Management", href: "/taskmanagement" },
    { label: "Kanban", href: "" },
  ]

  const mainTabs = [
    { label: "My day", key: "my-day" },
    { label: "My Calendar", key: "my-calendar" },
  ]

  const subTabs = [
    { label: "All My Task", key: "all-tasks" },
    { label: "Next 7 Days", key: "next-7-days" },
  ]

  const handleDragStart = (task: KanbanTask) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()
    if (!draggedTask) return

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== draggedTask.id),
      }))

      const targetColumn = newColumns.find((col) => col.id === targetColumnId)
      if (targetColumn) {
        targetColumn.tasks.push({
          ...draggedTask,
          status: targetColumn.title as KanbanTask["status"],
        })
      }

      return newColumns
    })

    setDraggedTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      })),
    )
  }

  const handleMainTabChange = (key: string) => {
    setActiveMainTab(key)
    if (key === "my-calendar") {
      navigate("/taskmanagement/calendar")
    } else if (key === "my-day") {
      navigate("/taskmanagement/list")
    }
  }

  const handleSubTabChange = (key: string) => {
    setActiveSubTab(key)
    if (key === "all-tasks") {
      navigate("/taskmanagement/all-my-task")
    } else if (key === "next-7-days") {
      navigate("/taskmanagement/next-7-days")
    }
  }

  const handleViewModeClick = (buttonType: string) => {
    if (buttonType === "List") {
      navigate("/taskmanagement/list")
    }
  }

  const handleAddTaskClick = () => {
    setShowAddTaskIcons(!showAddTaskIcons)
  }

  const handleIconClick = (iconType: string) => {
    setShowAddTaskIcons(false)
    if (iconType === "bell") {
      setShowDateModal(true)
    } else if (iconType === "list") {
      setShowListModal(true)
    } else if (iconType === "tags") {
      setShowTagsModal(true)
    }
  }

  const getColumnColor = (columnId: string) => {
    return "bg-[#7991BB] border-[#7991BB]"
  }

  const getColumnHeight = (column: KanbanColumn) => {
    // Open column has constant height regardless of tasks
    if (column.id === "open") {
      const headerHeight = 60
      const addTaskButtonHeight = 120
      const padding = 40
      const constantTaskArea = 400 // Constant height for task area
      return headerHeight + constantTaskArea + addTaskButtonHeight + padding
    }
    
    // Other columns have dynamic height based on tasks
    const headerHeight = 10
    const taskHeight = 310 // Height per task card
    const padding = 10
    const minHeight = 20 // Minimum height for empty columns
    
    if (column.tasks.length === 0) {
      return headerHeight + minHeight + padding
    }
    
    return headerHeight + (column.tasks.length * taskHeight) + padding
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

  const renderTaskCard = (task: KanbanTask) => (
    <Card
      key={task.id}
      className="cursor-move hover:shadow-lg transition-shadow rounded-xl mb-4"
      style={{ backgroundColor: "#19376D", color: "white" }}
      draggable
      onDragStart={() => handleDragStart(task)}
    >
      <div className="p-4 flex flex-col h-full">
  {/* Task title */}
  <div className="mb-3">
    <h4 className="font-medium text-white text-sm">{task.title}</h4>
  </div>

  {/* Creator info */}
  <div className="mb-2">
    <p className="text-xs text-blue-200">Created By: {task.createdBy}</p>
  </div>

  {/* Time info */}
  <div className="mb-4">
    <p className="text-xs text-red-400">{task.timeAgo}</p>
  </div>

  {/* Progress bar */}
  <div className="mb-4 px-2 flex-1">
    <ProgressBar
      value={task.progress}
      showLabel={false}
      color="blue"
      className="w-full h-1 rounded-full"
    />
  </div>

  {/* Progress info with delete icon */}
  <div className="flex justify-between items-start text-xs text-white">
    <span>{task.progress}/0</span>

    <div className="flex flex-col items-end space-y-1">
      <span>{task.progress}%</span>
      <IconButton 
        tooltip="Delete" 
        onClick={() => handleDeleteTask(task.id)}
        className="flex-shrink-0"
      >
        <Trash2 size={14} className="text-white" />
      </IconButton>
    </div>
  </div>
</div>
    </Card>
  )

  return (
    <div className="min-h-screen" style={{ fontFamily: "'PT Sans', sans-serif", color: "#5E5E5E" }}>
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbItems} onClick={(item) => item.href && navigate(item.href)} />
        </div>

        {/* Main Tabs */}
        <div className="mb-2">
          <Tabs tabs={mainTabs} activeTab={activeMainTab} onTabChange={handleMainTabChange} />
        </div>

        {/* Sub Tabs */}
        <div className="mb-4">
          <Tabs tabs={subTabs} activeTab={activeSubTab} onTabChange={handleSubTabChange} />
        </div>

        {/* Action Buttons - Only List/Kanban */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => handleViewModeClick("List")}
            className="bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            List
          </button>
          <button
            className="text-white px-4 py-2 rounded-md border border-gray-300"
            style={{ backgroundColor: "#8094bc" }}
          >
            Kanban
          </button>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-max">
            {columns.map((column) => (
              <div
                key={column.id}
                className={`rounded-lg border-2 border-dashed ${getColumnColor(column.id)} flex-shrink-0 relative flex flex-col`}
                style={{
                  height: `${getColumnHeight(column)}px`,
                  width: "320px",
                }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="text-center mb-4 flex-shrink-0">
                  <h3 className="font-semibold text-lg text-white py-2 px-4 rounded">{column.title}</h3>
                </div>

                {/* Column Content */}
                <div className="px-4 pb-4 flex-1 flex flex-col">
                  {/* Tasks Container */}
                  <div className="flex-1 overflow-y-auto">
                    {column.tasks.map((task) => renderTaskCard(task))}
                  </div>

                  {/* Add Task Button - Only for Open column - Always at bottom */}
                  {column.id === "open" && (
                    <div className="mt-auto flex-shrink-0">
                      {/* Icons above Add Task button */}
                      {showAddTaskIcons && (
                        <div className="mb-2 p-3 bg-gray-400 rounded-lg flex justify-center items-center space-x-6 relative">
                          <button
                            onClick={() => handleIconClick("bell")}
                            className="p-2 hover:bg-gray-500 rounded-full transition-colors"
                          >
                            <Bell size={20} className="text-red-400" />
                          </button>
                          <button
                            onClick={() => handleIconClick("list")}
                            className="p-2 hover:bg-gray-500 rounded-full transition-colors"
                          >
                            <FileText size={20} className="text-amber-400" />
                          </button>
                          <button
                            onClick={() => handleIconClick("tags")}
                            className="p-2 hover:bg-gray-500 rounded-full transition-colors"
                          >
                            <Hash size={20} className="text-blue-400" />
                          </button>
                          {/* Upward pointing arrow */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <ChevronUp size={16} className="text-gray-400" />
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleAddTaskClick}
                        className="w-full flex items-center justify-center gap-2 bg-gray-400 text-white py-3 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                      >
                        <Plus size={20} />
                        Add Task
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date Picker Modal */}
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
      </div>
    </div>
  )
}

export default KanbanView
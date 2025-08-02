import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import Tabs from "../components/Tabs"
import TextArea from "../components/TextArea"
import TextInput from "../components/TextInput"
import Checkbox from "../components/Checkbox"
import FileUpload from "../components/FileUpload"
import Badge from "../components/Badge"
import Modal from "../components/Modal"
import DatePickerModal from "../components/date-picker-modal"
import { Bell, FileText, Hash, ChevronUp } from "lucide-react"

interface Task {
  id: string
  title: string
  completed: boolean
  notes?: string
  subTasks?: SubTask[]
  section: "today" | "tomorrow" | "upcoming" | "someday"
}

interface SubTask {
  id: string
  title: string
  completed: boolean
}

const AllMyTaskView = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState("my-day")
  const [activeSubTab, setActiveSubTab] = useState("all-tasks")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [expandedTask, setExpandedTask] = useState<string | null>(null)
  const [showAddTaskInput, setShowAddTaskInput] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [showTagsModal, setShowTagsModal] = useState(false)
  const [selectedLists, setSelectedLists] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedList, setSelectedList] = useState("")

  // Task state
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Test1", completed: false, section: "today", notes: "", subTasks: [] },
    { id: "2", title: "Test2", completed: false, section: "today", notes: "", subTasks: [] },
    {
      id: "3",
      title: "Demo",
      completed: false,
      section: "today",
      notes: "",
      subTasks: [{ id: "sub1", title: "Text", completed: false }],
    },
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

  const lists = [
    { id: "personal", name: "Personal" },
    { id: "work", name: "Work" },
  ]

  const tags = [
    { id: "priority", name: "Priority", color: "bg-yellow-200" },
    { id: "important", name: "Important", color: "bg-pink-100" },
    { id: "family", name: "Family", color: "bg-orange-50" },
    { id: "deadline", name: "Deadline", color: "bg-yellow-50" },
    { id: "nothing", name: "Nothing", color: "bg-orange-50" },
    { id: "track-back", name: "Track Back", color: "bg-green-100" },
    { id: "science-project", name: "Science Project", color: "bg-green-100" },
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
    if (key === "next-7-days") {
      navigate("/taskmanagement/next-7-days")
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

  const handleAddTask = () => {
    setShowAddTaskInput(true)
  }

  const handleSaveNewTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: newTaskTitle.trim(),
        completed: false,
        section: "today",
        notes: "",
        subTasks: [],
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle("")
      setShowAddTaskInput(false)
    }
  }

  const handleCancelAddTask = () => {
    setNewTaskTitle("")
    setShowAddTaskInput(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveNewTask()
    }
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
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({ ...selectedTask, notes })
    }
  }

  const handleDatePickerSave = (date: string, time: string) => {
    setShowDatePicker(false)
  }

  const handleListToggle = (listId: string, checked: boolean) => {
    setSelectedLists((prev) => (checked ? [...prev, listId] : prev.filter((id) => id !== listId)))
  }

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedList(e.target.value)
  }

  const handleTagToggle = (tagId: string, checked: boolean) => {
    setSelectedTags((prev) => (checked ? [...prev, tagId] : prev.filter((id) => id !== tagId)))
  }

  const handleTagsSave = () => {
    setShowTagsModal(false)
  }

  const renderTasksBySection = (section: Task["section"]) => {
    const sectionTasks = tasks.filter((task) => task.section === section)
    if (sectionTasks.length === 0 && section !== "today") return null

    return (
      <div>
        {section !== "today" && <h3 className="text-lg font-medium capitalize mt-6 mb-2 text-black">{section}</h3>}
        <div className="space-y-2">
          {sectionTasks.map((task) => (
            <div key={task.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-3 flex items-center cursor-pointer" onClick={() => handleTaskClick(task)}>
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                <span className="flex-grow text-black">{task.title}</span>
                {task.id === expandedTask && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleExpandTask(task.id)
                    }}
                    className="text-gray-500"
                  >
                    <ChevronUp size={18} />
                  </button>
                )}
              </div>
              {task.id === expandedTask && (
                <div className="p-3 border-t flex space-x-4 text-gray-500">
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
              )}
            </div>
          ))}
        </div>
      </div>
    )
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel - Task List */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
            {/* Today's Tasks */}
            {renderTasksBySection("today")}

            {/* Tomorrow Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2 text-black">Tomorrow</h3>
              {renderTasksBySection("tomorrow")}
            </div>

            {/* Upcoming Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2 text-black">Upcoming</h3>
              {renderTasksBySection("upcoming")}
            </div>

            {/* Someday Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2 text-black">Someday</h3>
              {renderTasksBySection("someday")}
            </div>

            {/* Add Task Section */}
            {showAddTaskInput ? (
              <div className="mt-4 space-y-3">
                {/* Icons above text input */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setShowDatePicker(true)} className="p-2 hover:bg-gray-100 rounded">
                      <Bell size={18} className="text-red-400" />
                    </button>
                    <button onClick={() => setShowListModal(true)} className="p-2 hover:bg-gray-100 rounded">
                      <FileText size={18} className="text-amber-400" />
                    </button>
                    <button onClick={() => setShowTagsModal(true)} className="p-2 hover:bg-gray-100 rounded">
                      <Hash size={18} className="text-blue-400" />
                    </button>
                  </div>
                  <button onClick={handleCancelAddTask} className="p-2 hover:bg-gray-100 rounded">
                    <ChevronUp size={18} className="text-gray-500" />
                  </button>
                </div>

                {/* Text input below icons */}
                <TextInput
                  label=""
                  name="newTask"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task name..."
                  className="w-full"
                  onKeyDown={handleKeyPress}
                />
              </div>
            ) : (
              <button
                onClick={handleAddTask}
                className="w-full py-3 bg-gray-200 text-gray-700 flex items-center justify-center mt-4 rounded"
              >
                <span className="mr-2">+</span> Add Task
              </button>
            )}
          </div>

          {/* Right Panel - Task Details */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            {selectedTask ? (
              <>
                <h2 className="text-xl font-medium mb-4">{selectedTask.title}</h2>
                {/* Action Buttons */}
                <div className="flex space-x-2 mb-6">
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
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Notes</h3>
                  <TextArea
                    label=""
                    name="notes"
                    value={selectedTask.notes || ""}
                    onChange={(e) => handleNotesChange(selectedTask.id, e.target.value)}
                    placeholder="Text......."
                  />
                </div>
                {/* Sub Tasks */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Sub Tasks</h3>
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
                  <h3 className="text-sm font-medium mb-2">Attachments</h3>
                  <FileUpload onChange={() => {}} />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <p>Select a task to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <Modal
            isOpen={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            title="Pick Date"
            content={<DatePickerModal onSave={handleDatePickerSave} onCancel={() => setShowDatePicker(false)} />}
            showFooter={false}
          />
        )}

        {/* List Modal - Updated without border lines */}
        {showListModal && (
          <Modal
            isOpen={showListModal}
            onClose={() => setShowListModal(false)}
            title="List"
            content={
              <div className="space-y-4">
                <h3 className="text-lg font-medium">My Lists</h3>
                <div className="space-y-3">
                  {lists.map((list) => (
                    <div key={list.id} className="flex items-center justify-between p-3">
                      <span className="text-gray-700">{list.name}</span>
                      <input
                        type="radio"
                        name="list-selection"
                        value={list.id}
                        checked={selectedList === list.id}
                        onChange={handleListChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                    </div>
                  ))}
                </div>
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
                  {tags.map((tag) => (
                    <div key={tag.id} className={`flex items-center p-3 rounded-lg ${tag.color}`}>
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={(e) => handleTagToggle(tag.id, e.target.checked)}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="flex-grow text-gray-700">{tag.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setShowTagsModal(false)}
                    className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded"
                  >
                    Cancel
                  </button>
                  <button onClick={handleTagsSave} className="flex-1 py-2 px-4 bg-blue-500 text-white rounded">
                    Save
                  </button>
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
              <div className="flex items-center text-black">{tasks.find((t) => t.id === expandedTask)?.title}</div>
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
                  <h3 className="text-sm font-medium mb-2">Notes</h3>
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
                  <h3 className="text-sm font-medium mb-2">Sub Tasks</h3>
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
                  <h3 className="text-sm font-medium mb-2">Attachments</h3>
                  <FileUpload onChange={() => {}} />
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

export default AllMyTaskView
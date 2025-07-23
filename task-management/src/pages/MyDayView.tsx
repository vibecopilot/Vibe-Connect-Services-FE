
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import Tabs from "../components/Tabs"
import Avatar from "../components/Avatar"
import TextArea from "../components/TextArea"
import Checkbox from "../components/Checkbox"
import FileUpload from "../components/FileUpload"
import Badge from "../components/Badge"
import Modal from "../components/Modal"
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

const MyDayView = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState("my-day")
  const [activeSubTab, setActiveSubTab] = useState("all-tasks")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [expandedTask, setExpandedTask] = useState<string | null>(null)
  const [newSubtask, setNewSubtask] = useState("")

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

  const handleMainTabChange = (key: string | number) => {
    setActiveMainTab(key.toString())
    if (key === "my-calendar") {
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

  const handleAddSubtask = (taskId: string) => {
    if (!newSubtask.trim()) return

    const newSubtaskObj: SubTask = {
      id: `sub-${Date.now()}`,
      title: newSubtask,
      completed: false,
    }

    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, subTasks: [...(task.subTasks || []), newSubtaskObj] } : task,
      ),
    )

    setNewSubtask("")
  }

  const handleNotesChange = (taskId: string, notes: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, notes } : task)))
  }

  const handleAddTask = () => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: "New Task",
      completed: false,
      section: "today",
      notes: "",
      subTasks: [],
    }

    setTasks([...tasks, newTask])
    setSelectedTask(newTask)
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

  const renderTasksBySection = (section: Task["section"]) => {
    const sectionTasks = tasks.filter((task) => task.section === section)

    if (sectionTasks.length === 0) return null

    return (
      <div>
        {section !== "today" && <h3 className="text-lg font-medium capitalize mt-6 mb-2">{section}</h3>}
        <div className="space-y-2">
          {sectionTasks.map((task) => (
            <div key={task.id} className="border rounded-lg bg-white">
              <div className="p-3 flex items-center cursor-pointer" onClick={() => handleTaskClick(task)}>
                <Avatar src="" name="" size="sm" className="mr-3" />
                <span className="flex-grow">{task.title}</span>
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
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} onClick={(item) => navigate(item.href)} />
      </div>

      {/* Main Tabs */}
      <div className="mb-4">
        <Tabs tabs={mainTabs} activeTab={activeMainTab} onTabChange={handleMainTabChange} />
      </div>

      {/* Sub Tabs */}
      <div className="mb-6">
        <Tabs tabs={subTabs} activeTab={activeSubTab} onTabChange={handleSubTabChange} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel - Task List */}
        <div className="bg-white rounded-lg shadow">
          {/* Today's Tasks */}
          {renderTasksBySection("today")}

          {/* Tomorrow's Tasks */}
          {renderTasksBySection("tomorrow")}

          {/* Upcoming Tasks */}
          {renderTasksBySection("upcoming")}

          {/* Someday Tasks */}
          {renderTasksBySection("someday")}

          {/* Add Task Button */}
          <button
            onClick={handleAddTask}
            className="w-full py-3 bg-gray-200 text-gray-700 flex items-center justify-center mt-4"
          >
            <span className="mr-2">+</span> Add Task
          </button>
        </div>

        {/* Right Panel - Task Details */}
        {selectedTask && (
          <div className="bg-white rounded-lg shadow p-6">
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
          </div>
        )}
      </div>

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
  )
}

export default MyDayView


import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import Tabs from "../components/Tabs"
import IconButton from "../components/IconButton"
import Pagination from "../components/Pagination"
import TableHead from "../components/TopHead"
import NoDataFound from "../components/NoDataFound"
import { taskStore, type Task } from "../utils/taskStore"
import { Edit, Trash2, Eye } from "lucide-react" // Removed Search icon from here
import TextInput from "../components/TextInput" // Import TextInput
import SearchableTopBar from "../components/SearchableTopBar" // Import SearchableTopBar

const TaskListView = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [tasks, setTasks] = useState<Task[]>(taskStore.getTasks())
  const [activeView, setActiveView] = useState<"list" | "kanban">("list")
  const [showSearchInputs, setShowSearchInputs] = useState(false) // State for search inputs visibility
  const [filterCriteria, setFilterCriteria] = useState({
    // State for filter values
    name: "",
    assignee: "",
    dueDate: "",
    priority: "",
    status: "",
    comments: "",
  })

  // Subscribe to task store changes
  useEffect(() => {
    const unsubscribe = taskStore.subscribe(() => {
      setTasks(taskStore.getTasks())
    })
    return unsubscribe
  }, [])

  // Determine active tabs based on current route
  const activeMainTab = "my-day"
  const activeSubTab = "none" // No sub-tab should be active when on list view

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

  const handleAddTask = () => {
    navigate("/taskmanagement/add-task")
  }

  const handleViewTask = (taskId: string) => {
    navigate(`/taskmanagement/view/${taskId}`)
  }

  const handleEditTask = (taskId: string) => {
    navigate(`/taskmanagement/add-task?edit=${taskId}`)
  }

  const handleDeleteTask = (taskId: string) => {
    taskStore.deleteTask(taskId)
  }

  const handleKanbanView = () => {
    setActiveView("kanban")
    navigate("/taskmanagement/kanban")
  }

  const tableColumns = [
    { label: "Action", align: "left" as const },
    { label: "Name", align: "left" as const },
    { label: "Assignee", align: "left" as const },
    { label: "Due Date", align: "left" as const },
    { label: "Priority", align: "left" as const },
    { label: "Status", align: "left" as const },
    { label: "Comments", align: "left" as const },
  ]

  const handleMainTabChange = (key: string | number) => {
    if (key === "my-calendar") {
      navigate("/taskmanagement/calendar")
    }
    // Stay on current page for "my-day" tab
  }

  const handleSubTabChange = (key: string | number) => {
    if (key === "all-tasks") {
      navigate("/taskmanagement/all-my-task")
    } else if (key === "next-7-days") {
      navigate("/taskmanagement/next-7-days")
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilterCriteria((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const filteredTasks = tasks.filter((task) => {
    return (
      task.name.toLowerCase().includes(filterCriteria.name.toLowerCase()) &&
      task.assignee.toLowerCase().includes(filterCriteria.assignee.toLowerCase()) &&
      task.dueDate.toLowerCase().includes(filterCriteria.dueDate.toLowerCase()) &&
      task.priority.toLowerCase().includes(filterCriteria.priority.toLowerCase()) &&
      task.status.toLowerCase().includes(filterCriteria.status.toLowerCase()) &&
      task.comments.toLowerCase().includes(filterCriteria.comments.toLowerCase())
    )
  })

  const handleSearchToggle = (isVisible: boolean) => {
    setShowSearchInputs(isVisible)
  }

  const handleTopBarButtonClick = (type: string) => {
    if (type === "Add Task") {
      handleAddTask()
    } else if (type === "List") {
      // Already on list view, do nothing or refresh
    } else if (type === "Kanban") {
      handleKanbanView()
    }
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

        {/* Sub Tabs - with no active selection */}
        <div className="mb-4">
          <Tabs tabs={subTabs} activeTab={activeSubTab} onTabChange={handleSubTabChange} />
        </div>

        {/* Action Buttons with Search Icon and Table Headers */}
        <div className="mb-6 flex items-center justify-between">
          <SearchableTopBar
            onButtonClick={handleTopBarButtonClick}
            buttons={["Add Task", "List", "Kanban"]}
            onSearchToggle={handleSearchToggle}
          />
          {/* Pagination moved to top right */}
          {tasks.length > 0 && (
            <Pagination currentPage={1} totalPages={1} totalItems={filteredTasks.length} onPageChange={() => {}} />
          )}
        </div>

        {/* Task Table or No Data */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <TableHead columns={tableColumns} />
            {showSearchInputs && (
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 border-b"></th> {/* Empty cell for Action column */}
                  <th className="p-3 border-b">
                    <TextInput
                      label=""
                      name="name"
                      value={filterCriteria.name}
                      onChange={handleSearchInputChange}
                      placeholder="Search Name"
                      className="w-full text-sm"
                    />
                  </th>
                  <th className="p-3 border-b">
                    <TextInput
                      label=""
                      name="assignee"
                      value={filterCriteria.assignee}
                      onChange={handleSearchInputChange}
                      placeholder="Search Assignee"
                      className="w-full text-sm"
                    />
                  </th>
                  <th className="p-3 border-b">
                    <TextInput
                      label=""
                      name="dueDate"
                      value={filterCriteria.dueDate}
                      onChange={handleSearchInputChange}
                      placeholder="Search Due Date"
                      className="w-full text-sm"
                    />
                  </th>
                  <th className="p-3 border-b">
                    <TextInput
                      label=""
                      name="priority"
                      value={filterCriteria.priority}
                      onChange={handleSearchInputChange}
                      placeholder="Search Priority"
                      className="w-full text-sm"
                    />
                  </th>
                  <th className="p-3 border-b">
                    <TextInput
                      label=""
                      name="status"
                      value={filterCriteria.status}
                      onChange={handleSearchInputChange}
                      placeholder="Search Status"
                      className="w-full text-sm"
                    />
                  </th>
                  <th className="p-3 border-b">
                    <TextInput
                      label=""
                      name="comments"
                      value={filterCriteria.comments}
                      onChange={handleSearchInputChange}
                      placeholder="Search Comments"
                      className="w-full text-sm"
                    />
                  </th>
                </tr>
              </thead>
            )}
            {filteredTasks.length > 0 ? (
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {/* Changed icon order to View, Edit, Delete */}
                        <IconButton tooltip="View" onClick={() => handleViewTask(task.id)}>
                          <Eye size={16} />
                        </IconButton>
                        <IconButton tooltip="Edit" onClick={() => handleEditTask(task.id)}>
                          <Edit size={16} />
                        </IconButton>
                        <IconButton tooltip="Delete" onClick={() => handleDeleteTask(task.id)}>
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: "#5E5E5E" }}>
                      {task.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "#5E5E5E" }}>
                      {task.assignee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "#5E5E5E" }}>
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "#5E5E5E" }}>
                      {task.priority}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "#5E5E5E" }}>
                      {task.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "#5E5E5E" }}>
                      {task.comments}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={7} className="px-6 py-12">
                    <NoDataFound message="No tasks available" />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

export default TaskListView
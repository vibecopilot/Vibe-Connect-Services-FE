
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import Tabs from "../components/Tabs"
import IconButton from "../components/IconButton"
import Pagination from "../components/Pagination"
import TableHead from "../components/TopHead"
import NoDataFound from "../components/NoDataFound"
import { taskStore, type Task } from "../utils/taskStore"
import { Edit, Trash2, Eye, Search } from "lucide-react"

const TaskListView = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [tasks, setTasks] = useState<Task[]>(taskStore.getTasks())
  const [activeView, setActiveView] = useState<"list" | "kanban">("list")

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
          <div className="flex items-center gap-4">
            <Search size={20} className="text-gray-600" />
            <button
              onClick={handleAddTask}
              className="bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Add Task
            </button>
            {/* Only show List/Kanban buttons if there are tasks */}
            {tasks.length > 0 && (
              <>
                <button
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                  style={
                    activeView === "list"
                      ? { backgroundColor: "#8094bc", color: "white" }
                      : { backgroundColor: "white", color: "#6B7280" }
                  }
                >
                  List
                </button>
                <button
                  onClick={handleKanbanView}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                  style={
                    activeView === "kanban"
                      ? { backgroundColor: "#8094bc", color: "white" }
                      : { backgroundColor: "white", color: "#6B7280" }
                  }
                >
                  Kanban
                </button>
              </>
            )}
          </div>
          {/* Pagination moved to top right */}
          {tasks.length > 0 && (
            <Pagination currentPage={1} totalPages={1} totalItems={tasks.length} onPageChange={() => {}} />
          )}
        </div>

        {/* Task Table or No Data */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Always show table headers */}
          <table className="w-full">
            <TableHead columns={tableColumns} />
            {tasks.length > 0 ? (
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <IconButton tooltip="Edit" onClick={() => handleEditTask(task.id)}>
                          <Edit size={16} />
                        </IconButton>
                        <IconButton tooltip="Delete" onClick={() => handleDeleteTask(task.id)}>
                          <Trash2 size={16} />
                        </IconButton>
                        <IconButton tooltip="View" onClick={() => handleViewTask(task.id)}>
                          <Eye size={16} />
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


import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import TextInput from "../components/TextInput"
import Select from "../components/Select"
import DatePicker from "../components/DatePicker"
import TextArea from "../components/TextArea"
import FileUpload from "../components/FileUpload"
import { Card } from "../components/Card"
import { taskStore, type Task } from "../utils/taskStore"

const AddTask = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editTaskId = searchParams.get("edit")
  const isEdit = !!editTaskId

  const [activeTab, setActiveTab] = useState("self-task")
  const [formData, setFormData] = useState({
    name: "",
    assignee: "",
    dueDate: "",
    startDate: "",
    priority: "",
    status: "",
    dependentTask: "",
    description: "",
    attachments: null as FileList | null,
  })

  // Load task data for editing
  useEffect(() => {
    if (isEdit && editTaskId) {
      const task = taskStore.getTaskById(editTaskId)
      if (task) {
        setFormData({
          name: task.name,
          assignee: task.assignee,
          dueDate: task.dueDate,
          startDate: task.startDate || "",
          priority: task.priority,
          status: task.status,
          dependentTask: task.dependentTask || "",
          description: task.description || "",
          attachments: task.attachments || null,
        })
        // Set tab based on whether task is assigned to others
        setActiveTab(task.assignee !== "Self" ? "assign-others" : "self-task")
      }
    }
  }, [isEdit, editTaskId])

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Task Management", href: "/taskmanagement" },
    { label: isEdit ? "Edit Task" : "Add Task", href: "" },
  ]

  const priorityOptions = ["High", "Medium", "Low"]
  const statusOptions = ["Pending", "In Progress", "Completed"]
  const assigneeOptions = ["Aniket Parkar", "John Doe", "Jane Smith", "Test1", "Test2", "Test3"]
  const dependentTaskOptions = ["Task 1", "Task 2", "Task 3"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileUpload = (files: FileList | null) => {
    setFormData((prev) => ({
      ...prev,
      attachments: files,
    }))
  }

  const handleSubmit = () => {
    const taskData: Task = {
      id: isEdit ? editTaskId! : `task-${Date.now()}`,
      name: formData.name,
      assignee: activeTab === "self-task" ? "Self" : formData.assignee,
      dueDate: formData.dueDate,
      startDate: formData.startDate,
      priority: formData.priority as "High" | "Medium" | "Low",
      status: formData.status as "Pending" | "In Progress" | "Completed",
      comments: formData.description,
      notes: formData.description,
      dependentTask: formData.dependentTask,
      description: formData.description,
      attachments: formData.attachments,
    }

    if (isEdit) {
      taskStore.updateTask(editTaskId!, taskData)
    } else {
      taskStore.addTask(taskData)
    }

    navigate("/taskmanagement/list")
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'PT Sans', sans-serif", color: "#5E5E5E" }}>
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbItems} onClick={(item) => item.href && navigate(item.href)} />
        </div>

        {/* Task Details Card */}
        <Card className="max-w-6xl mx-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6" style={{ color: "#5E5E5E" }}>
              Task Details
            </h2>

            {/* Task Type Buttons */}
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setActiveTab("self-task")}
                className={`px-4 py-2 rounded ${
                  activeTab === "self-task" ? "text-white" : "bg-gray-200 text-gray-600"
                }`}
                style={activeTab === "self-task" ? { backgroundColor: "#8094bc" } : {}}
              >
                Self Task
              </button>
              <button
                onClick={() => setActiveTab("assign-others")}
                className={`px-4 py-2 rounded ${
                  activeTab === "assign-others" ? "text-white" : "bg-gray-200 text-gray-600"
                }`}
                style={activeTab === "assign-others" ? { backgroundColor: "#8094bc" } : {}}
              >
                Assign to others
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Task Title */}
              <div className="md:col-span-1">
                <TextInput
                  label="Task Title:"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Select Dependent Task */}
              <div className="md:col-span-1">
                <Select
                  label="Select Dependent Task:"
                  name="dependentTask"
                  value={formData.dependentTask}
                  onChange={handleInputChange}
                  options={dependentTaskOptions}
                  placeholder="Select dependent task"
                />
              </div>

              {/* Priority Level */}
              <div className="md:col-span-1">
                <Select
                  label="Priority Level:"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  options={priorityOptions}
                  placeholder="Select priority"
                  required
                />
              </div>

              {/* Start Date */}
              <div className="md:col-span-1">
                <DatePicker
                  label="Start Date:"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>

              {/* Due Date */}
              <div className="md:col-span-1">
                <DatePicker
                  label="Due Date:"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Status */}
              <div className="md:col-span-1">
                <Select
                  label="Status:"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  options={statusOptions}
                  placeholder="Select status"
                  required
                />
              </div>

              {/* Conditional layout based on active tab */}
              {activeTab === "assign-others" ? (
                <>
                  {/* Task Description - moved to left */}
                  <div className="md:col-span-2">
                    <TextArea
                      label="Task Description:"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Enter task description..."
                    />
                  </div>

                  {/* Assign To - moved to right */}
                  <div className="md:col-span-1">
                    <Select
                      label="Assign to:"
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleInputChange}
                      options={assigneeOptions}
                      placeholder="Select assignee"
                      required
                    />
                  </div>
                </>
              ) : (
                /* Task Description for self-task (original position) */
                <div className="md:col-span-2">
                  <TextArea
                    label="Task Description:"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter task description..."
                  />
                </div>
              )}

              {/* Attachments */}
              <div className="md:col-span-1">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#5E5E5E" }}>
                    Attachments:
                  </label>
                  <FileUpload onChange={handleFileUpload} accept=".pdf,.doc,.docx,.jpg,.png" multiple />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                className="text-white px-8 py-3 rounded-md font-medium hover:opacity-90"
                style={{ backgroundColor: "#8094bc" }}
              >
                Submit
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AddTask

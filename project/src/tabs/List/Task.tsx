import React, { useState } from "react";
import { Eye, Trash2, X, MoreVertical } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import DatePickerReact from "../../components/ReactDatePicker";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'view'
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskType, setTaskType] = useState("self");

  const [taskForm, setTaskForm] = useState({
    taskTopic: "",
    deadline: null,
    assignee: "",
    dependentTask: "",
    description: "",
    avatarUrl: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [tasks, setTasks] = useState([
    {
      id: 1,
      action: "view",
      tasks: "Design Wireframes",
      startDate: "15 July, 2024",
      endDate: "25 July, 2024",
      delayDate: "28 July, 2024",
      status: "In Review",
      progress: 85,
      assignee: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 2,
      action: "view",
      tasks: "Prototype Design",
      startDate: "10 August, 2024",
      endDate: "20 August, 2024",
      delayDate: "22 August, 2024",
      status: "In Progress",
      progress: 65,
      assignee: {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b9ad8804?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 3,
      action: "view",
      tasks: "Content Writing",
      startDate: "22 August, 2024",
      endDate: "27 August, 2024",
      delayDate: "30 August, 2024",
      status: "Cancel",
      progress: 20,
      assignee: {
        name: "Bob Johnson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    },
  ]);

  // Chart data
  const barChartData = [
    { day: "Mon", value: 20, line: 25 },
    { day: "Tue", value: 35, line: 30 },
    { day: "Wed", value: 45, line: 40 },
    { day: "Thu", value: 30, line: 35 },
    { day: "Fri", value: 55, line: 50 },
    { day: "Sat", value: 40, line: 45 },
    { day: "Sun", value: 25, line: 30 },
  ];

  const pieChartData = [
    { name: "Completed", value: 70, color: "#645AFF" },
    { name: "Incomplete", value: 30, color: "#06B6D4" },
  ];

  const multiPieData = [
    { name: "Design", value: 85, color: "#3B82F6" },
    { name: "Frontend", value: 92, color: "#10B981" },
    { name: "Prototype", value: 78, color: "#F59E0B" },
    { name: "Content", value: 65, color: "#EF4444" },
    { name: "Database", value: 88, color: "#8B5CF6" },
    { name: "Backend", value: 95, color: "#06B6D4" },
  ];

  const handleTaskFormChange = (field, value) => {
    setTaskForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTaskForm((prev) => ({
          ...prev,
          avatarUrl: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!taskForm.taskTopic.trim()) {
      errors.taskTopic = "Task topic is required";
    }

    if (!taskForm.deadline) {
      errors.deadline = "Deadline is required";
    }

    if (taskType === "assign" && !taskForm.assignee) {
      errors.assignee = "Assignee is required for assigned tasks";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveTask = () => {
    if (validateForm()) {
      const newTask = {
        id: tasks.length + 1,
        action: "view",
        tasks: taskForm.taskTopic,
        startDate: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        endDate: taskForm.deadline
          ? new Date(taskForm.deadline).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "",
        delayDate: taskForm.deadline
          ? new Date(
              new Date(taskForm.deadline).getTime() + 2 * 24 * 60 * 60 * 1000
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "",
        status: "In Progress",
        progress: 0,
        assignee: {
          name: taskForm.assignee || "Self",
          avatar:
            taskForm.avatarUrl ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        },
      };

      setTasks((prev) => [...prev, newTask]);
      setShowModal(false);
      setTaskForm({
        taskTopic: "",
        deadline: null,
        assignee: "",
        dependentTask: "",
        description: "",
        avatarUrl: "",
      });
      setFormErrors({});
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setTaskForm({
      taskTopic: task.tasks,
      deadline: new Date(task.endDate),
      assignee: task.assignee.name,
      dependentTask: "",
      description: "Task description...",
      avatarUrl: task.assignee.avatar,
    });
    setModalMode("view");
    setShowModal(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Review":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancel":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setTaskForm({
      taskTopic: "",
      deadline: null,
      assignee: "",
      dependentTask: "",
      description: "",
      avatarUrl: "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  return (
    <div className="">
      {/* Task Summary Cards */}
      <div>
        {/* Task Cards - 4 in first row, 3 in second row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Task Summary */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-5">Task Summary</h3>
            <p className="text-4xl text-gray-600 mb-1 text-center">27</p>
            <p className="text-gray-500 text-center">Total Task Count</p>
          </div>

          {/* In Progress */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-5">In Progress</h3>
            <p className="text-4xl text-blue-600 mb-1 text-center">6</p>
            <p className="text-gray-500 text-center">In Progress</p>
          </div>

          {/* Completed Task */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-8">Completed</h3>
            <p className="text-4xl text-green-600 mb-1 text-center">7</p>
            <p className="text-gray-500 text-center">3 Today Completed</p>
          </div>

          {/* Overdue Task */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-8">Overdue</h3>
            <p className="text-4xl text-red-600 mb-1 text-center">7</p>
            <p className="text-gray-500 text-center">Total Over Due</p>
          </div>
        </div>

        {/* Second row with 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* In Review Task */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-8">In Review Task</h3>
            <p className="text-4xl text-yellow-600 mb-1 text-center">2</p>
            <p className="text-gray-500 text-center">Total In Review</p>
          </div>

          {/* Re-Open Task */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-8">Re-Open Task</h3>
            <p className="text-4xl text-purple-600 mb-1 text-center">2</p>
            <p className="text-gray-500 text-center">Total Re-Open</p>
          </div>

          {/* Cancel Task */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-8">Cancel Task</h3>
            <p className="text-4xl text-gray-600 mb-1 text-center">3</p>
            <p className="text-gray-500 text-center">Total Cancel</p>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming task by assignee</h2>
          <button
            onClick={openCreateModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 rounded-l-md text-[#5e5e5e]">Action</th>
                <th className="text-left p-3 text-[#5e5e5e]">Tasks</th>
                <th className="text-left p-3 text-[#5e5e5e]">Start Date</th>
                <th className="text-left p-3 text-[#5e5e5e]">End Date</th>
                <th className="text-left p-3 text-[#5e5e5e]">Delay Date</th>
                <th className="text-left p-3 text-[#5e5e5e]">Status</th>
                <th className="text-left p-3 text-[#5e5e5e]">Progress</th>
                <th className="text-left p-3 text-[#5e5e5e] rounded-r-md">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-200">
                  <td className="p-3 text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Eye
                        className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => handleViewTask(task)}
                      />
                      <Trash2
                        className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDeleteTask(task.id)}
                      />
                    </div>
                  </td>
                  <td className="p-3 text-gray-500">{task.tasks}</td>
                  <td className="p-3 text-gray-500">{task.startDate}</td>
                  <td className="p-3 text-gray-500">{task.endDate}</td>
                  <td className="p-3 text-gray-500">{task.delayDate}</td>
                  <td className="p-3 text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-500">
                    <div className="flex items-center">
                      <img
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        className="w-8 h-8 rounded-full object-cover mr-2 border"
                      />
                      <span>{task.assignee.name}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Task Summary Chart - 60% width */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Task Summary</h3>
            <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
          </div>
          <div className="h-80 relative">
            {/* Line chart above bars */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                {/* Bar with no hover effect */}
                <Bar
                  dataKey="value"
                  fill="#8B5CF6"
                  isAnimationActive={false}
                  activeBar={{ fill: "#8B5CF6" }} // Prevents hover color change
                  // Remove cursor pointer on bar hover
                  style={{ cursor: "default" }}
                />
                <Line
                  type="monotone"
                  dataKey="line"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{
                    fill: "#8B5CF6",
                    strokeWidth: 2,
                    r: 4,
                    shape: "square",
                  }}
                  activeDot={{ r: 6 }}
                />
                <Tooltip
                  // Only show value for the line, not for bars
                  formatter={(value, name, props) => {
                    if (props.dataKey === "line") {
                      return [value, "Value"];
                    }
                    return null;
                  }}
                  // Only trigger tooltip on line
                  filterNull={true}
                  cursor={false}
                  contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Status 1 - 20% width */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-md font-semibold">Task Completion Status</h3>
            <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-8">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#645AFF] rounded-full mr-2"></div>
              <span className="text-sm">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
              <span className="text-sm">Incomplete</span>
            </div>
          </div>
        </div>

        {/* Task Completion Status 2 - 20% width */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-md font-semibold">Task Completion Status</h3>
            <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
          </div>
          <div className="relative h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {multiPieData.map((item, index) => (
                  <Pie
                    key={index}
                    data={[
                      { value: item.value, color: item.color },
                      { value: 100 - item.value, color: "#E5E7EB" },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={35 + index * 8}
                    outerRadius={43 + index * 8}
                    dataKey="value"
                    // Complete the full circle
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill={item.color} />
                    <Cell fill="#E5E7EB" />
                  </Pie>
                ))}
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-xl font-bold">
                  {multiPieData.reduce((sum, item) => sum + item.value, 0)}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {multiPieData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-2`}
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {modalMode === "create" ? "Create Task" : "View Task"}
              </h3>
              <X
                className="w-5 h-5 cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </div>

            {modalMode === "create" && (
              <div className="flex mb-4">
                <button
                  className={`px-4 py-2 mr-2 rounded ${
                    taskType === "self"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setTaskType("self")}
                >
                  Self Task
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    taskType === "assign"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setTaskType("assign")}
                >
                  Assign to Others
                </button>
              </div>
            )}

            <hr className="mb-4" />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <TextInput
                  label="Task Topic"
                  name="taskTopic"
                  value={taskForm.taskTopic}
                  onChange={(e) =>
                    handleTaskFormChange("taskTopic", e.target.value)
                  }
                  required
                  disabled={modalMode === "view"}
                />
                {formErrors.taskTopic && (
                  <div className="text-red-500 text-xs mt-1">
                    {formErrors.taskTopic}
                  </div>
                )}
              </div>

              <div>
                <DatePickerReact
                  label="Deadline"
                  name="deadline"
                  value={taskForm.deadline}
                  onChange={(e) =>
                    handleTaskFormChange("deadline", e.target.value)
                  }
                  required
                  disabled={modalMode === "view"}
                />
                {formErrors.deadline && (
                  <div className="text-red-500 text-xs mt-1">
                    {formErrors.deadline}
                  </div>
                )}
              </div>

              <div>
                <Select
                  label="Assignee"
                  name="assignee"
                  value={taskForm.assignee}
                  onChange={(e) =>
                    handleTaskFormChange("assignee", e.target.value)
                  }
                  options={[
                    "John Doe",
                    "Jane Smith",
                    "Bob Johnson",
                    "Alice Brown",
                  ]}
                  placeholder="Select assignee"
                  disabled={modalMode === "view"}
                />
                {formErrors.assignee && (
                  <div className="text-red-500 text-xs mt-1">
                    {formErrors.assignee}
                  </div>
                )}
              </div>

              <div>
                <Select
                  label="Select Dependent Task"
                  name="dependentTask"
                  value={taskForm.dependentTask}
                  onChange={(e) =>
                    handleTaskFormChange("dependentTask", e.target.value)
                  }
                  options={["UI Design", "Backend Setup", "Database Design"]}
                  placeholder="Select dependent task"
                  disabled={modalMode === "view"}
                />
                {formErrors.dependentTask && (
                  <div className="text-red-500 text-xs mt-1">
                    {formErrors.dependentTask}
                  </div>
                )}
              </div>
            </div>

            {modalMode === "create" && (
              <div className="mb-4">
                <label className="block text-sm mb-1">Choose File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray border border-gray-300 rounded-lg cursor-pointer focus:outline-none file:bg-blue-500 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none file:cursor-pointer"
                />
                {formErrors.file && (
                  <div className="text-red-500 text-xs mt-1">
                    {formErrors.file}
                  </div>
                )}
                {taskForm.avatarUrl && (
                  <img
                    src={taskForm.avatarUrl}
                    alt="Preview"
                    className="w-16 h-16 rounded-full mt-2 object-cover border"
                  />
                )}
              </div>
            )}

            <div>
              <TextArea
                label="Description"
                name="description"
                value={taskForm.description}
                onChange={(e) =>
                  handleTaskFormChange("description", e.target.value)
                }
                rows={3}
                placeholder="Enter task description..."
                disabled={modalMode === "view"}
              />
              {formErrors.description && (
                <div className="text-red-500 text-xs mt-1">
                  {formErrors.description}
                </div>
              )}
            </div>

            {modalMode === "create" && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSaveTask}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;

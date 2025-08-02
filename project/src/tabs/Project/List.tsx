import React, { useState } from "react";
import {
  FiPlus,
  FiX,
  FiEdit,
  FiTrash2,
  FiEye,
  FiCalendar,
  FiBell,
  FiPaperclip,
} from "react-icons/fi";
import TableHead from "../../components/TopHead";
import Overview from "../List/Overview";


// Priority Flag Component
const PriorityFlag = ({ priority }: { priority: string }) => {
  const flagColors = {
    urgent: "🚩🔴",
    high: "🚩🟡",
    normal: "🚩🔵",
    low: "🚩⚪",
  };

  return (
    <div className="flex items-center gap-1 text-gray-700">
      <span>{flagColors[priority as keyof typeof flagColors]}</span>
      {/* <span className="capitalize">{priority}</span> */}
    </div>
  );
};

// Avatar Component
const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  const colorIndex = name.length % colors.length;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white text-sm font-semibold`}
      >
        {initials}
      </div>
      <span>{name}</span>
    </div>
  );
};

// Assignee Input Component
const AssigneeInput = ({
  onAssigneeSelect,
}: {
  onAssigneeSelect: (assignee: string) => void;
}) => {
  const [assigneeName, setAssigneeName] = useState("");

  return (
    <div className="bg-white border rounded-lg p-4 shadow-lg w-64">
      <input
        type="text"
        placeholder="Type assignee name..."
        value={assigneeName}
        onChange={(e) => setAssigneeName(e.target.value)}
        className="w-full p-2 border rounded-md"
        autoFocus
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            if (assigneeName.trim()) {
              onAssigneeSelect(assigneeName.trim());
            }
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          Assign
        </button>
        <button
          onClick={() => onAssigneeSelect("")}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Calendar Component
const Calendar = ({
  onDateSelect,
}: {
  onDateSelect: (date: string) => void;
}) => {
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(today);

  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = date.toDateString() === today.toDateString();
    const isFourteenth = day === 14 && currentMonth === 2; // Assuming March is month 2 (0-indexed)

    days.push(
      <button
        key={day}
        onClick={() =>
          onDateSelect(
            `${currentYear}-${String(currentMonth + 1).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")}`
          )
        }
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                    ${isToday ? "bg-blue-500 text-white" : ""}
                    ${
                      isFourteenth && !isToday ? "bg-yellow-500 text-white" : ""
                    }
                    hover:bg-gray-200`}
      >
        {day}
      </button>
    );
  }

  const goToPreviousMonth = () => {
    setDisplayDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setDisplayDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-lg w-72">
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={goToPreviousMonth}
        >
          &lt;
        </button>
        <span className="font-semibold">
          {displayDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={goToNextMonth}
        >
          &gt;
        </button>
      </div>
      <div className="flex justify-between mb-2">
        <button className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200">
          Today
        </button>
        <button className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200">
          Last 8 days
        </button>
        <button className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200">
          Last month
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};

// Priority Selector Component
const PrioritySelector = ({
  onPrioritySelect,
}: {
  onPrioritySelect: (priority: string) => void;
}) => {
  const priorities = [
    { name: "urgent", flag: "🔴", label: "Urgent" },
    { name: "high", flag: "🟡", label: "High" },
    { name: "normal", flag: "🔵", label: "Normal" },
    { name: "low", flag: "⚪", label: "Low" },
  ];

  return (
    <div className="bg-white border rounded-lg p-4 shadow-lg">
      {priorities.map((priority) => (
        <button
          key={priority.name}
          onClick={() => onPrioritySelect(priority.name)}
          className="flex items-center gap-2 w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
        >
          <span>{priority.flag}</span>
          <span>{priority.label}</span>
        </button>
      ))}
    </div>
  );
};

// Notification Settings Component
const NotificationSettings = ({
  onSelect,
}: {
  onSelect: (option: string) => void;
}) => {
  const options = ["On due date", "10 minutes before", "1 hour before"];

  return (
    <div className="bg-white border rounded-lg p-4 shadow-lg">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
        >
          {option}
        </button>
      ))}
      <hr className="my-2" />
      <button
        onClick={() => onSelect("Don't Notify")}
        className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-gray-500"
      >
        Don't Notify
      </button>
    </div>
  );
};


// Main List Component
const List = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Task");
  const [showProjectOverview, setShowProjectOverview] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAssigneeInput, setShowAssigneeInput] = useState(false);
  const [showPrioritySelector, setShowPrioritySelector] = useState(false);
  const [activeTaskButton, setActiveTaskButton] = useState("TODO");
  const [editingTask, setEditingTask] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form states
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("normal");
  const [docName, setDocName] = useState("");
  const [docDescription, setDocDescription] = useState("");
  const [reminderName, setReminderName] = useState("");
  const [whiteboardName, setWhiteboardName] = useState("");
  const [dashboardName, setDashboardName] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Sample Task 1",
      assignee: "John Doe",
      startDate: "2024-06-20",
      endDate: "2024-06-25",
      priority: "urgent",
    },
    {
      id: 2,
      name: "Sample Task 2",
      assignee: "Jane Smith",
      startDate: "2024-06-21",
      endDate: "2024-06-28",
      priority: "high",
    },
  ]);

  // Modal templates data
  const templates = [
    {
      name: "List",
      description: "Track task, bugs, people & more",
      icon: "📋",
    },
    {
      name: "Gantt",
      description: "Plan dependencies & time",
      icon: "📊",
    },
    {
      name: "Calendar",
      description: "Plan, Schedule & Delegate",
      icon: "📅",
    },
    {
      name: "Doc",
      description: "Collaborate & Document anything",
      icon: "📄",
    },
    {
      name: "Board-Kanban",
      description: "Move task between columns",
      icon: "📋",
    },
    {
      name: "Form",
      description: "Collect, track & Report data",
      icon: "📝",
    },
  ];

  const tabs = ["Task", "Doc", "Reminder", "Whiteboard", "Dashboard"];
  const taskButtons = ["TODO", "Assignee", "Due Date", "Priority", "Tags"];

  const columns = [
    { label: "Action", align: "center" as const },
    { label: "Name" },
    { label: "Assignee" },
    { label: "Start Date" },
    { label: "End Date" },
    { label: "Priority" },
  ];

  const handleCreateTask = () => {
    if (taskName.trim()) {
      if (isEditMode && editingTask) {
        // Update existing task
        setTasks(tasks.map(task => 
          task.id === editingTask.id 
            ? {
                ...task,
                name: taskName,
                assignee: taskAssignee || "Unassigned",
                endDate: taskDueDate || task.endDate,
                priority: taskPriority
              }
            : task
        ));
      } else {
        // Create new task
        const newTask = {
          id: tasks.length + 1,
          name: taskName,
          assignee: taskAssignee || "Unassigned",
          startDate: new Date().toISOString().split('T')[0],
          endDate: taskDueDate || new Date().toISOString().split('T')[0],
          priority: taskPriority
        };
        setTasks([...tasks, newTask]);
      }
      
      // Reset form
      setTaskName('');
      setTaskDescription('');
      setTaskAssignee('');
      setTaskDueDate('');
      setTaskPriority('normal');
      setIsAddTaskModalOpen(false);
      setActiveTab('Task');
      setIsEditMode(false);
      setEditingTask(null);
    }
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsEditMode(true);
    setTaskName(task.name);
    setTaskAssignee(task.assignee === "Unassigned" ? "" : task.assignee);
    setTaskDueDate(task.endDate);
    setTaskPriority(task.priority);
    setIsAddTaskModalOpen(true);
    setActiveTab('Task');
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTaskButtonClick = (button: string) => {
    setActiveTaskButton(button);

    // Close all dropdowns first
    setShowAssigneeInput(false);
    setShowCalendar(false);
    setShowPrioritySelector(false);

    // Open specific dropdown based on button
    if (button === "Assignee") {
      setShowAssigneeInput(true);
    } else if (button === "Due Date") {
      setShowCalendar(true);
    } else if (button === "Priority") {
      setShowPrioritySelector(true);
    }
  };

  const closeAllDropdowns = () => {
    setShowAssigneeInput(false);
    setShowCalendar(false);
    setShowPrioritySelector(false);
    setShowNotifications(false);
  };

  return (
    <>
      {/* If showProjectOverview is true, show only Overview */}
      {showProjectOverview ? (
        <Overview />
      ) : (
        <>
          {/* Header Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              <FiPlus size={20} />
              View
            </button>

            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>

          {/* Tasks Table */}
          <div className="bg-white rounded-bl-lg rounded-br-lg shadow overflow-hidden">
            <table className="w-full">
              <TableHead columns={columns} />
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-400 hover:bg-gray-50">
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditTask(task)}>
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        <button
                          onClick={() => setShowProjectOverview(true)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FiEye size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="p-3">{task.name}</td>
                    <td className="p-3">
                      <Avatar name={task.assignee} />
                    </td>
                    <td className="p-3">{task.startDate}</td>
                    <td className="p-3">{task.endDate}</td>
                    <td className="p-3">
                      <PriorityFlag priority={task.priority} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Templates Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Popular</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{template.icon}</div>
                        <div>
                          <h3 className="font-semibold text-sm mb-1">
                            {template.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Add Task Modal */}
          {isAddTaskModalOpen && (
            <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full h-[600px] flex flex-col">
                {/* Tabs */}
                <div className="flex bg-gray-100 rounded-t-lg flex-shrink-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        closeAllDropdowns();
                      }}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        activeTab === tab
                          ? "bg-white text-blue-600 border-b-2 border-blue-600"
                          : "text-black hover:text-blue-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {/* Close Button */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {isEditMode ? 'Edit Task' : 'Add New Task'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddTaskModalOpen(false);
                        closeAllDropdowns();
                        setIsEditMode(false);
                        setEditingTask(null);
                        setTaskName('');
                        setTaskDescription('');
                        setTaskAssignee('');
                        setTaskDueDate('');
                        setTaskPriority('normal');
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  {/* Task Tab */}
                  {activeTab === "Task" && (
                    <div>
                      {/* Dropdowns */}
                      <div className="flex gap-4 mb-4">
                        <select className="flex-1 p-2 border border-gray-300 rounded-md">
                          <option>Select Project</option>
                          <option>Project A</option>
                          <option>Project B</option>
                        </select>
                        <select className="flex-1 p-2 border border-gray-300 rounded-md">
                          <option>Kind of Task</option>
                          <option>Bug</option>
                          <option>Feature</option>
                          <option>Enhancement</option>
                        </select>
                      </div>

                      {/* Notepad Structure */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <input
                          type="text"
                          placeholder="Task Name"
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-lg font-medium mb-2"
                        />
                        
                        <textarea
                          placeholder="Add Description"
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                          className="w-full bg-transparent border-none outline-none resize-none h-32"
                        />
                      </div>

                      {/* Task Buttons */}
                      <div className="flex gap-2 mb-4 relative">
                        {taskButtons.map((button) => (
                          <div key={button} className="relative">
                            <button
                              onClick={() => handleTaskButtonClick(button)}
                              className={`px-3 py-1 rounded-md text-sm flex items-center gap-1 ${
                                activeTaskButton === button
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {button === "Assignee" && taskAssignee ? (
                                <>
                                  <span className="truncate max-w-[80px]">
                                    {taskAssignee}
                                  </span>
                                </>
                              ) : button === "Due Date" && taskDueDate ? (
                                new Date(taskDueDate).toLocaleDateString()
                              ) : button === "Priority" &&
                                taskPriority !== "normal" ? (
                                <PriorityFlag priority={taskPriority} />
                              ) : (
                                button
                              )}
                            </button>

                            {/* Assignee Input Dropdown */}
                            {button === "Assignee" && showAssigneeInput && (
                              <div className="absolute top-10 left-0 z-10">
                                <AssigneeInput
                                  onAssigneeSelect={(assignee) => {
                                    setTaskAssignee(assignee);
                                    setShowAssigneeInput(false);
                                  }}
                                />
                              </div>
                            )}

                            {/* Calendar Dropdown */}
                            {button === "Due Date" && showCalendar && (
                              <div className="absolute top-10 left-0 z-10">
                                <Calendar
                                  onDateSelect={(date) => {
                                    setTaskDueDate(date);
                                    setShowCalendar(false);
                                  }}
                                />
                              </div>
                            )}

                            {/* Priority Selector Dropdown */}
                            {button === "Priority" && showPrioritySelector && (
                              <div className="absolute top-10 left-0 z-10">
                                <PrioritySelector
                                  onPrioritySelect={(priority) => {
                                    setTaskPriority(priority);
                                    setShowPrioritySelector(false);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                        <button className="px-2 py-1 text-gray-500 hover:text-gray-700">
                          <FiPaperclip size={16} />
                        </button>
                      </div>

                      {/* Create Task Button */}
                      <div className="flex justify-center mt-25">
                        <button
                          onClick={handleCreateTask}
                          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        >
                          {isEditMode ? 'Update Task' : 'Create Task'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Doc Tab */}
                  {activeTab === "Doc" && (
                    <div>
                      <select className="w-fit p-2 border border-gray-300 rounded-md mb-4">
                        <option>Select Document</option>
                        <option>Document 1</option>
                        <option>Document 2</option>
                      </select>

                      <div className="bg-gray-50  rounded-lg p-4 mb-4">
                        <input
                          type="text"
                          placeholder="Name this Doc..."
                          value={docName}
                          onChange={(e) => setDocName(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-lg font-medium mb-2"
                        />
                        
                        <textarea
                          placeholder="Add Description"
                          value={docDescription}
                          onChange={(e) => setDocDescription(e.target.value)}
                          className="w-full bg-transparent border-none outline-none resize-none h-32"
                        />
                      </div>

                      <div className="flex gap-2 mb-4">
                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300">
                          Table
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300">
                          Column
                        </button>
                      </div>

                      <div className="flex justify-center mt-25">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                          Create Doc
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Reminder Tab */}
                  {activeTab === "Reminder" && (
                    <div>
                      <input
                        type="text"
                        placeholder="Reminder name or Type / for commands"
                        value={reminderName}
                        onChange={(e) => setReminderName(e.target.value)}
                        className="w-full p-3 rounded-md mb-4"
                      />

                      <div className="flex gap-2 mb-4 relative">
                        <button
                          onClick={() => setShowCalendar(!showCalendar)}
                          className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300"
                        >
                          <FiCalendar size={16} />
                          Today
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300">
                          For Me
                        </button>
                        <button
                          onClick={() => setShowNotifications(!showNotifications)}
                          className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300"
                        >
                          <FiBell size={16} />
                          Notify me
                        </button>

                        {showCalendar && (
                          <div className="absolute top-12 left-0 z-10">
                            <Calendar
                              onDateSelect={(date) => {
                                console.log("Selected date:", date);
                                setShowCalendar(false);
                              }}
                            />
                          </div>
                        )}

                        {showNotifications && (
                          <div className="absolute top-12 right-25 z-10">
                            <NotificationSettings
                              onSelect={(option) => {
                                console.log("Selected notification:", option);
                                setShowNotifications(false);
                              }}
                            />
                          </div>
                        )}

                        
                      </div>
                      <div className="flex justify-center mt-70">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                          Create Reminder
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Whiteboard Tab */}
                  {activeTab === "Whiteboard" && (
                    <div>
                      <select className="w-full p-2 border border-gray-300 rounded-md mb-4">
                        <option>Select Whiteboard</option>
                        <option>Whiteboard 1</option>
                        <option>Whiteboard 2</option>
                      </select>

                      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
                        <input
                          type="text"
                          placeholder="Name this Whiteboard..."
                          value={whiteboardName}
                          onChange={(e) => setWhiteboardName(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-lg font-medium"
                        />
                      </div>

                      <div className="flex justify-center mt-70">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                          Create Whiteboard
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Dashboard Tab */}
                  {activeTab === "Dashboard" && (
                    <div>
                      <select className="w-full p-2 border border-gray-300 rounded-md mb-4">
                        <option>Select Dashboard</option>
                        <option>Dashboard 1</option>
                        <option>Dashboard 2</option>
                      </select>

                      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
                        <input
                          type="text"
                          placeholder="Name this Dashboard..."
                          value={dashboardName}
                          onChange={(e) => setDashboardName(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-lg font-medium"
                        />
                      </div>

                      <div className="flex justify-center mt-70">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                          Create Dashboard
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          
        </>
      )}
    </>
  );
};

export default List;

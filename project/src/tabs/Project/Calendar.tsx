import React, { useState } from "react";
import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Lock,
  User,
  Tag,
  Bell,
  Paperclip,
  Mail,
  Search,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  project: string;
  date: string;
  isPersonal: boolean;
  notes?: string;
  tags?: string[];
}


const Calendar: React.FC = () => {
  const [showConnectModal, setShowConnectModal] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isTaskDetailModalOpen, setIsTaskDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
  const [currentYear, setCurrentYear] = useState(2024);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskNotes, setNewTaskNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Connect Your Calendar",
      project: "Setup",
      date: "2024-12-04",
      isPersonal: false,
    },
    {
      id: "2",
      title: "Test21",
      project: "Development",
      date: "2024-12-04",
      isPersonal: false,
    },
    {
      id: "3",
      title: "Team Meeting",
      project: "Work",
      date: "2024-12-10",
      isPersonal: false,
    },
    {
      id: "4",
      title: "Doctor Appointment",
      project: "Personal",
      date: "2024-12-15",
      isPersonal: true,
    },
    {
      id: "5",
      title: "Project Review",
      project: "Work",
      date: "2024-12-20",
      isPersonal: false,
    },
  ]);
  const [isToggleOn, setIsToggleOn] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getTasksForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return tasks.filter((task) => task.date === dateStr);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailModalOpen(true);
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setIsAddTaskModalOpen(true);
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        project: "Personal",
        date: selectedDate || new Date().toISOString().split('T')[0],
        isPersonal: true,
        notes: newTaskNotes
      };
      
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskNotes("");
      setSelectedDate("");
      setIsAddTaskModalOpen(false);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const tasksForDay = getTasksForDate(day);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className="h-20 border border-gray-200 p-1 relative bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="text-sm font-medium text-gray-700">{day}</div>
          <div className="space-y-1 mt-1">
            {tasksForDay.slice(0, 2).map((task) => (
              <div
                key={task.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskClick(task);
                }}
                className="flex items-center gap-1 bg-gray-100 rounded px-1 py-0.5 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs text-gray-700 truncate">
                  {task.title}
                </span>
              </div>
            ))}
            {tasksForDay.length > 2 && (
              <div className="text-xs text-gray-500">
                +{tasksForDay.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  if (showConnectModal) {
    return (
      <div className="min-h-screen bg-gray-100 relative">
        {/* Blurred background calendar */}
        <div className="absolute inset-0 blur-sm">
          <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-6">
                <Plus size={20} />
                View
              </button>
              <div className="flex gap-6">
                <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-semibold">
                        {months[currentMonth]} {currentYear}
                      </h2>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronLeft size={20} />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                    {weekDays.map((day) => (
                      <div
                        key={day}
                        className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
                      >
                        {day}
                      </div>
                    ))}
                    {/* Calendar days would be rendered here */}
                  </div>
                </div>
                <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail size={18} className="text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      No Due Date
                    </span>
                  </div>

                  <div className="relative mb-8">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-center h-32">
                    <span className="text-black text-lg">
                      You're all set!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Calendar Modal */}
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-xl w-96 max-w-full relative">
            <button
              onClick={() => setShowConnectModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold text-left mb-6 mt-10">
              Connect your Calendar
            </h2>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-1">
                <span className="text-gray-700">
                  1. Connect your Google or Outlook Calendar
                </span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-gray-700">
                  2. Schedule your personal and workspace tasks
                </span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-gray-700">
                  3. Easily create, edit and delete events
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-sm font-bold">
                  G
                </div>
                <span className="font-medium">Connect Google Calendar</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
                  O
                </div>
                <span className="font-medium">Connect Outlook Calendar</span>
              </button>

              <button
                onClick={() => setShowConnectModal(false)}
                className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-white text-sm font-bold">
                  i
                </div>
                <span className="font-medium">Connect iCloud Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto">
        {/* View Button */}
        <button
          onClick={() => setIsViewModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-6"
        >
          <Plus size={20} />
          View
        </button>

        <div className="flex gap-6 h-full">
          {/* Main Calendar (80% width) */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6 relative">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">
                  {months[currentMonth]} {currentYear}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => navigateMonth("next")}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                  Connect
                </button>
                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
                >
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>

            {/* Static Plus Button - Always visible in bottom right */}
            <button
              onClick={() => {
                setSelectedDate("");
                setIsAddTaskModalOpen(true);
              }}
              className="absolute bottom-8 right-8 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Right Sidebar (20% width) - Full height */}
          <div className="w-80 bg-white rounded-lg shadow-sm p-6 flex flex-col min-h-[calc(100vh-12rem)]">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={18} className="text-gray-600" />
              
              <span className="text-gray-700 font-medium">No Due Date</span>
            </div>

            <div className="relative mb-8">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1 flex items-center justify-center">
              <span className="text-gray-500 text-lg">You're all set!</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal (Popular Templates) */}
      {isViewModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Popular</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
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
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <Lock size={16} className="text-gray-600" />
                <span className="text-sm text-gray-700">Project</span>
              </div>
              <button
                onClick={() => {
                  setIsAddTaskModalOpen(false);
                  setSelectedDate("");
                  setNewTaskTitle("");
                  setNewTaskNotes("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Add Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full text-lg font-medium border-none outline-none"
              />

              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm">
                  <Bell className="text-red-500" size={14} />
                  {selectedDate ? formatDateForDisplay(selectedDate) : "Next Week, Jul 12, 2025"}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsToggleOn(!isToggleOn);
                    }}
                    className={`w-8 h-4 rounded-full cursor-pointer transition-colors duration-200 ml-2 ${
                      isToggleOn ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 mt-0.5 ${
                        isToggleOn ? "translate-x-4 ml-0.5" : "translate-x-0.5"
                      }`}
                    ></div>
                  </div>
                </button>
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm">
                  <User size={14} className="text-yellow-500" />
                  Personal
                </button>
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm">
                  <Tag size={14} className="text-blue-500" />
                  Tags
                </button>
              </div>

              <textarea
                placeholder="Add Notes..."
                value={newTaskNotes}
                onChange={(e) => setNewTaskNotes(e.target.value)}
                className="w-full h-24 border-none outline-none resize-none"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {isTaskDetailModalOpen && selectedTask && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{selectedTask.project}</h2>
              <button
                onClick={() => setIsTaskDetailModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">{selectedTask.title}</h3>

              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm">
                  <Bell size={14} className="text-red-500" />
                  Remind Me
                </button>
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm">
                  <User size={14} className="text-yellow-500" />
                  Personal
                </button>
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm">
                  <Tag size={14} className="text-blue-500" />
                  Tags
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  defaultValue={selectedTask.notes || ""}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add notes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments
                </label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                  <Paperclip size={16} className="text-gray-400" />
                  <span className="text-gray-500 text-sm">No attachments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
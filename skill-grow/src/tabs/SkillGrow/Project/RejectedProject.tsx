import React, { useState, useEffect } from "react";
import {
  Eye,
 
  ChevronLeft,
 
  Calendar,
  
  Clock,
  
  Check,
  X,
  Flag,
  FileText,
  DollarSign,
  ShoppingCart,

  Database,
  TrendingUp,
} from "lucide-react";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";

interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  image: string;
  date: string;
  status: "Approved" | "Rejected" | "Pending" | "Live" | "Completed";
  language: string;
  level: string;
  lectures: number;
  duration: string;
  price: number;
  highlights: string[];
  outcomes: string[];
  audience: string[];
  requirements: string[];
  curriculum: Topic[];
  faqs: FAQ[];
  rating: number;
  students: number;
  tagline: string;
  description: string;
  format: string;
  skills: string;
  deadline: string;
  certificate: boolean;
}

interface Topic {
  id: number;
  title: string;
  points: Point[];
}

interface Point {
  id: number;
  name: string;
  videoLink: string;
  duration: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const RejectedProject: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);

  useEffect(() => {
    setCourses([
      {
        id: 1,
        title: "Advanced React Development",
        instructor: "John Smith",
        instructorAvatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
        image:
          "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300",
        date: "20 July, 2025",
        status: "Pending",
        language: "English",
        level: "Advanced",
        lectures: 45,
        duration: "8 weeks",
        price: 2999,
        highlights: [
          "Modern React Patterns",
          "State Management",
          "Performance Optimization",
        ],
        outcomes: [
          "Master React Hooks",
          "Build Complex Applications",
          "Optimize Performance",
        ],
        audience: ["Intermediate React Developers", "Frontend Engineers"],
        requirements: ["Basic React Knowledge", "JavaScript ES6+"],
        curriculum: [
          {
            id: 1,
            title: "Introduction to Advanced React",
            points: [
              {
                id: 1,
                name: "Course Overview",
                videoLink: "https://youtube.com/watch?v=1",
                duration: "10m 36s",
              },
              {
                id: 2,
                name: "Modern React Patterns",
                videoLink: "https://youtube.com/watch?v=2",
                duration: "15m 20s",
              },
              {
                id: 3,
                name: "Setting up Development Environment",
                videoLink: "https://youtube.com/watch?v=3",
                duration: "12m 45s",
              },
            ],
          },
          {
            id: 2,
            title: "Advanced Hooks and State Management",
            points: [
              {
                id: 4,
                name: "Custom Hooks Deep Dive",
                videoLink: "https://youtube.com/watch?v=4",
                duration: "18m 20s",
              },
              {
                id: 5,
                name: "Context API Best Practices",
                videoLink: "https://youtube.com/watch?v=5",
                duration: "22m 15s",
              },
            ],
          },
        ],
        faqs: [
          {
            id: 1,
            question: "What prerequisites do I need?",
            answer: "Basic knowledge of React and JavaScript ES6+ is required.",
          },
          {
            id: 2,
            question: "How long is the course?",
            answer: "The course is 8 weeks long with 45 lectures.",
          },
        ],
        rating: 4.8,
        students: 2500,
        tagline: "12 courses in 1",
        description:
          "Master advanced React concepts and build production-ready applications.",
        format: "Online, Self-Paced",
        skills: "All Levels",
        deadline: "Nov 30, 2025",
        certificate: true,
      },
      {
        id: 2,
        title: "Fullstack JavaScript Bootcamp",
        instructor: "Alice Johnson",
        instructorAvatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
        image:
          "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300",
        date: "10 June, 2025",
        status: "Approved",
        language: "English",
        level: "Intermediate",
        lectures: 60,
        duration: "10 weeks",
        price: 2499,
        highlights: ["Node.js", "React", "MongoDB"],
        outcomes: [
          "Fullstack app development",
          "API design",
          "Frontend skills",
        ],
        audience: ["Aspiring Web Developers"],
        requirements: ["Basic JavaScript", "HTML/CSS"],
        curriculum: [],
        faqs: [],
        rating: 4.7,
        students: 1800,
        tagline: "Become a Fullstack Developer",
        description: "Learn fullstack development with hands-on projects.",
        format: "Online",
        skills: "Intermediate",
        deadline: "Aug 30, 2025",
        certificate: true,
      },
      {
        id: 3,
        title: "UI/UX Design Pro Masterclass",
        instructor: "Michael Lee",
        instructorAvatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
        image:
          "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
        date: "1 August, 2025",
        status: "Rejected",
        language: "English",
        level: "Beginner",
        lectures: 30,
        duration: "6 weeks",
        price: 1999,
        highlights: ["Design Thinking", "Prototyping", "User Research"],
        outcomes: ["Understand UX", "Build prototypes", "Design clean UIs"],
        audience: ["Design Beginners"],
        requirements: ["None"],
        curriculum: [],
        faqs: [],
        rating: 4.5,
        students: 1200,
        tagline: "Start your design journey",
        description: "Everything you need to know to start designing apps.",
        format: "Online, Self-Paced",
        skills: "Beginner",
        deadline: "Sep 15, 2025",
        certificate: true,
      },
      {
        id: 4,
        title: "Data Structures & Algorithms",
        instructor: "Sara Khan",
        instructorAvatar:
          "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
        image:
          "https://images.pexels.com/photos/256658/pexels-photo-256658.jpeg?auto=compress&cs=tinysrgb&w=300",
        date: "5 September, 2025",
        status: "Pending",
        language: "English",
        level: "Intermediate",
        lectures: 40,
        duration: "7 weeks",
        price: 2799,
        highlights: ["Time Complexity", "Sorting", "Trees"],
        outcomes: ["Crack coding interviews", "Understand core CS concepts"],
        audience: ["CS Students", "Software Engineers"],
        requirements: ["Basic Programming"],
        curriculum: [],
        faqs: [],
        rating: 4.9,
        students: 3000,
        tagline: "Ace technical interviews",
        description: "DSA essentials with practice problems and solutions.",
        format: "Online",
        skills: "Intermediate",
        deadline: "Oct 20, 2025",
        certificate: true,
      },
    ]);
  }, []);

  const handleViewCourse = (course: Course) => {
    setPreviewCourse(course);
  };

  const filteredCourses = courses.filter(
    (course) =>
      (course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchValue.toLowerCase())) &&
      (course.status === "Rejected" 
        )
  );

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Live":
        return "text-green-600";
      case "Completed":
        return "text-blue-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusDot = (status: Course["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Live":
        return "bg-green-500";
      case "Completed":
        return "bg-blue-500";
      case "Pending":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getColumns = () => {
    return [
      { label: "Actions", align: "center" as const },
      { label: "Course", align: "center" as const },
      { label: "Employee Name", align: "center" as const },
      { label: "Status", align: "center" as const },
    ];
  };

  if (previewCourse) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-full mx-auto">
          <button
            onClick={() => setPreviewCourse(null)}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Projects
          </button>

          <div className="space-y-4">
            {/* Top 4 Boxes - 2 rows, 2 cols with 70% left, 30% right */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column - 70% */}
              <div className="lg:col-span-7 space-y-4">
                {/* Project Summary */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-xl font-semibold mb-4">Project Summary</h2>
                  <hr className="mb-4 text-[#5e5e5e]" />
                  <p className="text-gray-600 mb-6">
                    {previewCourse.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 gap-x-80 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div className="flex items-center gap-16">
                        <p className="text-sm text-[#5e5e5e]">Start Date</p>
                        <p className="text-[#5e5e5e]">15 June, 2025</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-red-500" />
                      <div className="flex items-center gap-16">
                        <p className="text-sm text-[#5e5e5e]">End Date</p>
                        <p className="text-[#5e5e5e]">30 Aug, 2025</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-green-500" />
                      <div className="flex items-center gap-8">
                        <p className="text-sm text-[#5e5e5e]">Estimated Time</p>
                        <p className="text-[#5e5e5e]">30 Days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                      <div className="flex items-center gap-24">
                        <p className="text-sm text-[#5e5e5e]">Cost</p>
                        <p className="text-[#5e5e5e]">₹{previewCourse.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">Project_Requirements.pdf</span>
                  </div>
                </div>

                {/* Assignee & Team */}
                <div className="bg-white rounded-lg shadow-sm p-3">
                  <h2 className="text-xl font-semibold mb-4">Assignee</h2>
                  <div className="flex items-center gap-3 mb-6">
                    <img
                      src={previewCourse.instructorAvatar}
                      alt={previewCourse.instructor}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-[#5e5e5e]">{previewCourse.instructor}</p>
                      <p className="text-sm text-gray-500">Owner</p>
                    </div>
                  </div>
                  
                  <hr className="mb-4 text-[#5e5e5e]" />
                  
                  <h2 className="text-xl font-semibold mb-4">Team</h2>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((member) => (
                      <img
                        key={member}
                        src={`https://randomuser.me/api/portraits/${member % 2 === 0 ? 'women' : 'men'}/${member}.jpg`}
                        alt={`Team member ${member}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - 30% */}
              <div className="lg:col-span-3 space-y-12">
                {/* Estimated Time Box - Blue Background */}
                <div className="bg-[#7991BB] text-white rounded-lg shadow-sm p-6 h-[200px]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Estimated Time</h2>
                    <Flag className="h-10 w-10" />
                  </div>
                  <p className="text-3xl font-bold mb-2">30 Days</p>
                  <p className="text-blue-100">16 Aug, Saturday</p>
                </div>

                {/* Overall Progress with Pie Chart */}
                <div className="bg-white rounded-lg shadow-sm p-7 h-[250px]">
                  <h2 className="text-xl font-semibold mb-4 text-center text-gray-500">Overall Progress</h2>
                  <div className="flex items-center justify-center">
                    {/* Simple pie chart representation */}
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset="75.36" // 70% progress
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Budget</h2>
              <hr className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Total Budget */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">₹50,000</p>
                      <p className="text-gray-500">Total Budget</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                {/* Total Spent */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">₹0</p>
                      <p className="text-gray-500">Total Spent</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <ShoppingCart className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                {/* Remaining */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">₹50,000</p>
                      <p className="text-gray-500">Remaining</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
                
                {/* Over Spent */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">₹0</p>
                      <p className="text-gray-500">Over Spent</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Database className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold">Category Name</th>
                    <th className="text-left p-3 font-semibold">Budget</th>
                    <th className="text-left p-3 font-semibold">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {[{
                    name: "Research & Development",
                    budget: "₹20,000",
                    spent: "₹5,000",
                    over: "₹0"
                  }, {
                    name: "Product Development",
                    budget: "₹30,000",
                    spent: "₹10,000",
                    over: "₹0"
                  }].map((cat, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-3 text-[#5e5e5e]">{cat.name}</td>
                      <td className="p-3 font-semibold">{cat.budget}</td>
                      <td className="p-3">
                        <div className="flex gap-4">
                          <span className="text-green-600">Total Spent: {cat.spent}</span>
                          <span className="text-red-600">Over Spent: {cat.over}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
              
            </div>

            

            {/* Project Tasks */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Project Task</h2>
              <hr className="mb-6" />
              
              {/* Task Cards - 4 in first row, 3 in second row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Task Summary */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-5 text-[#5e5e5e]">Task Summary</h3>
                  <p className="text-4xl  text-gray-600 mb-1 text-center">12</p>
                  <p className="text-gray-500 text-center">Total Task Count</p>
                </div>

                {/* Task Summary */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-5 text-[#5e5e5e]">Task Summary</h3>
                  <p className="text-4xl text-blue-600 mb-1 text-center">12</p>
                  <p className="text-gray-500 text-center">In Progress</p>
                </div>
                
                {/* Completed Task */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-8 text-[#5e5e5e]">Completed Task</h3>
                  <p className="text-4xl  text-green-600 mb-1 text-center">5</p>
                  <p className="text-gray-500 text-center">Today Completed</p>
                </div>
                
                {/* Overdue Task */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-8 text-[#5e5e5e]">Overdue Task</h3>
                  <p className="text-4xl  text-red-600 mb-1 text-center">2</p>
                  <p className="text-gray-500 text-center">Today Overdue</p>
                </div>
                
                
              </div>
              
              {/* Second row with 3 cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

                  {/* In Review Task */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-8 text-[#5e5e5e]">In Review Task</h3>
                  <p className="text-4xl text-yellow-600 mb-1 text-center">3</p>
                  <p className="text-gray-500 text-center">Total In Review</p>
                </div>

                {/* Re-Open Task */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-8 text-[#5e5e5e]">Re-Open Task</h3>
                  <p className="text-4xl text-purple-600 mb-1 text-center">1</p>
                  <p className="text-gray-500 text-center">Total Re-Open</p>
                </div>
                
                {/* Cancel Task */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-8 text-[#5e5e5e]">Cancel Task</h3>
                  <p className="text-4xl text-gray-600 mb-1 text-center">1</p>
                  <p className="text-gray-500 text-center">Total Cancel</p>
                </div>
              </div>
            </div>

            {/* Tasks Table */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <TableHead columns={[
                    { label: "Task Name", align: "left" },
                    { label: "Start Date", align: "left" },
                    { label: "End Date", align: "left" },
                    { label: "Status", align: "left" },
                    { label: "Progress", align: "left" },
                    { label: "Assignee", align: "left" },
                  ]} />
                  <tbody>
                    {[
                      {
                        name: "Requirement Analysis",
                        start: "15 June, 2025",
                        end: "20 June, 2025",
                        status: "Completed",
                        progress: "100%",
                        assignee: "John Smith"
                      },
                      {
                        name: "UI/UX Design",
                        start: "21 June, 2025",
                        end: "30 June, 2025",
                        status: "In Review",
                        progress: "80%",
                        assignee: "Alice Johnson"
                      },
                      {
                        name: "Frontend Development",
                        start: "1 July, 2025",
                        end: "15 July, 2025",
                        status: "In Progress",
                        progress: "50%",
                        assignee: "Michael Lee"
                      },
                      {
                        name: "Backend Development",
                        start: "1 July, 2025",
                        end: "20 July, 2025",
                        status: "Pending",
                        progress: "0%",
                        assignee: "Sara Khan"
                      },
                      {
                        name: "Database Setup",
                        start: "5 July, 2025",
                        end: "10 July, 2025",
                        status: "In Progress",
                        progress: "30%",
                        assignee: "David Chen"
                      },
                      {
                        name: "Testing & QA",
                        start: "16 July, 2025",
                        end: "25 July, 2025",
                        status: "Pending",
                        progress: "0%",
                        assignee: "Emily Davis"
                      },
                    ].map((task, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">{task.name}</td>
                        <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">{task.start}</td>
                        <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">{task.end}</td>
                        <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.status === "Completed" ? "bg-green-100 text-green-800" :
                            task.status === "In Review" ? "bg-yellow-100 text-yellow-800" :
                            task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                task.status === "Completed" ? "bg-green-600" :
                                task.status === "In Review" ? "bg-yellow-500" :
                                task.status === "In Progress" ? "bg-blue-600" :
                                "bg-gray-600"
                              }`} 
                              style={{ width: task.progress }}
                            ></div>
                          </div>
                        </td>
                        <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`}
                              alt={task.assignee}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>{task.assignee}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Rejected Projects</h2>

      {/* Top Bar with Search */}
      <div className="flex justify-between items-center mb-6">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={() => {}}
          buttons={[]}
          placeholder="Search by course title or instructor"
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <TableHead columns={getColumns()} />
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center">
                    <IconButton
                      tooltip="View"
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={() => handleViewCourse(course)}
                    >
                      <Eye className="h-4 w-4" />
                    </IconButton>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-right">
                    <div className="flex justify-center items-center gap-3">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="text-left">
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-gray-500">{course.date}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{course.instructor}</span>
                    </div>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusDot(
                          course.status
                        )}`}
                      />
                      <span
                        className={`font-medium ${getStatusColor(
                          course.status
                        )}`}
                      >
                        {course.status}
                      </span>
                    </div>
                  </td>

                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={getColumns().length} className="text-center py-8">
                  <NoDataFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RejectedProject;
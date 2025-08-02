import React, { useState, useEffect } from "react";
import {
  Eye,
  ChevronLeft,
  Check,
  X,
  BookOpen,
  FolderOpen,
} from "lucide-react";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";

interface Employee {
  id: number;
  name: string;
  avatar: string;
  courses: number;
  projects: number;
  joinedDate: string;
  level: string;
  totalPayment: number;
  location: string;
  description: string;
  employeeCourses: EmployeeCourse[];
}

interface EmployeeCourse {
  id: number;
  courseName: string;
  image: string;
  courseDate: string;
  totalLectures: number;
  completedLectures: number;
  progress: number;
  status: "Approved" | "Rejected" | "Pending" | "Live" | "Completed";
}

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [previewEmployee, setPreviewEmployee] = useState<Employee | null>(null);

  useEffect(() => {
  setEmployees([
    {
      id: 1,
      name: "Rahul Verma",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      courses: 5,
      projects: 3,
      joinedDate: "3 Apr, 2024",
      level: "Level 4",
      totalPayment: 25000,
      location: "Agra",
      description: "Experienced software developer with expertise in React and Node.js. Passionate about creating scalable web applications and mentoring junior developers.",
      employeeCourses: [
        {
          id: 1,
          courseName: "Advanced React Development",
          image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 July, 2025",
          totalLectures: 45,
          completedLectures: 32,
          progress: 71,
          status: "Pending"
        },
        {
          id: 2,
          courseName: "Node.js Masterclass",
          image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "26 Aug, 2025",
          totalLectures: 38,
          completedLectures: 38,
          progress: 100,
          status: "Completed"
        },
        {
          id: 3,
          courseName: "JavaScript Fundamentals",
          image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "15 Apr, 2025",
          totalLectures: 25,
          completedLectures: 20,
          progress: 80,
          status: "Approved"
        }
      ]
    },
    {
      id: 2,
      name: "Priya Shikhar",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      courses: 7,
      projects: 5,
      joinedDate: "15 Mar, 2024",
      level: "Level 5",
      totalPayment: 35000,
      location: "Mumbai",
      description: "Full-stack developer with strong background in modern web technologies. Specializes in UI/UX design and database optimization.",
      employeeCourses: [
        {
          id: 4,
          courseName: "UI/UX Design Pro Masterclass",
          image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 Sep, 2025",
          totalLectures: 30,
          completedLectures: 15,
          progress: 50,
          status: "Pending"
        },
        {
          id: 5,
          courseName: "Database Design & Optimization",
          image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "10 Mar, 2025",
          totalLectures: 42,
          completedLectures: 42,
          progress: 100,
          status: "Completed"
        }
      ]
    },
    {
      id: 3,
      name: "Anmit Kumar",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
      courses: 3,
      projects: 2,
      joinedDate: "22 Feb, 2024",
      level: "Level 3",
      totalPayment: 18000,
      location: "Delhi",
      description: "Frontend developer focusing on React and modern JavaScript frameworks. Keen interest in performance optimization and user experience.",
      employeeCourses: [
        {
          id: 6,
          courseName: "React Performance Optimization",
          image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "18 July, 2025",
          totalLectures: 28,
          completedLectures: 10,
          progress: 36,
          status: "Approved"
        },
        {
          id: 7,
          courseName: "Modern CSS Techniques",
          image: "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "19 Oct, 2025",
          totalLectures: 20,
          completedLectures: 5,
          progress: 25,
          status: "Rejected"
        }
      ]
    },
    {
      id: 4,
      name: "Sneiha Patel",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
      courses: 6,
      projects: 4,
      joinedDate: "8 Jan, 2024",
      level: "Level 4",
      totalPayment: 28000,
      location: "Bangalore",
      description: "Backend developer with expertise in microservices architecture and cloud computing. Strong problem-solving skills and team collaboration.",
      employeeCourses: [
        {
          id: 8,
          courseName: "Microservices Architecture",
          image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "17 July, 2025",
          totalLectures: 50,
          completedLectures: 35,
          progress: 70,
          status: "Approved"
        },
        {
          id: 9,
          courseName: "AWS Cloud Fundamentals",
          image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 Dec, 2025",
          totalLectures: 35,
          completedLectures: 12,
          progress: 34,
          status: "Pending"
        }
      ]
    },
    {
      id: 5,
      name: "Vikash Gupta",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      courses: 4,
      projects: 3,
      joinedDate: "12 May, 2024",
      level: "Level 2",
      totalPayment: 15000,
      location: "Pune",
      description: "Junior developer eager to learn and grow. Currently focusing on frontend technologies and building strong programming fundamentals.",
      employeeCourses: [
        {
          id: 10,
          courseName: "JavaScript Basics",
          image: "https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "04 Jan 2025",
          totalLectures: 22,
          completedLectures: 22,
          progress: 100,
          status: "Completed"
        },
        {
          id: 11,
          courseName: "HTML & CSS Fundamentals",
          image: "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 Feb, 2025",
          totalLectures: 18,
          completedLectures: 8,
          progress: 44,
          status: "Approved"
        }
      ]
    }
  ]);
}, []);

  const handleViewEmployee = (employee: Employee) => {
    setPreviewEmployee(employee);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    employee.location.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getStatusColor = (status: EmployeeCourse["status"]) => {
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

  const getStatusDot = (status: EmployeeCourse["status"]) => {
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
      { label: "Employee Name", align: "center" as const },
      { label: "Course", align: "center" as const },
      { label: "Projects", align: "center" as const },
      { label: "Joined Date", align: "center" as const },
      { label: "Level", align: "center" as const },
      { label: "Total Payment", align: "center" as const },
      { label: "Location", align: "center" as const },
    ];
  };

  if (previewEmployee) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-full mx-auto">
          <button
            onClick={() => setPreviewEmployee(null)}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Employees
          </button>

          <div className="space-y-6">
            {/* Top Section - 60% left, 30% right */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column - 60% */}
              <div className="lg:col-span-6 border border-gray-400 rounded-lg shadow-lg">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={previewEmployee.avatar}
                      alt={previewEmployee.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-black">Name:
                        <span className="font-medium text-gray-500 ml-2">    {previewEmployee.name}</span>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-black font-medium">Joined Date:
                        <span className="font-medium text-gray-500 ml-2">    {previewEmployee.joinedDate}</span>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-black font-medium mb-1">Payment:
                        <span className="font-medium text-gray-500 ml-2">    ₹ {previewEmployee.totalPayment.toLocaleString()}</span>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-black font-medium mb-10">Level:
                        <span className="font-medium text-gray-500 mb-4 ml-2">    {previewEmployee.level}</span>
                      </p>
                    </div>
                    
                    <div className="col-span-2">
                      <p className="text-sm text-black font-medium mb-10">Location:
                        <span className="font-medium text-gray-500 mb-4 ml-2">    {previewEmployee.location}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-black font-medium mb-2">Description:</p>
                    <p className="text-gray-700">{previewEmployee.description}</p>
                  </div>
                </div>
              </div>

              {/* Right Column - 30% */}
              <div className="lg:col-span-4 space-y-6">
                {/* Courses Box */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-400">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Courses</h3>
                    <BookOpen className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-4xl text-black mb-2">{previewEmployee.courses}</p>
                    <p className="text-black">Total Courses</p>
                  </div>
                </div>

                {/* Projects Box */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-400">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Projects</h3>
                    <FolderOpen className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-4xl text-black mb-2">{previewEmployee.projects}</p>
                    <p className="text-black">Total Projects</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="overflow-x-auto rounded-2xl">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 font-medium">Course Name</th>
                      <th className="text-left p-3 font-medium">Total Lectures</th>
                      <th className="text-left p-3 font-medium">Completed Lectures</th>
                      <th className="text-left p-3 font-medium">Progress</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-center p-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewEmployee.employeeCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.image} 
                            alt={course.courseName} 
                            className="w-12 h-12 rounded object-cover flex-shrink-0" 
                          />
                          <div className="text-left">
                            <p className="font-medium text-[#5e5e5e]">{course.courseName}</p>
                            <p className="text-sm text-gray-500">{course.courseDate}</p>
                          </div>
                        </div>
                      </td>
                        <td className="p-3 text-center">{course.totalLectures}</td>
                        <td className="p-3 text-center">{course.completedLectures}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  course.status === "Completed" ? "bg-green-600" :
                                  course.status === "Approved" ? "bg-blue-600" :
                                  course.status === "Pending" ? "bg-yellow-500" :
                                  course.status === "Rejected" ? "bg-red-600" :
                                  "bg-gray-600"
                                }`} 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{course.progress}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusDot(course.status)}`}
                            />
                            <span className={`font-medium ${getStatusColor(course.status)}`}>
                              {course.status}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          {course.status === "Pending" && (
                            <div className="flex items-center gap-2">
                              <button className="px-4 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200 flex items-center gap-1">
                                <Check className="h-3 w-3" />
                                Approve
                              </button>
                              <button className="px-4 py-1 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200 flex items-center gap-1">
                                <X className="h-3 w-3" />
                                Reject
                              </button>
                            </div>
                          )}
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
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm ml-3 mr-3">
      <h2 className="text-xl font-semibold mb-4">Employees List</h2>

      {/* Top Bar with Search */}
      <div className="flex justify-between items-center mb-6">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          placeholder="Search employees..."
          onButtonClick={() => {}}
          buttons={[]}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <TableHead columns={getColumns()} />
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center">
                    <IconButton
                      tooltip="View"
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={() => handleViewEmployee(employee)}
                    >
                      <Eye className="h-4 w-4" />
                    </IconButton>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-left">
                    <div className="flex justify-center items-center gap-3">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-normal">{employee.name}</span>
                    </div>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="font-normal">{employee.courses}</span>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="font-normal">{employee.projects}</span>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="text-gray-600">{employee.joinedDate}</span>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="font-medium text-blue-600">{employee.level}</span>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="font-medium text-green-600">
                      ₹ {employee.totalPayment.toLocaleString()}
                    </span>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="text-gray-600">{employee.location}</span>
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

export default Employee;
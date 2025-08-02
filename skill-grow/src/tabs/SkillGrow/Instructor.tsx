import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, ChevronLeft, BookOpen } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import InstructorForm from "../../forms/InstructorForm";

interface Instructor {
  id: number;
  name: string;
  avatar: string;
  course: number;
  joinedDate: string;
  employees: number;
  rating: number;
  courseLevel: string;
  courseList: string;
  description: string;
  instructorCourses: InstructorCourse[];
}

interface InstructorCourse {
  id: number;
  courseName: string;
  enrolled: number;
  rating: number;
  review: number;
  image: string;
  courseDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface InstructorFormData {
  name: string;
  courseLevel: string;
  employees: string;
  joinDate: Date | null;
  courseList: string;
  rating: string;
  description: string;
  image: File | null;
}

const Instructor: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [previewInstructor, setPreviewInstructor] = useState<Instructor | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<InstructorFormData>({
    name: "",
    courseLevel: "",
    employees: "",
    joinDate: null,
    courseList: "",
    rating: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState("");

  // Sample enrollment data for the graph
  const enrollmentData = [
    { name: "Week 1", enrollments: 12 },
    { name: "Week 2", enrollments: 19 },
    { name: "Week 3", enrollments: 15 },
    { name: "Week 4", enrollments: 25 },
    { name: "Week 5", enrollments: 22 },
    { name: "Week 6", enrollments: 28 },
  ];

  useEffect(() => {
    setInstructors([
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        avatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
        course: 5,
        joinedDate: "10 Apr, 2025",
        employees: 45,
        rating: 4.5,
        courseLevel: "Advanced",
        courseList: "React Development",
        description:
          "Experienced React developer with 8+ years in frontend development.",
        instructorCourses: [
          {
            id: 1,
            courseName: "Advanced React Development",
            enrolled: 32,
            rating: 4.5,
            review: 28,
            status: "Approved",
            image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 July, 2025",
          },
          {
            id: 2,
            courseName: "React Hooks Masterclass",
            enrolled: 24,
            rating: 4.2,
            review: 20,
            status: "Pending",
            image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 July, 2025",
          },
        ],
      },
      {
        id: 2,
        name: "Prof. Michael Chen",
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
        course: 3,
        joinedDate: "15 Mar, 2025",
        employees: 38,
        rating: 3.8,
        courseLevel: "Intermediate",
        courseList: "Node.js",
        description:
          "Backend specialist focusing on Node.js and database optimization.",
        instructorCourses: [
          {
            id: 3,
            courseName: "Node.js Fundamentals",
            enrolled: 28,
            rating: 3.9,
            review: 25,
            status: "Approved",
            image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 July, 2025",
          },
          {
            id: 4,
            courseName: "Database Design",
            enrolled: 15,
            rating: 3.7,
            review: 12,
            status: "Rejected",
            image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 July, 2025",
          },
        ],
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        avatar:
          "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
        course: 4,
        joinedDate: "22 Feb, 2025",
        employees: 52,
        rating: 4.7,
        courseLevel: "Beginner",
        courseList: "JavaScript",
        description:
          "JavaScript expert with passion for teaching programming fundamentals.",
        instructorCourses: [
          {
            id: 5,
            courseName: "JavaScript Basics",
            enrolled: 40,
            rating: 4.8,
            review: 35,
            status: "Approved",
            image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 July, 2025",
          },
          {
            id: 6,
            courseName: "ES6+ Features",
            enrolled: 18,
            rating: 4.6,
            review: 16,
            status: "Pending",
            image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=150",
          courseDate: "20 July, 2025",
          },
        ],
      },
    ]);
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Instructor name is required";
    if (!formData.courseLevel.trim())
      newErrors.courseLevel = "Course level is required";
    if (!formData.employees.trim())
      newErrors.employees = "Employees count is required";
    if (!formData.joinDate) newErrors.joinDate = "Join date is required";
    if (!formData.courseList.trim())
      newErrors.courseList = "Course list is required";
    if (!formData.rating.trim()) newErrors.rating = "Rating is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    // Get the current instructor data if editing
    const currentInstructor = isEditing 
      ? instructors.find(instructor => instructor.id === editingId)
      : null;

    const newInstructor: Instructor = {
      id: isEditing ? editingId! : Date.now(),
      name: formData.name,
      // Keep existing avatar if no new image is uploaded during edit
      avatar: formData.image
        ? URL.createObjectURL(formData.image)
        : isEditing && currentInstructor
        ? currentInstructor.avatar
        : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      course: Math.floor(Math.random() * 5) + 1,
      joinedDate: formData.joinDate
        ? formData.joinDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "",
      employees: parseInt(formData.employees),
      rating: parseFloat(formData.rating),
      courseLevel: formData.courseLevel,
      courseList: formData.courseList,
      description: formData.description,
      instructorCourses: isEditing && currentInstructor 
        ? currentInstructor.instructorCourses 
        : [],
    };

    if (isEditing) {
      setInstructors((prev) =>
        prev.map((instructor) =>
          instructor.id === editingId ? newInstructor : instructor
        )
      );
    } else {
      setInstructors((prev) => [...prev, newInstructor]);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: "",
      courseLevel: "",
      employees: "",
      joinDate: null,
      courseList: "",
      rating: "",
      description: "",
      image: null,
    });
    setErrors({});
    setErrorMessage("");
  };

  const handleEdit = (instructor: Instructor) => {
    // Parse the joinedDate string into a Date object
    const dateParts = instructor.joinedDate.split(/[\s,]+/);
    const day = parseInt(dateParts[0]);
    const month = new Date(Date.parse(dateParts[1] + " 1, 2012")).getMonth();
    const year = parseInt(dateParts[2]);
    const parsedDate = new Date(year, month, day);

    setFormData({
      name: instructor.name,
      courseLevel: instructor.courseLevel,
      employees: instructor.employees.toString(),
      joinDate: parsedDate,
      courseList: instructor.courseList,
      rating: instructor.rating.toString(),
      description: instructor.description,
      image: null, // Don't set existing image as File object
    });
    setIsEditing(true);
    setEditingId(instructor.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setInstructors((prev) => prev.filter((instructor) => instructor.id !== id));
  };

  const handleViewInstructor = (instructor: Instructor) => {
    setPreviewInstructor(instructor);
  };

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      instructor.courseList.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getStatusColor = (status: InstructorCourse["status"]) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusDot = (status: InstructorCourse["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
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
      { label: "Instructor Name", align: "left" as const },
      { label: "Course", align: "center" as const },
      { label: "Joined Date", align: "center" as const },
      { label: "Employees", align: "center" as const },
      { label: "Rating", align: "center" as const },
    ];
  };

  // Preview View
  if (previewInstructor) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-full mx-auto">
          <button
            onClick={() => setPreviewInstructor(null)}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Instructors
          </button>

          <div className="space-y-6">
            {/* Top Section - 60% left, 40% right */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column - 60% */}
              <div className="lg:col-span-6 border border-gray-400 rounded-lg shadow-lg ">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-10">
                    <img
                      src={previewInstructor.avatar}
                      alt={previewInstructor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-black font-medium">
                        Name:
                        <span className="font-medium text-gray-500 ml-2">
                          {previewInstructor.name}
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-black font-medium">
                        Joined Date:
                        <span className="font-medium text-gray-500 ml-2">
                          {previewInstructor.joinedDate}
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-black font-medium mb-1">
                        Rating:
                        <span className="font-medium text-gray-500 ml-2">
                          {previewInstructor.rating}
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-black font-medium mb-10">
                        Course Level:
                        <span className="font-medium text-gray-500 mb-4 ml-2">
                          {previewInstructor.courseLevel}
                        </span>
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-sm text-black font-medium mb-10">
                        Course List:
                        <span className="font-medium text-gray-500 mb-4 ml-2">
                          {previewInstructor.courseList}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-black font-medium mb-2">Description:</p>
                    <p className="text-gray-700">
                      {previewInstructor.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - 40% */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-lg shadow-sm p-7 border border-gray-400">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Employees Enrolment
                    </h3>
                    <span className="text-green-600 text-sm">
                      +12% VS last week
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-3xl font-medium text-[#5e5e5e]">
                      {previewInstructor.employees}
                    </p>
                  </div>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={enrollmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line
                          type="monotone"
                          dataKey="enrollments"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ fill: "#3B82F6" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-400">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Courses</h3>
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-black mb-2">
                  {previewInstructor.course}
                </p>
                <p className="text-gray-500">Total Courses</p>
              </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-400">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 font-medium">Course Name</th>
                      <th className="text-center p-3 font-medium">Enrolled</th>
                      <th className="text-center p-3 font-medium">Rating</th>
                      <th className="text-center p-3 font-medium">Review</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewInstructor.instructorCourses.map((course) => (
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
                        <td className="p-3 text-center">{course.enrolled}</td>
                        <td className="p-3 text-center">{course.rating}</td>
                        <td className="p-3 text-center">{course.review}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
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

  // Main View - Show either the list or the form
  return showForm ? (
    <InstructorForm
      formData={formData}
      setFormData={setFormData}
      errors={errors}
      setErrors={setErrors}
      errorMessage={errorMessage}
      isEditing={isEditing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  ) : (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm ml-3 mr-3">
      <h2 className="text-xl font-semibold mb-4">Instructors List</h2>

      {/* Top Bar with Search */}
      <div className="flex justify-between items-center mb-6">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          placeholder="Search instructors..."
          onButtonClick={() => setShowForm(true)}
          buttons={["Add Instructor"]}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <TableHead columns={getColumns()} />
          <tbody>
            {filteredInstructors.length > 0 ? (
              filteredInstructors.map((instructor) => (
                <tr key={instructor.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <IconButton
                        tooltip="Edit"
                        className="hover:text-blue-600 cursor-pointer"
                        onClick={() => handleEdit(instructor)}
                      >
                        <Edit className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        tooltip="View"
                        className="hover:text-green-600 cursor-pointer"
                        onClick={() => handleViewInstructor(instructor)}
                      >
                        <Eye className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        tooltip="Delete"
                        className="hover:text-red-600 cursor-pointer"
                        onClick={() => handleDelete(instructor.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-left">
                    <div className="flex items-center gap-3">
                      <img
                        src={instructor.avatar}
                        alt={instructor.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-normal">{instructor.name}</span>
                    </div>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="font-normal">{instructor.course}</span>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="text-gray-600">
                      {instructor.joinedDate}
                    </span>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="font-normal">{instructor.employees}</span>
                  </td>

                  <td className="p-3 border-b border-gray-400 text-center">
                    <span className="font-medium text-yellow-600">
                      ⭐ {instructor.rating}
                    </span>
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

export default Instructor;
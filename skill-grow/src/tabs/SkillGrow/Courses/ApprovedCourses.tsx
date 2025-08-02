import React, { useState, useEffect } from "react";
import {
  Edit,
  Eye,
  Plus,
  ChevronLeft,
  Star,
  Users,
  BarChart3,
  Calendar,
  Globe,
  Play,
  Clock,
  Award,
  Target,
  Trash2,
  CheckCircle,
  Minus,
  ChevronRight,
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

type CourseViewType = "Instructor" | "Employee";

type FormStep = "details" | "description" | "curriculum" | "faqs" | "preview";

const ApprovedCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedView, setSelectedView] =
    useState<CourseViewType>("Instructor");
  const [searchValue, setSearchValue] = useState("");
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("Description");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>("details");

  const [formData, setFormData] = useState({
      title: "",
      instructor: "",
      language: "",
      level: "",
      lectures: 0,
      duration: "",
      price: 0,
      image: "",
      highlights: [""],
      outcomes: [""],
      audience: [""],
      requirements: [""],
      curriculum: [] as Topic[],
      faqs: [] as FAQ[],
      tagline: "",
      description: "",
      format: "",
      skills: "",
      deadline: "",
      certificate: false,
    });



  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  

  useEffect(() => {
    // Sample data
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
        status: "Approved",
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
    ]);
  }, []);

  const handleAddCourse = () => {
    setEditingCourse(null);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      instructor: course.instructor,
      language: course.language,
      level: course.level,
      lectures: course.lectures,
      duration: course.duration,
      price: course.price,
      image: course.image,
      highlights: course.highlights,
      outcomes: course.outcomes,
      audience: course.audience,
      requirements: course.requirements,
      curriculum: course.curriculum,
      faqs: course.faqs,
      tagline: course.tagline,
      description: course.description,
      format: course.format,
      skills: course.skills,
      deadline: course.deadline,
      certificate: course.certificate,
    });
    setShowCreateForm(true);
    setCurrentStep("details");
    setFormErrors({});
  };

  const handleViewCourse = (course: Course) => {
    setPreviewCourse(course);
    setActiveSection("Description");
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchValue.toLowerCase())
  );

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    switch (currentStep) {
      case "details":
        if (!formData.title.trim()) errors.title = "Course title is required";
        if (!formData.instructor.trim())
          errors.instructor = "Instructor name is required";
        if (!formData.language.trim()) errors.language = "Language is required";
        if (!formData.level.trim()) errors.level = "Course level is required";
        if (!formData.lectures || formData.lectures <= 0)
          errors.lectures = "Number of lectures must be greater than 0";
        if (!formData.duration.trim()) errors.duration = "Duration is required";
        if (!formData.price || formData.price <= 0)
          errors.price = "Price must be greater than 0";
        break;
      case "description":
        if (formData.highlights.every((h) => !h.trim()))
          errors.highlights = "At least one highlight is required";
        if (formData.outcomes.every((o) => !o.trim()))
          errors.outcomes = "At least one learning outcome is required";
        if (formData.audience.every((a) => !a.trim()))
          errors.audience = "Target audience is required";
        if (formData.requirements.every((r) => !r.trim()))
          errors.requirements = "Requirements are required";
        break;
      case "curriculum":
        if (formData.curriculum.length === 0)
          errors.curriculum = "At least one topic is required";
        formData.curriculum.forEach((topic, index) => {
          if (!topic.title.trim())
            errors[`curriculum_topic_${index}`] = "Topic title is required";
          if (topic.points.length === 0)
            errors[`curriculum_points_${index}`] =
              "At least one point is required";
          topic.points.forEach((point, pointIndex) => {
            if (!point.name.trim())
              errors[`curriculum_point_name_${index}_${pointIndex}`] =
                "Point name is required";
            if (!point.duration.trim())
              errors[`curriculum_point_duration_${index}_${pointIndex}`] =
                "Duration is required";
          });
        });
        break;
      case "faqs":
        if (formData.faqs.length === 0)
          errors.faqs = "At least one FAQ is required";
        formData.faqs.forEach((faq, index) => {
          if (!faq.question.trim())
            errors[`faq_question_${index}`] = "Question is required";
          if (!faq.answer.trim())
            errors[`faq_answer_${index}`] = "Answer is required";
        });
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;

    const steps: FormStep[] = [
      "details",
      "description",
      "curriculum",
      "faqs",
      "preview",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePreviousStep = () => {
    const steps: FormStep[] = [
      "details",
      "description",
      "curriculum",
      "faqs",
      "preview",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      setShowCreateForm(false);
    }
  };

  const handleSubmitCourse = () => {
    if (!validateCurrentStep()) return;

    const newCourse: Course = {
      id: editingCourse?.id || Date.now(),
      ...formData,
      instructorAvatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      status: "Approved",
      rating: 0,
      students: 0,
    };

    if (editingCourse) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editingCourse.id ? newCourse : course
        )
      );
    } else {
      setCourses((prev) => [...prev, newCourse]);
    }

    setShowCreateForm(false);
    setEditingCourse(null);
  };

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
      { label: "Course" },
      { label: "Instructor" },
      { label: "Status" },
    ];
  };

  if (previewCourse) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setPreviewCourse(null)}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Courses
          </button>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {previewCourse.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {previewCourse.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{previewCourse.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span>{previewCourse.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-green-500" />
                <span>All Levels</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span>Last Updated: {previewCourse.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-indigo-500" />
                <span>{previewCourse.language}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex gap-4 mb-6 border-b">
                    {[
                      "Description",
                      "Curriculum",
                      "Instructor",
                      "Reviews",
                      "FAQs",
                    ].map((section) => (
                      <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`pb-2 px-1 border-b-2 ${
                          activeSection === section
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {section}
                      </button>
                    ))}
                  </div>

                  {activeSection === "Description" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          {previewCourse.title}
                        </h3>
                        <div className="space-y-2 text-gray-600">
                          <p>
                            <strong>Duration:</strong> {previewCourse.duration}
                          </p>
                          <p>
                            <strong>Format:</strong> {previewCourse.format}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          Course Highlights
                        </h4>
                        <ul className="space-y-2">
                          {previewCourse.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          Key Learning Outcomes
                        </h4>
                        <ul className="space-y-2">
                          {previewCourse.outcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Target Audience</h4>
                        <ul className="space-y-2">
                          {previewCourse.audience.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Users className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeSection === "Curriculum" && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Course Content
                      </h3>
                      <div className="space-y-4">
                        {previewCourse.curriculum.map((topic) => (
                          <div
                            key={topic.id}
                            className="border border-gray-200 rounded-lg"
                          >
                            <div className="bg-gray-50 px-4 py-3 font-medium">
                              {topic.title}
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {topic.points.map((point) => (
                                  <div
                                    key={point.id}
                                    className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                                  >
                                    <Play className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-sm truncate">
                                        {point.name}
                                      </p>
                                      <span className="text-xs text-gray-500">
                                        {point.duration}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === "Instructor" && (
                    <div className="flex gap-4">
                      <img
                        src={previewCourse.instructorAvatar}
                        alt={previewCourse.instructor}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {previewCourse.instructor}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>4.8 rating</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span>3K students</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-purple-500" />
                            <span>12 courses</span>
                          </div>
                        </div>
                        <p className="mt-4 text-gray-600">
                          Expert instructor with years of experience in web
                          development and React ecosystem.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeSection === "Reviews" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold mb-4">
                        Student Reviews
                      </h3>
                      {[1, 2, 3].map((review) => (
                        <div
                          key={review}
                          className="border-b border-gray-200 pb-4"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <img
                              src={`https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50`}
                              alt="Student"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium">Student {review}</p>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-4 w-4 text-yellow-500 fill-current"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600">
                            Great course! Learned a lot about advanced React
                            concepts. The instructor explains everything
                            clearly.
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSection === "FAQs" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold mb-4">
                        Frequently Asked Questions
                      </h3>
                      {previewCourse.faqs.map((faq) => (
                        <div
                          key={faq.id}
                          className="border border-gray-200 rounded-lg"
                        >
                          <button
                            onClick={() =>
                              setExpandedFAQ(
                                expandedFAQ === faq.id ? null : faq.id
                              )
                            }
                            className="w-full flex items-center justify-between p-4 text-left"
                          >
                            <span className="font-medium">{faq.question}</span>
                            {expandedFAQ === faq.id ? (
                              <Minus className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </button>
                          {expandedFAQ === faq.id && (
                            <div className="px-4 pb-4 text-gray-600">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">This Course Includes</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    ₹{previewCourse.price.toLocaleString()}
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Play className="h-4 w-4 text-red-500" />
                      <span>Lectures: {previewCourse.lectures}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>Duration: {previewCourse.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-4 w-4 text-blue-500" />
                      <span>Skills: {previewCourse.skills}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-purple-500" />
                      <span>Language: {previewCourse.language}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span>Deadline: {previewCourse.deadline}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>
                        Certificate: {previewCourse.certificate ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Course Requirements</h3>
                  <ol className="space-y-2 text-sm">
                    {previewCourse.requirements.map((req, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-blue-600 font-medium">
                          {index + 1}.
                        </span>
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-200 px-6 py-3 mb-6">
            <h1 className="text-xl font-semibold">Create Course</h1>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-lg shadow-sm">
            {[
              { key: "details", label: "Course Details" },
              { key: "description", label: "Description" },
              { key: "curriculum", label: "Curriculum" },
              { key: "faqs", label: "FAQs" },
              { key: "preview", label: "Preview" },
            ].map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === step.key
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-2 text-sm font-medium">{step.label}</span>
                </div>
                {index < 4 && <div className="w-16 h-0.5 bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {currentStep === "details" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold mb-4">Course Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.title ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formErrors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        * {formErrors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructor Name
                    </label>
                    <input
                      type="text"
                      value={formData.instructor}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          instructor: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.instructor
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.instructor && (
                      <p className="text-red-500 text-sm mt-1">
                        * {formErrors.instructor}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          language: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.language
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                    {formErrors.language && (
                      <p className="text-red-500 text-sm mt-1">
                        * {formErrors.language}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Level
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          level: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.level ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    {formErrors.level && (
                      <p className="text-red-500 text-sm mt-1">
                        * {formErrors.level}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Lectures
                    </label>
                    <input
                      type="number"
                      value={formData.lectures}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lectures: parseInt(e.target.value) || 0,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.lectures
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.lectures && (
                      <p className="text-red-500 text-sm mt-1">
                        * {formErrors.lectures}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      placeholder="e.g., 8 weeks"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.duration
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.duration && (
                      <p className="text-red-500 text-sm mt-1">
                        * {formErrors.duration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          price: parseInt(e.target.value) || 0,
                        }))
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.price ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formErrors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        * {formErrors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Course Image
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          image: e.target.value,
                        }))
                      }
                      placeholder="Image URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === "description" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold mb-4">
                  Course Description
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Highlights
                  </label>
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => {
                          const newHighlights = [...formData.highlights];
                          newHighlights[index] = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            highlights: newHighlights,
                          }));
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter highlight"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newHighlights = formData.highlights.filter(
                            (_, i) => i !== index
                          );
                          setFormData((prev) => ({
                            ...prev,
                            highlights: newHighlights,
                          }));
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        highlights: [...prev.highlights, ""],
                      }))
                    }
                    className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Highlight
                  </button>
                  {formErrors.highlights && (
                    <p className="text-red-500 text-sm mt-1">
                      * {formErrors.highlights}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Learning Outcomes
                  </label>
                  {formData.outcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={outcome}
                        onChange={(e) => {
                          const newOutcomes = [...formData.outcomes];
                          newOutcomes[index] = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            outcomes: newOutcomes,
                          }));
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter learning outcome"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newOutcomes = formData.outcomes.filter(
                            (_, i) => i !== index
                          );
                          setFormData((prev) => ({
                            ...prev,
                            outcomes: newOutcomes,
                          }));
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        outcomes: [...prev.outcomes, ""],
                      }))
                    }
                    className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Outcome
                  </button>
                  {formErrors.outcomes && (
                    <p className="text-red-500 text-sm mt-1">
                      * {formErrors.outcomes}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  {formData.audience.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newAudience = [...formData.audience];
                          newAudience[index] = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            audience: newAudience,
                          }));
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter target audience"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newAudience = formData.audience.filter(
                            (_, i) => i !== index
                          );
                          setFormData((prev) => ({
                            ...prev,
                            audience: newAudience,
                          }));
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        audience: [...prev.audience, ""],
                      }))
                    }
                    className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Audience
                  </button>
                  {formErrors.audience && (
                    <p className="text-red-500 text-sm mt-1">
                      * {formErrors.audience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements
                  </label>
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => {
                          const newRequirements = [...formData.requirements];
                          newRequirements[index] = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            requirements: newRequirements,
                          }));
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter requirement"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newRequirements = formData.requirements.filter(
                            (_, i) => i !== index
                          );
                          setFormData((prev) => ({
                            ...prev,
                            requirements: newRequirements,
                          }));
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        requirements: [...prev.requirements, ""],
                      }))
                    }
                    className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Requirement
                  </button>
                  {formErrors.requirements && (
                    <p className="text-red-500 text-sm mt-1">
                      * {formErrors.requirements}
                    </p>
                  )}
                </div>
              </div>
            )}

            {currentStep === "curriculum" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Curriculum</h2>
                  <button
                    type="button"
                    onClick={() => {
                      const newTopic: Topic = {
                        id: Date.now(),
                        title: "",
                        points: [],
                      };
                      setFormData((prev) => ({
                        ...prev,
                        curriculum: [...prev.curriculum, newTopic],
                      }));
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Topic
                  </button>
                </div>

                {formData.curriculum.map((topic, topicIndex) => (
                  <div
                    key={topic.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={topic.title}
                        onChange={(e) => {
                          const newCurriculum = [...formData.curriculum];
                          newCurriculum[topicIndex].title = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            curriculum: newCurriculum,
                          }));
                        }}
                        placeholder="Topic title"
                        className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors[`curriculum_topic_${topicIndex}`]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newCurriculum = formData.curriculum.filter(
                            (_, i) => i !== topicIndex
                          );
                          setFormData((prev) => ({
                            ...prev,
                            curriculum: newCurriculum,
                          }));
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {formErrors[`curriculum_topic_${topicIndex}`] && (
                      <p className="text-red-500 text-sm mb-2">
                        * {formErrors[`curriculum_topic_${topicIndex}`]}
                      </p>
                    )}

                    {topic.points.map((point, pointIndex) => (
                      <div
                        key={point.id}
                        className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2"
                      >
                        <input
                          type="text"
                          value={point.name}
                          onChange={(e) => {
                            const newCurriculum = [...formData.curriculum];
                            newCurriculum[topicIndex].points[pointIndex].name =
                              e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              curriculum: newCurriculum,
                            }));
                          }}
                          placeholder="Point name"
                          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors[
                              `curriculum_point_name_${topicIndex}_${pointIndex}`
                            ]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <input
                          type="url"
                          value={point.videoLink}
                          onChange={(e) => {
                            const newCurriculum = [...formData.curriculum];
                            newCurriculum[topicIndex].points[
                              pointIndex
                            ].videoLink = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              curriculum: newCurriculum,
                            }));
                          }}
                          placeholder="Video link"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={point.duration}
                            onChange={(e) => {
                              const newCurriculum = [...formData.curriculum];
                              newCurriculum[topicIndex].points[
                                pointIndex
                              ].duration = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                curriculum: newCurriculum,
                              }));
                            }}
                            placeholder="Duration (e.g., 10m 36s)"
                            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              formErrors[
                                `curriculum_point_duration_${topicIndex}_${pointIndex}`
                              ]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newCurriculum = [...formData.curriculum];
                              newCurriculum[topicIndex].points = newCurriculum[
                                topicIndex
                              ].points.filter((_, i) => i !== pointIndex);
                              setFormData((prev) => ({
                                ...prev,
                                curriculum: newCurriculum,
                              }));
                            }}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {formErrors[
                          `curriculum_point_name_${topicIndex}_${pointIndex}`
                        ] && (
                          <p className="text-red-500 text-sm">
                            *{" "}
                            {
                              formErrors[
                                `curriculum_point_name_${topicIndex}_${pointIndex}`
                              ]
                            }
                          </p>
                        )}
                        <div></div>
                        {formErrors[
                          `curriculum_point_duration_${topicIndex}_${pointIndex}`
                        ] && (
                          <p className="text-red-500 text-sm">
                            *{" "}
                            {
                              formErrors[
                                `curriculum_point_duration_${topicIndex}_${pointIndex}`
                              ]
                            }
                          </p>
                        )}
                      </div>
                    ))}

                    {formErrors[`curriculum_points_${topicIndex}`] && (
                      <p className="text-red-500 text-sm mb-2">
                        * {formErrors[`curriculum_points_${topicIndex}`]}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const newPoint: Point = {
                          id: Date.now(),
                          name: "",
                          videoLink: "",
                          duration: "",
                        };
                        const newCurriculum = [...formData.curriculum];
                        newCurriculum[topicIndex].points.push(newPoint);
                        setFormData((prev) => ({
                          ...prev,
                          curriculum: newCurriculum,
                        }));
                      }}
                      className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Point
                    </button>
                  </div>
                ))}

                {formErrors.curriculum && (
                  <p className="text-red-500 text-sm mt-1">
                    * {formErrors.curriculum}
                  </p>
                )}
              </div>
            )}

            {currentStep === "faqs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">FAQs</h2>
                  <button
                    type="button"
                    onClick={() => {
                      const newFAQ: FAQ = {
                        id: Date.now(),
                        question: "",
                        answer: "",
                      };
                      setFormData((prev) => ({
                        ...prev,
                        faqs: [...prev.faqs, newFAQ],
                      }));
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add FAQ
                  </button>
                </div>

                {formData.faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">FAQ {index + 1}</h3>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const newFAQs = formData.faqs.filter(
                              (_, i) => i !== index
                            );
                            setFormData((prev) => ({ ...prev, faqs: newFAQs }));
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Question
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const newFAQs = [...formData.faqs];
                            newFAQs[index].question = e.target.value;
                            setFormData((prev) => ({ ...prev, faqs: newFAQs }));
                          }}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors[`faq_question_${index}`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter question"
                        />
                        {formErrors[`faq_question_${index}`] && (
                          <p className="text-red-500 text-sm mt-1">
                            * {formErrors[`faq_question_${index}`]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Answer
                        </label>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => {
                            const newFAQs = [...formData.faqs];
                            newFAQs[index].answer = e.target.value;
                            setFormData((prev) => ({ ...prev, faqs: newFAQs }));
                          }}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors[`faq_answer_${index}`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter answer"
                        />
                        {formErrors[`faq_answer_${index}`] && (
                          <p className="text-red-500 text-sm mt-1">
                            * {formErrors[`faq_answer_${index}`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {formErrors.faqs && (
                  <p className="text-red-500 text-sm mt-1">
                    * {formErrors.faqs}
                  </p>
                )}
              </div>
            )}

            {currentStep === "preview" && (
              <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {formData.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                      {formData.tagline || "12 courses in 1"}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>0 students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-green-500" />
                        <span>All Levels</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span>
                          Last Updated: {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-indigo-500" />
                        <span>{formData.language}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex gap-4 mb-6 border-b">
                            {[
                              "Description",
                              "Curriculum",
                              "Instructor",
                              "Reviews",
                              "FAQs",
                            ].map((section) => (
                              <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`pb-2 px-1 border-b-2 ${
                                  activeSection === section
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                              >
                                {section}
                              </button>
                            ))}
                          </div>

                          {activeSection === "Description" && (
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-xl font-semibold mb-4">
                                  {formData.title}
                                </h3>
                                <div className="space-y-2 text-gray-600">
                                  <p>
                                    <strong>Duration:</strong>{" "}
                                    {formData.duration}
                                  </p>
                                  <p>
                                    <strong>Format:</strong>{" "}
                                    {formData.format || "Online, Self-Paced"}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3">
                                  Course Highlights
                                </h4>
                                <ul className="space-y-2">
                                  {formData.highlights
                                    .filter((h) => h.trim())
                                    .map((highlight, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600">
                                          {highlight}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3">
                                  Key Learning Outcomes
                                </h4>
                                <ul className="space-y-2">
                                  {formData.outcomes
                                    .filter((o) => o.trim())
                                    .map((outcome, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600">
                                          {outcome}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3">
                                  Target Audience
                                </h4>
                                <ul className="space-y-2">
                                  {formData.audience
                                    .filter((a) => a.trim())
                                    .map((item, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <Users className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600">
                                          {item}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {activeSection === "Curriculum" && (
                            <div>
                              <h3 className="text-xl font-semibold mb-4">
                                Course Content
                              </h3>
                              <div className="space-y-4">
                                {formData.curriculum.map((topic) => (
                                  <div
                                    key={topic.id}
                                    className="border border-gray-200 rounded-lg"
                                  >
                                    <div className="bg-gray-50 px-4 py-3 font-medium">
                                      {topic.title}
                                    </div>
                                    <div className="p-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {topic.points.map((point) => (
                                          <div
                                            key={point.id}
                                            className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                                          >
                                            <Play className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                              <p className="font-medium text-sm truncate">
                                                {point.name}
                                              </p>
                                              <span className="text-xs text-gray-500">
                                                {point.duration}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeSection === "FAQs" && (
                            <div className="space-y-4">
                              <h3 className="text-xl font-semibold mb-4">
                                Frequently Asked Questions
                              </h3>
                              {formData.faqs.map((faq) => (
                                <div
                                  key={faq.id}
                                  className="border border-gray-200 rounded-lg"
                                >
                                  <button
                                    onClick={() =>
                                      setExpandedFAQ(
                                        expandedFAQ === faq.id ? null : faq.id
                                      )
                                    }
                                    className="w-full flex items-center justify-between p-4 text-left"
                                  >
                                    <span className="font-medium">
                                      {faq.question}
                                    </span>
                                    {expandedFAQ === faq.id ? (
                                      <Minus className="h-4 w-4" />
                                    ) : (
                                      <Plus className="h-4 w-4" />
                                    )}
                                  </button>
                                  {expandedFAQ === faq.id && (
                                    <div className="px-4 pb-4 text-gray-600">
                                      {faq.answer}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h3 className="font-semibold mb-4">
                            This Course Includes
                          </h3>
                          <div className="text-2xl font-bold text-blue-600 mb-4">
                            ₹{formData.price.toLocaleString()}
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                              <Play className="h-4 w-4 text-red-500" />
                              <span>Lectures: {formData.lectures}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="h-4 w-4 text-green-500" />
                              <span>Duration: {formData.duration}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <BarChart3 className="h-4 w-4 text-blue-500" />
                              <span>
                                Skills: {formData.skills || "All Levels"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Globe className="h-4 w-4 text-purple-500" />
                              <span>Language: {formData.language}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="h-4 w-4 text-orange-500" />
                              <span>
                                Deadline: {formData.deadline || "TBD"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Award className="h-4 w-4 text-yellow-500" />
                              <span>
                                Certificate:{" "}
                                {formData.certificate ? "Yes" : "No"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h3 className="font-semibold mb-4">
                            Course Requirements
                          </h3>
                          <ol className="space-y-2 text-sm">
                            {formData.requirements
                              .filter((r) => r.trim())
                              .map((req, index) => (
                                <li key={index} className="flex gap-2">
                                  <span className="text-blue-600 font-medium">
                                    {index + 1}.
                                  </span>
                                  <span className="text-gray-600">{req}</span>
                                </li>
                              ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {currentStep === "preview" ? (
                <button
                  type="button"
                  onClick={handleSubmitCourse}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {editingCourse ? "Update Course" : "Create Course"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Approved Courses</h2>

      <div className="mb-6 flex items-start">
        {/* Top Bar with Search */}
        <div className="flex justify-between items-center mb-6">
          <TopSearch
            onSearch={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={handleAddCourse}
            placeholder="Search courses..."
            buttons={[]}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </div>
        <div className="border border-gray-300 rounded-md px-4 py-3 bg-gray-50">
          <div className="flex gap-6">
            {(["Instructor", "Employee"] as CourseViewType[]).map((view) => (
              <label
                key={view}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="courseView"
                  value={view}
                  checked={selectedView === view}
                  onChange={(e) =>
                    setSelectedView(e.target.value as CourseViewType)
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  {view}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <TableHead columns={getColumns()} />
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <IconButton
                          tooltip="Edit"
                          className="hover:text-green-600"
                          onClick={() => handleEditCourse(course)}
                        >
                          <Edit className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          tooltip="View"
                          className="hover:text-blue-600"
                          onClick={() => handleViewCourse(course)}
                        >
                          <Eye className="h-4 w-4" />
                        </IconButton>
                      </div>
                  </td>

                  <td className="p-3 border-b border-gray-400">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-gray-500">{course.date}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 border-b border-gray-400">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{course.instructor}</span>
                    </div>
                  </td>

                  <td className="p-3 border-b border-gray-400">
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

export default ApprovedCourses;

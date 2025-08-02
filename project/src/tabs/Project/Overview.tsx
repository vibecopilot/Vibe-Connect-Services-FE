import React, { useState, useCallback } from "react";
import {
  FiPlus,
  FiTrash2,
  FiEdit,
  FiEye,
  FiUpload,
  FiX,
} from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import DatePickerReact from "../../components/ReactDatePicker";
import TextArea from "../../components/TextArea";
import NoDataFound from "../../components/NoDataFound";

// Mock data for the table
const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    priority: "High",
    owner: "John Doe",
  },
  {
    id: 2,
    name: "Mobile App Development",
    progress: 45,
    startDate: "2024-02-01",
    endDate: "2024-06-01",
    priority: "Medium",
    owner: "Jane Smith",
  },
  {
    id: 3,
    name: "Database Migration",
    progress: 90,
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    priority: "High",
    owner: "Bob Johnson",
  },
];

// Helper component for input with error display (moved outside to prevent remounting)
const InputWithError: React.FC<{ children: React.ReactNode; error?: string }> = React.memo(({ children, error }) => (
  <div className="w-full">
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));

interface OverviewProps {
  onAddListTab?: () => void;
  
}

const Overview: React.FC<OverviewProps> = ({onAddListTab}) => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState(mockProjects);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [spaces, setSpaces] = useState([
    "Team Space",
    "Development",
    "Marketing",
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleTemplateClick = (templateName: string) => {
    if (templateName === "List" && onAddListTab) {
      onAddListTab(); // Call the function from Project component
    }
    setIsModalOpen(false);
  };


  // Form state
  const [formData, setFormData] = useState({
    name: "",
    startDate: null,
    endDate: null,
    space: "",
    privacy: "",
    teamMember: "",
    priority: "",
    taskName: "",
    taskStartDate: null,
    taskEndDate: null,
    assignee: "",
    taskDescription: "",
    totalBudget: "",
    projectDescription: "",
    note: "",
  });

  // New space form state
  const [newSpaceForm, setNewSpaceForm] = useState({
    name: "",
    description: "",
  });

  // Define the type for form errors
  type FormErrors = {
    name?: string;
    startDate?: string;
    endDate?: string;
    space?: string;
    spaceName?: string;
    teamMember?: string;
    priority?: string;
    taskStartDate?: string;
    taskEndDate?: string;
    totalBudget?: string;
  };

  // Form validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Validation functions
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (!formData.space.trim()) {
      newErrors.space = "Space selection is required";
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }

    // Date validation
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    // Task date validation
    if (formData.taskStartDate && formData.taskEndDate) {
      if (new Date(formData.taskStartDate) >= new Date(formData.taskEndDate)) {
        newErrors.taskEndDate = "Task end date must be after task start date";
      }
    }

    // Task dates should be within project dates
    if (formData.startDate && formData.taskStartDate) {
      if (new Date(formData.taskStartDate) < new Date(formData.startDate)) {
        newErrors.taskStartDate =
          "Task start date cannot be before project start date";
      }
    }

    if (formData.endDate && formData.taskEndDate) {
      if (new Date(formData.taskEndDate) > new Date(formData.endDate)) {
        newErrors.taskEndDate =
          "Task end date cannot be after project end date";
      }
    }

    // Budget validation
    if (formData.totalBudget && isNaN(formData.totalBudget)) {
      newErrors.totalBudget = "Budget must be a valid number";
    }

    if (formData.totalBudget && parseFloat(formData.totalBudget) < 0) {
      newErrors.totalBudget = "Budget cannot be negative";
    }

    // Email validation for team member (if it looks like an email)
    if (formData.teamMember && formData.teamMember.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.teamMember)) {
        newErrors.teamMember = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const validateSpaceForm = useCallback(() => {
    const newErrors = {};

    if (!newSpaceForm.name.trim()) {
      newErrors.spaceName = "Space name is required";
    }

    return Object.keys(newErrors).length === 0;
  }, [newSpaceForm]);

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

  const tableColumns = [
    { label: "Action", align: "center" },
    { label: "Name", align: "left" },
    { label: "Progress", align: "center" },
    { label: "Start Date", align: "center" },
    { label: "End Date", align: "center" },
    { label: "Priority", align: "center" },
    { label: "Owner", align: "left" },
  ];

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    // Clear error for this field when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleDateChange = useCallback((fieldName, e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    
    // Clear error for this field when user changes date
    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));

    setFormData((prev) => ({
      ...prev,
      [fieldName]: date,
    }));
  }, []);

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);

    // Validate file size (max 10MB per file)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const removeFile = useCallback((index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addCategory = useCallback(() => {
    if (newCategoryName.trim()) {
      setCategoryNames((prev) => [...prev, newCategoryName.trim()]);
      setNewCategoryName("");
    }
  }, [newCategoryName]);

  const removeCategory = useCallback((index) => {
    setCategoryNames((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleCreateSpace = useCallback(() => {
    if (validateSpaceForm()) {
      if (newSpaceForm.name.trim()) {
        setSpaces((prev) => [...prev, newSpaceForm.name.trim()]);
        setFormData((prev) => ({ ...prev, space: newSpaceForm.name.trim() }));
        setNewSpaceForm({ name: "", description: "" });
        setIsCreateSpaceOpen(false);
        // Clear any space-related errors
        setErrors((prev) => ({ ...prev, spaceName: "" }));
      }
    } else {
      // Set error if validation fails
      setErrors((prev) => ({ ...prev, spaceName: "Space name is required" }));
    }
  }, [newSpaceForm, validateSpaceForm]);

  const handleCreateProject = useCallback(() => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector(
        '[style*="border-color: red"]'
      );
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const newProject = {
      id: Date.now(),
      name: formData.name,
      progress: 0,
      startDate: formData.startDate?.toISOString().split("T")[0] || "",
      endDate: formData.endDate?.toISOString().split("T")[0] || "",
      priority: formData.priority,
      owner: formData.teamMember,
    };

    setProjects((prev) => [...prev, newProject]);
    setEditingProject(null);

    // Reset form
    setFormData({
      name: "",
      startDate: null,
      endDate: null,
      space: "",
      privacy: "",
      teamMember: "",
      priority: "",
      taskName: "",
      taskStartDate: null,
      taskEndDate: null,
      assignee: "",
      taskDescription: "",
      totalBudget: "",
      projectDescription: "",
      note: "",
    });
    setSelectedFiles([]);
    setCategoryNames([]);
    setErrors({});
    setIsFormOpen(false);
  }, [validateForm]);

  const handleEdit = useCallback((project) => {
    setEditingProject(project);
    setFormData({
      name: project.name || "",
      startDate: project.startDate ? new Date(project.startDate) : null,
      endDate: project.endDate ? new Date(project.endDate) : null,
      space: project.space || "",
      privacy: project.privacy || "",
      teamMember: project.owner || "",
      priority: project.priority || "",
      taskName: project.taskName || "",
      taskStartDate: project.taskStartDate ? new Date(project.taskStartDate) : null,
      taskEndDate: project.taskEndDate ? new Date(project.taskEndDate) : null,
      assignee: project.assignee || "",
      taskDescription: project.taskDescription || "",
      totalBudget: project.totalBudget || "",
      projectDescription: project.projectDescription || "",
      note: project.note || "",
    });
    setErrors({});
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  }, []);

  const handleView = useCallback((project) => {
    setViewingProject(project);
    setFormData({
      name: project.name || "",
      startDate: project.startDate ? new Date(project.startDate) : null,
      endDate: project.endDate ? new Date(project.endDate) : null,
      space: project.space || "",
      privacy: project.privacy || "",
      teamMember: project.owner || "",
      priority: project.priority || "",
      taskName: project.taskName || "",
      taskStartDate: project.taskStartDate ? new Date(project.taskStartDate) : null,
      taskEndDate: project.taskEndDate ? new Date(project.taskEndDate) : null,
      assignee: project.assignee || "",
      taskDescription: project.taskDescription || "",
      totalBudget: project.totalBudget || "",
      projectDescription: project.projectDescription || "",
      note: project.note || "",
    });
    setErrors({});
    setIsFormOpen(true);
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingProject(null);
    setViewingProject(null);
    setFormData({
      name: "",
      startDate: null,
      endDate: null,
      space: "",
      privacy: "",
      teamMember: "",
      priority: "",
      taskName: "",
      taskStartDate: null,
      taskEndDate: null,
      assignee: "",
      taskDescription: "",
      totalBudget: "",
      projectDescription: "",
      note: "",
    });
    setSelectedFiles([]);
    setCategoryNames([]);
    setErrors({});
  }, []);

  if (isFormOpen) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-gray-200 p-4 rounded-t-lg">
          <h1 className="text-xl font-semibold text-center">
            {viewingProject
              ? "View Project"
              : editingProject
              ? "Edit Project"
              : "Create Project"}
          </h1>
        </div>
        <div className="bg-white p-6 rounded-b-lg shadow-md">
          <p className="text-gray-600 mb-6">
            All Projects are located within a Space.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <InputWithError error={errors.name}>
              <TextInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={!!viewingProject}
                style={errors.name ? { borderColor: "red" } : {}}
              />
            </InputWithError>

            <InputWithError error={errors.startDate}>
              <div>
                <label className="block text-sm mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <DatePickerReact
                  value={formData.startDate}
                  onChange={(e) => handleDateChange("startDate", e)}
                  name="startDate"
                  disabled={!!viewingProject}
                  style={errors.startDate ? { borderColor: "red" } : {}}
                />
              </div>
            </InputWithError>

            <InputWithError error={errors.endDate}>
              <div>
                <label className="block text-sm mb-1">
                  End Date <span className="text-red-500">*</span>
                </label>
                <DatePickerReact
                  value={formData.endDate}
                  onChange={(e) => handleDateChange("endDate", e)}
                  name="endDate"
                  disabled={!!viewingProject}
                  style={errors.endDate ? { borderColor: "red" } : {}}
                />
              </div>
            </InputWithError>
                  
            <div className="md:col-span-2">
              <InputWithError error={errors.space}>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Select
                      label="Space"
                      name="space"
                      value={formData.space}
                      onChange={handleInputChange}
                      options={spaces}
                      required
                      disabled={!!viewingProject}
                      style={errors.space ? { borderColor: "red" } : {}}
                    />
                  </div>
                  {!viewingProject && (
                    <button
                      type="button"
                      onClick={() => setIsCreateSpaceOpen(!isCreateSpaceOpen)}
                      className="mt-5 mb-4 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                    >
                      {isCreateSpaceOpen ? "Cancel" : "Create New Space"}
                    </button>
                  )}
                </div>
              </InputWithError>

              {/* Inline Space Creation Card */}
              {isCreateSpaceOpen && !viewingProject && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Create New Space
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create a new workspace for your projects.
                  </p>

                  <div className="space-y-3">
                    <InputWithError error={errors.spaceName}>
                      <TextInput
                        label="Space Name"
                        name="spaceName"
                        value={newSpaceForm.name}
                        onChange={(e) =>
                          setNewSpaceForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                        style={errors.spaceName ? { borderColor: "red" } : {}}
                      />
                    </InputWithError>

                    <TextArea
                      label="Description (Optional)"
                      name="description"
                      value={newSpaceForm.description}
                      onChange={(e) =>
                        setNewSpaceForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={2}
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleCreateSpace}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                      >
                        Create Space
                      </button>
                      <button
                        onClick={() => setIsCreateSpaceOpen(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
<br />
            <InputWithError error={errors.teamMember}>
              <TextInput
                label="Team Member"
                name="teamMember"
                value={formData.teamMember}
                onChange={handleInputChange}
                disabled={!!viewingProject}
                style={errors.teamMember ? { borderColor: "red" } : {}}
              />
            </InputWithError>

            <InputWithError error={errors.priority}>
              <Select
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                options={["High", "Medium", "Low"]}
                required
                disabled={!!viewingProject}
                style={errors.priority ? { borderColor: "red" } : {}}
              />
            </InputWithError>

            <TextInput
              label="Privacy"
              name="privacy"
              value={formData.privacy}
              onChange={handleInputChange}
              disabled={!!viewingProject}
            />
          </div>

          {/* Project Task Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Project Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Name"
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
                disabled={!!viewingProject}
              />

              <InputWithError error={errors.taskStartDate}>
                <div>
                  <label className="block text-sm mb-1">Task Start Date</label>
                  <DatePickerReact
                    value={formData.taskStartDate}
                    onChange={(e) => handleDateChange("taskStartDate", e)}
                    name="taskStartDate"
                    disabled={!!viewingProject}
                    style={errors.taskStartDate ? { borderColor: "red" } : {}}
                  />
                </div>
              </InputWithError>

              <InputWithError error={errors.taskEndDate}>
                <div>
                  <label className="block text-sm mb-1">Task End Date</label>
                  <DatePickerReact
                    value={formData.taskEndDate}
                    onChange={(e) => handleDateChange("taskEndDate", e)}
                    name="taskEndDate"
                    disabled={!!viewingProject}
                    style={errors.taskEndDate ? { borderColor: "red" } : {}}
                  />
                </div>
              </InputWithError>

              <Select
                label="Select Assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleInputChange}
                options={["John Doe", "Jane Smith", "Bob Johnson"]}
                disabled={!!viewingProject}
              />
            </div>

            <div className="mt-4">
              <TextArea
                label="Task Description"
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleInputChange}
                rows={3}
                disabled={!!viewingProject}
              />
            </div>

            {/* File Upload Section */}
            {!viewingProject && (
              <div className="mt-4">
                <label className="block text-sm mb-2">Upload Attachments</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="attachments"
                    accept=".pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png,.gif"
                  />
                  <label
                    htmlFor="attachments"
                    className="cursor-pointer flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <FiUpload size={20} />
                    Click to upload files (Max 10MB per file)
                  </label>
                  {selectedFiles.length > 0 && (
                    <div className="mt-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-100 p-2 rounded mb-1"
                        >
                          <span className="text-sm">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                            MB)
                          </span>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Project Budget Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Project Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWithError error={errors.totalBudget}>
                <TextInput
                  label="Total Project Budget"
                  name="totalBudget"
                  value={formData.totalBudget}
                  onChange={handleInputChange}
                  disabled={!!viewingProject}
                  type="number"
                  min="0"
                  step="0.01"
                  style={errors.totalBudget ? { borderColor: "red" } : {}}
                />
              </InputWithError>

              <div className="flex gap-2">
                <TextInput
                  label="Category Name"
                  name="categoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  disabled={!!viewingProject}
                />
                {!viewingProject && (
                  <button
                    type="button"
                    onClick={addCategory}
                    disabled={!newCategoryName.trim()}
                    className="mt-6 mb-5  bg-blue-500 text-white px-7 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>

            {categoryNames.length > 0 && (
              <div className="mt-2">
                <label className="block text-sm mb-2">Categories:</label>
                <div className="flex flex-wrap gap-2">
                  {categoryNames.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 px-3 py-1 rounded"
                    >
                      <span className="text-sm">{category}</span>
                      {!viewingProject && (
                        <button
                          onClick={() => removeCategory(index)}
                          className="ml-2 text-red-500"
                        >
                          <FiX size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <TextArea
              label="Description"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              rows={4}
              disabled={!!viewingProject}
            />

            <TextArea
              label="Note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              rows={3}
              disabled={!!viewingProject}
            />
          </div>

          <div className="flex justify-center gap-4">
            {!viewingProject && (
              <button
                onClick={handleCreateProject}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                {editingProject ? "Update" : "Create"}
              </button>
            )}
            <button
              onClick={closeForm}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              {viewingProject ? "Close" : "Cancel"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          <FiPlus size={20} />
          View
        </button>

        {/* Three horizontal boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600 font-medium">Recent</h3>
              <FiTrash2 className="text-gray-400 cursor-pointer hover:text-red-500" />
            </div>
            <p className="text-sm text-gray-500">Project 1 - in Team Space</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600 font-medium">Do's</h3>
              <FiTrash2 className="text-gray-400 cursor-pointer hover:text-red-500" />
            </div>
            <p className="text-sm text-gray-500">Project 2 - in Development</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600 font-medium">Bookmarks</h3>
              <FiTrash2 className="text-gray-400 cursor-pointer hover:text-red-500" />
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Bookmarks are the easiest way to save clickup items or URLs from anywhere on the web.
            </p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
              Add Bookmark
            </button>
          </div>
        </div>
      </div>

      {/* List Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">List</h2>

        <TopSearch
          onSearch={() => setIsSearchOpen(!isSearchOpen)}
          onButtonClick={(type) => {
            if (type === "Add Project") {
              setIsFormOpen(true);
            }
          }}
          buttons={["Add Project"]}
          isSearchOpen={isSearchOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placehoder="Search projects by name or owner"
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <TableHead columns={tableColumns} />
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-400 hover:bg-gray-50">
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        <button
                          onClick={() => handleView(project)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <FiEye size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="p-3">{project.name}</td>
                    <td className="p-3 text-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {project.progress}%
                      </span>
                    </td>
                    <td className="p-3 text-center">{project.startDate}</td>
                    <td className="p-3 text-center">{project.endDate}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          project.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : project.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {project.priority}
                      </span>
                    </td>
                    <td className="p-3">{project.owner}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-0">
                    <NoDataFound 
                      message={searchTerm ? `No projects found matching "${searchTerm}"` : "No projects found"} 
                      className="py-8"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Resource</h3>
            <FiTrash2 className="text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Add File
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Workload by Status</h3>
            <FiTrash2 className="text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-8 border-blue-500 border-t-gray-300 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs">75%</div>
                  <div className="text-xs text-gray-500">Assigned</div>
                </div>
              </div>
            </div>
            <div className="ml-4">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Assigned</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm">Unassigned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
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
                  onClick={() => handleTemplateClick(template.name)}
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
    </div>
  );
};

export default Overview;
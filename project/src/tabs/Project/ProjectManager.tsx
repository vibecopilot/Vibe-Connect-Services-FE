import React, { useState } from 'react';
import Overview from './Overview';
import List from './List';

const ProjectManager = () => {
  const [currentView, setCurrentView] = useState('overview'); // 'overview' or 'list'
  const [projects, setProjects] = useState([]);
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

  const handleProjectCreated = (projectData) => {
    // Add to projects list
    const newProject = {
      id: Date.now(),
      name: projectData.name,
      progress: 0,
      startDate: projectData.startDate?.toISOString().split("T")[0] || "",
      endDate: projectData.endDate?.toISOString().split("T")[0] || "",
      priority: projectData.priority,
      owner: projectData.teamMember,
    };
    setProjects((prev) => [...prev, newProject]);

    // Add to tasks list
    const newTask = {
      id: Date.now() + 1, // Ensure unique ID
      name: projectData.name,
      assignee: projectData.teamMember || "Unassigned",
      startDate: projectData.startDate?.toISOString().split("T")[0] || "",
      endDate: projectData.endDate?.toISOString().split("T")[0] || "",
      priority: projectData.priority?.toLowerCase() || "medium",
      // Add additional fields from the form
      space: projectData.space,
      privacy: projectData.privacy,
      taskName: projectData.taskName,
      taskStartDate: projectData.taskStartDate?.toISOString().split("T")[0] || "",
      taskEndDate: projectData.taskEndDate?.toISOString().split("T")[0] || "",
      taskAssignee: projectData.assignee,
      taskDescription: projectData.taskDescription,
      totalBudget: projectData.totalBudget,
      projectDescription: projectData.projectDescription,
      note: projectData.note,
    };
    setTasks((prev) => [...prev, newTask]);

    // Navigate to List view
    setCurrentView('list');
  };

  const handleNavigateToOverview = () => {
    setCurrentView('overview');
  };

  const handleNavigateToList = () => {
    setCurrentView('list');
  };

  return (
    <div>
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
        <div className="flex gap-4">
          <button
            onClick={handleNavigateToOverview}
            className={`px-4 py-2 rounded-md ${
              currentView === 'overview'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={handleNavigateToList}
            className={`px-4 py-2 rounded-md ${
              currentView === 'list'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Content */}
      {currentView === 'overview' && (
        <Overview
          projects={projects}
          setProjects={setProjects}
          onProjectCreated={handleProjectCreated}
          onNavigateToList={handleNavigateToList}
        />
      )}
      {currentView === 'list' && (
        <List
          tasks={tasks}
          setTasks={setTasks}
          onNavigateToOverview={handleNavigateToOverview}
        />
      )}
    </div>
  );
};

export default ProjectManager;
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';

const Gantt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamSpaceExpanded, setIsTeamSpaceExpanded] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState({
    'Project': false,
    'Test21': false
  });

  // Templates for the modal
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

  // Generate date range (Jun 15-21)
  const generateDateRange = () => {
    const dates = [];
    const startDate = new Date(2024, 5, 13); // June 13, 2024 (Friday)
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDateRange();
  const today = new Date(2024, 5, 17); // June 17 (Tuesday)

  const formatDate = (date) => {
    const day = date.getDate();
    return day;
  };

  const formatDayName = (date) => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return days[date.getDay()];
  };

  const isToday = (date) => {
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const toggleProject = (projectName) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectName]: !prev[projectName]
    }));
  };

  return (
    <div className="h-screen flex flex-col ">
      {/* View Button */}
      <div className="p-6 pb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <Plus size={20} />
          View
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Popular</h2>
              <button
                onClick={() => setIsModalOpen(false)}
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

      {/* Gantt Chart Container */}
      <div className="flex-1 mx-6 mb-6 bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="grid grid-cols-6 border-b border-gray-300 flex-shrink-0">
          {/* Name Column Header */}
          <div className="col-span-1 p-3 bg-gray-50 border-r border-gray-300">
            <span className="font-medium text-gray-700">Name</span>
          </div>
          
          {/* Date Timeline Header */}
          <div className="col-span-5 p-3 bg-gray-50 text-center">
            <span className="font-medium text-gray-700">Jun15-21</span>
          </div>
        </div>

        {/* Sub-header with individual dates */}
        <div className="grid grid-cols-6 border-b border-gray-300 flex-shrink-0 relative">
          <div className="col-span-1 border-r border-gray-300"></div>
          {dates.map((date, index) => (
            <div 
              key={index} 
              className={`p-2 text-center text-sm border-r border-gray-300 relative ${
                isToday(date) ? 'bg-blue-50' : ''
              }`}
            >
              <div className="font-medium text-gray-600">
                {formatDayName(date)} {formatDate(date)}
              </div>
            </div>
          ))}
          
          {/* Now Label - positioned to attach to the blue line */}
          <div 
            className="absolute bottom-0 text-xs bg-blue-500 text-white px-1 rounded z-20"
            style={{ 
              left: `${16.67 + (4 * 16.67)}%`,
              transform: 'translateX(-5%)',
              bottom: '-15px'
            }}
          >
            Now
          </div>
        </div>
        
        {/* Today Line - Starting from team space row */}
        <div 
          className="absolute w-0.5 bg-blue-500 z-10 pointer-events-none"
          style={{ 
            left: `${16.67 + (4 * 16.67)}%`,
            transform: 'translateX(-50%)',
            top: '85px', // Start from after the sub-header
            bottom: '0'
          }}
        />

        {/* Content Area - Full height with borders */}
        <div className="flex-1 flex flex-col">
          {/* Team Space Row */}
          <div className="grid grid-cols-6 min-h-[60px] flex-shrink-0">
            <div className="col-span-1 p-3 border-r border-gray-300 bg-gray-50">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsTeamSpaceExpanded(!isTeamSpaceExpanded)}
              >
                {isTeamSpaceExpanded ? (
                  <ChevronDown size={16} className="text-gray-500" />
                ) : (
                  <ChevronRight size={16} className="text-gray-500" />
                )}
                <span className="text-gray-700 font-medium">Team Space</span>
                <div className="ml-auto w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center">
                  <Plus size={12} className="text-gray-400" />
                </div>
              </div>
            </div>
            {dates.map((date, index) => (
              <div 
                key={index} 
                className={`border-r border-gray-200 min-h-[60px] ${
                  isToday(date) ? 'bg-blue-50' : ''
                }`}
              />
            ))}
          </div>

          {/* Project Rows - Only show when Team Space is expanded */}
          {isTeamSpaceExpanded && (
            <>
              {/* Project Row */}
              <div className="grid grid-cols-6 min-h-[50px]  border-gray-300 flex-shrink-0">
                <div className="col-span-1 p-3 pl-8 border-r border-gray-300">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleProject('Project')}
                  >
                    {expandedProjects['Project'] ? (
                      <ChevronDown size={14} className="text-gray-500" />
                    ) : (
                      <ChevronRight size={14} className="text-gray-500" />
                    )}
                    <span className="text-gray-600">Project</span>
                  </div>
                </div>
                {dates.map((date, index) => (
                  <div 
                    key={index} 
                    className={`border-r border-gray-200 min-h-[50px] ${
                      isToday(date) ? 'bg-blue-50' : ''
                    }`}
                  />
                ))}
              </div>

              {/* Project Details - Only show when Project is expanded */}
              {expandedProjects['Project'] && (
                <>
                  <div className="grid grid-cols-6 min-h-[40px]  border-gray-300 bg-gray-25 flex-shrink-0">
                    <div className="col-span-1 p-3 pl-12 border-r border-gray-300">
                      <span className="text-gray-500 text-sm">Task 1</span>
                    </div>
                    {dates.map((date, index) => (
                      <div 
                        key={index} 
                        className={`border-r border-gray-200 min-h-[40px] ${
                          isToday(date) ? 'bg-blue-50' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-6 min-h-[40px] border-gray-300 bg-gray-25 flex-shrink-0">
                    <div className="col-span-1 p-3 pl-12 border-r border-gray-300">
                      <span className="text-gray-500 text-sm">Task 2</span>
                    </div>
                    {dates.map((date, index) => (
                      <div 
                        key={index} 
                        className={`border-r border-gray-300 min-h-[40px] ${
                          isToday(date) ? 'bg-blue-50' : ''
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Test21 Row */}
              <div className="grid grid-cols-6 min-h-[50px]  border-gray-300 flex-shrink-0">
                <div className="col-span-1 p-3 pl-8 border-r border-gray-300">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleProject('Test21')}
                  >
                    {expandedProjects['Test21'] ? (
                      <ChevronDown size={14} className="text-gray-500" />
                    ) : (
                      <ChevronRight size={14} className="text-gray-500" />
                    )}
                    <span className="text-gray-600">Test21</span>
                  </div>
                </div>
                {dates.map((date, index) => (
                  <div 
                    key={index} 
                    className={`border-r border-gray-300 min-h-[50px] ${
                      isToday(date) ? 'bg-blue-50' : ''
                    }`}
                  />
                ))}
              </div>

              {/* Test21 Details - Only show when Test21 is expanded */}
              {expandedProjects['Test21'] && (
                <>
                  <div className="grid grid-cols-6 min-h-[40px]  border-gray-300 bg-gray-25 flex-shrink-0">
                    <div className="col-span-1 p-3 pl-12 border-r border-gray-300">
                      <span className="text-gray-500 text-sm">Task A</span>
                    </div>
                    {dates.map((date, index) => (
                      <div 
                        key={index} 
                        className={`border-r border-gray-300 min-h-[40px] ${
                          isToday(date) ? 'bg-blue-50' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-6 min-h-[40px] border-gray-300 bg-gray-25 flex-shrink-0">
                    <div className="col-span-1 p-3 pl-12 border-r border-gray-300">
                      <span className="text-gray-500 text-sm">Task B</span>
                    </div>
                    {dates.map((date, index) => (
                      <div 
                        key={index} 
                        className={`border-r border-gray-300 min-h-[40px] ${
                          isToday(date) ? 'bg-blue-50' : ''
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Fill remaining space with borders extending to full height */}
          <div className="flex-1 grid grid-cols-6  border-gray-300">
            <div className="col-span-1 border-r border-gray-300 h-full"></div>
            {dates.map((date, index) => (
              <div 
                key={index} 
                className={`border-r border-gray-300 h-full ${
                  isToday(date) ? 'bg-blue-50' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gantt;
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Sample data for the line chart
  const activeEmployeesData = [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 48 },
    { month: 'Apr', count: 61 },
    { month: 'May', count: 55 },
    { month: 'Jun', count: 67 },
  ];

  // Sample data for popular instructors
  const popularInstructors = [
    { name: 'John Smith', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face' },
    { name: 'Mike Davis', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { name: 'Emily Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
  ];

  // Sample data for recent courses
  const recentCourses = [
    {
      name: 'React Fundamentals',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=60&fit=crop',
      instructor: 'John Smith',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    {
      name: 'JavaScript Mastery',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=80&h=60&fit=crop',
      instructor: 'Sarah Johnson',
      instructorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face'
    },
    {
      name: 'CSS Grid Layout',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=60&fit=crop',
      instructor: 'Mike Davis',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    {
      name: 'Node.js Backend',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=80&h=60&fit=crop',
      instructor: 'Emily Chen',
      instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
  ];

  // Sample data for activity
  const activities = [
    {
      name: 'Alex Turner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      activity: 'Completed React Course'
    },
    {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      activity: 'Started JavaScript Module'
    },
    {
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      activity: 'Submitted Assignment'
    },
    {
      name: 'Lisa Brown',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face',
      activity: 'Joined New Course'
    },
  ];

  return (
      <div className="border border-gray-300 rounded-lg bg-white p-6 min-h-screen ml-3 mr-3">
        {/* Top 3 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md pl-6 pr-6">
            <div className="bg-gray-100 text-center py-2 rounded mb-4 -mx-6 px-6">
              <h3 className="font-semibold text-gray-700">Courses</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">124</div>
              <div className="text-gray-600">Total Courses</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md pr-6 pl-6">
            <div className="bg-gray-100 text-center py-2 rounded mb-4 -mx-6 px-6">
              <h3 className="font-semibold text-gray-700">Employees</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">67</div>
              <div className="text-gray-600">Total Employees</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md pr-6 pl-6">
            <div className="bg-gray-100 text-center py-2 rounded mb-4 -mx-6 px-6">
              <h3 className="font-semibold text-gray-700">Instructors</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">23</div>
              <div className="text-gray-600 mb-3">Total Instructors</div>
            </div>
          </div>
        </div>

        {/* Active Employees Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-300">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Active Employees</h3>
            <div className="text-3xl font-bold text-gray-800 mt-2">67</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeEmployeesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Popular Instructors */}
          <div className="bg-gray-100 rounded-lg shadow-md p-6 h-96">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Popular Instructors</h3>
            <hr className="border-gray-300 mb-4" />
            <div className="space-y-4">
              {popularInstructors.map((instructor, index) => (
                <div key={index}>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={instructor.avatar} 
                      alt={instructor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-gray-700 font-medium">{instructor.name}</span>
                  </div>
                  {index < popularInstructors.length - 1 && <hr className="border-gray-300 mt-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Courses */}
          <div className="bg-gray-100 rounded-lg shadow-md p-6 h-96 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Recent Courses</h3>
            <hr className="border-gray-300 mb-4" />
            <div className="space-y-6 flex-1">
              {recentCourses.map((course, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="w-16 h-12 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-800 truncate">{course.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <img 
                        src={course.instructorAvatar} 
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-600">{course.instructor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-gray-100 rounded-lg shadow-md p-6 h-96 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Activity</h3>
            <hr className="border-gray-300 mb-4" />
            <div className="space-y-6 relative flex-1">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 relative">
                  {index < activities.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-10 bg-gray-300"></div>
                  )}
                  <img 
                    src={activity.avatar} 
                    alt={activity.name}
                    className="w-10 h-10 rounded-full object-cover relative z-10 bg-white border-2 border-white"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">{activity.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{activity.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
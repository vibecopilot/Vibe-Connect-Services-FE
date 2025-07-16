import React from 'react';
import { Calendar, Clock, IndianRupee } from 'lucide-react';

const Summary: React.FC = () => {
  const previewCourse = {
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  };

  const progressPercentage = 65;

  return (
    <div className="">
      <div className="flex gap-6 h-full">
        {/* Left Part - 60% */}
        <div className="w-3/5">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            {/* Project Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Project Description</h2>
              <p className="text-gray-600 leading-relaxed">
                This project aims to develop a comprehensive web application that streamlines business processes 
                and enhances user experience. The platform will integrate modern technologies to provide seamless 
                functionality across different devices and platforms. Our goal is to create an intuitive interface 
                that meets the evolving needs of our target market while maintaining high performance standards.
              </p>
            </div>

            {/* Target Audience */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Target Audience</h2>
              <p className="text-gray-600 leading-relaxed">
                Our primary target audience consists of small to medium-sized businesses looking to digitize their 
                operations. This includes business owners, managers, and employees who need efficient tools to manage 
                their daily tasks. The platform is designed for users with varying technical expertise, from beginners 
                to advanced users, ensuring accessibility and ease of use for everyone.
              </p>
            </div>

            {/* Competition */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Competition</h2>
              <p className="text-gray-600 leading-relaxed">
                The market currently has several established players offering similar solutions, including enterprise-level 
                platforms and smaller niche applications. Our competitive advantage lies in our focus on user experience, 
                affordable pricing, and customizable features that can adapt to specific business needs. We differentiate 
                ourselves through superior customer support and continuous innovation based on user feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Right Part - 40% */}
        <div className="w-2/5 flex flex-col gap-6">
          {/* First Card - Assignee and Team */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-500 mb-4">Assignee</h2>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={previewCourse.instructorAvatar}
                alt={previewCourse.instructor}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{previewCourse.instructor}</p>
                <p className="text-sm text-gray-500">Owner</p>
              </div>
            </div>
            
            <hr className="mb-4" />
            
            <h2 className="text-xl text-gray-500 font-semibold mb-4">Team</h2>
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

          {/* Second Card - Project Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">Start Date</span>
                </div>
                <span className="text-gray-700">2025-06-01</span>
              </div>
              <hr className='text-[#5e5e5e]' />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">End Date</span>
                </div>
                <span className="text-gray-700">2025-08-30</span>
              </div>
              <hr className='text-[#5e5e5e]' />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">Estimated Time</span>
                </div>
                <span className="text-gray-700">30 days</span>
              </div>
              <hr className='text-[#5e5e5e]' />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">Cost</span>
                </div>
                <span className="text-gray-700">₹50,000</span>
              </div>
            </div>
          </div>

          {/* Third Card - Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Progress</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Completion</span>
                <span className="text-gray-700 font-medium">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
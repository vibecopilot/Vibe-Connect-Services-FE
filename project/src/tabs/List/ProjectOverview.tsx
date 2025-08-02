import React, { useState } from 'react';
import { Edit, Calendar, Clock, IndianRupee, X, CheckCircle, MessageCircle, AlertTriangle, Send, Database, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import DatePickerReact from '../../components/ReactDatePicker';
import Select from '../../components/Select';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';

const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=random";

// Main Component
const ProjectOverview = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskType, setTaskType] = useState('self');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      member: { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      task: 'UI Design Review',
      deadline: '2025-07-01',
      workload: 75
    },
    {
      id: 2,
      member: { name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      task: 'Backend Development',
      deadline: '2025-07-05',
      workload: 60
    }
  ]);

  const [taskForm, setTaskForm] = useState({
    taskTopic: '',
    deadline: null as Date | null,
    assignee: '',
    dependentTask: '',
    description: '',
    file: null as File | null,
    avatarUrl: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const pieData = [
    { name: 'Completed', value: 65, color: '#22c55e' },
    { name: 'Remaining', value: 35, color: '#e5e7eb' }
  ];

  const handleTaskFormChange = (field: string, value: any) => {
    setTaskForm(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setTaskForm(prev => ({
          ...prev,
          file,
          avatarUrl: ev.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setTaskForm(prev => ({ ...prev, file: null, avatarUrl: '' }));
    }
    setFormErrors(prev => ({ ...prev, file: '' }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!taskForm.taskTopic.trim()) errors.taskTopic = 'Task topic is required';
    if (!taskForm.deadline) errors.deadline = 'Deadline is required';
    if (!taskForm.assignee.trim()) errors.assignee = 'Assignee is required';
    if (!taskForm.dependentTask.trim()) errors.dependentTask = 'Dependent task is required';
    if (!taskForm.description.trim()) errors.description = 'Description is required';
    if (!taskForm.file) errors.file = 'File is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveTask = () => {
    if (!validateForm()) return;
    const newTask = {
      id: tasks.length + 1,
      member: {
        name: taskForm.assignee || 'You',
        avatar: taskForm.avatarUrl || defaultAvatar
      },
      task: taskForm.taskTopic,
      deadline: taskForm.deadline ? (typeof taskForm.deadline === 'string' ? taskForm.deadline : taskForm.deadline.toISOString().split('T')[0]) : '',
      workload: Math.floor(Math.random() * 100)
    };
    setTasks(prev => [...prev, newTask]);
    setShowModal(false);
    setTaskForm({
      taskTopic: '',
      deadline: null,
      assignee: '',
      dependentTask: '',
      description: '',
      file: null,
      avatarUrl: ''
    });
    setFormErrors({});
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Part - 70% */}
      <div className="flex-1 p-6 overflow-y-auto" style={{ width: '70%' }}>
        {/* Project Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Project Summary</h2>
            <Edit className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
          <hr className="mb-4" />
          <p className="text-gray-600 mb-6">
            Give a high level overview of the product/project you're working on, its goals, etc. 
            <br />Elaborate on the target audience of your project/product, link out to additional resources.
          </p>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className='text-gray-500'>Start Date</span>
              </div>
              <span className="text-gray-700">2025-06-01</span>
            </div>
            <hr className="text-gray-500" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className='text-gray-500'>End Date</span>
              </div>
              <span className="text-gray-700">2025-08-30</span>
            </div>
            <hr className='text-gray-500' />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className='text-gray-500'>Estimated Time</span>
              </div>
              <span className="text-gray-700">30 days</span>
            </div>
            <hr className='text-gray-500' />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
                <span className='text-gray-500'>Cost</span>
              </div>
              <span className="text-gray-700">₹50,000</span>
            </div>
          </div>
        </div>

        {/* Budget Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Budget</h2>
              <hr className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Total Budget */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl">₹50,000</p>
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
                      <p className="text-2xl">₹0</p>
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
                      <p className="text-2xl">₹50,000</p>
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
                      <p className="text-2xl">₹0</p>
                      <p className="text-gray-500">Over Spent</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Database className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              
              
            </div>

        {/* Upcoming Deadlines Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 rounded-md">
                  <th className="text-left p-3 rounded-l-md text-[#5e5e5e text-[#5e5e5e]]">Member</th>
                  <th className="text-left p-3 text-[#5e5e5e text-[#5e5e5e]]">Task</th>
                  <th className="text-left p-3 text-[#5e5e5e text-[#5e5e5e]]">Deadline</th>
                  <th className="text-left p-3 rounded-r-md text-[#5e5e5e text-[#5e5e5e]]">Workload</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border border-gray-200 rounded-md">
                    <td className="p-3 text-[#5e5e5e]">
                      <div className="flex items-center">
                        <img
                          src={task.member.avatar}
                          alt={task.member.name}
                          className="w-8 h-8 rounded-full object-cover mr-2 border"
                          onError={e => (e.currentTarget.src = defaultAvatar)}
                        />
                        <span>{task.member.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-[#5e5e5e]">{task.task}</td>
                    <td className="p-3 text-[#5e5e5e]">{task.deadline}</td>
                    <td className="p-3 text-[#5e5e5e]">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${task.workload}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{task.workload}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Part - 30% */}
      <div className="w-[30%] p-6 space-y-8 overflow-y-auto">
        {/* Launch Date Card */}
        <div className="bg-[#7991BB] rounded-lg shadow-md p-8">
          <h3 className="text-lg text-white font-semibold mb-4">Launch Date</h3>
          <div className="text-3xl font-bold text-white mb-4">30 Days</div>
          <div className="text-sm text-white">
            Delay Date: <span className="font-medium">2025-08-30</span>
          </div>
        </div>

        {/* Overall Progress Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-lg font-semibold text-center mb-6">Overall Progress</h3>
          <div className="relative h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">65%</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <span className="text-blue-500 text-sm cursor-pointer">View All</span>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium">Task Finished</div>
                <div className="text-sm text-gray-600">UI design completed successfully</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">New Comment</div>
                <div className="text-sm text-gray-600">Review feedback added</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <div className="font-medium">Task Overdue</div>
                <div className="text-sm text-gray-600">Backend API deadline missed</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Send className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium">Update Send to Client</div>
                <div className="text-sm text-gray-600">Weekly progress report sent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Create Task</h3>
              <X className="w-5 h-5 cursor-pointer" onClick={() => setShowModal(false)} />
            </div>
            
            <div className="flex mb-4">
              <button 
                className={`px-4 py-2 mr-2 rounded ${taskType === 'self' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setTaskType('self')}
              >
                Self Task
              </button>
              <button 
                className={`px-4 py-2 rounded ${taskType === 'assign' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setTaskType('assign')}
              >
                Assign to Others
              </button>
            </div>
            
            <hr className="mb-4" />
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <TextInput
                  label="Task Topic"
                  name="taskTopic"
                  value={taskForm.taskTopic}
                  onChange={(e) => handleTaskFormChange('taskTopic', e.target.value)}
                  required
                />
                {formErrors.taskTopic && <div className="text-red-500 text-xs mt-1">{formErrors.taskTopic}</div>}
              </div>
              
              <div>
                <DatePickerReact
                  label="Deadline"
                  name="deadline"
                  value={taskForm.deadline}
                  onChange={(e) => handleTaskFormChange('deadline', e.target.value)}
                  required
                />
                {formErrors.deadline && <div className="text-red-500 text-xs mt-1">{formErrors.deadline}</div>}
              </div>
              
              <div>
                <Select
                  label="Assignee"
                  name="assignee"
                  value={taskForm.assignee}
                  onChange={(e) => handleTaskFormChange('assignee', e.target.value)}
                  options={[
                    'John Doe',
                    'Jane Smith',
                    'Bob Johnson',
                    'Alice Brown'
                  ]}
                  placeholder="Select assignee"
                />
                {formErrors.assignee && <div className="text-red-500 text-xs mt-1">{formErrors.assignee}</div>}
              </div>
              
              <div>
                <Select
                  label="Select Dependent Task"
                  name="dependentTask"
                  value={taskForm.dependentTask}
                  onChange={(e) => handleTaskFormChange('dependentTask', e.target.value)}
                  options={['UI Design', 'Backend Setup', 'Database Design']}
                  placeholder="Select dependent task"
                />
                {formErrors.dependentTask && <div className="text-red-500 text-xs mt-1">{formErrors.dependentTask}</div>}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm mb-1">Choose File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray border border-gray-300 rounded-lg cursor-pointer focus:outline-none file:bg-blue-500 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none file:cursor-pointer"
              />
              {formErrors.file && <div className="text-red-500 text-xs mt-1">{formErrors.file}</div>}
              {taskForm.avatarUrl && (
                <img
                  src={taskForm.avatarUrl}
                  alt="Preview"
                  className="w-16 h-16 rounded-full mt-2 object-cover border"
                />
              )}
            </div>
            
            <div>
              <TextArea
                label="Description"
                name="description"
                value={taskForm.description}
                onChange={(e) => handleTaskFormChange('description', e.target.value)}
                rows={3}
                placeholder="Enter task description..."
              />
              {formErrors.description && <div className="text-red-500 text-xs mt-1">{formErrors.description}</div>}
            </div>
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleSaveTask}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;
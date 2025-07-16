import React from 'react';
import { Plus, ExternalLink, ChevronDown, MoreVertical, Award } from 'lucide-react';

const Dashboard = () => {
  // Sample data for pie charts
  const attendanceData = {
    total: 40,
    subtitle: 'Punched in',
    items: [
      { label: 'On Site', value: 27, color: 'bg-green-500' },
      { label: 'In Office', value: 13, color: 'bg-blue-500' },
      { label: 'Expected', value: 20, color: 'bg-gray-300' }
    ]
  };

  const activitiesData = {
    total: 43,
    subtitle: 'Total',
    items: [
      { label: 'Completed', value: 27, color: 'bg-green-500' },
      { label: 'Ongoing', value: 6, color: 'bg-blue-500' },
      { label: 'Scheduled', value: 6, color: 'bg-orange-500' },
      { label: 'Missed', value: 4, color: 'bg-red-500' }
    ]
  };

  const expensesData = {
    total: '₹540/-',
    subtitle: 'Claimed',
    items: [
      { label: 'Pending', value: '₹100/-', color: 'bg-red-500' },
      { label: 'Approved', value: '₹1,400/-', color: 'bg-green-500' },
      { label: 'Rejected', value: '₹140/-', color: 'bg-orange-500' }
    ]
  };

  const clients = [
    { id: 1, name: 'The Capital', color: 'bg-red-500' },
    { id: 2, name: 'Time Square', color: 'bg-red-500' },
    { id: 3, name: 'One International', color: 'bg-yellow-500' },
    { id: 4, name: 'Peninsula Business Park', color: 'bg-orange-400' }
  ];

  const teamMembers = [
    { name: 'Suresh Singal', status: 'In Meeting', avatar: '/api/placeholder/32/32' },
    { name: 'Suresh Singal', status: 'In Transit', avatar: '/api/placeholder/32/32' },
    { name: 'Suresh Singal', status: 'Punched Out', avatar: '/api/placeholder/32/32' },
    { name: 'Suresh Singal', status: 'In Transit', avatar: '/api/placeholder/32/32' },
    { name: 'Suresh Singal', status: 'In Meeting', avatar: '/api/placeholder/32/32' },
    { name: 'Suresh Singal', status: 'In Meeting', avatar: '/api/placeholder/32/32' },
    { name: 'Suresh Singal', status: 'Punched Out', avatar: '/api/placeholder/32/32' }
  ];

  const activities = [
    { name: 'HDFC Bank', status: 'Completed', icon: 'bg-gray-400' },
    { name: 'Times of India', status: 'Ongoing', icon: 'bg-green-500' },
    { name: 'Times of India', status: 'Scheduled', icon: 'bg-green-500' },
    { name: 'Times of India', status: 'Scheduled', icon: 'bg-blue-500' },
    { name: 'Times of India', status: 'Ongoing', icon: 'bg-blue-500' },
    { name: 'Times of India', status: 'Scheduled', icon: 'bg-red-500' },
    { name: 'Times of India', status: 'Completed', icon: 'bg-gray-400' }
  ];

  // Color mapping function
  const getColorClass = (bgColor) => {
    const colorMap = {
      'bg-green-500': 'text-green-500',
      'bg-blue-500': 'text-blue-500',
      'bg-gray-300': 'text-gray-400',
      'bg-orange-500': 'text-orange-500',
      'bg-red-500': 'text-red-500'
    };
    return colorMap[bgColor] || 'text-gray-500';
  };

  const PieChart = ({ data, size = 120 }) => {
    const total = data.items.reduce((sum, item) => sum + (typeof item.value === 'number' ? item.value : 0), 0);
    let currentAngle = 0;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    return (
      <div className="relative flex items-center justify-center h-full">
        <svg width={size} height={size} className="transform -rotate-90">
          {data.items.map((item, index) => {
            if (typeof item.value !== 'number') return null;
            const percentage = item.value / total;
            const strokeDasharray = `${percentage * circumference} ${circumference}`;
            const strokeDashoffset = -currentAngle * circumference / 100;
            currentAngle += percentage * 100;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color.replace('bg-', '').replace('green-500', '#10b981').replace('blue-500', '#3b82f6').replace('gray-300', '#d1d5db').replace('orange-500', '#f97316').replace('red-500', '#ef4444')}
                strokeWidth="10"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-800">{data.total}</div>
          <div className="text-xs text-gray-500">{data.subtitle}</div>
        </div>
      </div>
    );
  };

  const StatCard = ({ title, data, children }) => (
    <div className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden h-48">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 text-center">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <ExternalLink className="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer transition-colors" />
          <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-blue-500" />
          </div>
        </div>
      </div>
      <hr className="mb-4 border-gray-200" />
      <div className="h-32">
        {children}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top 4 boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Attendance */}
        <StatCard title="ATTENDANCE" data={attendanceData}>
          <div className="flex items-center h-full">
            <div className="w-1/2 h-full flex items-center justify-center">
              <PieChart data={attendanceData} />
            </div>
            <div className="w-1/2 space-y-2 pl-10">
              {attendanceData.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className={`text-lg font-bold ${getColorClass(item.color)}`}>
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-500 ml-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </StatCard>

        {/* Activities */}
        <StatCard title="ACTIVITIES" data={activitiesData}>
          <div className="flex items-center h-full">
            <div className="w-1/2 h-full flex items-center justify-center">
              <PieChart data={activitiesData} />
            </div>
            <div className="w-1/2 space-y-1 pl-4">
              {activitiesData.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className={`text-sm font-bold ${getColorClass(item.color)}`}>
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-500 ml-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </StatCard>

        {/* Expenses */}
        <StatCard title="EXPENSES" data={expensesData}>
          <div className="flex items-center h-full">
            <div className="w-1/2 h-full flex items-center justify-center">
              <div className="relative flex items-center justify-center w-32 h-32">
                <svg width="120" height="120" className="transform -rotate-90">
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" strokeWidth="10" strokeDasharray="50 282" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#f97316" strokeWidth="10" strokeDasharray="30 282" strokeDashoffset="-50" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="202 282" strokeDashoffset="-80" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold text-gray-800">{expensesData.total}</div>
                  <div className="text-xs text-gray-500">{expensesData.subtitle}</div>
                </div>
              </div>
            </div>
            <div className="w-1/2 space-y-1 pl-4">
              {expensesData.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className={`text-xs font-bold ${getColorClass(item.color)}`}>
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-500 ml-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </StatCard>

        {/* Clients */}
        <StatCard title="CLIENTS">
          <div className="space-y-1">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full ${client.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {client.id}
                </div>
                <span className="text-sm text-gray-700">{client.name}</span>
              </div>
            ))}
          </div>
        </StatCard>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Team */}
        <div className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden" style={{height: '400px'}}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">MY TEAM</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Showing:</span>
              <div className="flex items-center space-x-1 text-xs">
                <span>Punched in</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center ml-2">
                <Plus className="w-4 h-4 text-blue-500" />
              </div>
            </div>
          </div>
          <hr className="mb-4 border-gray-200" />
          <div className="space-y-0 overflow-y-auto" style={{height: 'calc(100% - 80px)'}}>
            {teamMembers.map((member, index) => (
              <div key={index}>
                <div className="flex items-center space-x-3 py-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">SS</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{member.name}</div>
                    <div className="text-xs text-gray-500">+91 9876543210</div>
                  </div>
                  <span className="text-xs text-gray-500">{member.status}</span>
                </div>
                {index < teamMembers.length - 1 && <hr className="border-gray-100" />}
              </div>
            ))}
          </div>
        </div>

        {/* Current Activities */}
        <div className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden" style={{height: '400px'}}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">CURRENT ACTIVITIES</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Showing:</span>
              <div className="flex items-center space-x-1 text-xs">
                <span>All</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center ml-2">
                <Plus className="w-4 h-4 text-blue-500" />
              </div>
            </div>
          </div>
          <hr className="mb-4 border-gray-200" />
          <div className="space-y-0 overflow-y-auto" style={{height: 'calc(100% - 80px)'}}>
            {activities.map((activity, index) => (
              <div key={index}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${activity.icon} flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">
                        {activity.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{activity.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.status}</span>
                </div>
                {index < activities.length - 1 && <hr className="border-gray-100" />}
              </div>
            ))}
          </div>
        </div>

        {/* Additions and Leaderboard */}
        <div className="space-y-6">
          {/* Additions */}
          <div className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden" style={{height: '180px'}}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1 text-center">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">ADDITIONS</h3>
              </div>
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <hr className="mb-2 border-gray-200" />
            <div className="flex items-center justify-center space-x-8 h-full -mt-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">FORMS</div>
                <div className="text-3xl font-bold text-orange-500">300</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">CUSTOMERS</div>
                <div className="text-3xl font-bold text-blue-500">54</div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden" style={{height: '208px'}}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1 text-center">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">LEADERBOARD</h3>
              </div>
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <hr className="mb-4 border-gray-200" />
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide text-center">INDIVIDUAL</div>
            <hr className="mb-4 border-gray-200" />
            <div className="space-y-0">
              {[1, 2, 3].map((rank, index) => (
                <div key={rank}>
                  <div className="flex items-center space-x-3 py-2">
                    <Award className="w-6 h-6 text-blue-500" />
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">SS</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Suresh Singal</span>
                  </div>
                  {index < 2 && <hr className="border-gray-100" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
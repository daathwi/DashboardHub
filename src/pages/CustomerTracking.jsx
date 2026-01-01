import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, ComposedChart } from 'recharts'
import { Search, UserPlus, Users, MessageSquare, Filter, RefreshCw, Download, TrendingUp, Mail, Phone, Calendar, ArrowUp, ArrowDown } from 'lucide-react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

function CustomerTracking() {
  const [customers, setCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    new: 0,
    engaged: 0,
    churned: 0,
  })
  const [engagementData, setEngagementData] = useState([])
  const [customerLifetime, setCustomerLifetime] = useState([])
  const [statusDistribution, setStatusDistribution] = useState([])

  useEffect(() => {
    generateData()
  }, [])

  const generateData = () => {
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown', 
                   'Diana Prince', 'Edward Norton', 'Fiona Apple', 'George Clooney', 'Hannah Montana',
                   'Isaac Newton', 'Julia Roberts', 'Kevin Hart', 'Lisa Simpson', 'Michael Jordan']
    const statuses = ['Active', 'Inactive', 'New', 'Engaged', 'Churned']
    const companies = ['Acme Corp', 'Tech Solutions', 'Global Inc', 'StartupXYZ', 'MegaCorp', 'InnovateCo', 'FutureTech']
    const industries = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing']
    
    const customersData = Array.from({ length: 75 }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length] + ` ${Math.floor(i / names.length) + 1}`,
      email: `customer${i + 1}@example.com`,
      company: companies[i % companies.length],
      industry: industries[i % industries.length],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      value: Math.floor(Math.random() * 150000) + 10000,
      lastContact: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      lifetimeValue: Math.floor(Math.random() * 50000) + 5000,
      interactions: Math.floor(Math.random() * 50) + 5,
    }))
    
    setCustomers(customersData)
    
    setStats({
      total: customersData.length,
      active: customersData.filter(c => c.status === 'Active').length,
      new: customersData.filter(c => c.status === 'New').length,
      engaged: customersData.filter(c => c.status === 'Engaged').length,
      churned: customersData.filter(c => c.status === 'Churned').length,
    })

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    setEngagementData(months.map(month => ({
      month,
      active: Math.floor(Math.random() * 100) + 50,
      new: Math.floor(Math.random() * 50) + 20,
      engaged: Math.floor(Math.random() * 80) + 30,
      churned: Math.floor(Math.random() * 15) + 5,
    })))

    setCustomerLifetime(months.map(month => ({
      month,
      value: Math.floor(Math.random() * 20000) + 10000,
      count: Math.floor(Math.random() * 30) + 10,
    })))

    const statusCounts = {
      Active: customersData.filter(c => c.status === 'Active').length,
      New: customersData.filter(c => c.status === 'New').length,
      Engaged: customersData.filter(c => c.status === 'Engaged').length,
      Inactive: customersData.filter(c => c.status === 'Inactive').length,
      Churned: customersData.filter(c => c.status === 'Churned').length,
    }
    setStatusDistribution(Object.entries(statusCounts).map(([name, value]) => ({ name, value })))
  }

  const handleSimulate = () => {
    generateData()
  }

  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === 'all' || customer.status === filterStatus
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'value':
          return b.value - a.value
        case 'lifetime':
          return b.lifetimeValue - a.lifetimeValue
        case 'date':
          return new Date(b.lastContact) - new Date(a.lastContact)
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const statCards = [
    { label: 'Total Customers', value: stats.total, icon: Users, color: 'blue', change: '+12', positive: true },
    { label: 'Active', value: stats.active, icon: UserPlus, color: 'green', change: '+8', positive: true },
    { label: 'New', value: stats.new, icon: UserPlus, color: 'orange', change: '+5', positive: true },
    { label: 'Engaged', value: stats.engaged, icon: MessageSquare, color: 'purple', change: '+15', positive: true },
    { label: 'Churned', value: stats.churned, icon: TrendingUp, color: 'red', change: '-2', positive: false },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'New': return 'bg-blue-100 text-blue-800'
      case 'Engaged': return 'bg-purple-100 text-purple-800'
      case 'Inactive': return 'bg-gray-100 text-gray-800'
      case 'Churned': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Tracking</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Comprehensive customer management and analytics</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={handleSimulate}
            className="px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            orange: 'bg-orange-50 text-orange-600',
            purple: 'bg-purple-50 text-purple-600',
            red: 'bg-red-50 text-red-600',
          }
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {stat.positive ? (
                  <div className="flex items-center text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                    <ArrowUp className="w-2.5 h-2.5 mr-0.5" />
                    <span className="text-xs font-medium">{stat.change}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                    <ArrowDown className="w-2.5 h-2.5 mr-0.5" />
                    <span className="text-xs font-medium">{stat.change}</span>
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Customer Engagement Trend</h3>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Area type="monotone" dataKey="active" stackId="1" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} name="Active" />
              <Area type="monotone" dataKey="new" stackId="2" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} name="New" />
              <Area type="monotone" dataKey="engaged" stackId="3" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} name="Engaged" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Lifetime Value</h3>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={customerLifetime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#6b7280" />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="value" fill="#0088FE" name="LTV ($)" radius={[8, 8, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="count" stroke="#00C49F" strokeWidth={2} name="Count" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="mb-3 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5 hidden sm:block" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="New">New</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Churned">Churned</option>
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="value">Sort by Value</option>
                <option value="lifetime">Sort by LTV</option>
                <option value="date">Sort by Date</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LTV</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.slice(0, 15).map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.company}</div>
                      <div className="text-sm text-gray-500">{customer.industry}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${customer.value.toLocaleString()}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">${customer.lifetimeValue.toLocaleString()}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-gray-500">No customers found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerTracking

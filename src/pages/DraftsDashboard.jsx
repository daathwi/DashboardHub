import { useState, useEffect } from 'react'
import { FileText, Edit, Trash2, Save, Plus, Clock, User, RefreshCw, Download, Filter, Search, BarChart2, TrendingUp, Eye } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

function DraftsDashboard() {
  const [drafts, setDrafts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inReview: 0,
    completed: 0,
    draft: 0,
  })
  const [typeStats, setTypeStats] = useState([])
  const [statusTrend, setStatusTrend] = useState([])
  const [authorStats, setAuthorStats] = useState([])

  useEffect(() => {
    generateData()
  }, [])

  const generateData = () => {
    const types = ['Proposal', 'Contract', 'Report', 'Presentation', 'Invoice', 'Agreement', 'Memo']
    const statuses = ['Draft', 'Pending', 'In Review', 'Completed']
    const authors = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown', 'Diana Prince']
    
    const draftsData = Array.from({ length: 45 }, (_, i) => ({
      id: i + 1,
      title: `${types[i % types.length]} ${i + 1}`,
      type: types[i % types.length],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      author: authors[i % authors.length],
      lastModified: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      createdDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      size: Math.floor(Math.random() * 800) + 50,
      views: Math.floor(Math.random() * 100) + 5,
      priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    }))
    
    setDrafts(draftsData)
    
    setStats({
      total: draftsData.length,
      pending: draftsData.filter(d => d.status === 'Pending').length,
      inReview: draftsData.filter(d => d.status === 'In Review').length,
      completed: draftsData.filter(d => d.status === 'Completed').length,
      draft: draftsData.filter(d => d.status === 'Draft').length,
    })

    const typeCounts = types.reduce((acc, type) => {
      acc[type] = draftsData.filter(d => d.type === type).length
      return acc
    }, {})
    setTypeStats(Object.entries(typeCounts).map(([name, value]) => ({ name, value })))

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    setStatusTrend(months.map(month => ({
      month,
      draft: Math.floor(Math.random() * 15) + 5,
      pending: Math.floor(Math.random() * 10) + 3,
      inReview: Math.floor(Math.random() * 8) + 2,
      completed: Math.floor(Math.random() * 20) + 10,
    })))

    const authorCounts = authors.reduce((acc, author) => {
      acc[author] = draftsData.filter(d => d.author === author).length
      return acc
    }, {})
    setAuthorStats(Object.entries(authorCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value))
  }

  const handleSimulate = () => {
    generateData()
  }

  const handleDelete = (id) => {
    setDrafts(drafts.filter(d => d.id !== id))
    setStats(prev => ({
      ...prev,
      total: prev.total - 1,
    }))
  }

  const handleStatusChange = (id, newStatus) => {
    setDrafts(drafts.map(d => d.id === id ? { ...d, status: newStatus } : d))
    const updatedDrafts = drafts.map(d => d.id === id ? { ...d, status: newStatus } : d)
    setStats({
      total: updatedDrafts.length,
      pending: updatedDrafts.filter(d => d.status === 'Pending').length,
      inReview: updatedDrafts.filter(d => d.status === 'In Review').length,
      completed: updatedDrafts.filter(d => d.status === 'Completed').length,
      draft: updatedDrafts.filter(d => d.status === 'Draft').length,
    })
  }

  const filteredDrafts = drafts
    .filter(draft => {
      const matchesSearch = draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           draft.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || draft.status === filterStatus
      const matchesType = filterType === 'all' || draft.type === filterType
      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'size':
          return b.size - a.size
        case 'views':
          return b.views - a.views
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return new Date(b.lastModified) - new Date(a.lastModified)
      }
    })

  const statCards = [
    { label: 'Total Drafts', value: stats.total, icon: FileText, color: 'blue', change: '+5', positive: true },
    { label: 'Draft', value: stats.draft, icon: FileText, color: 'gray', change: '+2', positive: true },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'orange', change: '+3', positive: true },
    { label: 'In Review', value: stats.inReview, icon: Edit, color: 'yellow', change: '+1', positive: true },
    { label: 'Completed', value: stats.completed, icon: Save, color: 'green', change: '+8', positive: true },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800'
      case 'Pending': return 'bg-orange-100 text-orange-800'
      case 'In Review': return 'bg-yellow-100 text-yellow-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Proposal': return 'bg-blue-100 text-blue-800'
      case 'Contract': return 'bg-purple-100 text-purple-800'
      case 'Report': return 'bg-indigo-100 text-indigo-800'
      case 'Presentation': return 'bg-pink-100 text-pink-800'
      case 'Invoice': return 'bg-green-100 text-green-800'
      case 'Agreement': return 'bg-teal-100 text-teal-800'
      case 'Memo': return 'bg-cyan-100 text-cyan-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Drafts Dashboard</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Document management and workflow tracking</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button className="px-3 sm:px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Draft</span>
          </button>
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
            gray: 'bg-gray-50 text-gray-600',
            orange: 'bg-orange-50 text-orange-600',
            yellow: 'bg-yellow-50 text-yellow-600',
            green: 'bg-green-50 text-green-600',
          }
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex items-center text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                  <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                  <span className="text-xs font-medium">{stat.change}</span>
                </div>
              </div>
              <p className="text-xs font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Drafts by Type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={typeStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Status Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={statusTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="draft" stroke="#6b7280" strokeWidth={2} name="Draft" />
              <Line type="monotone" dataKey="pending" stroke="#FF8042" strokeWidth={2} name="Pending" />
              <Line type="monotone" dataKey="inReview" stroke="#FFBB28" strokeWidth={2} name="In Review" />
              <Line type="monotone" dataKey="completed" stroke="#00C49F" strokeWidth={2} name="Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Authors</h3>
          <div className="space-y-3">
            {authorStats.slice(0, 5).map((author, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{author.name}</p>
                    <p className="text-xs text-gray-500">{author.value} drafts</p>
                  </div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(author.value / Math.max(...authorStats.map(a => a.value))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { status: 'Draft', count: stats.draft, fill: '#6b7280' },
              { status: 'Pending', count: stats.pending, fill: '#f97316' },
              { status: 'In Review', count: stats.inReview, fill: '#eab308' },
              { status: 'Completed', count: stats.completed, fill: '#22c55e' },
            ]} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="status" type="category" stroke="#6b7280" width={80} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value) => [`${value} drafts`, 'Count']}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="mb-3 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search drafts..."
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
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Proposal">Proposal</option>
              <option value="Contract">Contract</option>
              <option value="Report">Report</option>
              <option value="Presentation">Presentation</option>
              <option value="Invoice">Invoice</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="size">Sort by Size</option>
              <option value="views">Sort by Views</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDrafts.map((draft) => (
                <tr key={draft.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3">
                    <div className="flex items-center min-w-0">
                      <FileText className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-900 truncate">{draft.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(draft.type)}`}>
                      {draft.type}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={draft.status}
                      onChange={(e) => handleStatusChange(draft.id, e.target.value)}
                      className={`px-1.5 py-0.5 text-xs font-semibold rounded-full border-0 ${getStatusColor(draft.status)} cursor-pointer`}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center min-w-0">
                      <User className="w-3 h-3 text-gray-400 mr-1.5 flex-shrink-0" />
                      <span className="text-xs text-gray-500 truncate">{draft.author}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(draft.priority)}`}>
                      {draft.priority}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-500">{draft.size} KB</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye className="w-3 h-3 mr-1" />
                      {draft.views}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-500">{draft.lastModified}</td>
                  <td className="px-3 py-3 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <button className="text-blue-600 hover:text-blue-900" title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(draft.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDrafts.length === 0 && (
          <div className="text-center py-8 text-gray-500">No drafts found</div>
        )}
      </div>
    </div>
  )
}

export default DraftsDashboard

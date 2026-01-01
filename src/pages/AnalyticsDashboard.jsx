import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Activity, Users, DollarSign, ArrowUp, ArrowDown, RefreshCw, Download, Calendar, Target } from 'lucide-react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 1250000,
    activeUsers: 15234,
    conversionRate: 3.45,
    avgSession: 4.2,
    bounceRate: 32.5,
    pageViews: 245678,
  })
  const [revenueData, setRevenueData] = useState([])
  const [userGrowth, setUserGrowth] = useState([])
  const [trafficSources, setTrafficSources] = useState([])
  const [deviceBreakdown, setDeviceBreakdown] = useState([])

  useEffect(() => {
    generateData()
  }, [])

  const generateData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    
    setRevenueData(months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 300000) + 150000,
      profit: Math.floor(Math.random() * 100000) + 50000,
      target: 200000,
    })))

    setUserGrowth(months.map(month => ({
      month,
      new: Math.floor(Math.random() * 500) + 200,
      active: Math.floor(Math.random() * 2000) + 1000,
      returning: Math.floor(Math.random() * 1500) + 800,
    })))

    setTrafficSources([
      { source: 'Organic Search', value: 45, visitors: 110556 },
      { source: 'Direct', value: 28, visitors: 68791 },
      { source: 'Social Media', value: 15, visitors: 36852 },
      { source: 'Referral', value: 8, visitors: 19654 },
      { source: 'Email', value: 4, visitors: 9827 },
    ])

    setDeviceBreakdown([
      { device: 'Desktop', value: 52, users: 127754 },
      { device: 'Mobile', value: 38, users: 93357 },
      { device: 'Tablet', value: 10, users: 24568 },
    ])
  }

  const handleSimulate = () => {
    generateData()
    setMetrics(prev => ({
      totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 50000) - 25000,
      activeUsers: prev.activeUsers + Math.floor(Math.random() * 500) - 250,
      conversionRate: Math.max(0, Math.min(10, prev.conversionRate + (Math.random() * 0.5 - 0.25))),
      avgSession: Math.max(0, Math.min(10, prev.avgSession + (Math.random() * 0.3 - 0.15))),
      bounceRate: Math.max(0, Math.min(100, prev.bounceRate + (Math.random() * 2 - 1))),
      pageViews: prev.pageViews + Math.floor(Math.random() * 10000) - 5000,
    }))
  }

  const kpiCards = [
    { label: 'Total Revenue', value: `$${(metrics.totalRevenue / 1000).toFixed(0)}k`, icon: DollarSign, color: 'blue', change: '+12.5%', positive: true, subtitle: 'this month' },
    { label: 'Active Users', value: metrics.activeUsers.toLocaleString(), icon: Users, color: 'green', change: '+8.3%', positive: true, subtitle: 'growing' },
    { label: 'Conversion Rate', value: `${metrics.conversionRate.toFixed(2)}%`, icon: Target, color: 'purple', change: '+0.45%', positive: true, subtitle: 'visitor to customer' },
    { label: 'Avg Session', value: `${metrics.avgSession.toFixed(1)}m`, icon: Activity, color: 'orange', change: '+0.2m', positive: true, subtitle: 'duration' },
    { label: 'Bounce Rate', value: `${metrics.bounceRate.toFixed(1)}%`, icon: TrendingUp, color: 'red', change: '-2.1%', positive: true, subtitle: 'lower is better' },
    { label: 'Page Views', value: metrics.pageViews.toLocaleString(), icon: Activity, color: 'indigo', change: '+15.2%', positive: true, subtitle: 'total views' },
  ]

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Comprehensive business analytics and insights</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6">
        {kpiCards.map((metric, index) => {
          const Icon = metric.icon
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600',
            red: 'bg-red-50 text-red-600',
            indigo: 'bg-indigo-50 text-indigo-600',
          }
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${colorClasses[metric.color]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {metric.positive ? (
                  <div className="flex items-center text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                    <ArrowUp className="w-2.5 h-2.5 mr-0.5" />
                    <span className="text-xs font-medium">{metric.change}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                    <ArrowDown className="w-2.5 h-2.5 mr-0.5" />
                    <span className="text-xs font-medium">{metric.change}</span>
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 mb-1">{metric.label}</p>
              <p className="text-xl font-bold text-gray-900 mb-0.5">{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.subtitle}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Revenue & Profit Trend</h3>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="target" fill="#e0e7ff" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0.3} name="Target" />
                <Bar dataKey="revenue" fill="#0088FE" name="Revenue ($)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="profit" fill="#00C49F" name="Profit ($)" radius={[8, 8, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">User Growth</h3>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          {userGrowth.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="new" stackId="1" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} name="New Users" />
                <Area type="monotone" dataKey="active" stackId="2" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} name="Active Users" />
                <Area type="monotone" dataKey="returning" stackId="3" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} name="Returning Users" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value, name, props) => [`${props.payload.visitors.toLocaleString()} visitors`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Device Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deviceBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ device, percent }) => `${device} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deviceBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value, name, props) => [`${props.payload.users.toLocaleString()} users`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard


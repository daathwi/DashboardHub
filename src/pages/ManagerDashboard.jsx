import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Target, Award, TrendingUp, Users, ArrowUp, ArrowDown, RefreshCw, Activity, Clock, CheckCircle, AlertCircle, Download, Filter } from 'lucide-react'

function ManagerDashboard() {
  const [teamData, setTeamData] = useState([])
  const [performance, setPerformance] = useState([])
  const [individualPerformance, setIndividualPerformance] = useState([])
  const [kpis, setKpis] = useState({
    target: 95,
    achievement: 87,
    teamSize: 24,
    satisfaction: 4.2,
    productivity: 88,
    efficiency: 92,
  })

  useEffect(() => {
    generateData()
  }, [])

  const generateData = () => {
    const teams = [
      { name: 'Sales Team', performance: 92, target: 90, members: 8, revenue: 450000 },
      { name: 'Marketing Team', performance: 88, target: 90, members: 6, revenue: 320000 },
      { name: 'Development Team', performance: 95, target: 90, members: 12, revenue: 0 },
      { name: 'Support Team', performance: 85, target: 90, members: 5, revenue: 0 },
      { name: 'Operations Team', performance: 91, target: 90, members: 7, revenue: 280000 },
    ]
    setTeamData(teams)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const perfData = months.map(month => ({
      month,
      actual: Math.floor(Math.random() * 20) + 80,
      target: 90,
      efficiency: Math.floor(Math.random() * 15) + 85,
    }))
    setPerformance(perfData)

    const individuals = [
      { name: 'John Smith', role: 'Team Lead', performance: 94, tasks: 45, completed: 42, rating: 4.8 },
      { name: 'Sarah Johnson', role: 'Senior Manager', performance: 91, tasks: 38, completed: 36, rating: 4.6 },
      { name: 'Mike Davis', role: 'Manager', performance: 88, tasks: 32, completed: 29, rating: 4.4 },
      { name: 'Emily Brown', role: 'Coordinator', performance: 85, tasks: 28, completed: 25, rating: 4.2 },
      { name: 'David Wilson', role: 'Specialist', performance: 82, tasks: 25, completed: 22, rating: 4.0 },
    ]
    setIndividualPerformance(individuals)
  }

  const handleSimulate = () => {
    generateData()
    setKpis(prev => ({
      target: prev.target,
      achievement: Math.max(80, Math.min(100, prev.achievement + (Math.random() * 3 - 1.5))),
      teamSize: prev.teamSize + Math.floor(Math.random() * 3 - 1),
      satisfaction: Math.max(3.5, Math.min(5, prev.satisfaction + (Math.random() * 0.2 - 0.1))),
      productivity: Math.max(80, Math.min(100, prev.productivity + (Math.random() * 5 - 2.5))),
      efficiency: Math.max(85, Math.min(100, prev.efficiency + (Math.random() * 3 - 1.5))),
    }))
  }

  const kpiCards = [
    { label: 'Target Achievement', value: `${kpis.achievement.toFixed(2)}%`, icon: Target, color: 'blue', change: '+2.3%', positive: true, subtitle: 'of quarterly goal' },
    { label: 'Team Performance', value: `${(teamData.reduce((sum, t) => sum + t.performance, 0) / teamData.length).toFixed(2)}%`, icon: Award, color: 'green', change: '+1.8%', positive: true, subtitle: 'average score' },
    { label: 'Team Size', value: kpis.teamSize.toString(), icon: Users, color: 'purple', change: '+2', positive: true, subtitle: 'active members' },
    { label: 'Satisfaction', value: kpis.satisfaction.toFixed(2), icon: TrendingUp, color: 'orange', change: '+0.2', positive: true, subtitle: 'out of 5.0' },
    { label: 'Productivity', value: `${kpis.productivity.toFixed(2)}%`, icon: Activity, color: 'indigo', change: '+3.1%', positive: true, subtitle: 'team efficiency' },
    { label: 'Overall Efficiency', value: `${kpis.efficiency.toFixed(2)}%`, icon: CheckCircle, color: 'teal', change: '+1.5%', positive: true, subtitle: 'operational' },
  ]

  const radarData = teamData.map(team => ({
    team: team.name,
    performance: team.performance,
    target: team.target,
    efficiency: Math.floor(Math.random() * 20) + 80,
    productivity: Math.floor(Math.random() * 20) + 80,
  }))

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manager Dashboard</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Team performance analytics and management insights</p>
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
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600',
            indigo: 'bg-indigo-50 text-indigo-600',
            teal: 'bg-teal-50 text-teal-600',
          }
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${colorClasses[kpi.color]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {kpi.positive ? (
                  <div className="flex items-center text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                    <ArrowUp className="w-2.5 h-2.5 mr-0.5" />
                    <span className="text-xs font-medium">{kpi.change}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                    <ArrowDown className="w-2.5 h-2.5 mr-0.5" />
                    <span className="text-xs font-medium">{kpi.change}</span>
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 mb-1">{kpi.label}</p>
              <p className="text-xl font-bold text-gray-900 mb-0.5">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.subtitle}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Team Performance vs Target</h3>
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={teamData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="target" fill="#e0e7ff" name="Target (%)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="performance" fill="#0088FE" name="Performance (%)" radius={[8, 8, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Performance Trend</h3>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={performance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Area type="monotone" dataKey="actual" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} name="Actual (%)" />
              <Area type="monotone" dataKey="efficiency" stroke="#00C49F" fill="#00C49F" fillOpacity={0.3} name="Efficiency (%)" />
              <Line type="monotone" dataKey="target" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" name="Target (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Individual Performance</h3>
          <div className="space-y-4">
            {individualPerformance.map((person, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">{person.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Performance</p>
                    <p className="font-bold text-sm text-gray-900">{person.performance.toFixed(2)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Tasks</p>
                    <p className="font-bold text-sm text-gray-900">{person.completed}/{person.tasks}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Rating</p>
                    <div className="flex items-center justify-center">
                      <Award className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="font-bold text-sm text-gray-900">{person.rating.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Team Overview</h3>
          <div className="space-y-4">
            {teamData.map((team, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{team.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    team.performance >= team.target
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {team.performance >= team.target ? 'On Target' : 'Below'}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Performance</span>
                    <span className="font-medium text-gray-900">{team.performance.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${team.performance >= team.target ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${team.performance}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{team.members} members</span>
                  {team.revenue > 0 && <span>${(team.revenue / 1000).toFixed(0)}k revenue</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Team Performance Radar</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="team" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Performance" dataKey="performance" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
            <Radar name="Efficiency" dataKey="efficiency" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
            <Legend />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ManagerDashboard

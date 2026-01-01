import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart } from 'recharts'
import { TrendingUp, Users, MousePointer, Mail, ArrowUp, ArrowDown, RefreshCw, Download, Calendar, Target, DollarSign } from 'lucide-react'

function MarketingDashboard() {
  const [metrics, setMetrics] = useState({
    totalLeads: 12450,
    conversionRate: 8.5,
    costPerLead: 45.2,
    roi: 320,
    emailOpenRate: 24.8,
    clickThroughRate: 3.2,
  })
  const [campaignData, setCampaignData] = useState([])
  const [leadGeneration, setLeadGeneration] = useState([])
  const [channelPerformance, setChannelPerformance] = useState([])
  const [campaignROI, setCampaignROI] = useState([])

  useEffect(() => {
    generateData()
  }, [])

  const generateData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    
    setCampaignData(months.map(month => ({
      month,
      impressions: Math.floor(Math.random() * 500000) + 300000,
      clicks: Math.floor(Math.random() * 50000) + 30000,
      conversions: Math.floor(Math.random() * 5000) + 2000,
    })))

    setLeadGeneration(months.map(month => ({
      month,
      organic: Math.floor(Math.random() * 800) + 500,
      paid: Math.floor(Math.random() * 600) + 400,
      social: Math.floor(Math.random() * 400) + 200,
      email: Math.floor(Math.random() * 300) + 150,
    })))

    setChannelPerformance([
      { channel: 'Google Ads', leads: 4200, cost: 189000, roi: 285 },
      { channel: 'Facebook', leads: 3100, cost: 124000, roi: 320 },
      { channel: 'LinkedIn', leads: 2800, cost: 168000, roi: 245 },
      { channel: 'Email', leads: 1500, cost: 15000, roi: 450 },
      { channel: 'Organic', leads: 850, cost: 0, roi: 0 },
    ])

    setCampaignROI(months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 200000) + 150000,
      cost: Math.floor(Math.random() * 60000) + 40000,
      roi: Math.floor(Math.random() * 300) + 200,
    })))
  }

  const handleSimulate = () => {
    generateData()
    setMetrics(prev => ({
      totalLeads: prev.totalLeads + Math.floor(Math.random() * 500) - 250,
      conversionRate: Math.max(0, Math.min(20, prev.conversionRate + (Math.random() * 1 - 0.5))),
      costPerLead: Math.max(0, Math.min(100, prev.costPerLead + (Math.random() * 5 - 2.5))),
      roi: Math.max(0, Math.min(500, prev.roi + (Math.random() * 20 - 10))),
      emailOpenRate: Math.max(0, Math.min(50, prev.emailOpenRate + (Math.random() * 2 - 1))),
      clickThroughRate: Math.max(0, Math.min(10, prev.clickThroughRate + (Math.random() * 0.5 - 0.25))),
    }))
  }

  const kpiCards = [
    { label: 'Total Leads', value: metrics.totalLeads.toLocaleString(), icon: Users, color: 'blue', change: '+18.5%', positive: true, subtitle: 'this month' },
    { label: 'Conversion Rate', value: `${metrics.conversionRate.toFixed(2)}%`, icon: Target, color: 'green', change: '+1.2%', positive: true, subtitle: 'lead to customer' },
    { label: 'Cost Per Lead', value: `$${metrics.costPerLead.toFixed(2)}`, icon: DollarSign, color: 'orange', change: '-5.3%', positive: true, subtitle: 'average cost' },
    { label: 'ROI', value: `${metrics.roi}%`, icon: TrendingUp, color: 'purple', change: '+25.4%', positive: true, subtitle: 'return on investment' },
    { label: 'Email Open Rate', value: `${metrics.emailOpenRate.toFixed(1)}%`, icon: Mail, color: 'indigo', change: '+2.8%', positive: true, subtitle: 'email campaigns' },
    { label: 'Click-Through Rate', value: `${metrics.clickThroughRate.toFixed(2)}%`, icon: MousePointer, color: 'teal', change: '+0.4%', positive: true, subtitle: 'ad performance' },
  ]

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Marketing Dashboard</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Campaign performance and lead generation analytics</p>
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
            orange: 'bg-orange-50 text-orange-600',
            purple: 'bg-purple-50 text-purple-600',
            indigo: 'bg-indigo-50 text-indigo-600',
            teal: 'bg-teal-50 text-teal-600',
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
            <h3 className="text-sm font-semibold text-gray-900">Campaign Performance</h3>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          {campaignData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="impressions" fill="#e0e7ff" name="Impressions" radius={[8, 8, 0, 0]} />
                <Bar yAxisId="left" dataKey="clicks" fill="#0088FE" name="Clicks" radius={[8, 8, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#00C49F" strokeWidth={3} name="Conversions" />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Lead Generation by Channel</h3>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          {leadGeneration.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={leadGeneration}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="organic" stackId="1" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} name="Organic" />
                <Area type="monotone" dataKey="paid" stackId="2" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} name="Paid" />
                <Area type="monotone" dataKey="social" stackId="3" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} name="Social" />
                <Area type="monotone" dataKey="email" stackId="4" stroke="#FFBB28" fill="#FFBB28" fillOpacity={0.6} name="Email" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Channel Performance</h3>
          <div className="space-y-3">
            {channelPerformance.map((channel, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm text-gray-900">{channel.channel}</span>
                  {channel.roi > 0 && (
                    <span className="text-xs font-bold text-green-600">{channel.roi}% ROI</span>
                  )}
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>{channel.leads.toLocaleString()} leads</span>
                  <span>${(channel.cost / 1000).toFixed(0)}k spent</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(channel.leads / Math.max(...channelPerformance.map(c => c.leads))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Campaign ROI Trend</h3>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          {campaignROI.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={campaignROI}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill="#00C49F" name="Revenue ($)" radius={[8, 8, 0, 0]} />
                <Bar yAxisId="left" dataKey="cost" fill="#FF8042" name="Cost ($)" radius={[8, 8, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#0088FE" strokeWidth={3} name="ROI (%)" />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketingDashboard


import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart } from 'recharts'
import { DollarSign, TrendingUp, TrendingDown, ArrowUp, ArrowDown, RefreshCw, Download, Calendar, CreditCard, Wallet, PieChart, Target } from 'lucide-react'

function FinanceDashboard() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 2450000,
    totalExpenses: 1850000,
    profit: 600000,
    cashFlow: 450000,
    accountsReceivable: 320000,
    accountsPayable: 180000,
  })
  const [revenueData, setRevenueData] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [cashFlow, setCashFlow] = useState([])
  const [expenseBreakdown, setExpenseBreakdown] = useState([])

  useEffect(() => {
    generateData()
  }, [])

  const generateData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    
    setRevenueData(months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 500000) + 300000,
      target: 400000,
    })))

    setExpenseData(months.map(month => ({
      month,
      salaries: Math.floor(Math.random() * 150000) + 100000,
      marketing: Math.floor(Math.random() * 80000) + 40000,
      operations: Math.floor(Math.random() * 60000) + 30000,
      other: Math.floor(Math.random() * 40000) + 20000,
    })))

    setCashFlow(months.map(month => ({
      month,
      inflow: Math.floor(Math.random() * 400000) + 300000,
      outflow: Math.floor(Math.random() * 300000) + 200000,
      net: Math.floor(Math.random() * 200000) + 50000,
    })))

    setExpenseBreakdown([
      { category: 'Salaries', amount: 650000, percentage: 35 },
      { category: 'Marketing', amount: 420000, percentage: 23 },
      { category: 'Operations', amount: 370000, percentage: 20 },
      { category: 'Technology', amount: 280000, percentage: 15 },
      { category: 'Other', amount: 130000, percentage: 7 },
    ])
  }

  const handleSimulate = () => {
    generateData()
    setMetrics(prev => ({
      totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 100000) - 50000,
      totalExpenses: prev.totalExpenses + Math.floor(Math.random() * 80000) - 40000,
      profit: prev.totalRevenue - prev.totalExpenses + Math.floor(Math.random() * 50000) - 25000,
      cashFlow: prev.cashFlow + Math.floor(Math.random() * 40000) - 20000,
      accountsReceivable: prev.accountsReceivable + Math.floor(Math.random() * 30000) - 15000,
      accountsPayable: prev.accountsPayable + Math.floor(Math.random() * 20000) - 10000,
    }))
  }

  const profitMargin = ((metrics.profit / metrics.totalRevenue) * 100).toFixed(2)

  const kpiCards = [
    { label: 'Total Revenue', value: `$${(metrics.totalRevenue / 1000).toFixed(0)}k`, icon: DollarSign, color: 'green', change: '+15.2%', positive: true, subtitle: 'this quarter' },
    { label: 'Total Expenses', value: `$${(metrics.totalExpenses / 1000).toFixed(0)}k`, icon: TrendingDown, color: 'red', change: '+8.5%', positive: false, subtitle: 'this quarter' },
    { label: 'Net Profit', value: `$${(metrics.profit / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'blue', change: '+22.3%', positive: true, subtitle: `${profitMargin}% margin` },
    { label: 'Cash Flow', value: `$${(metrics.cashFlow / 1000).toFixed(0)}k`, icon: Wallet, color: 'purple', change: '+12.1%', positive: true, subtitle: 'available' },
    { label: 'Accounts Receivable', value: `$${(metrics.accountsReceivable / 1000).toFixed(0)}k`, icon: CreditCard, color: 'orange', change: '+5.4%', positive: true, subtitle: 'outstanding' },
    { label: 'Accounts Payable', value: `$${(metrics.accountsPayable / 1000).toFixed(0)}k`, icon: PieChart, color: 'indigo', change: '-3.2%', positive: true, subtitle: 'due' },
  ]

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Finance Dashboard</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Financial performance and cash flow management</p>
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
            red: 'bg-red-50 text-red-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600',
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
            <h3 className="text-sm font-semibold text-gray-900">Revenue vs Target</h3>
            <Target className="w-4 h-4 text-gray-400" />
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
                <Bar dataKey="revenue" fill="#00C49F" name="Revenue ($)" radius={[8, 8, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Expense Breakdown</h3>
            <PieChart className="w-4 h-4 text-gray-400" />
          </div>
          {expenseData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="salaries" stackId="a" fill="#FF8042" name="Salaries" />
                <Bar dataKey="marketing" stackId="a" fill="#FFBB28" name="Marketing" />
                <Bar dataKey="operations" stackId="a" fill="#0088FE" name="Operations" />
                <Bar dataKey="other" stackId="a" fill="#00C49F" name="Other" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Cash Flow Analysis</h3>
          {cashFlow.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={cashFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="inflow" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} name="Cash Inflow" />
                <Area type="monotone" dataKey="outflow" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} name="Cash Outflow" />
                <Line type="monotone" dataKey="net" stroke="#0088FE" strokeWidth={3} name="Net Cash Flow" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Expense Categories</h3>
          <div className="space-y-3">
            {expenseBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-700">{item.category}</span>
                  <span className="text-xs font-bold text-gray-900">${(item.amount / 1000).toFixed(0)}k ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceDashboard


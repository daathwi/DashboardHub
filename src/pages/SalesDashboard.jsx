import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts'
import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowUp, ArrowDown, RefreshCw, Calendar, Filter, Download, Target } from 'lucide-react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

function SalesDashboard() {
  const [salesData, setSalesData] = useState([])
  const [revenue, setRevenue] = useState(125000)
  const [orders, setOrders] = useState(342)
  const [customers, setCustomers] = useState(1289)
  const [growth, setGrowth] = useState(12.5)
  const [avgOrderValue, setAvgOrderValue] = useState(365)
  const [conversionRate, setConversionRate] = useState(3.2)
  const [timeRange, setTimeRange] = useState('6M')
  const [topProducts, setTopProducts] = useState([])
  const [salesByRegion, setSalesByRegion] = useState([])

  useEffect(() => {
    generateData()
  }, [timeRange])

  const generateData = () => {
    const months = timeRange === '6M' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      : ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    const data = months.map(month => ({
      month,
      sales: Math.floor(Math.random() * 50000) + 30000,
      orders: Math.floor(Math.random() * 100) + 50,
      target: 40000,
      profit: Math.floor(Math.random() * 20000) + 10000,
    }))
    setSalesData(data)

    setTopProducts([
      { name: 'Product A', sales: 45000, units: 125, growth: 15.2 },
      { name: 'Product B', sales: 38000, units: 98, growth: 8.5 },
      { name: 'Product C', sales: 32000, units: 87, growth: 12.3 },
      { name: 'Product D', sales: 28000, units: 72, growth: -2.1 },
      { name: 'Product E', sales: 22000, units: 65, growth: 5.7 },
    ])

    setSalesByRegion([
      { region: 'North', sales: 45000, target: 50000, percentage: 90 },
      { region: 'South', sales: 52000, target: 48000, percentage: 108 },
      { region: 'East', sales: 38000, target: 40000, percentage: 95 },
      { region: 'West', sales: 41000, target: 45000, percentage: 91 },
    ])
  }

  const handleSimulate = () => {
    generateData()
    setRevenue(prev => prev + Math.floor(Math.random() * 5000) - 2500)
    setOrders(prev => prev + Math.floor(Math.random() * 10) - 5)
    setCustomers(prev => prev + Math.floor(Math.random() * 20) - 10)
    setGrowth(prev => prev + (Math.random() * 2 - 1))
    setAvgOrderValue(prev => prev + Math.floor(Math.random() * 20) - 10)
    setConversionRate(prev => Math.max(0, Math.min(10, prev + (Math.random() * 0.5 - 0.25))))
  }

  const productData = [
    { name: 'Product A', value: 35 },
    { name: 'Product B', value: 28 },
    { name: 'Product C', value: 20 },
    { name: 'Product D', value: 12 },
    { name: 'Product E', value: 5 },
  ]

  const metrics = [
    { label: 'Total Revenue', value: `$${revenue.toLocaleString()}`, icon: DollarSign, change: '+5.2%', positive: true, subtitle: 'vs last month' },
    { label: 'Total Orders', value: orders.toLocaleString(), icon: ShoppingCart, change: '+12.1%', positive: true, subtitle: 'this month' },
    { label: 'Active Customers', value: customers.toLocaleString(), icon: Users, change: '+8.3%', positive: true, subtitle: 'growing' },
    { label: 'Growth Rate', value: `${growth.toFixed(1)}%`, icon: TrendingUp, change: '+2.1%', positive: true, subtitle: 'YoY' },
    { label: 'Avg Order Value', value: `$${avgOrderValue}`, icon: Target, change: '+3.5%', positive: true, subtitle: 'per order' },
    { label: 'Conversion Rate', value: `${conversionRate.toFixed(1)}%`, icon: TrendingUp, change: '+0.4%', positive: true, subtitle: 'visitor to sale' },
  ]

  return (
    <div>
      <header className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Comprehensive sales analytics and performance metrics</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3" role="toolbar" aria-label="Dashboard actions">
          <label htmlFor="time-range-select" className="sr-only">Select time range</label>
          <select
            id="time-range-select"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full sm:w-auto"
            aria-label="Time range selection"
          >
            <option value="6M">Last 6 Months</option>
            <option value="12M">Last 12 Months</option>
          </select>
          <button 
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Export dashboard data"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={handleSimulate}
            className="px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Refresh dashboard data"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </header>

      <section aria-label="Key performance indicators" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <article key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow" role="region" aria-labelledby={`metric-${index}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-50 rounded-lg" aria-hidden="true">
                  <Icon className="w-4 h-4 text-blue-600" aria-hidden="true" />
                </div>
                {metric.positive ? (
                  <div className="flex items-center text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full" aria-label={`Positive change: ${metric.change}`}>
                    <ArrowUp className="w-2.5 h-2.5 mr-0.5" aria-hidden="true" />
                    <span className="text-xs font-medium">{metric.change}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full" aria-label={`Negative change: ${metric.change}`}>
                    <ArrowDown className="w-2.5 h-2.5 mr-0.5" aria-hidden="true" />
                    <span className="text-xs font-medium">{metric.change}</span>
                  </div>
                )}
              </div>
              <h3 id={`metric-${index}`} className="text-xs font-medium text-gray-600 mb-1">{metric.label}</h3>
              <p className="text-xl font-bold text-gray-900 mb-0.5" aria-live="polite">{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.subtitle}</p>
            </article>
          )
        })}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Sales vs Target</h3>
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
          {salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="target" fill="#e0e7ff" stroke="#6366f1" strokeWidth={2} fillOpacity={0.3} name="Target" />
                <Bar dataKey="sales" fill="#0088FE" name="Sales" radius={[8, 8, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Revenue & Profit Trend</h3>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          {salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="sales" stackId="1" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} name="Revenue" />
                <Area type="monotone" dataKey="profit" stackId="2" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} name="Profit" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Performing Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.units} units</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-gray-900">${product.sales.toLocaleString()}</p>
                  <div className={`flex items-center text-xs ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {Math.abs(product.growth).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Sales by Region</h3>
          {salesByRegion.map((region, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{region.region}</span>
                <span className="text-sm font-bold text-gray-900">${region.sales.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${region.percentage >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min(region.percentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Target: ${region.target.toLocaleString()}</span>
                <span className={`text-xs font-medium ${region.percentage >= 100 ? 'text-green-600' : 'text-gray-600'}`}>
                  {region.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Product Distribution</h3>
          {productData && productData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Orders Overview</h3>
          {salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="orders" fill="#00C49F" name="Orders" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">Loading chart data...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesDashboard

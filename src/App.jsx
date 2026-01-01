import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import SalesDashboard from './pages/SalesDashboard'
import ManagerDashboard from './pages/ManagerDashboard'
import CustomerTracking from './pages/CustomerTracking'
import DraftsDashboard from './pages/DraftsDashboard'
import AnalyticsDashboard from './pages/AnalyticsDashboard'
import FinanceDashboard from './pages/FinanceDashboard'
import MarketingDashboard from './pages/MarketingDashboard'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/sales" replace />} />
        <Route path="/sales" element={<SalesDashboard />} />
        <Route path="/managers" element={<ManagerDashboard />} />
        <Route path="/customers" element={<CustomerTracking />} />
        <Route path="/drafts" element={<DraftsDashboard />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/finance" element={<FinanceDashboard />} />
        <Route path="/marketing" element={<MarketingDashboard />} />
      </Routes>
    </Layout>
  )
}

export default App

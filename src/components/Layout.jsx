import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, FileText, ShoppingCart, BarChart2, DollarSign, TrendingUp, Menu, X } from 'lucide-react'

function Layout({ children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { path: '/sales', label: 'Sales', icon: ShoppingCart },
    { path: '/managers', label: 'Managers', icon: LayoutDashboard },
    { path: '/customers', label: 'Customers', icon: Users },
    { path: '/drafts', label: 'Drafts', icon: FileText },
    { path: '/analytics', label: 'Analytics', icon: BarChart2 },
    { path: '/finance', label: 'Finance', icon: DollarSign },
    { path: '/marketing', label: 'Marketing', icon: TrendingUp },
  ]

  // Handle root path
  const currentPath = location.pathname === '/' ? '/sales' : location.pathname

  // Handle keyboard navigation for mobile menu
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && sidebarOpen) {
      setSidebarOpen(false)
    }
  }

  // Close sidebar when clicking overlay
  const handleOverlayClick = () => {
    setSidebarOpen(false)
  }

  // Handle keyboard events
  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Trap focus within sidebar when open on mobile
      const sidebar = document.querySelector('aside')
      if (sidebar) {
        const focusableElements = sidebar.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleOverlayClick}
          onKeyDown={(e) => e.key === 'Enter' && handleOverlayClick()}
          role="button"
          tabIndex={0}
          aria-label="Close navigation menu"
        />
      )}

      {/* Sidebar */}
      <aside
        id="main-navigation"
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="flex flex-col h-full">
          <header className="p-4 lg:p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                <LayoutDashboard className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Dashboards</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close navigation menu"
              aria-expanded={sidebarOpen}
            >
              <X className="w-5 h-5 text-gray-600" aria-hidden="true" />
            </button>
          </header>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto" aria-label="Dashboard navigation">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPath === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
          
          {/* Footer Credit */}
          <footer className="p-4 border-t border-gray-200" role="contentinfo">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border-2 border-blue-200 shadow-md">
              <p className="text-lg font-bold text-gray-800 text-center mb-1.5">
                Built by <span className="text-blue-600 text-xl">Daathwi</span>
              </p>
              <p className="text-sm text-gray-600 text-center font-medium">
                as an Example
              </p>
            </div>
          </footer>
        </div>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="flex-1 w-full lg:ml-64 min-w-0" role="main">
        {/* Mobile Menu Button */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            aria-controls="main-navigation"
          >
            <Menu className="w-6 h-6 text-gray-600" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout


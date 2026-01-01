import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    console.error('Error stack:', error?.stack)
    console.error('Component stack:', errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', maxWidth: '500px', width: '100%' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>Something went wrong</h1>
            <p style={{ color: '#374151', marginBottom: '16px', fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
              {this.state.error?.toString() || 'Unknown error'}
            </p>
            {this.state.error?.stack && (
              <details style={{ marginBottom: '16px' }}>
                <summary style={{ cursor: 'pointer', color: '#6b7280', marginBottom: '8px' }}>Stack trace</summary>
                <pre style={{ fontSize: '12px', color: '#6b7280', overflow: 'auto', maxHeight: '200px' }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary


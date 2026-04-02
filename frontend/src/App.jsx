import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FarmsPage from "./pages/FarmsPage";
import RecommendationsPage from "./pages/RecommendationsPage";

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '12px 24px',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#1f2937',
        letterSpacing: '-0.5px'
      }}>
        Farmshield AI
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <NavLink to="/" active={isActive('/')}>Dashboard</NavLink>
        <NavLink to="/farms" active={isActive('/farms')}>Farms</NavLink>
        <NavLink to="/recommendations" active={isActive('/recommendations')}>Alerts</NavLink>
      </div>
    </nav>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link 
      to={to} 
      style={{
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: active ? '600' : '500',
        color: active ? '#10b981' : '#6b7280',
        backgroundColor: active ? '#f0fdf4' : 'transparent',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.target.style.backgroundColor = '#f9fafb';
          e.target.style.color = '#1f2937';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#6b7280';
        }
      }}
    >
      {children}
    </Link>
  );
}

function App() {
  return (
    <Router>
      <div style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'auto'
      }}>
        <Navigation />
        
        <div style={{
          width: '100%',
          padding: '24px',
          boxSizing: 'border-box'
        }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/farms" element={<FarmsPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
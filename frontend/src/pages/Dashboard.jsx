import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    farmsCount: 0,
    readingsCount: 0,
    alertsCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [farmsResponse, readingsResponse, recommendationsResponse] = await Promise.all([
        api.get("farms/"),
        api.get("readings/"),
        api.get("recommendations/")
      ]);

      const activeAlerts = recommendationsResponse.data.filter(
        rec => rec.disease_risk === 'High' || 
              rec.disease_risk === 'Medium' || 
              rec.irrigation_needed === true
      ).length;

      setStats({
        farmsCount: farmsResponse.data.length,
        readingsCount: readingsResponse.data.length,
        alertsCount: activeAlerts
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '400px'
      }}>
        <div style={{
          fontSize: '15px',
          color: '#6b7280'
        }}>
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '12px',
          letterSpacing: '-0.5px'
        }}>
          Welcome to Farmshield AI
        </h1>
        <p style={{
          fontSize: '15px',
          color: '#6b7280',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Monitor your farm's environmental data in real-time and receive intelligent recommendations for disease prevention and irrigation management.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        width: '100%'
      }}>
        <StatCard 
          icon="🌱" 
          title="Active Farms" 
          value={stats.farmsCount} 
          subtitle="Monitored locations"
          color="#10b981"
        />
        <StatCard 
          icon="📊" 
          title="Sensor Readings" 
          value={stats.readingsCount} 
          subtitle="Data points collected"
          color="#3b82f6"
        />
        <StatCard 
          icon="⚠️" 
          title="Active Alerts" 
          value={stats.alertsCount} 
          subtitle={stats.alertsCount > 0 ? "Require attention" : "All clear"}
          color={stats.alertsCount > 0 ? "#f59e0b" : "#10b981"}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '14px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.08)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    }}
    >
      <div style={{ 
        fontSize: '28px', 
        marginBottom: '10px' 
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: '28px',
        fontWeight: '700',
        color: color,
        marginBottom: '4px'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '4px'
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#9ca3af'
      }}>
        {subtitle}
      </div>
    </div>
  );
}

export default Dashboard;
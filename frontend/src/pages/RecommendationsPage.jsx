import { useEffect, useState } from "react";
import api from "../api/axios";

function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await api.get("recommendations/");
      setRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
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
          Loading alerts...
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
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '6px',
          letterSpacing: '-0.5px'
        }}>
          Alerts & Recommendations
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0
        }}>
          AI-powered insights for disease prevention and irrigation management
        </p>
      </div>

      {recommendations.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          width: '100%'
        }}>
          <div style={{ fontSize: '42px', marginBottom: '12px' }}>✅</div>
          <h3 style={{
            fontSize: '17px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            No alerts at this time
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280'
          }}>
            All farms are operating within normal parameters
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          width: '100%'
        }}>
          {recommendations.map((item) => (
            <AlertCard key={item.id} recommendation={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function AlertCard({ recommendation }) {
  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626' };
      case 'Medium': return { bg: '#fffbeb', border: '#fcd34d', text: '#d97706' };
      case 'Low': return { bg: '#f0fdf4', border: '#86efac', text: '#16a34a' };
      default: return { bg: '#f9fafb', border: '#d1d5db', text: '#6b7280' };
    }
  };

  const colors = getRiskColor(recommendation.disease_risk);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '14px',
      padding: '20px 24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      borderLeft: `4px solid ${colors.border}`,
      transition: 'transform 0.2s ease',
      width: '100%',
      boxSizing: 'border-box'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateX(4px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateX(0)';
    }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '14px',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 auto' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: colors.bg,
            color: colors.text,
            fontSize: '12px',
            fontWeight: '600',
            padding: '5px 10px',
            borderRadius: '10px',
            marginBottom: '10px'
          }}>
            {recommendation.disease_risk} Risk
          </div>
          <h3 style={{
            fontSize: '17px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 6px 0'
          }}>
            Farm Alert
          </h3>
        </div>
        <div style={{
          fontSize: '12px',
          color: '#9ca3af',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          {new Date(recommendation.created_at).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      <p style={{
        fontSize: '14px',
        color: '#4b5563',
        lineHeight: '1.6',
        marginBottom: '14px',
        margin: '0 0 14px 0'
      }}>
        {recommendation.message}
      </p>

      <div style={{
        display: 'flex',
        gap: '12px',
        paddingTop: '14px',
        borderTop: '1px solid #f3f4f6',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <MetricBadge 
          icon="💧" 
          label="Irrigation" 
          value={recommendation.irrigation_needed ? "Required" : "Not needed"}
          highlight={recommendation.irrigation_needed}
        />
        {recommendation.irrigation_needed && (
          <MetricBadge 
            icon="🌊" 
            label="Water Amount" 
            value={`${recommendation.water_amount}L`}
          />
        )}
      </div>
    </div>
  );
}

function MetricBadge({ icon, label, value, highlight }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: highlight ? '#f0fdf4' : '#f9fafb',
      padding: '8px 14px',
      borderRadius: '10px',
      flexShrink: 0
    }}>
      <span style={{ fontSize: '15px' }}>{icon}</span>
      <div>
        <div style={{
          fontSize: '10px',
          color: '#9ca3af',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '13px',
          color: highlight ? '#10b981' : '#1f2937',
          fontWeight: '600'
        }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default RecommendationsPage;
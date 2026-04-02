import { useEffect, useState } from "react";
import api from "../api/axios";

function FarmsPage() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      const response = await api.get("farms/");
      setFarms(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching farms:", error);
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
          Loading farms...
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        marginBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '6px',
          letterSpacing: '-0.5px'
        }}>
          Your Farms
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0
        }}>
          Manage and monitor all registered farm locations
        </p>
      </div>

      {farms.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          width: '100%'
        }}>
          <div style={{ fontSize: '42px', marginBottom: '12px' }}>🌾</div>
          <h3 style={{
            fontSize: '17px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            No farms registered yet
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Add your first farm through the Django admin panel
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          width: '100%'
        }}>
          {farms.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      )}
    </div>
  );
}

function FarmCard({ farm }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '14px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      border: '1px solid transparent'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.08)';
      e.currentTarget.style.borderColor = '#10b981';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
      e.currentTarget.style.borderColor = 'transparent';
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '14px',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0
        }}>
          {farm.farm_name}
        </h3>
        <span style={{
          backgroundColor: '#f0fdf4',
          color: '#10b981',
          fontSize: '11px',
          fontWeight: '600',
          padding: '4px 10px',
          borderRadius: '10px'
        }}>
          Active
        </span>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <InfoRow icon="👨‍🌾" label="Farmer" value={farm.farmer_name} />
        <InfoRow icon="📍" label="Location" value={farm.location} />
        <InfoRow icon="🌾" label="Crop" value={farm.crop_type} />
        <InfoRow icon="📏" label="Size" value={`${farm.farm_size} hectares`} />
      </div>

      <div style={{
        paddingTop: '12px',
        borderTop: '1px solid #f3f4f6',
        fontSize: '12px',
        color: '#9ca3af'
      }}>
        Added {new Date(farm.created_at).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '6px',
      gap: '6px'
    }}>
      <span style={{ 
        fontSize: '15px',
        flexShrink: 0
      }}>
        {icon}
      </span>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        fontSize: '13px'
      }}>
        <span style={{ color: '#6b7280' }}>
          {label}:
        </span>
        <span style={{
          color: '#1f2937',
          fontWeight: '500'
        }}>
          {value}
        </span>
      </div>
    </div>
  );
}

export default FarmsPage;
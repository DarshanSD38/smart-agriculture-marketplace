import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RoleSwitcher from '../components/RoleSwitcher';
import { Sprout, Heart, Mail, Phone, MapPin } from 'lucide-react';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <RoleSwitcher />
      <Navbar />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{ background: '#0f172a', color: '#94a3b8', paddingTop: '50px', paddingBottom: '30px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 800, fontSize: '1.25rem', marginBottom: '12px' }}>
              <Sprout size={24} color="#22c55e" />
              <span>AgriSmart</span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#94a3b8' }}>
              AI-Powered Smart Agriculture Marketplace & Support System connecting Farmers, Customers, and Agricultural Labourers.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>Marketplace</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <li><Link to="/marketplace?category=Vegetables" style={{ color: '#94a3b8' }}>Fresh Vegetables</Link></li>
              <li><Link to="/marketplace?category=Fruits" style={{ color: '#94a3b8' }}>Seasonal Fruits</Link></li>
              <li><Link to="/marketplace?category=Grains" style={{ color: '#94a3b8' }}>Organic Grains</Link></li>
              <li><Link to="/agri-input" style={{ color: '#94a3b8' }}>Agri-Input Supplies</Link></li>
              <li><Link to="/customer/group-buying" style={{ color: '#94a3b8' }}>Group Buying Pools</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>AI Decision Systems</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <li><Link to="/farmer/ai-price" style={{ color: '#94a3b8' }}>AI Price Recommendation</Link></li>
              <li><Link to="/farmer/demand-prediction" style={{ color: '#94a3b8' }}>Demand Prediction</Link></li>
              <li><Link to="/farmer/surplus" style={{ color: '#94a3b8' }}>Surplus Spoilage Avoidance</Link></li>
              <li><Link to="/farmer/crop-health" style={{ color: '#94a3b8' }}>Crop Health AI Diagnosis</Link></li>
              <li><Link to="/farmer/find-labour" style={{ color: '#94a3b8' }}>Find Agricultural Labour</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>Student Prototype</h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '10px' }}>
              Designed as an interactive engineering project demonstration frontend. Decoupled mock services ready for Node.js REST API & Python AI integration.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#22c55e' }}>
              ● Responsive UI: Desktop, Tablet, Mobile
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e293b', maxWidth: '1200px', margin: '40px auto 0', padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem' }}>
          <div>
            © 2026 AgriSmart. All rights reserved.
          </div>
          <div>
            Built with React.js & JavaScript for Agricultural Transformation
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;


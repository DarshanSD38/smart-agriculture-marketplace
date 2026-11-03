import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  ShoppingBag,
  TrendingUp,
  BrainCircuit,
  HeartPulse,
  Users,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Layers,
  Leaf
} from 'lucide-react';

const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    productService.getAll().then(data => {
      setFeaturedProducts(data.slice(0, 4));
    });
  }, []);

  const featureCards = [
    {
      title: "Direct Farmer-to-Customer Selling",
      desc: "Eliminate middleman commissions. Farmers list harvests directly, customers receive field-fresh produce at fair prices.",
      icon: <ShoppingBag size={24} color="#16a34a" />,
      bg: "#f0fdf4",
      link: "/marketplace"
    },
    {
      title: "AI Price Recommendation",
      desc: "Intelligent pricing engine considers local mandi rates, supply deficit, and festival trends to recommend optimal farmer sale prices.",
      icon: <TrendingUp size={24} color="#2563eb" />,
      bg: "#eff6ff",
      link: "/farmer/ai-price"
    },
    {
      title: "AI Demand Prediction",
      desc: "Forecast consumer market demand weeks in advance. Plan crop planting and harvest cycles with confidence.",
      icon: <BrainCircuit size={24} color="#7c3aed" />,
      bg: "#f5f3ff",
      link: "/farmer/demand-prediction"
    },
    {
      title: "Crop Health Assistance",
      desc: "Upload photo of diseased crop foliage for instant AI vision diagnosis, pathogen confidence score, and bio-remedies.",
      icon: <HeartPulse size={24} color="#dc2626" />,
      bg: "#fef2f2",
      link: "/farmer/crop-health"
    },
    {
      title: "Farmer-Labour Connection",
      desc: "Search, filter, and hire verified agricultural labourers by skill, experience, availability, and transparent daily wages.",
      icon: <Users size={24} color="#d97706" />,
      bg: "#fffbeb",
      link: "/farmer/find-labour"
    },
    {
      title: "Smart Product Recommendations",
      desc: "Personalized suggestions for customers based on seasonal nutrition, neighborhood farm harvest freshness, and basket pairing.",
      icon: <Sparkles size={24} color="#0891b2" />,
      bg: "#ecfeff",
      link: "/customer/recommendations"
    },
    {
      title: "Surplus Management",
      desc: "Automated perishable inventory risk analysis. Suggests optimal flash discounts or groups orders to eliminate crop food waste.",
      icon: <AlertTriangle size={24} color="#ea580c" />,
      bg: "#fff7ed",
      link: "/farmer/surplus"
    }
  ];

  const handleRoleQuickStart = (role, path) => {
    switchRole(role);
    navigate(path);
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #fef3c7 100%)',
        padding: '70px 24px 80px',
        borderBottom: '1px solid var(--slate-200)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--primary-200)',
            color: 'var(--primary-800)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '20px'
          }}>
            <Sprout size={16} /> Next-Gen AgriTech Platform
          </div>

          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            color: 'var(--slate-900)',
            lineHeight: 1.18,
            marginBottom: '18px',
            letterSpacing: '-0.8px'
          }}>
            AI-Powered Smart Agriculture <br />
            <span style={{ color: 'var(--primary-700)' }}>Marketplace & Support System</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--slate-600)',
            maxWidth: '750px',
            margin: '0 auto 32px',
            lineHeight: 1.6
          }}>
            Connecting Farmers, Customers and Agricultural Labourers through a smart digital platform.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/marketplace" className="btn btn-primary btn-lg">
              <ShoppingBag size={18} />
              <span>Explore Marketplace</span>
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Quick Stats Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '50px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(6px)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 24px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-700)' }}>420+</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Verified Farmers</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-700)' }}>1,400+</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Farm-Fresh Products</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-700)' }}>310+</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Agricultural Labourers</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-700)' }}>99.2%</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Fresh Delivery Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ROLE SELECTOR FOR DEMO AUDIENCE */}
      <section style={{ maxWidth: '1200px', margin: '-30px auto 40px', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div className="card" style={{ padding: '24px', background: '#ffffff', boxShadow: 'var(--shadow-md)', border: '1px solid var(--primary-200)' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'var(--primary-700)' }}>
              Interactive Demonstration Portals
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Choose a Role to Experience the Platform
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div 
              onClick={() => handleRoleQuickStart('farmer', '/farmer/dashboard')}
              style={{ border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', background: '#f0fdf4' }}
              className="role-card-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Sprout size={24} color="#16a34a" />
                <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>Farmer Portal</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginBottom: '12px' }}>
                Manage crops, AI price recommendations, demand predictions, surplus alerts, and hire farm labour.
              </p>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-700)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Enter Farmer Dashboard →
              </span>
            </div>

            <div 
              onClick={() => handleRoleQuickStart('customer', '/customer/dashboard')}
              style={{ border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', background: '#eff6ff' }}
              className="role-card-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <ShoppingBag size={24} color="#2563eb" />
                <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>Customer Portal</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginBottom: '12px' }}>
                Direct farm produce, price comparisons, smart basket pairings, group buying, and live order tracking.
              </p>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2563eb', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Enter Customer Dashboard →
              </span>
            </div>

            <div 
              onClick={() => handleRoleQuickStart('labour', '/labour/dashboard')}
              style={{ border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', background: '#fffbeb' }}
              className="role-card-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Users size={24} color="#d97706" />
                <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>Labour Portal</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginBottom: '12px' }}>
                Browse verified farm jobs, apply with skills & daily wage preferences, and manage schedule availability.
              </p>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#d97706', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Enter Labour Dashboard →
              </span>
            </div>

            <div 
              onClick={() => handleRoleQuickStart('admin', '/admin/dashboard')}
              style={{ border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', background: '#faf5ff' }}
              className="role-card-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <ShieldCheck size={24} color="#7c3aed" />
                <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>Admin Portal</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginBottom: '12px' }}>
                Platform governance, user verification, order monitoring, dispute arbitration, and GMV analytics.
              </p>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7c3aed', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Enter Admin Dashboard →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-green" style={{ marginBottom: '8px' }}>Key Capabilities</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Empowering Modern Agriculture With AI
          </h2>
          <p style={{ color: 'var(--slate-600)', maxWidth: '650px', margin: '8px auto 0' }}>
            Comprehensive intelligent features engineered to minimize farmer risk, reduce food wastage, and ensure consumer freshness.
          </p>
        </div>

        <div className="grid-3">
          {featureCards.map((feat, index) => (
            <div key={index} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: feat.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '8px' }}>
                {feat.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>
                {feat.desc}
              </p>
              <Link to={feat.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary-700)' }}>
                <span>Try Demo Feature</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FRESH HARVEST MARKETPLACE TEASER */}
      <section style={{ background: '#ffffff', padding: '60px 24px', borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-amber" style={{ marginBottom: '6px' }}>Direct from Farm</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Fresh Harvests Available Today
              </h2>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', marginTop: '4px' }}>
                Harvested within the last 24-48 hours by local verified growers.
              </p>
            </div>
            <Link to="/marketplace" className="btn btn-primary">
              <span>View All 24+ Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '12px' }}>Project Mission</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1.25, marginBottom: '18px' }}>
              Transforming the Agricultural Supply Chain With Fair Digital Commerce
            </h2>
            <p style={{ color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '14px' }}>
              Traditional agricultural supply chains leave farmers with low price realization while consumers pay inflated retail prices due to multiple middleman markups.
            </p>
            <p style={{ color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '20px' }}>
              AgriSmart bridges this gap with direct marketplace commerce, AI pricing benchmarks, crop disease early detection, surplus salvage, and transparent agricultural labour mobilization.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--slate-800)' }}>
                <CheckCircle size={18} color="#16a34a" /> <strong>Zero Hidden Fees:</strong> 100% direct sale realization for farmers.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--slate-800)' }}>
                <CheckCircle size={18} color="#16a34a" /> <strong>AI Decision Intelligence:</strong> Predictive pricing & crop vision diagnostics.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--slate-800)' }}>
                <CheckCircle size={18} color="#16a34a" /> <strong>Dignified Labour Search:</strong> Fair daily wages and direct farmer hiring.
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80" 
              alt="Farmer in organic crop field" 
              style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', objectFit: 'cover', maxHeight: '420px' }} 
            />
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '20px',
              background: '#ffffff',
              padding: '16px 20px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--primary-200)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Leaf size={28} color="#16a34a" />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--slate-900)' }}>100% Traceable</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Farm origin & harvest dates verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;


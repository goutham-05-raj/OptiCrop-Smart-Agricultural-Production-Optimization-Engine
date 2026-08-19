import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import './index.css';
import Recommend from './pages/Recommend';
import RecommendationResult from './pages/RecommendationResult';

// Placeholder components
const Landing = () => (
  <div className="container" style={{ marginTop: '4rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary-light), var(--primary-dark))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      Welcome to OptiCrop
    </h1>
    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
      The production-grade agricultural AI platform that recommends the optimal crop to cultivate based on soil chemistry and environmental inputs.
    </p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
      <Link to="/recommend" className="btn btn-primary">
        Get Recommendation
      </Link>
      <Link to="/suitability" className="btn btn-outline">
        Check Suitability
      </Link>
    </div>
  </div>
);

const Suitability = () => <div className="container card animate-fade-in"><h2>Suitability Analysis</h2><p>Form coming soon...</p></div>;
const History = () => <div className="container card animate-fade-in"><h2>Prediction History</h2><p>Data coming soon...</p></div>;
const Dashboard = () => <div className="container card animate-fade-in"><h2>Analytics Dashboard</h2><p>Charts coming soon...</p></div>;

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar container">
      <Link to="/" className="nav-brand">
        <Sprout size={28} color="var(--primary)" />
        OptiCrop
      </Link>
      <div className="nav-links">
        <Link to="/recommend" className={`nav-link ${isActive('/recommend')}`}>Recommend</Link>
        <Link to="/suitability" className={`nav-link ${isActive('/suitability')}`}>Suitability</Link>
        <Link to="/history" className={`nav-link ${isActive('/history')}`}>History</Link>
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/recommendation-result" element={<RecommendationResult />} />
        <Route path="/suitability" element={<Suitability />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

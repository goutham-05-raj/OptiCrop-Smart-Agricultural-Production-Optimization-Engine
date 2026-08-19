import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Sprout, ArrowLeft, Droplets, Sun, Activity } from 'lucide-react';

const RecommendationResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const prediction = location.state?.prediction;
  
  // If navigated here directly without submitting the form
  if (!prediction) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>No recommendation found</h2>
        <p style={{ margin: '1rem 0 2rem' }}>Please fill out the form to get a crop recommendation.</p>
        <Link to="/recommend" className="btn btn-primary">Go to Form</Link>
      </div>
    );
  }

  // Mock recommendations based on the crop
  const getFarmingTips = (cropName) => {
    return [
      { icon: <Droplets size={20} color="var(--secondary)" />, title: 'Watering', desc: `Maintain consistent moisture levels suitable for ${cropName}. Avoid waterlogging.` },
      { icon: <Sun size={20} color="var(--warning)" />, title: 'Sunlight', desc: 'Ensure adequate sunlight exposure for optimal growth and yield.' },
      { icon: <Activity size={20} color="var(--primary)" />, title: 'Fertilizer', desc: 'Use balanced NPK fertilizer during the vegetative stage to boost growth.' }
    ];
  };
  
  const tips = getFarmingTips(prediction.crop);

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <button 
        onClick={() => navigate('/recommend')} 
        className="btn btn-outline"
        style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}
      >
        <ArrowLeft size={18} /> Back to Form
      </button>

      <div className="grid grid-cols-2">
        <div className="card" style={{ borderColor: 'var(--primary)', boxShadow: '0 0 20px rgba(76, 175, 80, 0.2)' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sprout size={24} />
            Recommended Crop
          </h3>
          
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {prediction.crop}
            </div>
            <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: '999px', backgroundColor: 'rgba(76, 175, 80, 0.1)', color: 'var(--primary-dark)', fontWeight: '600' }}>
              {(prediction.confidence * 100).toFixed(1)}% AI Confidence
            </div>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '8px' }}>
            {prediction.message}
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Best Practices & Tips</h3>
          {tips.map((tip, idx) => (
            <div key={idx} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-color)', borderRadius: '12px' }}>
                {tip.icon}
              </div>
              <div>
                <h4 style={{ marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{tip.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationResult;

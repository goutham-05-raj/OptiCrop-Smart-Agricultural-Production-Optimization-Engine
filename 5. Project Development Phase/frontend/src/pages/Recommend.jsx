import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Droplets, Thermometer, Wind, Beaker, MapPin, Sprout } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const Recommend = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Mocking the response for visual demonstration
      setTimeout(() => {
        const prediction = {
          crop: 'Rice',
          confidence: 0.94,
          message: 'Optimal conditions detected for Rice cultivation.'
        };
        setLoading(false);
        // Navigate to the results page, passing the prediction in state
        navigate('/recommendation-result', { state: { prediction } });
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during prediction.');
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Crop Recommendation</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Enter your soil chemistry and environmental data to receive an AI-powered optimal crop recommendation.
        </p>
      </div>
      
      <div className="grid grid-cols-2">
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={24} color="var(--primary)" />
            Input Parameters
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">
                  <Beaker size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-bottom' }} />
                  Nitrogen (N)
                </label>
                <input type="number" className="form-control" name="nitrogen" value={formData.nitrogen} onChange={handleChange} placeholder="e.g. 90" required />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Beaker size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-bottom' }} />
                  Phosphorus (P)
                </label>
                <input type="number" className="form-control" name="phosphorus" value={formData.phosphorus} onChange={handleChange} placeholder="e.g. 42" required />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Beaker size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-bottom' }} />
                  Potassium (K)
                </label>
                <input type="number" className="form-control" name="potassium" value={formData.potassium} onChange={handleChange} placeholder="e.g. 43" required />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-bottom' }} />
                  pH Level
                </label>
                <input type="number" step="0.1" className="form-control" name="ph" value={formData.ph} onChange={handleChange} placeholder="e.g. 6.5" required />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Thermometer size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-bottom' }} />
                  Temperature (°C)
                </label>
                <input type="number" step="0.1" className="form-control" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="e.g. 25.0" required />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Wind size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-bottom' }} />
                  Humidity (%)
                </label>
                <input type="number" step="0.1" className="form-control" name="humidity" value={formData.humidity} onChange={handleChange} placeholder="e.g. 80.0" required />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">
                  <Droplets size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-bottom' }} />
                  Rainfall (mm)
                </label>
                <input type="number" step="0.1" className="form-control" name="rainfall" value={formData.rainfall} onChange={handleChange} placeholder="e.g. 200.0" required />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Analyzing...' : 'Generate Recommendation'}
            </button>
          </form>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {error && (
            <div className="card" style={{ borderColor: 'var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <h3 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>Prediction Failed</h3>
              <p>{error}</p>
            </div>
          )}
          
          {!error && !loading && (
             <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', textAlign: 'center' }}>
               <Activity size={48} color="var(--glass-border)" style={{ marginBottom: '1rem' }} />
               <h3 style={{ color: 'var(--text-secondary)' }}>Awaiting Input</h3>
               <p style={{ color: 'var(--glass-border)' }}>Enter parameters to see the AI prediction</p>
             </div>
          )}
          
          {loading && (
             <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--glass-border)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }}></div>
               <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
               <h3 style={{ marginTop: '1rem', color: 'var(--primary)' }}>Running Model</h3>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;

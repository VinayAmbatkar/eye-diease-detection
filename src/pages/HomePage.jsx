import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight, CheckCircle } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const diseases = [
    'Cross Eyes', 'Conjunctivitis', 'Cataract',
    'Glaucoma', 'Uveitis', 'Bulging Eyes'
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              AI-Powered Diagnostic System for <span className="gradient-text">Ophthalmic Disease Detection</span>
            </h1>
            <p className="hero-description">
              Get instant, accurate eye disease analysis using cutting-edge artificial intelligence.
              Connect with expert ophthalmologists for personalized treatment plans.
            </p>
            <div className="hero-actions">
              <Link to="/analyze" className="btn-primary">
                Start Free Analysis
                <ArrowRight className="btn-icon" />
              </Link>
              <Link to="/doctors" className="btn-secondary">
                Find Doctors
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="eye-illustration">
              <Eye className="eye-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Diseases Section */}
      <section className="diseases">
        <div className="container">
          <div className="section-header">
            <h2>Detectable Eye Conditions</h2>
            <p>Our AI can identify multiple eye diseases and conditions</p>
          </div>
          <div className="diseases-grid">
            {diseases.map((disease, index) => (
              <div key={index} className="disease-item">
                <CheckCircle className="disease-icon" />
                <span>{disease}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who trust our AI-powered system for their eye health</p>
            <Link to="/analyze" className="btn-primary large">
              Start Your Analysis Now
              <ArrowRight className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Eye, Shield, Users, Award, Target, Zap, Heart } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const features = [
    {
      icon: Eye,
      title: 'Advanced AI Technology',
      description: 'Powered by cutting-edge machine learning algorithms that can detect eye diseases with 95%+ accuracy'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your medical data is encrypted and protected with industry-standard security measures'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Connect with qualified ophthalmologists and specialists for personalized treatment'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get analysis results in seconds, enabling faster diagnosis and treatment decisions'
    },
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Designed with patients in mind, providing accessible and affordable eye care solutions'
    },
    {
      icon: Award,
      title: 'Medical Grade',
      description: 'Developed in collaboration with medical professionals and validated by clinical studies'
    }
  ];

  const team = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Medical Officer',
      expertise: 'Ophthalmology & AI Integration',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Lead AI Engineer',
      expertise: 'Machine Learning & Computer Vision',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Anjali Patel',
      role: 'Product Manager',
      expertise: 'Healthcare Technology & UX Design',
      image: 'https://images.unsplash.com/photo-1594824375938-d1b0c1a0a2a0?w=200&h=200&fit=crop&crop=face'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Successful Diagnoses' },
    { number: '500+', label: 'Expert Doctors' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '50+', label: 'Countries Served' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>About EyeCare AI</h1>
            <p className="hero-description">
              We're revolutionizing eye healthcare by making advanced AI-powered disease detection 
              accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                To democratize access to quality eye healthcare by leveraging artificial intelligence 
                to provide accurate, instant, and affordable eye disease detection. We believe that 
                everyone deserves access to world-class medical care, regardless of their location or economic status.
              </p>
              <p>
                Through our innovative platform, we're bridging the gap between patients and healthcare 
                providers, ensuring that eye diseases are detected early and treated effectively.
              </p>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <Eye className="eye-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose EyeCare AI?</h2>
            <p>Cutting-edge technology meets compassionate care</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <Icon className="icon" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="container">
          <div className="section-header">
            <h2>Our Team</h2>
            <p>Meet the experts behind EyeCare AI</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="expertise">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology">
        <div className="container">
          <div className="tech-content">
            <div className="tech-text">
              <h2>Advanced Technology</h2>
              <p>
                Our AI system is built on state-of-the-art machine learning models trained on 
                thousands of eye images from diverse populations. We use advanced computer vision 
                techniques to analyze eye images with unprecedented accuracy.
              </p>
              <div className="tech-features">
                <div className="tech-feature">
                  <Target className="tech-icon" />
                  <div>
                    <h4>Precision Detection</h4>
                    <p>Identifies subtle signs of eye diseases that might be missed by the human eye</p>
                  </div>
                </div>
                <div className="tech-feature">
                  <Zap className="tech-icon" />
                  <div>
                    <h4>Real-time Analysis</h4>
                    <p>Processes images in seconds to provide instant diagnostic insights</p>
                  </div>
                </div>
                <div className="tech-feature">
                  <Shield className="tech-icon" />
                  <div>
                    <h4>Secure & Private</h4>
                    <p>Your medical data is protected with enterprise-grade security measures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <div className="contact-content">
            <h2>Get in Touch</h2>
            <p>Have questions about EyeCare AI? We'd love to hear from you.</p>
            <div className="contact-info">
              <div className="contact-item">
                <h4>Email</h4>
                <p>support@eyecareai.com</p>
              </div>
              <div className="contact-item">
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
              <div className="contact-item">
                <h4>Address</h4>
                <p>123 Medical District<br />New Delhi, India 110001</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;


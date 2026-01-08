import React from 'react';
import { Eye, Mail, Phone, MapPin, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <Eye className="footer-logo" />
              <span className="footer-brand-text">AI-Powered Diagnostic System for Ophthalmic Disease Detection</span>
            </div>
            <p className="footer-description">
              Advanced AI-powered eye disease detection for better healthcare outcomes.
              Making quality eye care accessible to everyone.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/analyze">Eye Analysis</a></li>
              <li><a href="/doctors">Find Doctors</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><a href="/analyze">AI Eye Analysis</a></li>
              <li><a href="/doctors">Doctor Consultation</a></li>
              <li><a href="#">Medical Reports</a></li>
              <li><a href="#">Health Tracking</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>rmpatil91@gmail.com</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+91 9503141798</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>Rashmi Patil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 AI-Powered Diagnostic System for Ophthalmic Disease Detection. All rights reserved.</p>
            <p className="footer-disclaimer">
              Made with <Heart className="heart-icon" /> for better healthcare
            </p>
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Medical Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


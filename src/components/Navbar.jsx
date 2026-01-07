import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Eye, Home, Users, Info, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/analyze', label: 'Analyze', icon: Eye },
    { path: '/doctors', label: 'Doctors', icon: Users },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <Eye className="brand-icon" />
          </div>
          <span className="brand-text">EyeCare<span className="brand-ai">AI</span></span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path} className="navbar-item">
                <Link
                  to={item.path}
                  className={`navbar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="navbar-icon" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link to="/analyze" className="cta-button">
          <Eye className="cta-icon" />
          <span>Start Scan</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { ThemeToggle, MobileMenu } from '../../components';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="main-nav">
        <div className="project-title">
          <div className="image-background">
            <img src="muscle.png" alt="Gym Logo" />
          </div>
          <h2>Gym Management</h2>
        </div>
        <div className="nav-links">
          <ul className="desktop-nav">
            <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.ABOUT_US}>About Us</Link>
            </li>
          </ul>
          <div className="nav-actions">
            <div className="theme-toggle-container">
              <ThemeToggle />
            </div>
            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;

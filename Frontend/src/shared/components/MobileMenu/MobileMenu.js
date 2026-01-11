import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="mobile-menu-overlay" onClick={onClose} />
      <nav className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <ul className="mobile-menu-links">
          <li>
            <Link to={ROUTES.HOME} onClick={onClose}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.ABOUT_US} onClick={onClose}>About Us</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu;

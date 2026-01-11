/**
 * Main Layout Component
 * Wraps pages with common layout elements (Navbar, Footer, etc.)
 */

import React from 'react';
import Navbar from '../../shared/layout/Navbar/Navbar';
import Footer from '../../shared/layout/Footer/Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

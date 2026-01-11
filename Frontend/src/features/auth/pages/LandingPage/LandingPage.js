/**
 * Landing Page Component
 * Main landing page with login forms for Admin and Super Admin
 */

import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="login-subcontainer left">
        <LoginForm userType="admin" title="Admin" />
      </div>
      <div className="login-subcontainer right">
        <LoginForm userType="superAdmin" title="Super Admin" />
      </div>
    </div>
  );
};

export default LandingPage;

/**
 * Customer Dashboard Page
 * Dashboard for managing customers
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/components';
import { ROUTES } from '../../../../constants/routes';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleCustomerRegistration = () => {
    navigate(ROUTES.REGISTRATION_FORM);
  };

  const handleCustomerHistory = () => {
    navigate(ROUTES.CUSTOMER_HISTORY);
  };

  return (
    <div className="customer-dashboard">
      <h2>Welcome to the Customer Dashboard</h2>
      <div className="button-container">
        <Button onClick={handleCustomerRegistration} variant="primary">
          Customer Registration
        </Button>
        <Button onClick={handleCustomerHistory} variant="primary">
          Customer History
        </Button>
      </div>
    </div>
  );
};

export default CustomerDashboard;

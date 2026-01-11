/**
 * Admin Dashboard Page
 * Main dashboard for admin users
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/components';
import { ROUTES } from '../../../../constants/routes';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleCustomer = () => {
    navigate(ROUTES.CUSTOMER_DASHBOARD);
  };

  const handleTrainer = () => {
    navigate(ROUTES.TRAINER_PAGE);
  };

  const handleSubscriptionSetting = () => {
    navigate(ROUTES.SUBSCRIPTION_SETTINGS);
  };

  return (
    <div className="admin-dashboard">
      <div className="button-container">
        <Button className="centered-button" onClick={handleCustomer} variant="primary">
          Customer
        </Button>
        <Button className="centered-button" onClick={handleTrainer} variant="primary">
          Trainer
        </Button>
        <Button
          className="centered-button"
          onClick={handleSubscriptionSetting}
          variant="primary"
        >
          Subscription Setting
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;

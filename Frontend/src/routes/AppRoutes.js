/**
 * Application Routes Configuration
 * Centralized route definitions
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import MainLayout from '../layouts/MainLayout/MainLayout';

// Auth Pages
import LandingPage from '../features/auth/pages/LandingPage/LandingPage';

// Super Admin Pages
import SuperAdminDashboardPage from '../features/superAdmin/pages/SuperAdminDashboardPage/SuperAdminDashboardPage';
import AddGymForm from '../features/gym/components/AddGymForm/AddGymForm';
import UpdateGymForm from '../features/gym/components/UpdateGymForm/UpdateGymForm';

// Admin Pages
import AdminDashboard from '../features/admin/pages/AdminDashboard/AdminDashboard';
import CustomerDashboard from '../features/customer/pages/CustomerDashboard/CustomerDashboard';
import TrainerPage from '../features/trainer/pages/TrainerPage/TrainerPage';
import SubscriptionSettings from '../features/subscription/pages/SubscriptionSettings/SubscriptionSettings';

// Customer Pages
import RegistrationForm from '../features/customer/components/RegistrationForm/RegistrationForm';
import BillingPage from '../features/billing/pages/BillingPage/BillingPage';
import CustomerHistory from '../features/customer/pages/CustomerHistory/CustomerHistory';
import UpdateCustomerForm from '../features/customer/components/UpdateCustomerForm/UpdateCustomerForm';
import ViewSubscription from '../features/subscription/pages/ViewSubscription/ViewSubscription';

// Common Pages
import AboutUs from '../features/common/pages/AboutUs/AboutUs';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<MainLayout><LandingPage /></MainLayout>} />
      <Route path={ROUTES.ABOUT_US} element={<MainLayout><AboutUs /></MainLayout>} />

      {/* Super Admin Routes */}
      <Route 
        path={ROUTES.SUPER_ADMIN_DASHBOARD} 
        element={<MainLayout><SuperAdminDashboardPage /></MainLayout>} 
      />
      <Route 
        path={ROUTES.ADD_GYM} 
        element={<MainLayout><AddGymForm /></MainLayout>} 
      />
      <Route 
        path={ROUTES.UPDATE_GYM} 
        element={<MainLayout><UpdateGymForm /></MainLayout>} 
      />

      {/* Admin Routes */}
      <Route 
        path={ROUTES.ADMIN_DASHBOARD} 
        element={<MainLayout><AdminDashboard /></MainLayout>} 
      />
      <Route 
        path={ROUTES.CUSTOMER_DASHBOARD} 
        element={<MainLayout><CustomerDashboard /></MainLayout>} 
      />
      <Route 
        path={ROUTES.TRAINER_PAGE} 
        element={<MainLayout><TrainerPage /></MainLayout>} 
      />
      <Route 
        path={ROUTES.SUBSCRIPTION_SETTINGS} 
        element={<MainLayout><SubscriptionSettings /></MainLayout>} 
      />

      {/* Customer Routes */}
      <Route 
        path={ROUTES.REGISTRATION_FORM} 
        element={<MainLayout><RegistrationForm /></MainLayout>} 
      />
      <Route 
        path={ROUTES.BILLING_PAGE} 
        element={<MainLayout><BillingPage /></MainLayout>} 
      />
      <Route 
        path={ROUTES.CUSTOMER_HISTORY} 
        element={<MainLayout><CustomerHistory /></MainLayout>} 
      />
      <Route 
        path={ROUTES.UPDATE_CUSTOMER_FORM} 
        element={<MainLayout><UpdateCustomerForm /></MainLayout>} 
      />
      <Route 
        path={ROUTES.VIEW_SUBSCRIPTION} 
        element={<MainLayout><ViewSubscription /></MainLayout>} 
      />
    </Routes>
  );
};

export default AppRoutes;

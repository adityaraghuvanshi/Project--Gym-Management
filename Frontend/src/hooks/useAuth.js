/**
 * Authentication Hook
 * Custom hook for handling authentication logic
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { superAdminLogin, adminLogin, storeAuthData } from '../api/services/authService';
import { validateFields } from '../utils/validation';
import { showError, showSuccess } from '../utils/errorHandler';
import { ROUTES } from '../constants/routes';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password, userType) => {
    // Validate inputs
    const errors = validateFields({ username, password });
    if (Object.keys(errors).length > 0) {
      showError(Object.values(errors)[0]);
      return { success: false };
    }

    setLoading(true);
    try {
      let response;
      if (userType === 'superAdmin') {
        response = await superAdminLogin(username, password);
      } else {
        response = await adminLogin(username, password);
      }

      // Handle axios response structure (response.data) vs direct data
      const responseData = response?.data || response;
      
      // Check if response indicates failure
      if (!responseData || !responseData.success) {
        const errorMessage = responseData?.message || response?.data?.message || 'Login failed. Please check your credentials.';
        showError(errorMessage);
        return { success: false };
      }

      // Store auth data - handle different response structures
      const data = responseData.data || responseData;
      const token = data?.token || responseData.token;
      
      if (!token) {
        showError('Authentication token not received from server');
        return { success: false };
      }

      // Extract gymId only for admin (superAdmin doesn't need gymId)
      let gymId = null;
      if (userType === 'admin') {
        gymId = data?.admin?._id || data?.gymId || responseData.gymId;
      }
      
      storeAuthData(token, userType, gymId);

      showSuccess('Login successful');
      
      // Navigate based on user type
      if (userType === 'superAdmin') {
        navigate(ROUTES.SUPER_ADMIN_DASHBOARD);
      } else {
        navigate(ROUTES.ADMIN_DASHBOARD);
      }

      return { success: true, data: responseData.data || responseData };
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred during login';
      showError(errorMessage);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

/**
 * Axios Configuration
 * Centralized axios instance with interceptors
 */

import axios from 'axios';
import { showError } from '../utils/errorHandler';
import { STORAGE_KEYS } from '../constants/storageKeys';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
    const superAdminToken = localStorage.getItem(STORAGE_KEYS.SUPER_ADMIN_TOKEN);
    
    // Add token if available
    if (adminToken) {
      config.headers.Authorization = adminToken;
    } else if (superAdminToken) {
      config.headers.Authorization = superAdminToken;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      const networkError = { 
        data: { 
          success: false, 
          message: 'Network error. Please check your connection.' 
        } 
      };
      return Promise.resolve(networkError);
    }

    const status = error.response.status;
    const errorData = error.response.data || {};
    
    // Handle 4xx and 5xx errors gracefully
    if (status >= 400 && status <= 500) {
      // Return consistent error structure
      const errorResponse = {
        data: {
          success: false,
          message: errorData.message || errorData.error || `Request failed with status ${status}`,
          ...errorData
        }
      };
      return Promise.resolve(errorResponse);
    }
    
    // Reject other errors
    return Promise.reject(error);
  }
);

export default apiClient;

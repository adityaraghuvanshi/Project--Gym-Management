/**
 * API Hook
 * Custom hook for handling API calls with loading and error states
 */

import { useState, useCallback } from 'react';
import { showError, showSuccess } from '../utils/errorHandler';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const { 
      showLoading = true, 
      showErrorAlert = true, 
      showSuccessAlert = false,
      successMessage = 'Operation completed successfully',
      onSuccess,
      onError,
    } = options;

    setLoading(showLoading);
    setError(null);

    try {
      const response = await apiCall();

      if (!response) {
        const errorMsg = 'Something went wrong';
        setError(errorMsg);
        if (showErrorAlert) showError(errorMsg);
        if (onError) onError(errorMsg);
        return { success: false, error: errorMsg };
      }

      if (!response.success) {
        const errorMsg = response.message || 'Operation failed';
        setError(errorMsg);
        if (showErrorAlert) showError(errorMsg);
        if (onError) onError(errorMsg);
        return { success: false, error: errorMsg, data: response.data };
      }

      if (showSuccessAlert) {
        showSuccess(successMessage);
      }

      if (onSuccess) {
        onSuccess(response.data);
      }

      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.message || 'An error occurred';
      setError(errorMsg);
      if (showErrorAlert) showError(errorMsg);
      if (onError) onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
};

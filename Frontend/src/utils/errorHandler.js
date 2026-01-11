/**
 * Error Handling Utilities
 * Centralized error handling logic
 */

/**
 * Handles API errors and returns user-friendly messages
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
export const handleApiError = (error) => {
  if (!error.response) {
    return 'Network error. Please check your connection.';
  }

  const status = error.response.status;
  const message = error.response.data?.message || 'An error occurred';

  switch (status) {
    case 400:
      return message || 'Invalid request. Please check your input.';
    case 401:
      return 'Unauthorized. Please login again.';
    case 403:
      return 'Access denied. You do not have permission.';
    case 404:
      return 'Resource not found.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return message || 'Something went wrong. Please try again.';
  }
};

/**
 * Shows error alert to user
 * @param {string} message - Error message to display
 */
export const showError = (message) => {
  alert(message);
};

/**
 * Shows success alert to user
 * @param {string} message - Success message to display
 */
export const showSuccess = (message) => {
  alert(message);
};

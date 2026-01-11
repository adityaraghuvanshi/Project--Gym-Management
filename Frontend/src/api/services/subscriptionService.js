/**
 * Subscription Service
 * Handles all subscription-related API calls
 */

import apiClient from '../axiosConfig';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

/**
 * Update subscription details (Admin)
 * @param {Object} subscriptionData - Subscription data
 * @returns {Promise<Object>} - Response data
 */
export const updateSubscriptionDetails = async (subscriptionData) => {
  const response = await apiClient.patch(API_ENDPOINTS.ADMIN.SUBSCRIPTION.UPDATE, subscriptionData);
  return response.data;
};

/**
 * Apply subscription to a customer (Admin)
 * @param {string} customerId - Customer ID
 * @param {number} days - Number of days to add to subscription
 * @returns {Promise<Object>} - Response data
 */
export const applySubscription = async (customerId, days) => {
  const response = await apiClient.post(API_ENDPOINTS.ADMIN.SUBSCRIPTION.APPLY, {
    customerId,
    days,
  });
  return response.data;
};
/**
 * Customer Service
 * Handles all customer-related API calls
 */

import apiClient from '../axiosConfig';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

/**
 * Get all customers (Admin)
 * @returns {Promise<Object>} - Response data
 */
export const getAllCustomers = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ADMIN.CUSTOMER.ALL);
  return response.data;
};

/**
 * Get customer by ID (Admin)
 * @param {string} customerId - Customer ID
 * @returns {Promise<Object>} - Response data
 */
export const getCustomerById = async (customerId) => {
  const response = await apiClient.get(API_ENDPOINTS.ADMIN.CUSTOMER.BY_ID, {
    params: { id: customerId },
  });
  return response.data;
};

/**
 * Add new customer (Admin)
 * @param {Object} customerData - Customer data
 * @returns {Promise<Object>} - Response data
 */
export const addCustomer = async (customerData) => {
  const response = await apiClient.post(API_ENDPOINTS.ADMIN.CUSTOMER.ADD, customerData);
  return response.data;
};

/**
 * Update customer (Admin)
 * @param {string} customerId - Customer ID
 * @param {Object} customerData - Updated customer data
 * @returns {Promise<Object>} - Response data
 */
export const updateCustomer = async (customerId, customerData) => {
  const response = await apiClient.patch(API_ENDPOINTS.ADMIN.CUSTOMER.UPDATE, customerData, {
    params: { id: customerId },
  });
  return response.data;
};

/**
 * Delete customer (Admin)
 * @param {string} customerId - Customer ID
 * @returns {Promise<Object>} - Response data
 */
export const deleteCustomer = async (customerId) => {
  const response = await apiClient.delete(API_ENDPOINTS.ADMIN.CUSTOMER.DELETE, {
    params: { id: customerId },
  });
  return response.data;
};

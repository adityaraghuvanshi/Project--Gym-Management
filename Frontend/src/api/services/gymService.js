/**
 * Gym Service
 * Handles all gym-related API calls
 */

import apiClient from '../axiosConfig';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

/**
 * Get all gyms (Super Admin)
 * @returns {Promise<Object>} - Response data
 */
export const getAllGyms = async () => {
  const response = await apiClient.get(API_ENDPOINTS.SUPER_ADMIN.GYMS.ALL);
  return response.data;
};

/**
 * Get gym by ID (Super Admin)
 * @param {string} gymId - Gym ID
 * @returns {Promise<Object>} - Response data
 */
export const getGymById = async (gymId) => {
  const response = await apiClient.get(API_ENDPOINTS.SUPER_ADMIN.GYMS.BY_ID, {
    params: { id: gymId },
  });
  return response.data;
};

/**
 * Add new gym (Super Admin)
 * @param {Object} gymData - Gym data
 * @returns {Promise<Object>} - Response data
 */
export const addGym = async (gymData) => {
  const response = await apiClient.post(API_ENDPOINTS.SUPER_ADMIN.GYMS.ADD, gymData);
  return response.data;
};

/**
 * Update gym (Super Admin)
 * @param {string} gymId - Gym ID
 * @param {Object} gymData - Updated gym data
 * @returns {Promise<Object>} - Response data
 */
export const updateGym = async (gymId, gymData) => {
  const response = await apiClient.patch(API_ENDPOINTS.SUPER_ADMIN.GYMS.UPDATE, gymData, {
    params: { id: gymId },
  });
  return response.data;
};

/**
 * Delete gym (Super Admin)
 * @param {string} gymId - Gym ID
 * @returns {Promise<Object>} - Response data
 */
export const deleteGym = async (gymId) => {
  const response = await apiClient.delete(API_ENDPOINTS.SUPER_ADMIN.GYMS.DELETE, {
    params: { id: gymId },
  });
  return response.data;
};

/**
 * Get gym details (Admin)
 * @param {string} gymId - Gym ID
 * @returns {Promise<Object>} - Response data
 */
export const getGymDetails = async (gymId) => {
  const response = await apiClient.get(API_ENDPOINTS.ADMIN.GYM.DETAILS, {
    params: { id: gymId },
  });
  return response.data;
};

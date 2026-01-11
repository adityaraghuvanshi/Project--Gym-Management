/**
 * Trainer Service
 * Handles all trainer-related API calls
 */

import apiClient from '../axiosConfig';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

/**
 * Get all trainers (Admin)
 * @returns {Promise<Object>} - Response data
 */
export const getAllTrainers = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ADMIN.TRAINER.ALL);
  return response.data;
};

/**
 * Add new trainer (Admin)
 * @param {Object} trainerData - Trainer data
 * @returns {Promise<Object>} - Response data
 */
export const addTrainer = async (trainerData) => {
  const response = await apiClient.post(API_ENDPOINTS.ADMIN.TRAINER.ADD, trainerData);
  return response.data;
};

/**
 * Delete trainer (Admin)
 * @param {string} trainerId - Trainer ID
 * @returns {Promise<Object>} - Response data
 */
export const deleteTrainer = async (trainerId) => {
  const response = await apiClient.delete(API_ENDPOINTS.ADMIN.TRAINER.DELETE, {
    params: { id: trainerId },
  });
  return response.data;
};

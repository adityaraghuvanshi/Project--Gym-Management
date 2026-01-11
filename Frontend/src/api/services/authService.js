/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import apiClient from "../axiosConfig";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import { STORAGE_KEYS } from "../../constants/storageKeys";

/**
 * Super Admin Login
 * @param {string} username - Super admin username
 * @param {string} password - Super admin password
 * @returns {Promise<Object>} - Response data
 */
export const superAdminLogin = async (username, password) => {
    const response = await apiClient.post(API_ENDPOINTS.SUPER_ADMIN.LOGIN, {
        username,
        password,
    });
    return response.data;
};

/**
 * Admin Login
 * @param {string} username - Admin username
 * @param {string} password - Admin password
 * @returns {Promise<Object>} - Response data
 */
export const adminLogin = async (username, password) => {
    const response = await apiClient.post(API_ENDPOINTS.ADMIN.LOGIN, {
        username,
        password,
    });
    return response.data;
};

/**
 * Store authentication tokens
 * @param {string} token - Authentication token
 * @param {string} type - 'admin' or 'superAdmin'
 * @param {string} gymId - Optional gym ID for admin
 */
export const storeAuthData = (token, type, gymId = null) => {
    if (type === "superAdmin") {
        localStorage.setItem(STORAGE_KEYS.SUPER_ADMIN_TOKEN, token);
    } else if (type === "admin") {
        localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
        if (gymId) {
            localStorage.setItem(STORAGE_KEYS.GYM_ID, gymId);
        }
    }
};

/**
 * Clear authentication data
 */
export const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEYS.SUPER_ADMIN_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.GYM_ID);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMER_ID);
};

/**
 * Get stored authentication token
 * @param {string} type - 'admin' or 'superAdmin'
 * @returns {string|null} - Token or null
 */
export const getAuthToken = (type) => {
    if (type === "superAdmin") {
        return localStorage.getItem(STORAGE_KEYS.SUPER_ADMIN_TOKEN);
    }
    return localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
};

/**
 * Check if user is authenticated
 * @param {string} type - 'admin' or 'superAdmin'
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = (type) => {
    return !!getAuthToken(type);
};

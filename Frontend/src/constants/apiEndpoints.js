/**
 * API Endpoint Constants
 * Centralized API endpoint definitions
 */

const BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api/v1/";

const SUPER_ADMIN_BASE = `${BASE_URL}superadmin/`;
const ADMIN_BASE = `${BASE_URL}admin/`;

export const API_ENDPOINTS = {
    // Super Admin
    SUPER_ADMIN: {
        LOGIN: `${SUPER_ADMIN_BASE}login`,
        GYMS: {
            ADD: `${SUPER_ADMIN_BASE}gyms/add`,
            ALL: `${SUPER_ADMIN_BASE}gyms/all`,
            BY_ID: `${SUPER_ADMIN_BASE}gym`,
            UPDATE: `${SUPER_ADMIN_BASE}gym`,
            DELETE: `${SUPER_ADMIN_BASE}gym`,
        },
    },

    // Admin
    ADMIN: {
        LOGIN: `${ADMIN_BASE}login`,
        CUSTOMER: {
            ADD: `${ADMIN_BASE}customer/add`,
            ALL: `${ADMIN_BASE}customers/all`,
            BY_ID: `${ADMIN_BASE}customer`,
            UPDATE: `${ADMIN_BASE}customer`,
            DELETE: `${ADMIN_BASE}customer`,
        },
        TRAINER: {
            ADD: `${ADMIN_BASE}trainer/add`,
            ALL: `${ADMIN_BASE}trainers/all`,
            DELETE: `${ADMIN_BASE}trainer`,
        },
        GYM: {
            DETAILS: `${ADMIN_BASE}gym`,
        },
        SUBSCRIPTION: {
            UPDATE: `${ADMIN_BASE}subscription`,
            APPLY: `${ADMIN_BASE}customer/subscribe`,
        },
    },
};

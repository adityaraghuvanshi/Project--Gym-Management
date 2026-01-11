/**
 * Validation Utility Functions
 * Centralized validation logic for form inputs
 */

export const validationRules = {
  username: {
    required: (value) => value.length > 0 || 'Username cannot be empty',
  },
  password: {
    minLength: (value) => value.length >= 6 || 'Password must be at least 6 characters',
  },
  name: {
    required: (value) => value.trim().length > 0 || 'Name cannot be empty',
  },
  address: {
    required: (value) => value.trim().length > 0 || 'Address cannot be empty',
  },
  age: {
    range: (value) => {
      const age = Number(value);
      return (age >= 4 && age <= 98) || 'Age must be between 4 and 98';
    },
  },
  mobileNumber: {
    length: (value) => {
      const digits = value.replace(/\D/g, '');
      return digits.length === 10 || 'Phone number must be 10 digits';
    },
  },
  height: {
    range: (value) => {
      const height = Number(value);
      return (height >= 50 && height <= 250) || 'Height must be between 50 and 250 cm';
    },
  },
  weight: {
    range: (value) => {
      const weight = Number(value);
      return (weight >= 50 && weight <= 250) || 'Weight must be between 50 and 250 kg';
    },
  },
};

/**
 * Validates a field against its rules
 * @param {string} fieldName - Name of the field to validate
 * @param {any} value - Value to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (fieldName, value) => {
  const rules = validationRules[fieldName];
  if (!rules) return null;

  for (const rule of Object.values(rules)) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

/**
 * Validates multiple fields at once
 * @param {Object} fields - Object with field names as keys and values as values
 * @returns {Object} - Object with field names as keys and error messages as values
 */
export const validateFields = (fields) => {
  const errors = {};
  for (const [fieldName, value] of Object.entries(fields)) {
    const error = validateField(fieldName, value);
    if (error) {
      errors[fieldName] = error;
    }
  }
  return errors;
};

import { useState, useCallback } from 'react';
import { validateFields } from '../utils/validation';

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({
      ...prev,
      [field]: value
    }));

    if (touched[field]) {
      const fieldErrors = validateFields({ [field]: value });
      setErrors(prev => ({
        ...prev,
        [field]: fieldErrors[field] || null
      }));
    }
  }, [touched]);

  const handleBlur = useCallback((field) => () => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    const fieldErrors = validateFields({ [field]: values[field] });
    setErrors(prev => ({
      ...prev,
      [field]: fieldErrors[field] || null
    }));
  }, [values]);

  const validate = useCallback(() => {
    const allErrors = validateFields(values);
    setErrors(allErrors);
    setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
    return Object.keys(allErrors).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setValue = useCallback((field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValue,
    setValues,
    setErrors
  };
};

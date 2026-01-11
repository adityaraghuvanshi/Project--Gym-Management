/**
 * Input Component
 * Reusable input component with label and error handling
 */

import React from 'react';
import FormField from '../FormField/FormField';
import './Input.css';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  hint,
  className = '',
  ...props
}) => {
  return (
    <FormField 
      label={label} 
      error={error} 
      required={required}
      hint={hint}
      className={className}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? 'input-error' : ''}`}
        required={required}
        {...props}
      />
    </FormField>
  );
};

export default Input;

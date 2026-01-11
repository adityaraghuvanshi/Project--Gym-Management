import React from 'react';
import FormField from '../FormField/FormField';
import './Select.css';

const Select = ({
  label,
  value,
  onChange,
  error,
  required = false,
  hint,
  options = [],
  placeholder,
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
      <select
        value={value}
        onChange={onChange}
        className={`select-field ${error ? 'select-error' : ''}`}
        required={required}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export default Select;

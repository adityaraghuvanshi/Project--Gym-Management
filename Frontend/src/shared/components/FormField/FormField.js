import React from 'react';
import './FormField.css';

const FormField = ({ 
  label, 
  children, 
  error, 
  required = false, 
  hint,
  className = '' 
}) => {
  return (
    <div className={`form-field ${className} ${error ? 'form-field-error' : ''}`}>
      {label && (
        <label className="form-field-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <div className="form-field-input-wrapper">
        {children}
      </div>
      {hint && !error && <div className="form-field-hint">{hint}</div>}
      {error && <div className="form-field-error-message">{error}</div>}
    </div>
  );
};

export default FormField;

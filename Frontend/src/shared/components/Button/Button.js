/**
 * Button Component
 * Reusable button component with variants
 */

import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  fullWidth = false,
  size = 'medium',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className} ${disabled || loading ? 'btn-disabled' : ''} ${fullWidth ? 'btn-full-width' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size={16} />}
      {loading ? <span className="btn-loading-text">Loading...</span> : children}
    </button>
  );
};

export default Button;

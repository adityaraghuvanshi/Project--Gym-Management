/**
 * Loading Spinner Component
 * Reusable loading indicator
 */

import React from 'react';
import { CircularProgress } from '@mui/material';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 40, fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loading-spinner-fullscreen">
        <CircularProgress size={size} />
      </div>
    );
  }

  return (
    <div className="loading-spinner-container">
      <CircularProgress size={size} />
    </div>
  );
};

export default LoadingSpinner;

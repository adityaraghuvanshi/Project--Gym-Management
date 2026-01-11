/**
 * Update Gym Form Component
 * Form for updating an existing gym
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGymById, updateGym } from '../../../../api/services/gymService';
import { useApi } from '../../../../hooks/useApi';
import { useForm } from '../../../../hooks/useForm';
import { Input, Button, LoadingSpinner, Card, PageHeader } from '../../../../shared/components';
import { STORAGE_KEYS } from '../../../../constants/storageKeys';
import './UpdateGymForm.css';

const UpdateGymForm = () => {
  const navigate = useNavigate();
  const { execute, loading } = useApi();
  const { execute: fetchGym, loading: dataLoading } = useApi();
  
  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    setValues,
    setErrors
  } = useForm({
    gymName: '',
    address: '',
    adminName: '',
    userName: '',
    phoneNumber: '',
    password: '',
  });

  useEffect(() => {
    const gymId = localStorage.getItem(STORAGE_KEYS.GYM_ID);
    if (gymId) {
      fetchGymData(gymId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGymData = async (gymId) => {
    const result = await fetchGym(
      () => getGymById(gymId),
      { showErrorAlert: true }
    );

    if (result.success && result.data.gym) {
      const gym = result.data.gym;
      setValues({
        gymName: gym.gymName || '',
        address: gym.address || '',
        adminName: gym.adminName || '',
        userName: gym.username || '',
        phoneNumber: gym.mobileNumber?.slice(3, 13) || '',
        password: gym.password || '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.gymName.trim()) {
      newErrors.gymName = 'Gym name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.adminName.trim()) {
      newErrors.adminName = 'Admin name is required';
    }
    
    if (!formData.userName.trim()) {
      newErrors.userName = 'Username is required';
    }
    
    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (phoneDigits.length !== 10) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gymId = localStorage.getItem(STORAGE_KEYS.GYM_ID);

    if (!gymId) {
      alert('Gym ID not found');
      return;
    }

    if (!validateForm()) return;

    await execute(
      () => updateGym(gymId, {
        gymName: formData.gymName,
        address: formData.address,
        adminName: formData.adminName,
        username: formData.userName,
        mobileNumber: `+91${formData.phoneNumber.replace(/\D/g, '')}`,
        password: formData.password,
      }),
      {
        showErrorAlert: true,
        showSuccessAlert: true,
        successMessage: 'Gym updated successfully',
        onSuccess: () => navigate(-1)
      }
    );
  };

  if (dataLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="gym-form-page">
      <PageHeader 
        title="Update Gym" 
        subtitle="Modify gym information and admin details"
      />
      <Card className="gym-form-card">
        <form onSubmit={handleSubmit} className="gym-form">
          <div className="form-section">
            <h3 className="form-section-title">Gym Information</h3>
            <div className="form-row">
              <Input
                label="Gym Name"
                value={formData.gymName}
                onChange={handleChange('gymName')}
                onBlur={handleBlur('gymName')}
                error={touched.gymName && errors.gymName}
                required
                placeholder="Enter gym name"
              />
            </div>
            <div className="form-row">
              <Input
                label="Address"
                value={formData.address}
                onChange={handleChange('address')}
                onBlur={handleBlur('address')}
                error={touched.address && errors.address}
                required
                placeholder="Enter complete address"
              />
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="form-section-title">Admin Details</h3>
            <div className="form-row form-row-split">
              <Input
                label="Admin Name"
                value={formData.adminName}
                onChange={handleChange('adminName')}
                onBlur={handleBlur('adminName')}
                error={touched.adminName && errors.adminName}
                required
                placeholder="Admin full name"
              />
              <Input
                label="Username"
                value={formData.userName}
                onChange={handleChange('userName')}
                onBlur={handleBlur('userName')}
                error={touched.userName && errors.userName}
                required
                placeholder="Unique username"
              />
            </div>
            <div className="form-row form-row-split">
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                error={touched.phoneNumber && errors.phoneNumber}
                required
                placeholder="10 digit number"
                maxLength="10"
                hint="Enter 10 digit mobile number"
              />
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                required
                placeholder="Minimum 6 characters"
                hint="At least 6 characters"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate(-1)}
              className="cancel-button"
            >
              Cancel
            </Button>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Button type="submit" variant="primary" className="submit-button">
                Update Gym
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UpdateGymForm;

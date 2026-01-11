/**
 * Customer Registration Form Component
 * Form for registering a new customer
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addCustomer } from '../../../../api/services/customerService';
import { useApi } from '../../../../hooks/useApi';
import { useForm } from '../../../../hooks/useForm';
import { Input, Button, LoadingSpinner, Card, PageHeader } from '../../../../shared/components';
import { ROUTES } from '../../../../constants/routes';
import { STORAGE_KEYS } from '../../../../constants/storageKeys';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { execute, loading } = useApi();
  
  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    setErrors
  } = useForm({
    name: '',
    address: '',
    age: '',
    mobileNumber: '',
    height: '',
    weight: '',
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    const ageNum = Number(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (ageNum < 4 || ageNum > 98) {
      newErrors.age = 'Age must be between 4 and 98';
    }
    
    const phoneDigits = formData.mobileNumber.replace(/\D/g, '');
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Phone number is required';
    } else if (phoneDigits.length !== 10) {
      newErrors.mobileNumber = 'Phone number must be 10 digits';
    }
    
    const heightNum = Number(formData.height);
    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else if (heightNum < 50 || heightNum > 250) {
      newErrors.height = 'Height must be between 50 and 250 cm';
    }
    
    const weightNum = Number(formData.weight);
    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
    } else if (weightNum < 50 || weightNum > 250) {
      newErrors.weight = 'Weight must be between 50 and 250 kg';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await execute(
      () => addCustomer(formData),
      {
        showErrorAlert: true,
        showSuccessAlert: true,
        successMessage: 'Customer registered successfully',
        onSuccess: (data) => {
          if (data?.customer?._id) {
            localStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, data.customer._id);
            navigate(ROUTES.BILLING_PAGE);
          }
        }
      }
    );
  };

  return (
    <div className="registration-form-page">
      <PageHeader 
        title="Customer Registration" 
        subtitle="Enter customer details to register"
      />
      <Card className="registration-form-card">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name && errors.name}
              required
              placeholder="Enter full name"
              autoComplete="name"
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
              autoComplete="street-address"
            />
          </div>
          
          <div className="form-row form-row-split">
            <Input
              label="Age"
              type="number"
              value={formData.age}
              onChange={handleChange('age')}
              onBlur={handleBlur('age')}
              error={touched.age && errors.age}
              required
              placeholder="Age"
              min="4"
              max="98"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={formData.mobileNumber}
              onChange={handleChange('mobileNumber')}
              onBlur={handleBlur('mobileNumber')}
              error={touched.mobileNumber && errors.mobileNumber}
              required
              placeholder="10 digit number"
              maxLength="10"
              autoComplete="tel"
            />
          </div>
          
          <div className="form-row form-row-split">
            <Input
              label="Height (cm)"
              type="number"
              value={formData.height}
              onChange={handleChange('height')}
              onBlur={handleBlur('height')}
              error={touched.height && errors.height}
              required
              placeholder="Height in cm"
              min="50"
              max="250"
            />
            <Input
              label="Weight (kg)"
              type="number"
              value={formData.weight}
              onChange={handleChange('weight')}
              onBlur={handleBlur('weight')}
              error={touched.weight && errors.weight}
              required
              placeholder="Weight in kg"
              min="50"
              max="250"
            />
          </div>
          
          <div className="form-actions">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Button type="submit" variant="primary" className="submit-button">
                Register Customer
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegistrationForm;

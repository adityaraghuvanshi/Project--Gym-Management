/**
 * Update Customer Form Component
 * Form for updating customer information
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerById, updateCustomer } from '../../../../api/services/customerService';
import { useApi } from '../../../../hooks/useApi';
import { useForm } from '../../../../hooks/useForm';
import { Input, Button, LoadingSpinner, Card, PageHeader } from '../../../../shared/components';
import { STORAGE_KEYS } from '../../../../constants/storageKeys';
import './UpdateCustomerForm.css';

const UpdateCustomerForm = () => {
  const navigate = useNavigate();
  const { execute, loading } = useApi();
  const { execute: fetchCustomer, loading: dataLoading } = useApi();
  
  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    setValues,
    setErrors
  } = useForm({
    name: '',
    address: '',
    age: '',
    mobileNumber: '',
    height: '',
    weight: '',
  });

  useEffect(() => {
    const customerId = localStorage.getItem(STORAGE_KEYS.CUSTOMER_ID);
    if (customerId) {
      fetchCustomerData(customerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomerData = async (customerId) => {
    const result = await fetchCustomer(
      () => getCustomerById(customerId),
      { showErrorAlert: true }
    );

    if (result.success && result.data.customer) {
      const customer = result.data.customer;
      setValues({
        name: customer.name || '',
        address: customer.address || '',
        age: customer.age || '',
        mobileNumber: customer.mobileNumber?.slice(3, 13) || '',
        height: customer.height || '',
        weight: customer.weight || '',
      });
    }
  };

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
    const customerId = localStorage.getItem(STORAGE_KEYS.CUSTOMER_ID);

    if (!customerId) {
      alert('Customer ID not found');
      return;
    }

    if (!validateForm()) return;

    await execute(
      () => updateCustomer(customerId, formData),
      {
        showErrorAlert: true,
        showSuccessAlert: true,
        successMessage: 'Customer updated successfully',
        onSuccess: () => navigate(-1)
      }
    );
  };

  if (dataLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="registration-form-page">
      <PageHeader 
        title="Update Customer" 
        subtitle="Modify customer information"
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
                Update Customer
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UpdateCustomerForm;

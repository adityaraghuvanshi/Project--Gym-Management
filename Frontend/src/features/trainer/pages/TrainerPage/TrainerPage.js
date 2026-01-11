/**
 * Trainer Page
 * Manage trainers - add and delete
 */

import React, { useEffect, useState } from 'react';
import { getAllTrainers, addTrainer, deleteTrainer } from '../../../../api/services/trainerService';
import { useApi } from '../../../../hooks/useApi';
import { useForm } from '../../../../hooks/useForm';
import { Input, Button, LoadingSpinner, Card, PageHeader } from '../../../../shared/components';
import './TrainerPage.css';

const TrainerPage = () => {
  const [trainers, setTrainers] = useState([]);

  const { execute, loading } = useApi();
  const { execute: fetchTrainers, loading: fetchLoading } = useApi();
  
  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    reset,
    setErrors
  } = useForm({
    name: '',
    mobileNumber: '',
    address: '',
  });

  useEffect(() => {
    fetchTrainersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTrainersList = async () => {
    const result = await fetchTrainers(
      () => getAllTrainers(),
      { showErrorAlert: true }
    );

    if (result.success) {
      setTrainers(result.data.trainers || []);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Trainer name is required';
    }
    
    const phoneDigits = formData.mobileNumber.replace(/\D/g, '');
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Phone number is required';
    } else if (phoneDigits.length !== 10) {
      newErrors.mobileNumber = 'Phone number must be 10 digits';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await execute(
      () => addTrainer(formData),
      {
        showErrorAlert: true,
        showSuccessAlert: true,
        successMessage: 'Trainer added successfully',
        onSuccess: () => {
          reset();
          fetchTrainersList();
        }
      }
    );
  };

  const handleDeleteTrainer = async (trainerId) => {
    if (!window.confirm('Are you sure you want to delete this trainer?')) {
      return;
    }

    await execute(
      () => deleteTrainer(trainerId),
      {
        showErrorAlert: true,
        showSuccessAlert: true,
        successMessage: 'Trainer deleted successfully',
        onSuccess: () => fetchTrainersList()
      }
    );
  };

  return (
    <div className="trainer-page">
      <PageHeader 
        title="Trainer Management" 
        subtitle="Add and manage trainers"
      />
      <div className="trainer-page-content">
        <Card className="trainer-form-section">
          <h3 className="section-title">Add New Trainer</h3>
          <form onSubmit={handleAddTrainer} className="trainer-form">
            <Input
              label="Trainer Name"
              value={formData.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name && errors.name}
              required
              placeholder="Enter trainer full name"
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
            <Input
              label="Address"
              value={formData.address}
              onChange={handleChange('address')}
              onBlur={handleBlur('address')}
              error={touched.address && errors.address}
              required
              placeholder="Enter complete address"
            />
            <div className="form-actions">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <Button type="submit" variant="primary" className="submit-button">
                  Add Trainer
                </Button>
              )}
            </div>
          </form>
        </Card>
        
        <Card className="trainer-list-section">
          <h3 className="section-title">Trainer List</h3>
          {fetchLoading && <LoadingSpinner />}
          {!fetchLoading && trainers.length === 0 && (
            <div className="empty-state">
              <p>No trainers added yet</p>
              <p className="empty-state-hint">Add your first trainer using the form on the left</p>
            </div>
          )}
          {!fetchLoading && trainers.length > 0 && (
            <div className="trainer-list">
              {trainers.map((trainer) => (
                <div key={trainer._id} className="trainer-card">
                  <div className="trainer-info">
                    <h4 className="trainer-name">{trainer.name}</h4>
                    {trainer.mobileNumber && (
                      <p className="trainer-phone">{trainer.mobileNumber}</p>
                    )}
                    {trainer.address && (
                      <p className="trainer-address">{trainer.address}</p>
                    )}
                  </div>
                  <Button
                    onClick={() => handleDeleteTrainer(trainer._id)}
                    variant="danger"
                    className="delete-button"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TrainerPage;

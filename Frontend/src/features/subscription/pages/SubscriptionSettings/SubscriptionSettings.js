import React, { useEffect } from 'react';
import { updateSubscriptionDetails } from '../../../../api/services/subscriptionService';
import { useApi } from '../../../../hooks/useApi';
import { useForm } from '../../../../hooks/useForm';
import { Input, Button, LoadingSpinner, Card, PageHeader } from '../../../../shared/components';
import { STORAGE_KEYS } from '../../../../constants/storageKeys';
import apiClient from '../../../../api/axiosConfig';
import { API_ENDPOINTS } from '../../../../constants/apiEndpoints';
import './SubscriptionSettings.css';

const SubscriptionSettings = () => {
  const { execute, loading } = useApi();
  const { execute: fetchData, loading: dataLoading } = useApi();
  
  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    setValues,
    setErrors
  } = useForm({
    silverMonthly: 0,
    silverAnnual: 0,
    goldMonthly: 0,
    goldAnnual: 0,
    platinumMonthly: 0,
    platinumAnnual: 0,
  });

  useEffect(() => {
    fetchSubscriptionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSubscriptionData = async () => {
    const gymId = localStorage.getItem(STORAGE_KEYS.GYM_ID);
    
    const result = await fetchData(
      async () => {
        const response = await apiClient.get(API_ENDPOINTS.ADMIN.GYM.DETAILS, {
          params: { id: gymId },
        });
        return response.data;
      },
      { showErrorAlert: true }
    );

    if (result.success && result.data.gym) {
      const gym = result.data.gym;
      setValues({
        silverMonthly: gym.silverMonthly || 0,
        silverAnnual: gym.silverAnnual || 0,
        goldMonthly: gym.goldMonthly || 0,
        goldAnnual: gym.goldAnnual || 0,
        platinumMonthly: gym.platinumMonthly || 0,
        platinumAnnual: gym.platinumAnnual || 0,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = ['silverMonthly', 'silverAnnual', 'goldMonthly', 'goldAnnual', 'platinumMonthly', 'platinumAnnual'];
    
    fields.forEach(field => {
      const value = Number(formData[field]);
      if (value < 0) {
        newErrors[field] = 'Amount cannot be negative';
      } else if (value > 1000000) {
        newErrors[field] = 'Amount is too high';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await execute(
      () => updateSubscriptionDetails(formData),
      {
        showErrorAlert: true,
        showSuccessAlert: true,
        successMessage: 'Subscription details updated successfully',
      }
    );
  };

  if (dataLoading) {
    return <LoadingSpinner fullScreen />;
  }

  const tiers = [
    { name: 'Silver', color: 'silver', monthly: 'silverMonthly', annual: 'silverAnnual' },
    { name: 'Gold', color: 'gold', monthly: 'goldMonthly', annual: 'goldAnnual' },
    { name: 'Platinum', color: 'platinum', monthly: 'platinumMonthly', annual: 'platinumAnnual' }
  ];

  return (
    <div className="subscription-container">
      <PageHeader 
        title="Subscription Settings" 
        subtitle="Manage membership pricing for all tiers"
      />
      <form onSubmit={handleSubmit} className="subscription-form">
        <div className="subscription-tiers">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`subscription-tier subscription-tier-${tier.color}`}>
              <div className="tier-header">
                <h3 className="tier-name">{tier.name}</h3>
                <div className="tier-badge">{tier.name}</div>
              </div>
              <div className="tier-inputs">
                <Input
                  label="Monthly Amount (₹)"
                  type="number"
                  value={formData[tier.monthly]}
                  onChange={(e) => {
                    handleChange(tier.monthly)(e);
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setErrors(prev => ({ ...prev, [tier.monthly]: null }));
                    }
                  }}
                  onBlur={handleBlur(tier.monthly)}
                  error={touched[tier.monthly] && errors[tier.monthly]}
                  min="0"
                  placeholder="Enter monthly price"
                />
                <Input
                  label="Yearly Amount (₹)"
                  type="number"
                  value={formData[tier.annual]}
                  onChange={(e) => {
                    handleChange(tier.annual)(e);
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setErrors(prev => ({ ...prev, [tier.annual]: null }));
                    }
                  }}
                  onBlur={handleBlur(tier.annual)}
                  error={touched[tier.annual] && errors[tier.annual]}
                  min="0"
                  placeholder="Enter yearly price"
                />
              </div>
            </Card>
          ))}
        </div>
        <div className="form-actions">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Button type="submit" variant="primary" className="save-button">
              Save All Changes
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SubscriptionSettings;

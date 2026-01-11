/**
 * Billing Page
 * Calculate billing for customer subscriptions
 */

import React, { useEffect, useState } from 'react';
import { getGymDetails } from '../../../../api/services/gymService';
import { useApi } from '../../../../hooks/useApi';
import { Input, Select, Button, LoadingSpinner, Card, PageHeader } from '../../../../shared/components';
import { STORAGE_KEYS } from '../../../../constants/storageKeys';
import './BillingPage.css';

const BillingPage = () => {
  const [selectedMembership, setSelectedMembership] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState('monthly');
  const [months, setMonths] = useState(1);
  const [membershipData, setMembershipData] = useState({
    gold: { monthly: 0, yearly: 0 },
    silver: { monthly: 0, yearly: 0 },
    platinum: { monthly: 0, yearly: 0 }
  });
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [errors, setErrors] = useState({});

  const { execute: fetchData, loading: dataLoading } = useApi();

  useEffect(() => {
    fetchGymDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGymDetails = async () => {
    const gymId = localStorage.getItem(STORAGE_KEYS.GYM_ID);
    const result = await fetchData(
      () => getGymDetails(gymId),
      { showErrorAlert: true }
    );

    if (result.success && result.data.gym) {
      const gym = result.data.gym;
      setMembershipData({
        gold: {
          monthly: gym.goldMonthly || 0,
          yearly: gym.goldAnnual || 0
        },
        silver: {
          monthly: gym.silverMonthly || 0,
          yearly: gym.silverAnnual || 0
        },
        platinum: {
          monthly: gym.platinumMonthly || 0,
          yearly: gym.platinumAnnual || 0
        }
      });
    }
  };

  const validateAndCalculate = () => {
    const newErrors = {};
    
    if (!selectedMembership) {
      newErrors.membership = 'Please select a membership plan';
    }
    
    if (selectedSubscription === 'monthly' && (!months || months < 1)) {
      newErrors.months = 'Please enter a valid number of months';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    calculateTotal();
  };

  const calculateTotal = () => {
    if (selectedMembership && selectedSubscription) {
      const membershipPrice = membershipData[selectedMembership][selectedSubscription];
      const subscriptionTotal = selectedSubscription === 'monthly'
        ? membershipPrice * months
        : membershipPrice;
      setCalculatedTotal(subscriptionTotal);
      return subscriptionTotal;
    }
    setCalculatedTotal(0);
    return 0;
  };

  useEffect(() => {
    if (selectedMembership && selectedSubscription) {
      const membershipPrice = membershipData[selectedMembership][selectedSubscription];
      const subscriptionTotal = selectedSubscription === 'monthly'
        ? membershipPrice * months
        : membershipPrice;
      setCalculatedTotal(subscriptionTotal);
    } else {
      setCalculatedTotal(0);
    }
  }, [selectedMembership, selectedSubscription, months, membershipData]);

  if (dataLoading) {
    return <LoadingSpinner fullScreen />;
  }

  const membershipOptions = [
    { value: '', label: 'Select Membership Plan' },
    { value: 'silver', label: 'Silver' },
    { value: 'gold', label: 'Gold' },
    { value: 'platinum', label: 'Platinum' }
  ];

  const subscriptionOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  return (
    <div className="billing-page">
      <PageHeader 
        title="Billing Calculator" 
        subtitle="Calculate subscription costs for customers"
      />
      <Card className="billing-form">
        <form onSubmit={(e) => { e.preventDefault(); validateAndCalculate(); }} className="billing-form-content">
          <Select
            label="Membership Plan"
            value={selectedMembership}
            onChange={(e) => {
              setSelectedMembership(e.target.value);
              setErrors(prev => ({ ...prev, membership: null }));
            }}
            options={membershipOptions}
            error={errors.membership}
            required
          />
          
          <Select
            label="Subscription Type"
            value={selectedSubscription}
            onChange={(e) => {
              setSelectedSubscription(e.target.value);
              if (e.target.value === 'yearly') {
                setMonths(1);
              }
            }}
            options={subscriptionOptions}
            required
          />
          
          {selectedSubscription === 'monthly' && (
            <Input
              label="Number of Months"
              type="number"
              value={months}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMonths(value);
                setErrors(prev => ({ ...prev, months: null }));
              }}
              error={errors.months}
              required
              min="1"
              placeholder="Enter number of months"
            />
          )}
          
          {selectedMembership && (
            <div className="price-preview">
              <div className="price-preview-item">
                <span className="price-label">Base Price:</span>
                <span className="price-value">
                  ₹{membershipData[selectedMembership][selectedSubscription]}
                </span>
              </div>
              {selectedSubscription === 'monthly' && months > 1 && (
                <div className="price-preview-item">
                  <span className="price-label">Duration:</span>
                  <span className="price-value">{months} months</span>
                </div>
              )}
            </div>
          )}
          
          <div className="form-actions">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => {
                setSelectedMembership('');
                setSelectedSubscription('monthly');
                setMonths(1);
                setCalculatedTotal(0);
                setErrors({});
              }}
            >
              Reset
            </Button>
            <Button type="submit" variant="primary" className="calculate-button">
              Calculate Total
            </Button>
          </div>
          
          {calculatedTotal > 0 && (
            <div className="total-display">
              <div className="total-label">Total Amount</div>
              <div className="total-amount">₹{calculatedTotal.toLocaleString('en-IN')}</div>
              <div className="total-breakdown">
                {selectedSubscription === 'monthly' && months > 1 && (
                  <span>
                    ₹{membershipData[selectedMembership].monthly} × {months} months
                  </span>
                )}
                {selectedSubscription === 'yearly' && (
                  <span>Yearly subscription</span>
                )}
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default BillingPage;

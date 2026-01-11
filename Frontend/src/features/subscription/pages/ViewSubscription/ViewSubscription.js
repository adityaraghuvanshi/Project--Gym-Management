/**
 * View Subscription Page
 * Display customer subscription details
 */

import React, { useEffect, useState } from 'react';
import { getCustomerById } from '../../../../api/services/customerService';
import { useApi } from '../../../../hooks/useApi';
import { LoadingSpinner, Card, PageHeader } from '../../../../shared/components';
import { STORAGE_KEYS } from '../../../../constants/storageKeys';
import './ViewSubscription.css';

const ViewSubscription = () => {
  const [customer, setCustomer] = useState(null);
  const { execute, loading } = useApi();

  useEffect(() => {
    const customerId = localStorage.getItem(STORAGE_KEYS.CUSTOMER_ID);
    if (customerId) {
      fetchCustomerDetails(customerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomerDetails = async (customerId) => {
    const result = await execute(
      () => getCustomerById(customerId),
      { showErrorAlert: true }
    );

    if (result.success && result.data.customer) {
      setCustomer(result.data.customer);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!customer) {
    return <div>No customer data found</div>;
  }

  return (
    <div className="gym-subscription-page">
      <PageHeader title="Customer Subscription Details" />
      <Card className="subscription-details">
        <div className="detail-item">
          <strong>Name:</strong>
          <span>{customer.name}</span>
        </div>
        <div className="detail-item">
          <strong>Age:</strong>
          <span>{customer.age}</span>
        </div>
        <div className="detail-item">
          <strong>Mobile Number:</strong>
          <span>{customer.mobileNumber}</span>
        </div>
        <div className="detail-item">
          <strong>Height:</strong>
          <span>{customer.height} cm</span>
        </div>
        <div className="detail-item">
          <strong>Weight:</strong>
          <span>{customer.weight} kg</span>
        </div>
        <div className="detail-item">
          <strong>Subscription Valid Until:</strong>
          <span>{customer.subscribedUpto ? new Date(customer.subscribedUpto).toLocaleDateString() : 'Not subscribed'}</span>
        </div>
      </Card>
    </div>
  );
};

export default ViewSubscription;

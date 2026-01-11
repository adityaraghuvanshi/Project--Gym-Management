import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCustomers, deleteCustomer } from '../../../../api/services/customerService';
import { useApi } from '../../../../hooks/useApi';
import { Button, LoadingSpinner, Table, PageHeader } from '../../../../shared/components';
import { ROUTES } from '../../../../constants/routes';
import { STORAGE_KEYS } from '../../../../constants/storageKeys';
import './CustomerHistory.css';

const CustomerHistory = () => {
  const [customers, setCustomers] = useState([]);
  const { execute, loading } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomers = async () => {
    const result = await execute(
      () => getAllCustomers(),
      { showErrorAlert: true }
    );

    if (result.success) {
      setCustomers(result.data.customers || []);
    }
  };

  const handleAddCustomer = () => {
    navigate(ROUTES.REGISTRATION_FORM);
  };

  const handleViewSubscription = (customerId) => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, customerId);
    navigate(ROUTES.VIEW_SUBSCRIPTION);
  };

  const handleUpdateCustomer = (customerId) => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, customerId);
    navigate(ROUTES.UPDATE_CUSTOMER_FORM);
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    await execute(
      () => deleteCustomer(customerId),
      {
        showErrorAlert: true,
        showSuccessAlert: true,
        successMessage: 'Customer deleted successfully',
        onSuccess: () => fetchCustomers()
      }
    );
  };

  return (
    <div className="customer-history">
      <PageHeader
        title="Customer History"
        subtitle="Manage all customers"
      >
        <Button onClick={handleAddCustomer} variant="primary">
          Add Customer
        </Button>
      </PageHeader>
      
      {loading && <LoadingSpinner />}
      {!loading && (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.mobileNumber}</td>
                <td>
                  <Button
                    onClick={() => handleViewSubscription(customer._id)}
                    variant="secondary"
                    className="action-button"
                  >
                    View Subscription
                  </Button>
                  <Button
                    onClick={() => handleDeleteCustomer(customer._id)}
                    variant="danger"
                    className="action-button"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleUpdateCustomer(customer._id)}
                    variant="secondary"
                    className="action-button"
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CustomerHistory;

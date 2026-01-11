import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGyms, deleteGym } from '../../../../api/services/gymService';
import { useApi } from '../../../../hooks/useApi';
import { Button, LoadingSpinner, Table, PageHeader } from '../../../../shared/components';
import { ROUTES } from '../../../../constants/routes';
import { STORAGE_KEYS } from '../../../../constants/storageKeys';
import './SuperAdminDashboardPage.css';

const SuperAdminDashboardPage = () => {
  const [gyms, setGyms] = useState([]);
  const { execute, loading } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGyms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGyms = async () => {
    const result = await execute(
      () => getAllGyms(),
      { showErrorAlert: true }
    );

    if (result.success) {
      setGyms(result.data.gyms || []);
    }
  };

  const handleAddGym = () => {
    navigate(ROUTES.ADD_GYM);
  };

  const handleUpdate = (gymId) => {
    localStorage.setItem(STORAGE_KEYS.GYM_ID, gymId);
    navigate(ROUTES.UPDATE_GYM);
  };

  const handleDelete = async (gymId) => {
    if (!window.confirm('Are you sure you want to delete this gym?')) {
      return;
    }

    await execute(
      () => deleteGym(gymId),
      { 
        showErrorAlert: true,
        showSuccessAlert: true,
        successMessage: 'Gym deleted successfully',
        onSuccess: () => fetchGyms()
      }
    );
  };

  return (
    <div className="super-admin-dashboard">
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="Manage all gyms in the system"
      >
        <Button onClick={handleAddGym} variant="primary">
          Add Gym
        </Button>
      </PageHeader>
      
      {loading && <LoadingSpinner />}
      {!loading && (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Owner</th>
              <th>Mobile Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gyms.map((gym) => (
              <tr key={gym._id}>
                <td>{gym.gymName}</td>
                <td>{gym.address}</td>
                <td>{gym.adminName}</td>
                <td>{gym.mobileNumber}</td>
                <td>
                  <Button
                    onClick={() => handleUpdate(gym._id)}
                    variant="secondary"
                    className="action-button"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(gym._id)}
                    variant="danger"
                    className="action-button"
                  >
                    Delete
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

export default SuperAdminDashboardPage;

import React, { useEffect, useState } from "react";
import { getAllGyms, deleteGym } from "../api/services/gymService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError, showSuccess } from "../utils/errorHandler";
import { CircularProgress } from "@mui/material";
import "./SuperAdminDashboardPage.css";

const SuperAdminDashboardPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [gyms, setGyms] = useState([]);

    const handleAddGym = () => {
        window.location.assign("/addgymform");
    };

    const handleUpdate = (index) => {
        localStorage.setItem(STORAGE_KEYS.GYM_ID, gyms[index]._id);
        window.location.assign("/updategymform");
    };

    const handleDelete = (gymId) => {
        deleteGymDataById(gymId);
    };

    const deleteGymDataById = async (gymId) => {
        setDataLoading(true);
        try {
            const response = await deleteGym(gymId);
            
            if (!response || !response.success) {
                showError(response?.message || "Failed to delete gym.");
                return;
            }

            showSuccess("Gym Deleted Successfully");
            fetchData();
        } catch (error) {
            showError("An error occurred while deleting gym.");
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAllGyms();
            
            if (!response || !response.success) {
                showError(response?.message || "Failed to fetch gyms.");
                return;
            }

            setGyms(response.data.gyms || []);
        } catch (error) {
            showError("An error occurred while fetching gyms.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="super-admin-dashboard">
            <h1>Super Admin Dashboard</h1>
            <button className="addGym-button" onClick={handleAddGym}>
                Add Gym
            </button>
            <h3>Gym List</h3>
            <div className="table-container">
                {!loading && (
                    <table>
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
                            {gyms.map((gym, index) => (
                                <tr key={index}>
                                    <td>{gym.gymName}</td>
                                    <td>{gym.address}</td>
                                    <td>{gym.adminName}</td>
                                    <td>{gym.mobileNumber}</td>
                                    <td>
                                        <button
                                            onClick={() => handleUpdate(index)}
                                            id="operation-button"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(gym._id)
                                            }
                                            id="operation-button"
                                            disabled={dataLoading}
                                        >
                                            {dataLoading ? <CircularProgress size={20} /> : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {loading && <CircularProgress />}
            </div>
        </div>
    );
};

export default SuperAdminDashboardPage;

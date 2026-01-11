import React, { useState, useEffect } from "react";
import { getGymDetails } from "../api/services/gymService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError } from "../utils/errorHandler";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [gymName, setGymName] = useState("");
    const [address, setAddress] = useState("");
    const [adminName, setAdminName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [dataLoading, setDataLoading] = useState(false);

    const getGymDataById = async () => {
        setDataLoading(true);
        const gymId = localStorage.getItem(STORAGE_KEYS.GYM_ID);

        try {
            const response = await getGymDetails(gymId);
            
            if (!response || !response.success) {
                showError(response?.message || "Failed to fetch gym details.");
                return;
            }

            const gym = response.data.gym;
            setGymName(gym.gymName);
            setAddress(gym.address);
            setAdminName(gym.adminName);
            setUserName(gym.username);
            setPhoneNumber(gym.mobileNumber?.slice(3, 13) || '');
            setPassword(gym.password);
        } catch (error) {
            showError("An error occurred while fetching gym details.");
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        getGymDataById();
    }, []);

    const handleCustomer = () => {
        window.location.assign("/customerdashboard");
    };

    const handleTrainer = () => {
        window.location.assign("/trainerpage");
    };

    const handleSubscriptionSetting = () => {
        window.location.assign("/subscriptionsettings");
    };

    return (
        <div className="adminDashboard">
            <div className="button-container">
                <button className="centered-button" onClick={handleCustomer}>
                    Customer
                </button>
                <button className="centered-button" onClick={handleTrainer}>
                    Trainer
                </button>
                <button
                    className="centered-button"
                    onClick={handleSubscriptionSetting}
                >
                    Subscription Setting
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;

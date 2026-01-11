import React, { useEffect, useState } from "react";
import { getGymById, updateGym } from "../api/services/gymService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError, showSuccess } from "../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const UpdateGymForm = () => {
    const navigate = useNavigate();
    const [gymName, setGymName] = useState("");
    const [address, setAddress] = useState("");
    const [adminName, setAdminName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!gymName || gymName.trim() === "") {
            showError("Gym Name cannot be empty");
            return;
        }
        if (!adminName || adminName.trim() === "") {
            showError("Admin Name cannot be empty");
            return;
        }
        if (!address || address.trim() === "") {
            showError("Address cannot be empty");
            return;
        }
        if (!userName || userName.trim() === "") {
            showError("Username cannot be empty");
            return;
        }
        if (phoneNumber.length !== 10) {
            showError("Phone number must be 10 digits");
            return;
        }
        if (password.length <= 5) {
            showError("Password length cannot be less than 6 characters");
            return;
        }
        updateGymData();
    };

    useEffect(() => {
        getGymDataById();
    }, []);

    const updateGymData = async () => {
        setLoading(true);
        const gymId = localStorage.getItem(STORAGE_KEYS.GYM_ID);

        try {
            const gymData = {
                gymName,
                address,
                adminName,
                username: userName,
                mobileNumber: "+91" + phoneNumber,
                password,
            };

            const response = await updateGym(gymId, gymData);

            if (!response || !response.success) {
                showError(response?.message || "Failed to update gym.");
                return;
            }

            showSuccess("Gym Updated Successfully");
            navigate(-1);
        } catch (error) {
            showError("An error occurred while updating gym.");
        } finally {
            setLoading(false);
        }
    };

    const getGymDataById = async () => {
        setDataLoading(true);
        const gymId = localStorage.getItem(STORAGE_KEYS.GYM_ID);

        try {
            const response = await getGymById(gymId);
            
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

    return (
        <div className="gym-form">
            <h2>Update Gym</h2>
            {!dataLoading && (
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Gym Name: </label>
                        <input
                            type="text"
                            value={gymName}
                            onChange={(e) => setGymName(e.target.value)}
                            required
                        />
                        <label>Address: </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <label>Admin Name: </label>
                        <input
                            type="text"
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                            required
                        />
                        <label>UserName: </label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <label>Mobile Number: </label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {loading && <CircularProgress />}
                    {!loading && <button type="submit">Update Gym</button>}
                </form>
            )}
            {dataLoading && <CircularProgress />}
        </div>
    );
};

export default UpdateGymForm;

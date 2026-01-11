import React, { useState } from "react";
import { addGym } from "../api/services/gymService";
import { showError, showSuccess } from "../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const GymForm = () => {
    const navigate = useNavigate();
    const [gymName, setGymName] = useState("");
    const [address, setAddress] = useState("");
    const [adminName, setAdminName] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
        addNewGym();
    };

    const addNewGym = async () => {
        setLoading(true);
        try {
            const gymData = {
                gymName,
                address,
                adminName,
                username: userName,
                mobileNumber: "+91" + phoneNumber,
                password,
            };

            const response = await addGym(gymData);

            if (!response || !response.success) {
                showError(response?.message || "Failed to add gym.");
                return;
            }

            showSuccess("Gym Added Successfully");
            navigate(-1);
        } catch (error) {
            showError("An error occurred while adding gym.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="gym-form">
            <h2>Add a Gym</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Gym Name:</label>
                    <input
                        type="text"
                        value={gymName}
                        onChange={(e) => setGymName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Admin Name:</label>
                    <input
                        type="text"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {loading && <CircularProgress />}
                {!loading && <button type="submit">Add Gym</button>}
            </form>
        </div>
    );
};

export default GymForm;

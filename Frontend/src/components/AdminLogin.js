import React, { useState } from "react";
import { adminLogin, storeAuthData } from "../api/services/authService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError, showSuccess } from "../utils/errorHandler";
import { CircularProgress } from "@mui/material";
import "./AdminLogin.css";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (username.length <= 0) {
            showError("Username cannot be empty");
            return;
        }
        if (password.length <= 5) {
            showError("Password length cannot be less than 6 characters");
            return;
        }
        performLogin();
    };

    const performLogin = async () => {
        setLoading(true);
        try {
            const response = await adminLogin(username, password);
            
            if (!response || !response.success) {
                showError(response?.message || "Login failed. Please try again.");
                return;
            }

            storeAuthData(response.data.token, 'admin', response.data.admin?._id);
            localStorage.setItem(STORAGE_KEYS.GYM_ID, response.data.admin?._id || '');
            window.location.assign("/admindashboard");
        } catch (error) {
            showError("An error occurred during login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="adminLogin-container">
            <div className="textbox">
                <h2>Admin</h2>
                <input
                    type="text"
                    className="first-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label id="first-textbox">Username</label>
                <input
                    type="password"
                    className="second-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label id="second-textbox">Password</label>
            </div>
            {loading && <CircularProgress />}
            {!loading && <button onClick={handleLogin}>Login</button>}
        </div>
    );
};

export default AdminLogin;

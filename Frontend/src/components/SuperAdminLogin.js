import React, { useState } from "react";
import { superAdminLogin, storeAuthData } from "../api/services/authService";
import { showError } from "../utils/errorHandler";
import CircularProgress from "@mui/material/CircularProgress";
import "./SuperAdminLogin.css";

const SuperAdminLogin = () => {
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
            const response = await superAdminLogin(username, password);
            
            if (!response || !response.success) {
                showError(response?.message || "Login failed. Please try again.");
                return;
            }

            storeAuthData(response.data.token, 'superAdmin');
            window.location.assign("/superadmindashboardpage");
        } catch (error) {
            showError("An error occurred during login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="superAdminLogin-container">
            <div className="text-box2">
                <h2>Super Admin</h2>
                <input
                    type="text"
                    className="first-input2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label id="first-textbox2">Username</label>
                <input
                    type="password"
                    className="second-input2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label id="second-textbox2">Password</label>
            </div>
            {loading && <CircularProgress />}
            {!loading && <button onClick={handleLogin}>Login</button>}
        </div>
    );
};

export default SuperAdminLogin;

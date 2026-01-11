/**
 * Login Form Component
 * Reusable login form for both Admin and Super Admin
 */

import React, { useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import {
    Input,
    Button,
    LoadingSpinner,
    Card,
} from "../../../../shared/components";
import "./LoginForm.css";

const LoginForm = ({ userType = "admin", title }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login, loading } = useAuth();

    const validate = () => {
        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        await login(username, password, userType);
    };

    return (
        <Card
            className={`login-form-container ${
                userType === "superAdmin"
                    ? "superAdminLogin-container"
                    : "adminLogin-container"
            }`}
        >
            <div className="login-form-content">
                <div className="login-form-header">
                    <h2>
                        {title ||
                            (userType === "superAdmin"
                                ? "Super Admin"
                                : "Admin")}
                    </h2>
                    <p className="login-form-subtitle">
                        Sign in to your account
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <Input
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            if (errors.username)
                                setErrors((prev) => ({
                                    ...prev,
                                    username: null,
                                }));
                        }}
                        error={errors.username}
                        required
                        placeholder="Enter your username"
                        autoComplete="username"
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password)
                                setErrors((prev) => ({
                                    ...prev,
                                    password: null,
                                }));
                        }}
                        error={errors.password}
                        required
                        placeholder="Enter your password"
                        autoComplete="current-password"
                    />
                    <div className="login-form-actions">
                        {loading ? (
                            <LoadingSpinner size={24} />
                        ) : (
                            <Button
                                type="submit"
                                variant="primary"
                                className="login-button"
                            >
                                Sign In
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default LoginForm;

import React, { useState } from "react";
import { addCustomer } from "../api/services/customerService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError, showSuccess } from "../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegistration = () => {
        if (name === "") {
            showError("Name cannot be empty!");
            return;
        }
        if (address === "") {
            showError("Address cannot be empty!");
            return;
        }
        if (age > 98 || age < 4) {
            showError("Age must be between 4 and 98");
            return;
        }
        if (mobileNumber.length !== 10) {
            showError("Phone number must be 10 digits");
            return;
        }
        if (height > 250 || height < 50) {
            showError("Height must be between 50 and 250 cm");
            return;
        }
        if (weight > 250 || weight < 50) {
            showError("Weight must be between 50 and 250 kg");
            return;
        }
        addNewCustomer();
    };

    const addNewCustomer = async () => {
        setLoading(true);
        try {
            const customerData = {
                name,
                address,
                age,
                mobileNumber,
                height,
                weight,
            };

            const response = await addCustomer(customerData);

            if (!response || !response.success) {
                showError(response?.message || "Failed to add customer.");
                return;
            }

            showSuccess("Customer Added Successfully");
            localStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, response.data.customer._id);
            window.location.assign("/billingpage");
        } catch (error) {
            showError("An error occurred while adding customer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-form">
            <h2>Registration Form</h2>
            <div className="input-group">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Phone Number:</label>
                <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Height:</label>
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Weight:</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </div>
            {loading && <CircularProgress />}
            {!loading && <button onClick={handleRegistration}>Register</button>}
        </div>
    );
};

export default RegistrationForm;

import React, { useEffect, useState } from "react";
import { getCustomerById, updateCustomer } from "../api/services/customerService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError, showSuccess } from "../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./UpdateGymForm.css";

const UpdateCustomerForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

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
        updateCustomerData();
    };

    useEffect(() => {
        getCustomerDataById();
    }, []);

    const updateCustomerData = async () => {
        setLoading(true);
        const customerId = localStorage.getItem(STORAGE_KEYS.CUSTOMER_ID);

        try {
            const customerData = {
                name,
                address,
                age,
                mobileNumber,
                height,
                weight,
            };

            const response = await updateCustomer(customerId, customerData);

            if (!response || !response.success) {
                showError(response?.message || "Failed to update customer.");
                return;
            }

            showSuccess("Customer Updated Successfully");
            navigate(-1);
        } catch (error) {
            showError("An error occurred while updating customer.");
        } finally {
            setLoading(false);
        }
    };

    const getCustomerDataById = async () => {
        setDataLoading(true);
        const customerId = localStorage.getItem(STORAGE_KEYS.CUSTOMER_ID);

        try {
            const response = await getCustomerById(customerId);
            
            if (!response || !response.success) {
                showError(response?.message || "Failed to fetch customer details.");
                return;
            }

            const customer = response.data.customer;
            setName(customer.name);
            setAge(customer.age);
            setAddress(customer.address);
            setMobileNumber(customer.mobileNumber?.slice(3, 13) || '');
            setHeight(customer.height);
            setWeight(customer.weight);
        } catch (error) {
            showError("An error occurred while fetching customer details.");
        } finally {
            setDataLoading(false);
        }
    };

    return (
        <div className="registration-form">
            <h2>Update Customer Registration Form</h2>
            {!dataLoading && (
                <div>
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
                    {!loading && (
                        <button onClick={handleRegistration}>Update</button>
                    )}
                </div>
            )}
            {dataLoading && <CircularProgress />}
        </div>
    );
};

export default UpdateCustomerForm;

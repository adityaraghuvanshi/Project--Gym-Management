import React, { useEffect, useState } from "react";
import { getCustomerById } from "../api/services/customerService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError } from "../utils/errorHandler";
import { CircularProgress } from "@mui/material";

const ViewSubscription = () => {
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCustomerDetails();
    }, []);

    const getCustomerDetails = async () => {
        setLoading(true);
        const customerId = localStorage.getItem(STORAGE_KEYS.CUSTOMER_ID);

        try {
            const response = await getCustomerById(customerId);
            
            if (!response || !response.success) {
                showError(response?.message || "Failed to fetch customer details.");
                return;
            }

            setCustomer(response.data.customer || {});
        } catch (error) {
            showError("An error occurred while fetching customer details.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className="gym-subscription-page">
            <h2>Customer Subscription Details</h2>
            <h3>Name: {customer.name}</h3>
            <h3>Age: {customer.age}</h3>
            <h3>Mobile Number: {customer.mobileNumber}</h3>
            <h3>Height: {customer.height}</h3>
            <h3>Weight: {customer.weight}</h3>
            <h3>Subscription on: {customer.subscribedUpto ? new Date(customer.subscribedUpto).toLocaleDateString() : 'N/A'}</h3>
        </div>
    );
};

export default ViewSubscription;

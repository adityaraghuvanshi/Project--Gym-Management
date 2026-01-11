import React, { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer } from "../api/services/customerService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError, showSuccess } from "../utils/errorHandler";
import { CircularProgress } from "@mui/material";

const CustomerHistoryTable = () => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [customers, setCustomers] = useState([]);

    const handleViewSubscription = (customerId) => {
        localStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, customerId);
        window.location.assign("/viewsubscription");
    };

    const handleUpdateCustomerForm = (index) => {
        localStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, customers[index]._id);
        window.location.assign("/updatecustomerform");
    };

    const handleAddCustomer = () => {
        window.location.assign("/registrationform");
    };

    const handleDeleteCustomer = (customerId) => {
        deleteCustomerById(customerId);
    };

    const deleteCustomerById = async (customerId) => {
        setDataLoading(true);
        try {
            const response = await deleteCustomer(customerId);
            
            if (!response || !response.success) {
                showError(response?.message || "Failed to delete customer.");
                return;
            }

            showSuccess("Customer Deleted Successfully");
            fetchAllCustomers();
        } catch (error) {
            showError("An error occurred while deleting customer.");
        } finally {
            setDataLoading(false);
        }
    };

    const fetchAllCustomers = async () => {
        setLoading(true);
        try {
            const response = await getAllCustomers();
            
            if (!response || !response.success) {
                showError(response?.message || "Failed to fetch customers.");
                return;
            }

            setCustomers(response.data.customers || []);
        } catch (error) {
            showError("An error occurred while fetching customers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    return (
        <div>
            <h1>Customer History Table</h1>
            <button onClick={handleAddCustomer}>Add</button>
            {!loading && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.name}</td>
                                <td>{customer.mobileNumber}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleViewSubscription(customer._id)
                                        }
                                    >
                                        View Subscription
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteCustomer(customer._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleUpdateCustomerForm(index)
                                        }
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {loading && <CircularProgress />}
        </div>
    );
};

export default CustomerHistoryTable;

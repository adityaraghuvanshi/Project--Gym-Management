import React, { useEffect, useState } from "react";
import { getGymDetails } from "../api/services/gymService";
import { applySubscription } from "../api/services/subscriptionService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError, showSuccess } from "../utils/errorHandler";
import { CircularProgress } from "@mui/material";
import './BillingPage.css';

const BillingPage = () => {
  const [selectedMembership, setSelectedMembership] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState('monthly');
  const [months, setMonths] = useState(1);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [membershipData, setMembershipData] = useState({
    gold: { monthly: 0, yearly: 0 },
    silver: { monthly: 0, yearly: 0 },
    platinum: { monthly: 0, yearly: 0 }
  });

  const [calculatedTotal, setCalculatedTotal] = useState(0); 

  const handleMembershipChange = (event) => {
    setSelectedMembership(event.target.value);
  };

  const handleSubscriptionChange = (event) => {
    setSelectedSubscription(event.target.value);
  };

  const handleMonthsChange = (event) => {
    setMonths(event.target.value);
  };

  const calculateTotal = () => {
    if (selectedMembership && selectedSubscription) {
      const membershipPrice = membershipData[selectedMembership][selectedSubscription];
      const subscriptionTotal = selectedSubscription === 'monthly' ? membershipPrice * months : membershipPrice;
      setCalculatedTotal(subscriptionTotal);
      return subscriptionTotal;
    }
    setCalculatedTotal(0);
    return 0;
  };
  
  useEffect(() => {
    fetchGymDetails();
  }, []);
  
  const fetchGymDetails = async () => {
    setDataLoading(true);
    const gymId = localStorage.getItem(STORAGE_KEYS.GYM_ID);

    try {
      const response = await getGymDetails(gymId);
      
      if (!response || !response.success) {
        showError(response?.message || "Failed to fetch gym details.");
        return;
      }

      const gym = response.data.gym;
      setMembershipData({
        gold: { monthly: gym.goldMonthly || 0, yearly: gym.goldAnnual || 0 },
        silver: { monthly: gym.silverMonthly || 0, yearly: gym.silverAnnual || 0 },
        platinum: { monthly: gym.platinumMonthly || 0, yearly: gym.platinumAnnual || 0 }
      });
    } catch (error) {
      showError("An error occurred while fetching gym details.");
    } finally {
      setDataLoading(false);
    }
  };

  const handleApplySubscription = async () => {
    if (!selectedMembership) {
      showError("Please select a membership type");
      return;
    }

    if (calculatedTotal <= 0) {
      showError("Please calculate the total first");
      return;
    }

    setLoading(true);
    const customerId = localStorage.getItem(STORAGE_KEYS.CUSTOMER_ID);

    try {
      // Calculate days based on subscription type
      let days = 0;
      if (selectedSubscription === 'monthly') {
        days = months * 30; // Approximate 30 days per month
      } else {
        days = 365; // 365 days for yearly
      }

      const response = await applySubscription(customerId, days);

      if (!response || !response.success) {
        showError(response?.message || "Failed to apply subscription.");
        return;
      }

      showSuccess("Subscription applied successfully");
      window.location.assign("/customerdashboard");
    } catch (error) {
      showError("An error occurred while applying subscription.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Billing Page</h1>
      {dataLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div>
            <label>
              Your Selected Membership is:
              <select value={selectedMembership} onChange={handleMembershipChange}>
                <option value="">Select</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Select Subscription:
              <select value={selectedSubscription} onChange={handleSubscriptionChange}>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
          </div>
          {selectedSubscription === 'monthly' && (
            <div>
              <label>
                Number of Months:
                <input type="number" value={months} onChange={handleMonthsChange} min="1" />
              </label>
            </div>
          )}
          <div>
            <div>
              <button onClick={calculateTotal}>Calculate</button>
            </div>
            {calculatedTotal > 0 && (
              <div>
                <p>Calculated Total: Rs. {calculatedTotal} ₹/-</p>
                <button onClick={handleApplySubscription} disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : "Apply Subscription"}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BillingPage;

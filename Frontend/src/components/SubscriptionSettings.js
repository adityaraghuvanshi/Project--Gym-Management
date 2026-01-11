import React, { useEffect, useState } from "react";
import { getGymDetails } from "../api/services/gymService";
import { updateSubscriptionDetails } from "../api/services/subscriptionService";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { showError, showSuccess } from "../utils/errorHandler";
import { CircularProgress } from "@mui/material";
import './SubscriptionSettings.css';

const SubscriptionSettings = () => {
  const [silverMonthly, setSilverMonthly] = useState(0);
  const [silverAnnual, setSilverAnnual] = useState(0);
  const [goldMonthly, setGoldMonthly] = useState(0);
  const [goldAnnual, setGoldAnnual] = useState(0);
  const [platinumMonthly, setPlatinumMonthly] = useState(0);
  const [platinumAnnual, setPlatinumAnnual] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);
  
  const fetchSubscriptionData = async () => {
    setDataLoading(true);
    const gymId = localStorage.getItem(STORAGE_KEYS.GYM_ID);

    try {
      const response = await getGymDetails(gymId);
      
      if (!response || !response.success) {
        showError(response?.message || "Failed to fetch subscription data.");
        return;
      }

      const gym = response.data.gym;
      setSilverMonthly(gym.silverMonthly || 0);
      setSilverAnnual(gym.silverAnnual || 0);
      setGoldMonthly(gym.goldMonthly || 0);
      setGoldAnnual(gym.goldAnnual || 0);
      setPlatinumMonthly(gym.platinumMonthly || 0);
      setPlatinumAnnual(gym.platinumAnnual || 0);
    } catch (error) {
      showError("An error occurred while fetching subscription data.");
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSubscription();
  };

  const updateSubscription = async () => {
    setLoading(true);

    try {
      const subscriptionData = {
        silverMonthly,
        silverAnnual,
        goldMonthly,
        goldAnnual,
        platinumMonthly,
        platinumAnnual
      };

      const response = await updateSubscriptionDetails(subscriptionData);

      if (!response || !response.success) {
        showError(response?.message || "Failed to update subscription details.");
        return;
      }

      showSuccess("Subscription details updated successfully");
    } catch (error) {
      showError("An error occurred while updating subscription details.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="subscription-container">
      <h1>Subscription Settings</h1>
      {!dataLoading && <form onSubmit={handleSubmit}>
        <div>
            <h2>Silver</h2>
            <div>
              <label>
                Monthly Amount:
                <input
                  type="number"
                  value={silverMonthly}
                  onChange={e => setSilverMonthly(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Yearly Amount:
                <input
                  type="number"
                  value={silverAnnual}
                  onChange={e => setSilverAnnual(e.target.value)}
                />
              </label>
            </div>
        </div>
        <div>
            <h2>Gold</h2>
            <div>
              <label>
                Monthly Amount:
                <input
                  type="number"
                  value={goldMonthly}
                  onChange={e => setGoldMonthly(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Yearly Amount:
                <input
                  type="number"
                  value={goldAnnual}
                  onChange={e => setGoldAnnual(e.target.value)}
                />
              </label>
            </div>
        </div>
        <div>
            <h2>Platinum</h2>
            <div>
              <label>
                Monthly Amount:
                <input
                  type="number"
                  value={platinumMonthly}
                  onChange={e => setPlatinumMonthly(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Yearly Amount:
                <input
                  type="number"
                  value={platinumAnnual}
                  onChange={e => setPlatinumAnnual(e.target.value)}
                />
              </label>
            </div>
        </div>
        {!loading && <button type="submit">Save</button>}
        {loading && <CircularProgress/>}
      </form>}
      {dataLoading && <CircularProgress/>}
    </div>
  );
};

export default SubscriptionSettings;

import React, { useEffect, useState } from "react";
import { getAllTrainers, addTrainer, deleteTrainer } from "../api/services/trainerService";
import { showError, showSuccess } from "../utils/errorHandler";
import { CircularProgress } from "@mui/material";
import "./TrainerPage.css";

const TrainerPage = () => {
    const [trainers, setTrainers] = useState([]);
    const [name, setTrainerName] = useState("");
    const [mobileNumber, setTrainerPhone] = useState("");
    const [address, setTrainerAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

    const addTrainerAdmin = () => {
        if (name === "") {
            showError("Trainer name cannot be empty!");
            return;
        }
        if (mobileNumber.length !== 10) {
            showError("Phone number must be 10 digits");
            return;
        }
        if (address === "") {
            showError("Address cannot be empty!");
            return;
        }
        addNewTrainer();
    };

    const addNewTrainer = async () => {
        setLoading(true);
        try {
            const trainerData = {
                name,
                mobileNumber,
                address,
            };

            const response = await addTrainer(trainerData);

            if (!response || !response.success) {
                showError(response?.message || "Failed to add trainer.");
                return;
            }

            showSuccess("Trainer Added Successfully");
            setTrainerName("");
            setTrainerPhone("");
            setTrainerAddress("");
            fetchTrainer();
        } catch (error) {
            showError("An error occurred while adding trainer.");
        } finally {
            setLoading(false);
        }
    };

    const fetchTrainer = async () => {
        setLoading(true);
        try {
            const response = await getAllTrainers();
            
            if (!response || !response.success) {
                showError(response?.message || "Failed to fetch trainers.");
                return;
            }

            setTrainers(response.data.trainers || []);
        } catch (error) {
            showError("An error occurred while fetching trainers.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTrainer = (trainerId) => {
        deleteTrainerById(trainerId);
    };

    const deleteTrainerById = async (trainerId) => {
        setDataLoading(true);
        try {
            const response = await deleteTrainer(trainerId);
            
            if (!response || !response.success) {
                showError(response?.message || "Failed to delete trainer.");
                return;
            }

            showSuccess("Trainer Deleted Successfully");
            fetchTrainer();
        } catch (error) {
            showError("An error occurred while deleting trainer.");
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainer();
    }, []);

    return (
        <div className="trainer-page">
            <div className="left-section">
                <h2>Add New Trainer</h2>
                <input
                    type="text"
                    placeholder="Name of Trainer"
                    value={name}
                    onChange={(e) => setTrainerName(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Phone No. of Trainer"
                    value={mobileNumber}
                    onChange={(e) => setTrainerPhone(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address of Trainer"
                    value={address}
                    onChange={(e) => setTrainerAddress(e.target.value)}
                />
                <button onClick={addTrainerAdmin} disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : "Add"}
                </button>
            </div>
            <div className="right-section">
                <h2>Trainers</h2>
                {loading && <CircularProgress />}
                {!loading && trainers.map((trainer, index) => (
                    <div key={index} className="trainer-row">
                        <h3>{trainer.name}</h3>
                        <button onClick={() => handleDeleteTrainer(trainer._id)} disabled={dataLoading}>
                            {dataLoading ? <CircularProgress size={20} /> : "Delete"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerPage;

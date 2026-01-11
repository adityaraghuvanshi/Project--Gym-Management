import React,{useEffect,useState} from "react";
import './BMICalculator.css';
import axios from "axios";


const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);
    }
  };
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    // Placeholder for future data fetching
    // This function can be implemented when needed
  };
  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <div className="input-group">
        <label>Weight (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Height (cm):</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi && <p>Your BMI: {bmi}</p>}
    </div>
  );
};

export default BMICalculator;

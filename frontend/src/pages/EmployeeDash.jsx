/*
Attributes:
  Website:SecureBlog Activity
  Author: talia0404
  URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
  Accessed on: 2025-09-29

  Website: Learn React – A Handbook for Beginners
  Author: Nathan Sebhastian
  URL: https://www.freecodecamp.org/news/react-for-beginners-handbook/
  Accessed on: 2025-10-01

Website: Animation code review
  Author: ChatGPT
  URL: https://chatgpt.com/g/g-p-68e986e750048191ac135c0f357e402a-insy/c/68e7f98d-5520-8320-a2c0-b9208ce345aa
  Accessed on: 2025-11-07
*/

import React, { useEffect, useState } from "react";
import API from "../services/api";
import TransactionTable from "./TransactionTable";
//cannot use login styling
import "../styles/employee.css";

const EmployeeDash = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get("/transactions");
        setTransactions(res.data);
      } catch (err) {
        setError("Error loading transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleVerify = (id) => {
    setTransactions((prev) =>
      prev.map((t) => (t._id === id ? { ...t, verified: true } : t))
    );
  };

  const handleSubmitToSWIFT = async () => {
    const verified = transactions.filter((t) => t.verified);
    if (verified.length === 0) {
      alert("No verified transactions to submit.");
      return;
    }
    try {
      await API.post("/transactions/submit-swift", { verified });
      alert("Transactions submitted to SWIFT successfully!");
      setTransactions((prev) =>
        prev.filter((t) => !t.verified) 
      );
    } catch (err) {
      alert("Error submitting to SWIFT.");
    }
  };

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <h1>Employee International Payments Portal</h1>
      <TransactionTable transactions={transactions} onVerify={handleVerify} />
      <button className="submit-btn" onClick={handleSubmitToSWIFT}>
        Submit to SWIFT
      </button>
    </div>
  );
};

export default EmployeeDash;
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

// src/components/TransactionTable.jsx
import React from "react";

const TransactionTable = ({ transactions, onVerify }) => {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Payee Name</th>
          <th>Account Number</th>
          <th>SWIFT Code</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Verify</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 ? (
          <tr>
            <td colSpan="7">No transactions found</td>
          </tr>
        ) : (
          transactions.map((t, index) => (
            <tr key={t._id}>
              <td>{index + 1}</td>
              <td>{t.payeeName}</td>
              <td>{t.accountNumber}</td>
              <td>{t.swiftCode}</td>
              <td>{t.amount}</td>
              <td>{t.verified ? "Verified" : "Pending"}</td>
              <td>
                {!t.verified ? (
                  <button
                    className="verify-btn"
                    onClick={() => onVerify(t._id)}
                  >
                    Verify
                  </button>
                ) : (
                  <button className="verified" disabled>
                    ✓
                  </button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TransactionTable;


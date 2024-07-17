import React, { useEffect, useState } from 'react';
import { getDashboardSummary } from '../services/AccountServices';
import { useUser } from '../contexts/UserContext';

export default function DashboardScreen() {
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const { userId } = useUser();

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const summary = await getDashboardSummary(userId);
        setDashboardSummary(summary);
      } catch (error) {
        console.error('Failed to fetch dashboard summary:', error);
      }
    };

    fetchDashboardSummary();
  }, [userId]);

  return (
    <div>
      <h1>Dashboard Summary</h1>
      {dashboardSummary ? (
        <div>
          <p>Total Income: {dashboardSummary.totalIncome}</p>
          <p>Total Expenses: {dashboardSummary.totalExpenses}</p>
          <p>Balance: {dashboardSummary.balance}</p>
          <h2>Recent Transactions</h2>
          <ul>
            {dashboardSummary.recentTransactions.map((transaction) => (
              <li key={transaction.transactionId}>
                <p>Amount: {transaction.amount}</p>
                <p>Type: {transaction.type}</p>
                <p>Category: {transaction.category}</p>
                <p>Description: {transaction.description}</p>
                <p>Date: {transaction.date}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading dashboard summary...</p>
      )}
    </div>
  );
}
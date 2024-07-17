import React, { useEffect, useState } from 'react';
import { getDashboardSummary } from '../services/AccountServices';
import { useUser } from '../contexts/UserContext';
import { FlatList, View, Text, StyleSheet} from 'react-native';

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
    <View style={styles.container}>
      <Text style={{ fontSize: 16 }}>Dashboard Summary</Text>
      {dashboardSummary ? (
        <View>
          <Text>Total Income: {dashboardSummary.totalIncome}</Text>
          <Text>Total Expenses: {dashboardSummary.totalExpenses}</Text>
          <Text>Balance: {dashboardSummary.balance}</Text>
          <Text>Recent Transactions</Text>
          <FlatList>
            {dashboardSummary.recentTransactions.map((transaction) => (
              <View key={transaction.transactionId}>
                <Text>Amount: {transaction.amount}</Text>
                <Text>Type: {transaction.type}</Text>
                <Text>Category: {transaction.category}</Text>
                <Text>Description: {transaction.description}</Text>
                <Text>Date: {transaction.date}</Text>
              </View>
            ))}
          </FlatList>
        </View>
      ) : (
        <Text>Loading dashboard summary...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
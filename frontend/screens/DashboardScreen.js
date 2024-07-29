import React, { useCallback, useEffect, useState } from "react";
import { getDashboardSummary } from "../services/AccountServices";
import { useUser } from "../contexts/UserContext";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function DashboardScreen({ navigation }) {
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const { userId } = useUser();

  useFocusEffect(
    useCallback(() => {
      const fetchDashboardSummary = async () => {
        try {
          const summary = await getDashboardSummary(userId);
          setDashboardSummary(summary);
        } catch (error) {
          console.error("Failed to fetch dashboard summary:", error);
        }
      };

      fetchDashboardSummary();
    }, [userId])
  );

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Dashboard Summary</Text>
      {dashboardSummary ? (
        <View>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              Total Income: {dashboardSummary.totalIncome}
            </Text>
            <Text style={styles.summaryText}>
              Total Expenses: {dashboardSummary.totalExpenses}
            </Text>
            <Text style={styles.summaryText}>
              Balance: {dashboardSummary.balance}
            </Text>
          </View>
          <Text style={styles.transactionsHeader}>Recent Transactions</Text>
          <FlatList
            data={dashboardSummary.recentTransactions}
            keyExtractor={(item) => item.transactionId.toString()}
            renderItem={({ item: transaction }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionText}>
                  Amount: {transaction.amount}
                </Text>
                <Text style={styles.transactionText}>
                  Type: {transaction.type}
                </Text>
                <Text style={styles.transactionText}>
                  Category: {transaction.category}
                </Text>
                <Text style={styles.transactionText}>
                  Description: {transaction.description}
                </Text>
                <Text style={styles.transactionText}>
                  Date: {new Date(transaction.date).toISOString().slice(0, 10)}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CreateTransaction")}
          >
            <Text style={styles.buttonText}>Add a Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Accounts")}
          >
            <Text style={styles.buttonText}>View Accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Transactions")}
          >
            <Text style={styles.buttonText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading dashboard summary...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  transactionsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

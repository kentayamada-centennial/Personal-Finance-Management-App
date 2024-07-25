import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  getTransactions,
  deleteTransaction,
} from "../services/TransactionServices";
import { useUser } from "../contexts/UserContext";
import { useFocusEffect } from "@react-navigation/native";

export default function TransactionsScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const { userId } = useUser();

  useFocusEffect(
    useCallback(() => {
      const fetchTransactions = async () => {
        try {
          const data = await getTransactions(userId);
          setTransactions(data);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      };

      fetchTransactions();
    }, [userId])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.transactionId.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>Amount: {item.amount}</Text>
            <Text style={styles.transactionText}>Type: {item.type}</Text>
            <Text style={styles.transactionText}>
              Category: {item.category}
            </Text>
            <Text style={styles.transactionText}>
              Description: {item.description}
            </Text>
            <Text style={styles.transactionText}>
              Date: {new Date(item.date).toISOString().slice(0, 10)}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditTransaction", { transaction: item })
                }
              >
                <FontAwesomeIcon icon={faEdit} size={24} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await deleteTransaction(item.transactionId);
                  const updatedTransactions = await getTransactions(userId);
                  setTransactions(updatedTransactions);
                }}
                style={styles.deleteButton}
              >
                <FontAwesomeIcon icon={faTrash} size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  transactionItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 10,
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

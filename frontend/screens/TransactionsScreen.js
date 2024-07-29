import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  getTransactions,
  deleteTransaction,
} from "../services/TransactionServices";
import { useUser } from "../contexts/UserContext";
import { useFocusEffect } from "@react-navigation/native";

const { height } = Dimensions.get("window");

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        ListHeaderComponent={<View style={styles.headerSpacer} />}
        ListFooterComponent={<View style={styles.footerSpacer} />}
        contentContainerStyle={styles.flatListContainer}
      />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  transactionItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
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
  headerSpacer: {
    height: 10,
  },
  footerSpacer: {
    height: 20,
  },
  flatListContainer: {
    flexGrow: 1,
  },
});

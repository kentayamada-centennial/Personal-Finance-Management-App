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
import { getAccounts, deleteAccount } from "../services/AccountServices";
import { useUser } from "../contexts/UserContext";
import { useFocusEffect } from "@react-navigation/native";

export default function AccountsScreen({ navigation }) {
  const [accounts, setAccounts] = useState([]);
  const { userId } = useUser();

  useFocusEffect(
    useCallback(() => {
      const fetchAccounts = async () => {
        try {
          const data = await getAccounts(userId);
          setAccounts(data);
        } catch (error) {
          console.error("Failed to fetch accounts:", error);
        }
      };
      fetchAccounts();
    }, [userId])
  );

  const renderAccountItem = ({ item }) => (
    <View style={styles.accountItem}>
      <Text style={styles.accountText}>
        {item.name} - {item.type.toUpperCase()}
      </Text>
      <Text style={styles.accountText}>Balance: ${item.balance}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("EditAccount", {account: item})}>
          <FontAwesomeIcon icon={faEdit} size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await deleteAccount(item.accountId);
            const updatedAccounts = await getAccounts(userId);
            setAccounts(updatedAccounts);
          }}
          style={styles.deleteButton}
        >
          <FontAwesomeIcon icon={faTrash} size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.accountId.toString()}
        renderItem={renderAccountItem}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.buttonText}>Add Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  accountItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accountText: {
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

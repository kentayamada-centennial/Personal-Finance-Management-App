import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import { updateTransaction } from "../services/TransactionServices";
import { useUser } from "../contexts/UserContext";
import { getAccounts } from "../services/AccountServices";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-date-picker";
import { Picker } from "@react-native-picker/picker";

export default function EditAccountScreen({ route, navigation }) {
  const { transaction } = route.params;
  const { userId } = useUser();
  const [accounts, setAccounts] = useState([]);

  const transactionId = transaction.transactionId;

  const [transactionDetails, setTransactionDetails] = useState({
    accountId: transaction.accountId.toString(),
    amount: transaction.amount.toString(),
    type: transaction.type,
    category: transaction.category,
    description: transaction.description,
    date: new Date(transaction.date),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts(userId);
        setAccounts(data);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      }
    };

    fetchAccounts();
  }, [userId]);

  const handleInputChange = (key, value) => {
    setTransactionDetails({
      ...transactionDetails,
      [key]: value,
    });
  };

  const handleSave = async () => {
    try {
      await updateTransaction(transactionId, transactionDetails);
      navigation.goBack();
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Transaction</Text>
      <Text style={styles.label}>Account</Text>
      <Picker
        style={styles.picker}
        selectedValue={transactionDetails.accountId}
        onValueChange={(itemValue) => handleInputChange("accountId", itemValue)}
      >
        {accounts.map((account) => (
          <Picker.Item
            key={account.accountId}
            label={account.name}
            value={account.accountId.toString()}
          />
        ))}
      </Picker>
      <Text style={styles.label}>Amount $</Text>
      <TextInput
        style={styles.input}
        value={transactionDetails.amount}
        onChangeText={(value) =>
          handleInputChange("amount", value.replace(/[^0-9]/g, ""))
        }
        keyboardType="numeric"
      />
      <Text style={styles.label}>Type</Text>
      <Picker
        selectedValue={transactionDetails.type}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange("type", itemValue)}
      >
        <Picker.Item label="Income" value="income" />
        <Picker.Item label="Expense" value="expense" />
      </Picker>
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={transactionDetails.category}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange("category", itemValue)}
      >
        <Picker.Item label="Other" value="Other" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Transportation" value="Transportation" />
        <Picker.Item label="Housing" value="Housing" />
        <Picker.Item label="Health" value="Health" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Debt Payments" value="Debt Payments" />
        <Picker.Item label="Bills" value="Bills" />
        <Picker.Item label="Salary" value="Salary" />
        <Picker.Item label="Passive" value="Passive" />
      </Picker>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={transactionDetails.description}
        onChangeText={(value) => handleInputChange("description", value)}
      />
      <TextInput
        style={styles.input}
        value={transactionDetails.date.toLocaleDateString()}
        onFocus={() => setShowDatePicker(true)}
        showSoftInputOnFocus={false}
      />
      {showDatePicker && Platform.OS !== "web" && (
        <DateTimePicker
          value={transactionDetails.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showDatePicker && Platform.OS === "web" && (
        <DatePicker
          selected={transactionDetails.date}
          onChange={(date) => handleDateChange(null, date)}
          inline
        />
      )}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    padding: 10,
  },
  picker: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    padding: 10,
  },
});

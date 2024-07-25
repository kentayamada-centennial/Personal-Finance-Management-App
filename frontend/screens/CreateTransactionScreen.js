import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useUser } from "../contexts/UserContext";
import { postTransactions } from "../services/TransactionServices";
import { getAccounts } from "../services/AccountServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateTransactionScreen({ navigation }) {
  const { userId } = useUser();
  const [accounts, setAccounts] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState({
    accountId: "",
    amount: "",
    type: "INCOME",
    category: "OTHER",
    description: "",
    date: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts(userId);
        setAccounts(data);
        console.log(data);
        if (data.length > 0) {
          setTransactionDetails((prevDetails) => ({
            ...prevDetails,
            accountId: data[0].accountId.toString(),
          }));
        }
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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || transactionDetails.date;
    setShowDatePicker(false);
    setTransactionDetails({ ...transactionDetails, date: currentDate });
  };

  const handleSubmit = async () => {
    const formattedTransaction = {
      ...transactionDetails,
      date: transactionDetails.date.toISOString(),
      amount:
        transactionDetails.type.toLocaleLowerCase() === "expense"
          ? -Math.abs(transactionDetails.amount)
          : Math.abs(transactionDetails.amount),
    };
    try {
      console.log(formattedTransaction);
      await postTransactions(formattedTransaction);
      navigation.goBack();
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Transaction</Text>
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
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        keyboardType="numeric"
        value={transactionDetails.amount}
        onChangeText={(value) => handleInputChange("amount", value)}
      />
      <Text style={styles.label}>Type</Text>
      <Picker
        style={styles.picker}
        selectedValue={transactionDetails.type}
        onValueChange={(itemValue) => handleInputChange("type", itemValue)}
      >
        <Picker.Item label="Income" value="Income" />
        <Picker.Item label="Expense" value="Expense" />
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
      </Picker>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={transactionDetails.description}
        onChangeText={(value) => handleInputChange("description", value)}
      />
      <Text style={styles.label}>Date</Text>
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

      <Button title="Create Transaction" onPress={handleSubmit} />
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

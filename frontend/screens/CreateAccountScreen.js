import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
  StyleSheet,
} from "react-native";
import { useUser } from "../contexts/UserContext";
import { postAccount } from "../services/AccountServices";

export default function CreateAccountScreen({ navigation }) {
  const { userId } = useUser();
  const [accountDetails, setAccountDetails] = useState({
    name: "",
    balance: "",
    type: "SAVINGS",
  });

  const handleInputChange = (key, value) => {
    setAccountDetails({
      ...accountDetails,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await postAccount(userId, {
        ...accountDetails,
        balance: accountDetails.balance,
      });
      console.log("Account created successfully:", response);
      navigation.goBack();
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={accountDetails.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <Text style={styles.label}>Type</Text>
      <Picker
        selectedValue={accountDetails.type}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange("type", itemValue)}
      >
        <Picker.Item label="Savings" value="SAVINGS" />
        <Picker.Item label="Checking" value="CHECKING" />
      </Picker>
      <Text style={styles.label}>Balance $</Text>
      <TextInput
        style={styles.input}
        value={accountDetails.balance}
        onChangeText={(text) => handleInputChange("balance", text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
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

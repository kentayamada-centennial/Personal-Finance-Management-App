import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Picker } from "react-native";
import { updateAccount } from "../services/AccountServices";

const EditAccountScreen = ({ route, navigation }) => {
  const { account } = route.params;

  const accountId = account.accountId;

  const [accountDetails, setAccountDetails] = useState({
    name: account.name,
    type: account.type,
    balance: account.balance.toString(),
  });

  const handleInputChange = (key, value) => {
    setAccountDetails({
      ...accountDetails,
      [key]: value,
    });
  };

  const handleSave = async () => {
    try {
      await updateAccount(accountId, accountDetails);
      navigation.goBack();
    } catch (error) {
      console.error("Failed to update account:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={accountDetails.name}
        onChangeText={(text) =>
            handleInputChange('name', text)
        }
      />
      <Text style={styles.label}>Type</Text>
      <Picker
        selectedValue={accountDetails.type}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('type', itemValue)}
      >
        <Picker.Item label="Savings" value="SAVINGS" />
        <Picker.Item label="Checking" value="CHECKING" />
      </Picker>
      <Text style={styles.label}>Balance $</Text>
      <TextInput
        style={styles.input}
        value={accountDetails.balance}
        onChangeText={(text) => {
          if (text === "" || /^[0-9]+(\.[0-9]{1,2})?$/.test(text)) {
            handleInputChange('balance', text);
          }
        }}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

export default EditAccountScreen;

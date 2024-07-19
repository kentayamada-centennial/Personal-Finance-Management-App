import React, { useState } from 'react';
import { View, Text, TextInput, Picker, Button, StyleSheet } from 'react-native';
import { useUser } from "../contexts/UserContext";
import { postAccount } from '../services/AccountServices';

export default function CreateAccountScreen({navigation}) {
  const { userId } = useUser();
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    amount: '',
    type: 'SAVINGS', 
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
        balance: accountDetails.amount,
      });
      console.log('Account created successfully:', response);
      navigation.goBack();
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={accountDetails.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={accountDetails.amount}
        onChangeText={(text) => handleInputChange('amount', text)}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={accountDetails.type}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('type', itemValue)}
      >
        <Picker.Item label="Savings" value="SAVINGS" />
        <Picker.Item label="Checking" value="CHECKING" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
});
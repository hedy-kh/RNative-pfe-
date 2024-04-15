import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Axios from "axios";
const apiUrl = "http://192.168.3.124:8000/api/user/forgot-password";
const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgetPassword = async () => {
    try {
      const response = await Axios.post(apiUrl, {
        email,
      });
  
      if (response.data.success) {
        alert(response.data.message);
        navigation.navigate("SignInScreen");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error initiating password reset:", error);
      alert("An error occurred while initiating password reset. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.subtitle}>Enter your email address below to reset your password.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleForgetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1B1A1A",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#898282",
    color: "#333",
  },
  button: {
    backgroundColor: "#FF5934",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ForgetPasswordScreen;

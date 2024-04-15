import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Axios from "axios";

const apiUrl = "http://192.168.3.124:8000/api/user/verify-email"; // Update API endpoint

const OTPVerificationScreen = ({ navigation, route }) => {
  const { userId, otp } = route.params;
  const [enteredOTP, setEnteredOTP] = useState("");

  const handleVerifyOTP = async () => {
    try {
      const response = await Axios.post(apiUrl, { userId, otp: enteredOTP }); // Convert userId to ObjectId
      if (response.data.success) {
        navigation.navigate("SignInScreen");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred during OTP verification. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to your email:</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        onChangeText={setEnteredOTP}
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1A1A",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#898282",
    color: "#333",
    width: 200,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#ccc",
    marginBottom: 20,
    textAlign: "center",
  },
  verifyButton: {
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

export default OTPVerificationScreen;

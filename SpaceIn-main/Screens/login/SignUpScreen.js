import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const apiUrl = "http://192.168.186.178:8081/api/user/create";

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SignUpScreen.js

  const handleCreateAccount = async () => {
    try {
      const response = await Axios.post(apiUrl, {
        name: fullName,
        email,
        password,
      });
      if (response.data.success) {
        const token = response.data.user.token;
        if (token !== null && token !== undefined) {
          AsyncStorage.setItem("token", token);
        } else {
          AsyncStorage.removeItem("token");
        }
        const userId = response.data.user.id;
        navigation.navigate("OTPVerificationScreen", { userId, email });
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("An error occurred during sign up. Please try again.");
    }
  };

  const { width, height } = Dimensions.get("window");

  return (
    <KeyboardAvoidingView
      style={[styles.container, { marginTop: height * -0.1 }]}
      behavior="padding"
    >
      <Image
        source={require("./assets/globinLogo.png")}
        style={styles.circularImage}
      />
      <Text style={styles.signInText}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={[
          styles.button,
          styles.createAccountButton,
          { width: width - 40 },
        ]}
        onPress={handleCreateAccount}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignInScreen")}
        style={[styles.button, styles.loginButton, { width: width - 40 }]}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.socialLoginSection}>
        <Text style={styles.socialLoginText}>Sign up with</Text>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#000000" }]}
          >
            <Image
              source={require("./assets/apple.png")}
              style={styles.socialButtonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#FFFFFF" }]}
          >
            <Image
              source={require("./assets/google.png")}
              style={styles.socialButtonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#3B5998" }]}
          >
            <Image
              source={require("./assets/facebook.png")}
              style={styles.socialButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#1B1A1A",
  },
  circularImage: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.1,
    borderRadius: (Dimensions.get("window").width * 0.4) / 2,
    overflow: "hidden",
    marginBottom: 10,
    marginTop: Dimensions.get("window").height * 0.05,
  },
  signInText: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#898282",
    color: "#333",
    width: Dimensions.get("window").width - 40,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  createAccountButton: {
    backgroundColor: "#FF5934",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
    width: Dimensions.get("window").width - 40,
  },
  loginButton: {
    backgroundColor: "#808080",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
    width: Dimensions.get("window").width - 40,
    marginTop: 10,
  },
  forgotPassword: {
    marginTop: 10,
  },
  linkText: {
    color: "#0084FF",
    fontSize: 16,
    textAlign: "center",
  },
  socialLoginSection: {
    marginTop: 20,
  },
  socialLoginText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 40,
    marginTop: 20,
  },
  socialButton: {
    flex: 1,
    backgroundColor: "#000000",
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonImage: {
    width: 40,
    height: 40,
  },
});

export default SignUpScreen;

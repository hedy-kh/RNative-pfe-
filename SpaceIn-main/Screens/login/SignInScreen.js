import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { AuthSession } from 'expo-auth-session';

const apiUrl = "http://192.168.1.4:8081/api/user/signin";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await Axios.post(apiUrl, {
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.user.token;
        if (token !== null && token !== undefined) {
          await AsyncStorage.setItem("token", token);
        } else {
          await AsyncStorage.removeItem("token");
        }

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "ProfileScreen" }],
          })
        );
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("An error occurred during sign in. Please try again.");
    }
  };

  const { width, height } = Dimensions.get("window");

  const googleSignIn = async () => {
    try {
      const redirectUrl = 'http://localhost:8000/api/user/auth/google/redirect';
      const clientId = '778117401777-5nfe6ho8otdjkqd179v692suimkkh603.apps.googleusercontent.com';
      const clientSecret = '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';
  
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth` +
        `?client_id=${clientId}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&response_type=code` +
        `&scope=openid profile email`;
  
      const response = await AuthSession.startAsync({ authUrl });
      if (response.type === 'success' && response.params.code) {
        const tokenResponse = await Axios.post('https://oauth2.googleapis.com/token', {
          code: response.params.code,
          redirect_uri: redirectUrl,
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
        });
  
        console.log(tokenResponse.data);
      } else {
        console.log('Google sign-in failed');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require("./assets/globinLogo.png")}
        style={styles.circularImage}
      />
      <Text style={styles.signInText}>Sign In</Text>
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
        style={[styles.button, styles.loginButton, { width: width - 40 }]}
        onPress={handleSignIn}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        style={[styles.button, styles.createAccountButton]}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ResetPassword")}
        style={styles.forgotPassword}
      >
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.socialLoginSection}>
        <Text style={styles.socialLoginText}>Sign in with</Text>
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
            onPress={googleSignIn}
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#1B1A1A",
  },
  circularImage: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: (width * 0.4) / 2,
    overflow: "hidden",
    marginBottom: 10,
    marginTop: height * 0.05,
  },
  signInText: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#898282",
    color: "#333",
    width: width - 40,
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
  loginButton: {
    backgroundColor: "#FF5934",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  createAccountButton: {
    backgroundColor: "#808080",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
    width: width - 40,
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
    width: width - 40,
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

export default SignInScreen;

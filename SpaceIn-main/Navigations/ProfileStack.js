import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Screens/ProfileScreen";
import SignInScreen from "../Screens/login/SignInScreen";
import OTPVerificationScreen from "../Screens/login/Otp";
import SignUpScreen from "../Screens/login/SignUpScreen";
import ResetPasswordScreen from "../Screens/login/ResetPasswordScreen";

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="SignInScreen" component={SignInScreen} />
      <ProfileStack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
      />
      <ProfileStack.Screen name="SignUp" component={SignUpScreen} />
      <ProfileStack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;

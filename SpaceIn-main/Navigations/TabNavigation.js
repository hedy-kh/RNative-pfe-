import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import SearchScreen from "../Screens/SearchScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import DetailProductScreen from "../Screens/DetailProductScreen";
import HomeStackScreen from "./HomeStack";
import SearchStackScreen from "./SearchStack"; 
import ProfileStackScreen from "./ProfileStack";
export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Search"
        component={SearchStackScreen} 
        options={{
          tabBarIcon: ({}) => <Feather name="search" size={24} color="black" />,
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({}) => <Feather name="map" size={24} color="black" />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({}) => <Feather name="user" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

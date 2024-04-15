import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../Screens/SearchScreen";
import DetailProductScreen from "../Screens/DetailProductScreen";

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
      <SearchStack.Screen
        name="DetailProductScreen"
        component={DetailProductScreen}
      />
    </SearchStack.Navigator>
  );
}

export default SearchStackScreen;

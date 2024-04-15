import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import ImageUpload from "../Components/ProfileScreens/ImageUpload";
import locations from "../Data/Data";
import { SelectCountry } from "react-native-element-dropdown";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [locationName, setLocationName] = useState("");
  const [country, setCountry] = useState("1");

  const navigation = useNavigation();

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        setIsLoggedIn(true);
      } else {
        Alert.alert("You need to log in to add a product.");
        navigation.navigate("SignInScreen");
      }
    };

    checkLoginStatus();
  }, []);

  const handleSubmit = () => {
  
    console.log({
      name: productName,
      description: productDescription,
      image: productImage,
      price: productPrice,
      location: locationName,
    });
    setProductName("");
    setProductDescription("");
    setProductImage("");
    setProductPrice("");
    setLocationName("");
    Alert.alert("Product added successfully!");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.dropdown}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.dropdown}
        placeholder="Product Description"
        value={productDescription}
        onChangeText={setProductDescription}
      />

      <TextInput
        style={styles.dropdown}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
      />
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        inputSearchStyle={styles.inputSearchStyle}
        search
        maxHeight={200}
        value={country}
        data={locations}
        valueField="id"
        labelField="name"
        placeholder="Select country"
        searchPlaceholder="Search..."
        onChange={(e) => {
          setCountry(e.value);
        }}
      />
      <ImageUpload />
      <Button title="Add Product" onPress={handleSubmit} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  dropdown: {
    margin: 10,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default ProfileScreen;

//  useFocusEffect(
//    React.useCallback(() => {
//      const checkLoginStatus = async () => {
//        const token = await AsyncStorage.getItem("token");
//        setIsLoggedIn(token !== null);
//      };
//      checkLoginStatus();
//    }, [])
//  );

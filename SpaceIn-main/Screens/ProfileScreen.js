import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import ImageUpload from "../Components/ProfileScreens/ImageUpload";
import locations from "../Data/Data";
import { SelectCountry } from "react-native-element-dropdown";
import {
  useNavigation,
  useFocusEffect,
  CommonActions,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";

 import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // set initial state to false
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

 ////this is for the image picker //
useEffect(() => {
  (async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  })();
}, []);
 ///////
  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "SignInScreen" }],
          });
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "SignInScreen" }],
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  const coordinatesOptions = [
    { label: "Hammamet", value: "[36.4, 10.6167]" },
    { label: "Sousse", value: "[35.8254, 10.6366]" },
    { label: "Tunis", value: "[36.8065, 10.1815]" },
    { label: "Monastir", value: "[35.7833, 10.8333]" },
    { label: "Sfax", value: "[34.7452, 10.7613]" },
    { label: "Kairouan", value: "[35.6781, 10.0963]" },
  ];

  const createProduct = async () => {
    try {
      const parsedCoordinates = JSON.parse(coordinates);

      const response = await fetch(
        "http://192.168.186.178:8081/api/product/createProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": "6622392db1387acdf7243de4",
          },
          body: JSON.stringify({
            name,
            description,
            price: Number(price),
            location: {
              type: "Point",
              coordinates: parsedCoordinates,
            },
            createdAt,
            imgUrl,
            active: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const product = await response.json();
      console.log(product);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || createdAt;
    setShowDatePicker(Platform.OS === "ios");
    setCreatedAt(currentDate);
  };
{/* image Picker */}
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setImgUrl(result.uri);
  }
};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Dropdown component */}
      <Dropdown
        style={{ width: "100%", height: 40 }}
        data={coordinatesOptions}
        search
        searchPlaceholder="Search coordinates"
        labelField="label"
        valueField="value"
        placeholder="Select coordinates"
        value={coordinates}
        onChange={(item) => setCoordinates(item.value)}
      />
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={createdAt}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Button title="Pick an image from gallery" onPress={pickImage} />

      <Button title="Create Product" onPress={createProduct} />

      {/* Logout button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={[styles.button, styles.logoutButton]}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
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
/*  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false);

      // Redirect to the login screen
      navigation.navigate("SignInScreen");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };
 */

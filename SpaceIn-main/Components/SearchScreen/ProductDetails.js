import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity 
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TimeAgo from "./TimeAgo";


const ProductDetails = ({
  product,
  locationName,
  onBack,
  bottomSheetHeight,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.productImage} source={product.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.subtitle}>{locationName}</Text>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Seller: {product.user.name}</Text>
          <Text style={styles.userInfoText}>Contact: {product.user.phone}</Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <TimeAgo publishDate={product.publishDate} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 200,
  },
  contentContainer: {
    width: "90%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
    marginBottom: 15,
  },
  userInfoContainer: {
    marginBottom: 15,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});


export default ProductDetails;

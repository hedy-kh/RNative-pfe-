import { View, Text, Image, StyleSheet, StatusBar,TouchableOpacity } from "react-native";
import React from "react";
import ProductCard from "../Components/SearchScreen/ProductCard";
const SearchScreen = ({ route }) => {
  const products = route.params ? route.params.products : [];
  const locationName = route.params ? route.params.locationName : "";

  return (
    
    <View>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          locationName={locationName}
        />
      ))}
      <StatusBar />
    </View>
  );
};

export default SearchScreen;

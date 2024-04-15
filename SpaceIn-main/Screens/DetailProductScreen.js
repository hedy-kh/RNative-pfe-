import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const DetailProductScreen = ({ route }) => {
  const { product, locationName, userName, userPhone } = route.params;


  return (
    <View>
      <Image style={styles.productImage} source={product.image} />
      <Text>{product.name}</Text>
      <Text>{userName}</Text>
      <Text>{userPhone}</Text>
      <Text>{product.description}</Text>
      <Text>{locationName}</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: Dimensions.get("screen").width * 1,
    height: 200,
  },
});

export default DetailProductScreen;

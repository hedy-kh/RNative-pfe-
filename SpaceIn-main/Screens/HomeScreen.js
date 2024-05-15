import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import GoogleMapView from "../Components/Home/GoogleMapView";
import BottomSheet from "@gorhom/bottom-sheet";
import ProductCard from "../Components/SearchScreen/ProductCard";
import ProductDetails from "../Components/SearchScreen/ProductDetails";
const HomeScreen = () => {
  const snapPoints = useMemo(() => ["2%", "30%", "50%", "70%", "100%"], []);
  const bottomSheetRef = useRef(null); // Create a reference for the BottomSheet
  const [products, setProducts] = useState([]); // State for products
  const [locationName, setLocationName] = useState(""); // State for locationName
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product

  const handleProductSelect = (product) => {
    setSelectedProduct(product); // Update the selected product when a product is pressed
    bottomSheetRef.current.snapToIndex(3); // Open the BottomSheet to the first snapPoint (30%)
  };

  const handleBack = () => {
    setSelectedProduct(null); // Set selectedProduct back to null when the "Back" button is pressed
  };

  // Calculate the height of the content container based on snap points
  const contentContainerHeight = snapPoints.map((snapPoint) => {
    return snapPoint === "100%"
      ? null
      : (Dimensions.get("window").height * parseFloat(snapPoint)) / 100;
  });

  return (
    <View>
      <GoogleMapView
        bottomSheetRef={bottomSheetRef}
        setProducts={setProducts}
        setLocationName={setLocationName}
        setSelectedProduct={setSelectedProduct} // Pass setSelectedProduct to GoogleMapView
      />

      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enableContentPanningGesture={false} // Disable snapping while scrolling
      >
        <View style={{ flex: 1 }}>
          {selectedProduct ? ( // If a product is selected, render the ProductDetails
            <ProductDetails
              product={selectedProduct}
              locationName={locationName}
              onBack={handleBack} // Pass handleBack to
            />
          ) : (
            // If no product is selected, render the product list
            <FlatList
              data={products.filter((product) => product.status)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  locationName={locationName}
                  onSelect={handleProductSelect}
                /> // Pass handleProductSelect to ProductCard
              )}
            />
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;

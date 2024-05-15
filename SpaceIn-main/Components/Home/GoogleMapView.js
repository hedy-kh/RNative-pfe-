import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { UserLocationContext } from "../../context/UserLocationContext";
import locations from "../../Data/Data";
import { useNavigation } from "@react-navigation/native";

export default function GoogleMapView({
  bottomSheetRef,
  setProducts,
  setLocationName,
  setSelectedProduct,
}) {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const handleMarkerPress = (location) => {
    bottomSheetRef.current.snapToIndex(3); // Open the BottomSheet to the first snapPoint (30%)
    // Update the states with the parameters
    setProducts(location.products);
    setLocationName(location.name);
    setSelectedProduct(null); // Set selectedProduct back to null
  };

  const [mapRegion, setmapRegion] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);
  useEffect(() => {
    if (location) {
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 2.1122,
        longitudeDelta: 3.1121,
      });
      mapRef.current.animateToRegion(
        {
          //
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        2000
      ); // 2000 is the duration of animation in milliseconds
    }
  }, [location]);

  return (
    <View>
      <MapView
        ref={mapRef} ///
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false} // Hides the "My Location" button
        region={mapRegion}
        mapType="terrain"
      >
        {locations
          .filter((location) => location.products.length > 0)
          .map((location) => (
            <Marker
              key={location.id}
              coordinate={location.coordinate}
              title={location.title}
              description={`Marker ${location.id}`}
              onPress={() => handleMarkerPress(location)}
            >
              <Image
                source={require("./assests/images/greenMarker.png")}
                style={styles.markerImage}
              />
            </Marker>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width * 1,
    height: Dimensions.get("screen").height * 1,
  },

  markerImage: {
    width: 20,
    height: 20,
  },
});


/* its for animation marker ..
import React, { useContext, useEffect, useState, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions, Animated, Image } from "react-native";
import { UserLocationContext } from "../../context/UserLocationContext";
import locations from "../../Data/Data";
import { useNavigation } from "@react-navigation/native";

export default function GoogleMapView({
  bottomSheetRef,
  setProducts,
  setLocationName,
  setSelectedProduct,
}) {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [flashingMarkers, setFlashingMarkers] = useState([]);

  const handleMarkerPress = (location) => {
    bottomSheetRef.current.snapToIndex(3);
    setProducts(location.products);
    setLocationName(location.name);
    setSelectedProduct(null);
  };

  const [mapRegion, setMapRegion] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 2.1122,
        longitudeDelta: 3.1121,
      });
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        2000
      );
    }
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlashingMarkers((prevMarkers) =>
        prevMarkers.length ? [] : locations.filter(isMarkerFlashing)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isMarkerFlashing = (location) => {
    const publishDate = new Date(location.products[0].publishDate);
    const timeDifference = (new Date() - publishDate) / (1000 * 60 * 60); // Time difference in hours
    return timeDifference < 4;
  };

  return (
    <View>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
        region={mapRegion}
        mapType="terrain"
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={location.coordinate}
            title={location.title}
            description={`Marker ${location.id}`}
            onPress={() => handleMarkerPress(location)}
            opacity={flashingMarkers.includes(location) ? 0.5 : 1} // Reduce opacity for flashing markers
          >
            <Image
              source={require("./assests/images/greenMarker.png")}
              style={styles.markerImage}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  markerImage: {
    width: 20,
    height: 20,
  },
});

*/
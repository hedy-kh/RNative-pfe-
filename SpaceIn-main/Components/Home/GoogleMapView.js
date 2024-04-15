import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { UserLocationContext } from "../../context/UserLocationContext";
import locations from "../../Data/Data";
import { useNavigation } from "@react-navigation/native";

export default function GoogleMapView() {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const handleMarkerPress = (location) => {
    navigation.navigate("SearchScreen", {
      products: location.products,
      locationName: location.name,
    });

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
            mapRef.current.animateToRegion({ //
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 2000); // 2000 is the duration of animation in milliseconds
    }
  }, [location]);

    
  return (
    <View>
      <MapView
        ref={mapRef} ///
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
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

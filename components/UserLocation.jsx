import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { Alert } from "react-native";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  addLocationCoordinates,
  addStreetLocation,
  addUserLocation,
} from "../redux/features/UserSlice.js";

// const { width, height } = Dimensions.get("window");

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const UserLocation = () => {
  const [streetLocation, setStreetLocation] = useState(false);
  const [displayCurrentLocation, setDisplayCurrentLocation] = useState(
    "fetching your location..."
  );

  const dispatchEvent = useDispatch();

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission to access location was denied",
        [
          {
            text: "Ok",
            onPress: () => console.log("OK Pressed GeoCurrentLocation"),
          },
        ],
        { cancelable: false }
      );
    }
    // const location = await Location.getCurrentPositionAsync({
    //   accuracy: Location.Accuracy.High,
    // });

    let { coords } = await Location.getCurrentPositionAsync();
    dispatchEvent(addLocationCoordinates(coords));
    if (coords) {
      const { latitude, longitude } = coords;

      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log("response", response);

      const address = await LocationGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log("address", address);

      const streetAddress = address[0].district;
      //   console.log("response", streetAddress);
      setStreetLocation(streetAddress);
      dispatchEvent(addStreetLocation(streetAddress));

      for (let item of response) {
        const address = `${item.formattedAddress}`;

        setDisplayCurrentLocation(address);
        dispatchEvent(addUserLocation(address));
      }
    }
  };

  return (
    <View className="flex-row items-center px-[6px]  bg-white py-4">
      <Ionicons name="location-sharp" size={24} color="#ff0021" />
      <View className="ml-1">
        <Text className="text-[14px] text-[#ff0021]  font-[800] ">
          {streetLocation ? streetLocation : "Set Your Location"}
        </Text>
        <Text className="text-slate-800 text-[12px] font-semibold ">
          {displayCurrentLocation.slice(0, 30)}...
        </Text>
      </View>
    </View>
  );
};

export default UserLocation;

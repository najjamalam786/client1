import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { cleanCart } from "../../redux/features/CartSlice.js";
import { addLocationCoordinates } from "../../redux/features/UserSlice.js";

const Address = () => {
  const mapView = useRef(null);
  const params = useLocalSearchParams();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { userId } = useSelector((state) => state.user);
  const { coordinate, userLocation } = useSelector((state) => state.user);
  const [displayCurrentLocation, setDisplayCurrentLocation] = useState(false);
  const [userOrder, setUserOrder] = useState({});
  const dispatchEvent = useDispatch();

  const [state, setState] = useState({
    region: {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const onChangeValue = (value) => {
    // console.log("value", value);
    setTimeout(async () => {
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
      const { latitude, longitude } = value;

      const address = await LocationGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of address) {
        const userAds = `${item.formattedAddress}`;

        setDisplayCurrentLocation(userAds);
        dispatchEvent(addLocationCoordinates(value));
      }
    }, 1000);
    setState({
      region: value,
    });
  };

  const confirmOrderHandler = async () => {
    try {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/api/order/create-order`, {
          userId: userId,
          foodItems: cartItems,
          totalPrice: totalPrice,
          orderAddress: displayCurrentLocation
            ? displayCurrentLocation
            : userLocation,
          locationCoordinates: state.region,
        })
        .then((response) => {
          if (response) {
            // console.log("response", response.data);
            setUserOrder(response.data);
            Alert.alert("Your Order Has Been Placed");

            dispatchEvent(cleanCart());
            router.replace({
              pathname: "/confirmOrder",
              params: { name: params.name },
            });
          }
        });
    } catch (error) {
      console.log("Error in confirmOrderHandler", error);
    }
    // console.log("params");
  };

  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar backgroundColor="#d4edee81" />
      <ScrollView className="bg-[#d4edee81]">
        <View className="flex-1 ">
          <MapView
            ref={mapView}
            provider={PROVIDER_GOOGLE}
            initialRegion={state.region}
            onRegionChangeComplete={(value) => onChangeValue(value)}
            showsMyLocationButton={true}
            showsUserLocation={true}
            className="h-[600px] w-[100%] "
          />
          <View
            className="flex-col items-center "
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -50 }, { translateY: -50 }],
              marginLeft: 18,
              marginTop: -4,
            }}
          >
            <Text className="text-[10px] text-[#ff0021] font-[700] text-center ">
              Your Location
            </Text>
            <Image
              source={require("../../assets/push-pin.png")}
              className="w-[40px] h-[40px] "
            />
            {/* <Ionicons name="location-sharp" size={30} color="#ff0021" /> */}
          </View>
        </View>

        <View className="flex-row items-center px-[10px]  bg-white py-4 mt-4  ">
          <Ionicons name="location-sharp" size={24} color="#ff0021" />
          <Text className="text-slate-800 text-[14px] font-semibold pl-[10px] pr-[40px]">
            {displayCurrentLocation ? displayCurrentLocation : userLocation}
          </Text>
        </View>
      </ScrollView>

      <View className="flex-row items-center py-[6px] px-[20px] justify-around bg-white">
        <View>
          <Text className="text-[20px] text-slate-800">Cash on Delivery</Text>
        </View>

        <Pressable
          onPress={() => {
            confirmOrderHandler();
          }}
          className=" bg-[#25cb25] py-[8px] px-[20px] my-[6px] rounded-md flex-row items-center justify-between  "
        >
          <Text className="text-[18px] font-[600] text-white">
            Confirm Order
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Address;

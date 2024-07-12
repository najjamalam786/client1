import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const UserAddress = () => {
  const { userId, coordinate, userLocation } = useSelector(
    (state) => state.user
  );
  // const { cartItems, totalPrice } = useSelector((state) => state.cart);

  // const [orderAddress, setOrderAddress] = useState();
  // const [index, setIndex] = useState();
  const [flag, setFlag] = useState(false);

  const router = useRouter();
  const dispatchEvent = useDispatch();

  const [userShippingAdd, setUserShippingAdd] = useState({
    name: "",
    mobileNum: "",
    houseNo: "",
    street: "",
    landmark: "",
    address: "",
    pinCode: "",
    district: "Patna",
  });

  const userLatitude = coordinate.latitude;
  const userLongitude = coordinate.longitude;
  const mapView = useRef(null);
  const [coordinates] = useState([
    {
      latitude: userLatitude,
      longitude: userLongitude,
    },
  ]);

  //   useEffect(() => {
  //   }, [userShippingAdd]);
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <ScrollView className=" my-4">
        <View className="flex-col gap-4">
          <MapView
            ref={mapView}
            initialRegion={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            className="h-[600px] w-[100%]"
          >
            <Marker coordinate={coordinates[0]} />
          </MapView>

          <View className=" absolute top-10 left-0 right-0  px-[20px] ">
            <View className="flex-row items-center justify-between bg-white  rounded-[30px]">
              <TextInput
                placeholder="Name Enter..."
                className="flex-1 bg-white px-[20px] py-4 rounded-l-[30px] text-[18px] font-bold text-black"
                value={userShippingAdd.name}
                onChangeText={(text) => {
                  setUserShippingAdd({
                    ...userShippingAdd,
                    name: text.replace(/\s+/g, " "),
                  });
                  //   console.log("working", userShippingAdd.name);

                  setFlag(true);
                }}
              />
              <Ionicons
                name="search"
                size={24}
                color="#ff0021"
                onPress={() => Alert.alert("Search Working")}
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              />
            </View>
          </View>
        </View>

        <View className="flex-row items-center px-[10px]  bg-white py-4 mt-4  ">
          <Ionicons name="location-sharp" size={24} color="#ff0021" />
          <Text className="text-slate-800 text-[14px] font-semibold pl-[10px] pr-[40px]">
            {userLocation}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserAddress;

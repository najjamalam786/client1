import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { setToken } from "../redux/features/UserSlice";

const Logout = () => {
  const dispatchEvent = useDispatch();
  const logOutHandler = () => {
    // console.log("logout handler");
    dispatchEvent(setToken(false));
    router.push("/");
  };
  return (
    <View className="flex-row items-center justify-between p-4 bg-white mt-4">
      <View className="flex-row items-center gap-4 ">
        <FontAwesome name="sign-out" size={24} color="black" />

        <View className="">
          <Text className="text-[16px] font-[600] text-[#070707] ">
            User Logout
          </Text>
          <Text>Logout from your account</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          logOutHandler();
        }}
        className="flex-row items-center justify-start  bg-[#ee0901] border-white px-4 py-[10px] rounded-[10px]"
      >
        <Text className="text-white text-[16px] font-bold ">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;

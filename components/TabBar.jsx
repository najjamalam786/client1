import { View, Text, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";

const TabBar = () => {
  return (
    <View className="flex-row items-center justify-evenly  px-[10px]  bg-[#f4f4f4] rounded-t-[14px] border-[0.5px] border-[#909090]">
      <Pressable
        onPress={() => {
          router.push("/user");
        }}
        className="w-[150px] py-[14px] px-4  rounded-md flex-row items-center justify-center space-x-2 "
      >
        <FontAwesome name="user" size={20} color="black" />
        <Text className="text-[14px] text-black font-[800] ">Account</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          router.replace("/");
        }}
        className="w-[150px]  py-2 px-4 rounded-md flex-row items-center justify-center space-x-2  "
      >
        <Ionicons name="home" size={20} color="black" />

        <Text className="text-[14px] text-black font-[800] ">Home</Text>
      </Pressable>
    </View>
  );
};

export default TabBar;

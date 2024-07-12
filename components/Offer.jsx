import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Offer = () => {
  return (
    <View className="p-4 ">
      <Text className="text-[18px] font-[600] text-[#070707] ">
        Offers for you
      </Text>

      <Pressable
        onPress={() => {
          Alert.alert("Get 10% OFF on your Food Membership");
        }}
        className="flex-row items-center justify-between bg-[#25cb25] p-4 rounded-[10px] mt-2"
      >
        <View className="w-[250px]">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons
              name="brightness-percent"
              size={24}
              color="white"
            />
            <Text className="text-white font-bold text-[16px] ">
              Get 10% OFF
            </Text>
          </View>
          <Text className="text-white text-[12px] font-semibold">
            Get Flat 10% Off on your Food Membership{" "}
          </Text>
        </View>
        <View className="bg-[#25cb25] py-2 px-5 border-2 border-white rounded-[10px]">
          <Text className="text-white ">View</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Offer;

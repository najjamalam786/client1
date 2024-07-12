import { View, Text, Image } from "react-native";
import React from "react";

const FoodItems = ({ food }) => {
  return (
    <View className="p-4 ">
      <View className="flex-row items-center justify-between ">
        <View className="flex-row items-center space-x-2">
          <Image
            source={{ uri: food.imageURL }}
            className="w-[80px] h-[80px] rounded-[10px] p "
          />
          <View className="space-y-2">
            <Text className="font-bold text-[16px] text-slate-800 ">
              {food.name}
            </Text>

            <Text className="text-[16px] font-bold text-slate-800 ">
              ₹{food.price}
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-[16px] font-bold text-slate-800 ">qty</Text>
          <Text className="text-[16px] text-center   text-green-600 rounded-[2px] mt-2">
            {food.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FoodItems;

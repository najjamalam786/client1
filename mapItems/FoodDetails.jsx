import { View, Text, Image } from "react-native";
import React from "react";

const FoodDetails = ({ food, setTotal }) => {
  return (
    <View className="p-4 ">
      <View className="flex-row items-center py-2">
        <Text className="text-[14px] font-bold text-slate-800 ">ID: </Text>
        <Text className="text-[14px] text-slate-800 ">
          #{food._id.slice(10)}
        </Text>
      </View>

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

        <Text
          className={`${
            food.foodType === "veg"
              ? "bg-[#00fc0027] text-[#00af00] "
              : "bg-[#9d070722] text-[#810b0b]"
          } text-[14px] text-center font-bold  p-2 rounded-[6px] mt-2`}
        >
          {food.foodType}
        </Text>
      </View>

      <View>
        <View className="flex-row items-center  py-2">
          <Text className="text-[16px] font-bold text-slate-800 ">
            Quantity:{" "}
          </Text>
          <Text className="text-[16px] text-center   text-green-600 rounded-[2px]">
            {food.quantity}
          </Text>
        </View>

        <View className="flex-row items-center  py-2">
          <Text className="text-[16px] font-bold text-slate-800 ">Total: </Text>
          <Text className="text-[16px] text-center   text-green-600 rounded-[2px]">
            ₹{food.price * food.quantity}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center  py-2">
        <Text className="text-[16px] font-bold text-slate-800 ">Status: </Text>
        <Text className="text-[16px] text-center   text-red-600 rounded-[2px]">
          Add delivery Status
        </Text>
      </View>
    </View>
  );
};

export default FoodDetails;

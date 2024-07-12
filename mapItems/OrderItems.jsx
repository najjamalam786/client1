import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import FoodItems from "./FoodItems";
import { router } from "expo-router";

const OrderItems = ({ orders }) => {
  // useEffect(() => {
  // }, []);
  return (
    <View className="p-4 my-2 bg-white">
      <View className="flex-row items-center justify-between py-2">
        <View className="flex-row items-center space-x-1">
          <Text className="font-bold text-[14px] text-slate-800 ">
            Order ID:
          </Text>
          <Text>#{orders._id.slice(10)}</Text>
        </View>

        <Text className="">{orders.orderDate.slice(0, 10)}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          router.push({
            pathname: "/orderDetails",
            params: {
              _id: orders._id,
            },
          })
        }
      >
        {orders &&
          orders.foodItems.map((item) => (
            <FoodItems key={item._id} food={item} />
          ))}
      </TouchableOpacity>

      {/* <View className="flex-row items-center justify-between py-2">
        <View>
          <Text className="font-bold text-[14px] text-slate-800 ">
            Total Ammount:
          </Text>

          <Text>{orders.totalPrice}</Text>
        </View>
      </View> */}
    </View>
  );
};

export default OrderItems;

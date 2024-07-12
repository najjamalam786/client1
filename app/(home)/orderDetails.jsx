import { View, Text, ScrollView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import FoodDetails from "../../mapItems/FoodDetails";
import { Ionicons } from "@expo/vector-icons";

const OrderDetails = () => {
  const params = useLocalSearchParams();
  const [orderDetails, setOrderDetails] = useState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        await axios
          .post(
            `${process.env.EXPO_PUBLIC_API_URL}/api/order/get-order-details`,
            {
              _id: params._id,
            }
          )
          .then((response) => {
            setOrderDetails(response.data);
            if (response.data) {
              setTotal(
                response.data.foodItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )
              );
            }
          });
      } catch (error) {
        console.log("Order Details Error", error);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#e8e6e6]">
      <StatusBar
        barStyle="light-content"
        backgroundColor="#F8C500"
        // translucent
        // animated
        // showHideTransition="fade"
        // hidden
        // networkActivityIndicatorVisible
      />
      <ScrollView className="flex-1 bg-[#e8e6e6]">
        <View className="items-center bg-[#F8C500] px-4 py-4">
          {params._id && (
            <Text className="text-[16px] font-[600] text-[#070707] ">
              Order ID: #{params._id.slice(10)}
            </Text>
          )}
        </View>

        <View className="flex-row items-center justify-between px-4 py-4">
          <View className="flex-row items-center space-x-1">
            <Text className="font-bold text-[14px] text-slate-800 ">
              Order Date:
            </Text>
            <Text className="text-[14px] text-slate-800 ">
              {orderDetails?.orderDate.slice(0, 10)}
            </Text>
          </View>

          <View className="flex-row items-center space-x-1">
            <Text className="text-[14px] uppercase text-slate-800 ">
              {orderDetails?.orderTime}
            </Text>
          </View>
        </View>

        <View className="px-4 bg-white">
          {orderDetails ? (
            orderDetails.foodItems
              .slice(0)
              .reverse()
              .map((item) => (
                <FoodDetails key={item._id} food={item} setTotal={setTotal} />
              ))
          ) : (
            <Text>No Orders</Text>
          )}
        </View>
        <Text className="text-[18px] text-gray-600 font-bold py-4 px-4">
          Address Details
        </Text>

        <View
          className="
         py-4 px-8 bg-white "
        >
          <Text className="font-bold text-[16px] text-slate-800 ">
            Delivery Address:
          </Text>
          <View className="flex-row items-center pr-[20px]">
            <Ionicons name="location-sharp" size={24} color="#ff0021" />
            <Text className="text-[14px] font-semibold text-slate-800 mt-[2px] ">
              {orderDetails?.orderAddress}
            </Text>
          </View>
        </View>

        <Text className="text-[18px] text-gray-600 font-bold py-4 px-4">
          Billing Details
        </Text>
        <View className=" px-8 py-4 bg-white">
          <View className="flex-row items-center justify-between">
            <Text className="font-bold text-[16px] text-slate-500 ">
              Payment Method:{" "}
            </Text>
            <Text className="font-bold text-[16px] text-slate-600 ">
              {orderDetails?.paymentMethod}
            </Text>
          </View>

          <View className="flex-row items-center justify-between ">
            <Text className="text-[16px] font-[600] mt-[10px] text-[#505050]">
              Total Item
            </Text>
            <Text className="text-[16px] font-[600] mt-[10px] text-[#505050]">
              ₹{total}
            </Text>
          </View>

          <View className="flex-row items-center justify-between ">
            <Text className="text-[16px] font-[600] mt-[10px] text-[#505050]">
              Delivery fee
            </Text>
            <Text className="text-[16px] font-[600] mt-[10px] text-[#505050]">
              ₹15.00
            </Text>
          </View>

          <View className="flex-row items-center justify-between ">
            <Text className="text-[16px] font-[600] mt-[10px] text-[#505050]">
              Delivery Partner Charge
            </Text>
            <Text className="text-[16px] font-[600] mt-[10px] text-[#505050]">
              ₹75.00
            </Text>
          </View>

          <View className="flex-row items-center justify-between my-[10px]">
            <Text className="text-[20px] font-[600] text-[#25cb25]">
              Total Payable
            </Text>
            <Text className="text-[20px] font-[600] text-[#25cb25]">
              ₹{total + 90}{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

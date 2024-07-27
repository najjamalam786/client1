import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import OrderItems from "../../mapItems/OrderItems";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";

const SeeOrder = () => {
  const [orderItems, setOrderItems] = useState([]);
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    const orderHandler = async () => {
      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/api/order/get-user-orders`,
          {
            userId: userId,
          }
        );
        if (response.data) {
          setOrderItems(response.data);
        }
      } catch (error) {
        console.log("User order errors", error);
      }
    };

    orderHandler();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#d4edee81]">
      <StatusBar
        barStyle="light-content"
        backgroundColor="#F8C500"
        // translucent
        // animated
        // showHideTransition="fade"
        // hidden
        // networkActivityIndicatorVisible
      />
      <View className="flex-row items-center justify-between px-4 my-[20px] ">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{
              backgroundColor: "#d9d9da",
              borderRadius: 50,
              padding: 10,
            }}
          />
        </TouchableOpacity>
        <Text className="text-[20px] font-[600] text-black">
          Your Food List
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/user")}
          style={{
            backgroundColor: "#25cb25",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-white text-[18px] font-bold">N</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 px-4">
        <View>
          {orderItems && orderItems.length > 0 ? (
            orderItems
              .slice(0)
              .reverse()
              .map((item) => <OrderItems key={item._id} orders={item} />)
          ) : (
            <View className="flex-1 items-center justify-center h-[450px]">
              <ActivityIndicator size={50} color="#e21010" />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeeOrder;

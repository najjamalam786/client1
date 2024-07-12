import { View, Text, ScrollView, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import OrderItems from "../../mapItems/OrderItems";

const SeeOrder = () => {
  const { orderItems } = useSelector((state) => state.order);
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
      <View>
        <Text className="text-[16px] text-center p-4 font-[800] text-slate-800 bg-[#F8C500]">
          Your Food List
        </Text>
      </View>
      <ScrollView>
        <View>
          {orderItems && orderItems.length > 0 ? (
            orderItems
              .slice(0)
              .reverse()
              .map((item) => <OrderItems key={item._id} orders={item} />)
          ) : (
            <Text>No Orders</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeeOrder;

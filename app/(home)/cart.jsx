import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  FontAwesome5,
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "expo-router";
import CartItem from "../../components/CartItem.jsx";
import { addTotalPrice } from "../../redux/features/CartSlice.js";

const Cart = () => {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const params = useLocalSearchParams();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatchEvent = useDispatch();

  const instructions = [
    {
      id: "0",
      name: "Avoid Ringing",
      iconName: "bell",
    },
    {
      id: "1",
      name: "Leave at the doorstep",
      iconName: "door-open",
    },
    {
      id: "2",
      name: "directions to reach",
      iconName: "directions",
    },
    {
      id: "3",
      name: "Avoid calling",
      iconName: "phone-alt",
    },
  ];

  useEffect(() => {
    if (cartItems) {
      setTotal(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
    }
  }, []);

  return (
    <SafeAreaView className="flex-1  ">
      <ScrollView className="p-[10px] flex-1 bg-[#f0f8ff] ">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center ml-[10px] space-x-2 "
        >
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
          <Text className="text-[18px] font-[500] ">Hello</Text>
        </Pressable>

        <View className="mb-[12px] mt-2">
          <Text className=" text-center tracking-[3px] text-[15px] text-gray-500 ">
            {" "}
            ITEM(S) ADDED
          </Text>
        </View>

        <View>
          {cartItems.length > 0 &&
            cartItems
              .slice(0)
              .reverse()
              .map((item, index) => (
                <CartItem key={index} item={item} setTotal={setTotal} />
              ))}

          <View className="my-[30px] ">
            <Text className="text-[18px] text-gray-600 font-[500] ">
              Delivery Instructions
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {instructions.map((item, index) => (
                <Pressable
                  key={index}
                  className="m-[10px] rounded-[10px] py-[10px] bg-white "
                >
                  <View className="flex-col items-center justify-center px-[18px] ">
                    <FontAwesome5 name={item.iconName} size={22} color="gray" />

                    <Text className="w-[75px] text-[14px] font-[500] text-gray-500 pt-[10px] text-center">
                      {item.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Add More Items */}
          <View className="my-[10px] ">
            <View className="flex-row items-center justify-between bg-white my-1 py-[10px] px-[10px] rounded-md">
              <View className="flex-row items-center justify-center gap-[6px]">
                <Feather name="plus-circle" size={24} color="black" />

                <Text className="text-[14px] font-[500] text-gray-500">
                  Add More Items
                </Text>
              </View>

              <AntDesign name="right" size={18} color="gray" />
            </View>

            <View className="flex-row items-center justify-between bg-white my-1 py-[10px] px-[10px] rounded-md">
              <View className="flex-row items-center justify-center gap-[6px]">
                <Entypo name="new-message" size={24} color="black" />

                <Text className="text-[14px] font-[500] text-gray-500">
                  Add More cooking instruction
                </Text>
              </View>

              <AntDesign name="right" size={18} color="gray" />
            </View>

            <View className="flex-row items-center justify-between bg-white my-1 py-[10px] px-[10px] rounded-md">
              <View className="flex-row items-center justify-center gap-[6px]">
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={24}
                  color="black"
                />

                <Text className="text-[14px] font-[500] text-gray-500">
                  Don't send cultery with this order
                </Text>
              </View>

              <AntDesign name="right" size={18} color="gray" />
            </View>
          </View>

          <View className=" ">
            <View className="my-[10px] bg-white p-[10px] rounded-md">
              <View className="flex-row items-center justify-between ">
                <Text>Feeding India Donation</Text>
                <AntDesign name="checksquare" size={24} color="#25cb25" />
              </View>

              <View className="my-[10px] flex-row items-center justify-between">
                <Text className="text-[14px] font-[500] text-gray-400 ">
                  Working towards a manlutrition-free India
                </Text>
                <Text>Rs 3</Text>
              </View>
            </View>
          </View>

          <View>
            <Text className="text-[20px] text-gray-600 font-[800] ">
              Billing Details
            </Text>

            <View className="my-[10px] bg-white p-[10px] rounded-md">
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

              <View>
                <View className="flex-row items-center justify-between my-[10px]">
                  <Text className="text-[20px] font-[600] mt-[10px] text-[#25cb25]">
                    Total Payable
                  </Text>
                  <Text className="text-[20px] font-[600] mt-[10px] text-[#25cb25]">
                    ₹{total + 90}{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <Text className="text-[60px] font-[600] mt-[10px]">₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</Text> */}

      {total === 0 ? null : (
        <Pressable className="flex-row items-center py-[8px] px-[20px] justify-between bg-[#FED000] rounded-t-[20px]">
          <View>
            <Text className="text-[20px] tracking-[0.5px] font-[800] mt-[6px] text-black">
              Pay Using Cash
            </Text>
            <Text className="text-[15px] font-bold  my-[6px] text-black">
              Cash on Delivery
            </Text>
          </View>

          <Pressable
            onPress={() => {
              dispatchEvent(addTotalPrice(total + 90));
              router.push({
                pathname: "/address",
                params: { name: params.name },
              });
            }}
            className=" bg-[#25cb25] py-[8px] px-[20px] my-[6px] rounded-md flex-row items-center justify-between  "
          >
            <Text className="text-[18px] font-[600] text-white">
              Place Order
            </Text>

            <View className="flex-col items-center gap-[4px] ml-[10px]">
              <Text className="text-[16px] font-[600] text-slate-800">
                Total
              </Text>
              <Text className="text-[18px] font-[600] text-slate-800">
                ₹{total + 90}
              </Text>
            </View>
          </Pressable>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default Cart;

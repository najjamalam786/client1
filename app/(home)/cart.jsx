import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
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
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import CartItem from "../../components/CartItem.jsx";
import { addTotalPrice } from "../../redux/features/CartSlice.js";
import { addLocationCoordinates } from "../../redux/features/UserSlice.js";

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

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      return true;
    });
    if (cartItems) {
      setTotal(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
    }
    return unsubscribe;
  }, [navigation]);

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
            CART ITEM(S)
          </Text>
        </View>

        {cartItems.length > 0 ? (
          <View>
            {cartItems
              .slice(0)
              .reverse()
              .map((item, index) => (
                <CartItem key={index} item={item} setTotal={setTotal} />
              ))}

            <View className="my-[10px] ">
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
                      <FontAwesome5
                        name={item.iconName}
                        size={22}
                        color="gray"
                      />

                      <Text className="w-[75px] text-[14px] font-[500] text-gray-500 pt-[10px] text-center">
                        {item.name}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
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
              <Text className="text-[18px] text-gray-600 font-[500]  ">
                Billing Details
              </Text>

              <View className="my-[10px] bg-white p-[10px] rounded-md">
                <View className="flex-row items-center justify-between ">
                  <Text className="text-[16px] mt-[8px] text-[#717070]">
                    Total Item
                  </Text>
                  <Text className="text-[16px] font-[600] mt-[8px] text-[#717070]">
                    ₹{total}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between ">
                  <Text className="text-[16px] mt-[8px] text-[#717070]">
                    Delivery fee
                  </Text>
                  <Text className="text-[16px] font-[600] mt-[8px] text-[#717070]">
                    ₹15.00
                  </Text>
                </View>

                <View className="flex-row items-center justify-between ">
                  <Text className="text-[16px] mt-[8px] text-[#717070]">
                    Delivery Partner Charge
                  </Text>
                  <Text className="text-[16px] font-[600] mt-[8px] text-[#717070]">
                    ₹75.00
                  </Text>
                </View>

                <View>
                  <View className="flex-row items-center justify-between my-[10px]">
                    <Text className="text-[18px] text-slate-800">
                      Total Payable
                    </Text>
                    <Text className="text-[18px] font-[600] text-[#25cb25]">
                      ₹{total + 90}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center h-[600px]">
            <Image
              source={require("../../assets/empty_cart.png")}
              className="w-[150px] h-[150px] "
            />
            <Text className="text-[28px] text-gray-600 font-[500] text-center my-[8px]">
              No items in cart
            </Text>

            <TouchableOpacity
              className="bg-blue-800 px-[14px] py-[6px] rounded-[5px]  "
              onPress={() => router.replace("/")}
            >
              <Text className="text-white font-semibold text-[16px] ">
                Add Items
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* <Text className="text-[60px] font-[600] mt-[10px]">₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</Text> */}

      {total === 0 ? null : (
        <>
          <View className="flex-row items-center py-[2px] px-[20px]  bg-[#7340d9] rounded-t-[10px] ">
            <View className="p-1 bg-[#ebd402] rounded-full ">
              <Image
                source={require("../../assets/delivery_boy.png")}
                className="w-[40px] h-[40px]  "
              />
            </View>
            <Text className="text-[15px] font-bold m-2 text-white">
              Cash on Delivery
            </Text>
          </View>
          <View className="flex-row items-center justify-between py-[8px] px-[20px]  bg-white ">
            {/* <View>
            <Text className="text-[20px] tracking-[0.5px] font-[800] mt-[6px] text-black">
              Pay Using Cash
            </Text>
            <Text className="text-[15px] font-bold  my-[6px] text-black">
              Cash on Delivery
            </Text>
          </View> */}
            <View className=" border-[2px] border-[#25cb25] bg-white w-[180px] py-[8px] my-[6px] items-center rounded-[10px] ">
              <Text className="text-[18px] font-[600] text-[#25cb25]">
                ₹{total + 90}
              </Text>
            </View>
            <TouchableOpacity
              onPress={async () => {
                let { coords } = await Location.getCurrentPositionAsync();
                dispatchEvent(addLocationCoordinates(coords));
                dispatchEvent(addTotalPrice(total + 90));
                router.push({
                  pathname: "/address",
                  params: { name: params.name },
                });
              }}
              className=" border-[2px] border-[#25cb25] bg-[#25cb25] w-[180px] py-[8px] my-[6px] items-center rounded-[10px]  "
            >
              <Text className="text-[18px] font-[600]  text-white">
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;

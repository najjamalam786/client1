import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCartItems } from "../../redux/features/CartSlice";

const FoodDetails = () => {
  const { fbImage } = useSelector((state) => state.item);
  const screenWidth = Dimensions.get("window").width;
  const router = useRouter();
  const params = useLocalSearchParams();
  const { userId } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatchEvent = useDispatch();
  const [flag, setFlag] = useState(false);
  const [items, setItems] = useState({
    _id: params.id,
    day: params.day,
    week: params.week,
    name: params.name,
    price: params.price,
    foodType: params.foodType,
    imageURL: fbImage,
    description: params.description,
    quantity: 1,
  });

  const handleCart = async () => {
    await axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/add-to-cart`, {
        userId: userId,
        userCart: items,
      })
      .then((response) => {
        // console.log("add cart", response.data);
        dispatchEvent(addCartItems(response.data));
      });
  };

  useEffect(() => {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id === params.id) {
        setFlag(true);
        return;
      }
    }
  }, [cartItems]);

  return (
    <SafeAreaView className="flex-1 bg-[#d4edee81]">
      <ScrollView>
        <View className="flex-row items-center justify-between px-4 mt-[20px] ">
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
            Food Details
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

        <View className="mt-[20px] pb-4 bg-[#f4f4f4]">
          <Image
            source={{ uri: fbImage }}
            style={{ width: screenWidth, height: 300 }}
          />

          <View className="mx-4 mt-[10px] px-4">
            <Text className="text-[24px] my-[10px] font-semibold text-black">
              {params.name}
            </Text>

            <Text className="text-[26px]   font-[800] text-[#e7c101]">
              * * * * *
              <Text className="text-[14px] font-[400] text-[#717171]">
                {" "}
                4.5 (89 reviews)
              </Text>
            </Text>

            <View className="flex-row items-center justify-between mt-[10px]">
              <Text className="text-[26px] font-[600] text-[#17bf01]">
                ₹{params.price}{" "}
                <Text className="text-[16px] font-[400] text-[#696a69]">
                  {" "}
                  ₹{parseInt(params.price) + 50}
                </Text>
              </Text>
              <Text
                className={`text-[12px] font-[600] ${
                  params.foodType === "non-veg"
                    ? "bg-[#a6010137] text-[#a60101]"
                    : "bg-[#4bd83837] text-[#33a823]"
                }  rounded-[6px] px-[10px] py-[5px]`}
              >
                {params.foodType}
              </Text>
            </View>

            <Text className="text-[20px] my-[8px] font-[600] text-slate-800 mt-[20px]">
              Description
            </Text>
            <Text className="text-[16px] font-[400] text-slate-600">
              {params.description}
            </Text>

            <Text className="text-[20px] my-[8px] font-[600] text-slate-800 mt-[20px]">
              Food Ingredients
            </Text>
            <Text className="text-[16px] font-[400] text-slate-600">
              {params.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="flex-row items-center justify-around px-4 py-4 bg-white">
        <Text
          className={`text-[18px] font-[600] ${
            params.foodType === "non-veg"
              ? "bg-[#a6010137] text-[#a60101]"
              : "bg-[#4bd83837] text-[#33a823]"
          }  rounded-[10px] w-[100px] py-2 text-center`}
        >
          {params.foodType}
        </Text>
        {flag === true ? (
          <TouchableOpacity
            onPress={() => router.replace("/cart")}
            className="border-2 border-[#1ac51a] bg-white items-center w-[200px] px-[14px] py-[6px] rounded-[10px]  "
          >
            <Text className="text-[18px] font-[600] text-[#1ac51a]">
              Go to Cart
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleCart()}
            className="border-2 border-[#1ac51a] w-[200px] items-center  bg-[#1ac51a] py-[8px] rounded-[10px]  "
          >
            <Text className="text-[18px] font-[600] text-white">Add Food</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FoodDetails;

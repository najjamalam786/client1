import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../redux/features/CartSlice";
import axios from "axios";
import { router } from "expo-router";

const CartItem = ({ item, setTotal }) => {
  const { userId } = useSelector((state) => state.user);
  const [qty, setQty] = useState(0);
  const dispatchEvent = useDispatch();

  useEffect(() => {
    try {
      setQty(item?.quantity);
    } catch (error) {
      console.log("error from cart item", error);
    }
  }, [item]);

  const updateQty = async (action, id) => {
    if (action === "inc") {
      setQty((quantity) => quantity + 1);

      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/update-cart`, {
          userId: userId,
          _id: id,
          quantity: qty + 1,
        })
        .then((response) => {
          dispatchEvent(addCartItems(response.data));
          setTotal(response.data.reduce((sum, item) => sum + item.price, 0));
        });
    } else if (action === "dec" && qty > 1) {
      setQty((quantity) => quantity - 1);

      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/update-cart`, {
          userId: userId,
          _id: id,
          quantity: qty - 1,
        })
        .then((response) => {
          dispatchEvent(addCartItems(response.data));
          setTotal(response.data.reduce((sum, item) => sum + item.price, 0));
        });
    } else if (action === "dec" && qty === 1) {
      setQty((quantity) => quantity - 1);
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/delete-cart-item`, {
          userId: userId,
          _id: id,
        })
        .then((response) => {
          dispatchEvent(addCartItems(response.data));
          setTotal(response.data.reduce((sum, item) => sum + item.price, 0));
        });
    }
  };

  return (
    <View>
      {item.quantity > 0 && (
        <View className="flex-col  p-[10px] my-[5px] bg-white border-[0.5px] border-[#bebebe] rounded-[10px] ">
          <View className="flex-row items-center justify-between ">
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/foodDetails",
                  params: {
                    id: item._id,
                    day: item.day,
                    week: item.week,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    foodType: item.foodType,
                    aggregate_rating: item.aggregate_rating,
                  },
                })
              }
              className="flex-row items-center justify-between "
            >
              <View className="flex-row items-center space-x-2">
                <Image
                  source={{ uri: item?.imageURL }}
                  className="w-[80px] h-[80px] rounded-[10px] "
                />
                <View className="space-y-2">
                  <Text className="font-bold text-[16px] text-slate-800 ">
                    {item?.name}
                  </Text>

                  <Text className="text-[16px] font-bold text-slate-800  ">
                    price: ₹{parseFloat(item?.price) * item?.quantity}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <Pressable className="flex-row items-center justify-center  ">
              <TouchableOpacity
                onPress={() => {
                  updateQty("dec", item._id);
                }}
                className="px-[6px]   border-[2px] border-[#49d131] rounded-[10px]"
              >
                <Text className="text-[20px] font-[600] text-green-600">
                  {" "}
                  -{" "}
                </Text>
              </TouchableOpacity>

              <Text className="text-[18px] font-[600] px-[10px] text-slate-600">
                {qty}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  updateQty("inc", item._id);
                }}
                className="px-[6px] py-[2px] bg-[#49d131] rounded-[10px]"
              >
                <Text className="text-[20px] font-[600] text-white "> + </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartItem;

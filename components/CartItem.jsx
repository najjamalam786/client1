import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../redux/features/CartSlice";
import axios from "axios";

const CartItem = ({ item, setTotal }) => {
  const { userId } = useSelector((state) => state.user);
  const [qty, setQty] = useState(item.quantity);
  const dispatchEvent = useDispatch();

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
    } else if (qty === 1) {
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
        <View className="flex-col  p-[10px] my-[10px] bg-white border-[0.5px] border-[#bebebe] rounded-[10px] ">
          <View className="flex-row items-center justify-between ">
            <View>
              <Text className="text-[18px] font-[500] text-slate-800 ">
                {item.name}
              </Text>

              <Text className="text-[16px] text-slate-600 ">
                price: ₹{parseFloat(item.price) * item.quantity}
              </Text>
            </View>

            <Pressable className="flex-row items-center justify-center px-[10px] py-[5px]  border-[0.5px] border-[#bebebe] rounded-[10px] ">
              <Pressable
                onPress={() => {
                  updateQty("dec", item._id);
                }}
              >
                <Text className="text-[20px] font-[600] px-[6px] text-green-600">
                  {" "}
                  -{" "}
                </Text>
              </Pressable>

              <Pressable>
                <Text className="text-[20px] font-[600] px-[6px] text-green-600">
                  {item.quantity}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  updateQty("inc", item._id);
                }}
              >
                <Text className="text-[20px] font-[600] px-[6px] text-green-600 ">
                  {" "}
                  +{" "}
                </Text>
              </Pressable>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartItem;

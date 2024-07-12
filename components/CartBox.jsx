import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";

const CartBox = () => {
  const router = useRouter();
  const { cartItems } = useSelector((state) => state.cart);

  const params = useLocalSearchParams();

  return (
    <View>
      {cartItems.length > 0 && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/cart",
              params: { name: params.name },
            })
          }
          className="bg-[#29df29] w-[340px] py-2 px-4 rounded-full absolute bottom-[10px] left-[40px]"
        >
          <Text className="text-[16px] text-center font-bold text-white  ">
            {cartItems.length} items added
          </Text>

          <Text className="text-[12px] text-center font-bold text-white  ">
            Add items(s) worth 240 to reduce surg fee by Rs 35.
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default CartBox;

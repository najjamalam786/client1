import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
// import {
//   addToCart,
//   decrementQuantity,
//   incrementQuantity,
//   removeFromCart,
// } from "../client/redux/features/CartSlice.js";
// import { useDispatch } from "react-redux";

const MenuItem = ({ item }) => {
  const [additems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);
  // const dispatch = useDispatch();

  return (
    <View>
      <Pressable className="flex-row items-center justify-between m-[10px] mt-[20px]">
        <View>
          <Text className="text-[18px] font-bold">{item.name}</Text>
          <Text className="text-[16px] my-[5px] font-semibold">
            ₹{item.price}
          </Text>
          <Text className=" text-[14px] font-bold ">
            {item.rating}{" "}
            {[0, 0, 0, 0, 0].map((en, i) => (
              <FontAwesome
                key={i}
                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                size={16}
                color={i < Math.floor(item.rating) ? "gold" : "gray"}
              />
            ))}
          </Text>

          <Text className="mt-[5px] text-[14px] w-[240] text-gray-400 ">
            {item.description.length > 40
              ? item.description.substr(0, 37) + "..."
              : item.description}
          </Text>
        </View>

        <Pressable>
          <Image
            source={{ uri: item.image }}
            className="w-[120px] h-[120px] rounded-[10px] "
          />

          {selected ? (
            <Pressable className="absolute flex-row items-center top-[105px] left-[25px] text-[14px] font-[900] bg-[#d0f0c0] rounded-[20px] px-[8px] py-[5px] border-[1px] border-red-500 ">
              <Pressable
                onPress={() => {
                  if (additems === 1) {
                    // dispatch(removeFromCart(item));
                    setAddItems(0);
                    setSelected(false);
                    return;
                  }
                  setAddItems((currentValue) => currentValue - 1);
                  // dispatch(decrementQuantity(item));
                }}
              >
                <Text className="text-[14px] font-bold text-black pr-[6px] ">
                  {" "}
                  -{" "}
                </Text>
              </Pressable>

              <Pressable>
                <Text className="text-[14px] text-black pr-[6px]  ">
                  {additems}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setAddItems((currentValue) => currentValue + 1);
                  // dispatch(incrementQuantity(item));
                }}
              >
                <Text className="text-[14px] text-black  "> + </Text>
              </Pressable>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setSelected(true);
                if (additems === 0) {
                  setAddItems((currentValue) => currentValue + 1);
                }
                // dispatch(addCartItems(item));
              }}
              className="absolute top-[105px] left-[25px]"
            >
              <Text className=" uppercase text-[14px] font-[900] bg-[#d0f0c0] rounded-[20px] px-[20px] py-[5px] border-[1px] border-red-500 ">
                Add
              </Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
};

export default MenuItem;

import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import WeeklyFood from "../mapItems/WeeklyFood";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../redux/features/CartSlice";

const Categories = () => {
  const [weeks, setWeeks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useSelector((state) => state.user);
  const dispatchEvent = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/get-cart`, {
          userId: userId,
        })
        .then((response) => {
          dispatchEvent(addCartItems(response.data));
        });
    };

    fetchCartData();

    const getWeeks = async () => {
      try {
        await axios
          .get(`${process.env.EXPO_PUBLIC_API_URL}/api/item/week`)
          .then((response) => {
            const data = response.data;
            setWeeks(data);
            setIsLoading(false);
          });
      } catch (error) {
        console.log("Catagories weeks error");
      }
    };

    getWeeks();
  }, []);

  return (
    <>
      <View className="p-2 mt-2">
        <Text className="text-[18px] font-[500] text-center text-gray-500 tracking-[3px] uppercase">
          Our Hot Dishes
        </Text>
        <View className="border-b-[2px] border-gray-300 mx-[100px]" />

        {isLoading ? (
          <View className="flex-1 justify-center items-center h-[300px]">
            <ActivityIndicator size={50} color="red" />
          </View>
        ) : (
          weeks.map((week) => <WeeklyFood key={week._id} week={week} />)
        )}
      </View>
    </>
  );
};

export default Categories;

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import WeeklyFood from "../mapItems/WeeklyFood";
import axios from "axios";

const Categories = () => {
  const [weeks, setWeeks] = useState([]);

  //categories
  // const items = [
  //   {
  //     id: "1",
  //     name: "Sunday",
  //   },
  //   {
  //     id: "2",
  //     name: "Monday",
  //   },
  //   {
  //     id: "3",
  //     name: "Tuesday",
  //   },
  //   {
  //     id: "4",
  //     name: "Wednesday",
  //   },
  //   {
  //     id: "5",
  //     name: "Thursday",
  //   },
  //   {
  //     id: "6",
  //     name: "Friday",
  //   },
  //   {
  //     id: "7",
  //     name: "Saturday",
  //   },
  // ];

  useEffect(() => {
    const getWeeks = async () => {
      try {
        await axios
          .get(`${process.env.EXPO_PUBLIC_API_URL}/api/item/week`)
          .then((response) => {
            const data = response.data;
            setWeeks(data);
          });
      } catch (error) {
        console.log(error);
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
        {weeks &&
          weeks.map((week) => <WeeklyFood key={week._id} week={week} />)}
      </View>

      <View>
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity className="mt-[5px] " activeOpacity={0.5}>
              <View className="mx-[8px] my-[20px] p-[5px] px-[10px] bg-[#ff0021] rounded-lg">
                <Text className="text-[14px] font-[600] px-[5px] text-white ">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        /> */}
      </View>
    </>
  );
};

export default Categories;

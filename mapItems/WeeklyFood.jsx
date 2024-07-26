import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import FoodContainer from "./FoodContainer";
import React, { useEffect, useState } from "react";
import axios from "axios";

const WeeklyFood = ({ week }) => {
  const [filter, setFilter] = useState("sunday");
  const [allFood, setAllFood] = useState([]);

  useEffect(() => {
    const getAllFood = async () => {
      try {
        await axios
          .get(`${process.env.EXPO_PUBLIC_API_URL}/api/item/get-items`)
          .then((response) => {
            const data = response.data;
            setAllFood(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getAllFood();
  }, []);
  return (
    <View key={week._id} className="py-4 px-2">
      <View className="flex-row justify-between items-center ">
        <Text className="text-[12px] font-[500] bg-[#62fc5c] px-1 pl-[10px] py-[10px] rounded-l-[20px] tracking-[1.5px] text-gray-800 uppercase">
          Week {week.index}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View className="flex-row gap-[6px] mt-[14px] ml-[2px]">
            {week &&
              week.week.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => {
                    setFilter(item.urlParamName);
                  }}
                  className={`${
                    filter === item.urlParamName
                      ? "bg-[#ff0021]"
                      : "bg-[#ffffff] border-[#b3b2b2] border-[0.4px] "
                  } mx-[8px] my-[20px] p-[5px] px-[10px] shadow-xl rounded-lg`}
                >
                  <View>
                    <Text
                      className={`${
                        filter === item.urlParamName
                          ? "text-white"
                          : "text-slate-900 "
                      } text-[14px] font-[600] px-[5px]`}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>

      <View>
        <FoodContainer
          flag={false}
          dataValue={allFood.filter(
            (food) => food.day === filter && food.week === `week ${week.index}`
          )}
        />
      </View>
    </View>
  );
};

export default WeeklyFood;

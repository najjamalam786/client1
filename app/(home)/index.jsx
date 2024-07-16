import {
  View,
  Text,
  Alert,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import Explore from "../../components/Explore";
import HotelList from "../../components/HotelList";
import { SafeAreaView } from "react-native-safe-area-context";
import Offer from "../../components/Offer";
import TabBar from "../../components/TabBar";
import { router } from "expo-router";
import CartBox from "../../components/CartBox";

const Home = () => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    CheckIfLocationEnabled();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location services are not enabled",
        "To use this app please enable them",
        [
          {
            text: "Ok",
            onPress: () => console.log("OK Pressed CheckIfLocationEnabled"),
          },
        ],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(true);
    }
  };

  //recommended
  const recommended = [
    {
      id: 0,
      name: "Nandhana Palace",
      image:
        "https://b.zmtcdn.com/data/pictures/chains/3/50713/81d0735ce259a6bf800e16bb54cb9e5e.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "35 - 45",
      type: "Andhra",
    },
    {
      id: 0,
      name: "GFC Biriyani",
      image:
        "https://b.zmtcdn.com/data/pictures/0/20844770/f9582144619b80d30566f497a02e2c8d.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
      time: "10 - 35",
      type: "North Indian",
    },
    {
      id: 0,
      name: "Happiness Dhaba",
      image:
        "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "20 - 25",
      type: "North Indian",
    },

    {
      id: 0,
      name: "Happiness Dhaba",
      image:
        "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "20 - 25",
      type: "North Indian",
    },
    {
      id: 0,
      name: "Happiness Dhaba",
      image:
        "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "20 - 25",
      type: "North Indian",
    },
  ];

  // console.log("my address", displayCurrentLocation);
  return (
    <>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 bg-[#f5f5f5] ">
          <View className="flex-row items-center justify-between px-4 ">
            <View className="flex-row items-center gap-1 ">
              <Image
                source={require("../../assets/chillis_Logo.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text className="text-[24px] tracking-[1px] font-[800] text-[#e80013] ">
                Chillis
              </Text>
            </View>

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

          <Carousel />
          <Offer />

          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              alignItems: "center",
            }}
            className=" gap-[10px]  mt-[20px] px-[10px]"
          >
            {recommended.map((item, index) => (
              <View
                key={index}
                className="bg-white border-[1px] border-[#e0e0e0] rounded-[10px] p-2 "
              >
                <View className="flex flex-row items-center justify-center">
                  <Image
                    source={{ uri: item.image }}
                    className="w-[100px] h-[100px] rounded-l-[16px] mr-[10px] "
                  />

                  <View className="flex flex-col mr-4 ">
                    <Text className="text-[16px] font-[500] ">{item.name}</Text>
                    <Text className="text-gray-400 text-[14px] font-semibold">
                      {item.type}
                    </Text>

                    <View className="mt-[14px] flex flex-row items-center space-x-1">
                      <Ionicons name="time" size={24} color="green" />
                      <Text className="text-gray-500 text-[14px] font-semibold">
                        {item.time} mins
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView> */}

          <Categories />
          <Explore />

          <HotelList />
        </ScrollView>
        <CartBox />
        <TabBar />
      </SafeAreaView>
    </>
  );
};

export default Home;

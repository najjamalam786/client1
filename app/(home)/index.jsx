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
// import Explore from "../../components/Explore";
// import HotelList from "../../components/HotelList";
import { SafeAreaView } from "react-native-safe-area-context";
import Offer from "../../components/Offer";
import TabBar from "../../components/TabBar";
import { router } from "expo-router";
import CartBox from "../../components/CartBox";
import HotelList from "../../components/HotelList";

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
            <Image
              source={require("../../assets/t_logo.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text className="text-[22px] tracking-[1px] font-[800] text-[#e80013] ">
              TIFFINBOX
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

          <Carousel />
          <Offer />

          <Categories />
          <HotelList />
        </ScrollView>
        <CartBox />
        <TabBar />
      </SafeAreaView>
    </>
  );
};

export default Home;

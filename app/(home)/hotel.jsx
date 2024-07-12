import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import FoodItem from "../../components/FoodItem";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../../components/TabBar";

const Hotel = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  //menu
  const menu = [
    {
      id: "20",
      name: "Recommended",
      items: [
        {
          id: "101",
          name: "Paneer 65",
          price: 275,
          description:
            "This is served with Raita and gravy and has loaded with chilli paste mixed chicken Kebabs",
          rating: 4.1,
          ratings: 43,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rgOs6C9rJuwL_sjJB5n7CeGKEA-Xg2yxIYq025B7_7avmruQHZ0DPpJa8GiSzPkEfas&usqp=CAU",
          veg: true,
          bestSeller: false,
          quantity: 1,
        },
        {
          id: "102",
          name: "Chilly Chicken (Boneless)",
          price: 285,
          description:
            "E: 604.42 KCal (163.36 KCal), C: 29.67 Grams (8.02 Grams), P: 50.63 Grams (13.68 Grams), F: 30.94 Grams (8.36 Grams)",
          rating: 4.3,
          ratings: 34,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCYsmzl1yfX0MwTN-E_uHC-bk3p181VzjIA&usqp=CAU",
          veg: false,
          bestSeller: true,
          quantity: 1,
        },
        {
          id: "103",
          name: "Spl Veg Biryani",
          price: 250,
          description:
            "E: 1327.35 KCal (126.41 KCal), C: 213.24 Grams (20.31 Grams), P: 26.99 Grams (2.57 Grams), F: 38.46 Grams (3.66 Grams)",
          rating: 4.5,
          ratings: 56,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wuHjGnvTD4Aewe_M2-_5OSwPiPv1kUvMljF-sqoPRzvoFxD06BK2ac2jV-ZmQG6lQTg&usqp=CAU",
          veg: true,
          bestSeller: false,
          quantity: 1,
        },
        {
          id: "104",
          name: "Chilly Paneer",
          price: 220,
          description:
            "E: 871.69 KCal (272.40 KCal), C: 21.54 Grams (6.73 Grams), P: 51.90 Grams (16.22 Grams), F: 64.36 Grams (20.11 Grams",
          rating: 3.8,
          ratings: 22,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
          veg: true,
          bestSeller: true,
          quantity: 1,
        },
        {
          id: "105",
          name: "Chicken 65",
          price: 300,
          description:
            "E: 544.39 KCal (155.54 KCal), C: 25.11 Grams (7.17 Grams), P: 45.15 Grams (12.90 Grams), F: 27.91 Grams (7.97 Grams)",
          rating: 4.5,
          ratings: 45,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAW6AHZuQtR_1d9WPZn5mjK_jG-aAJxYfLQ&usqp=CAU",
          veg: false,
          bestSeller: true,
          quantity: 1,
        },
      ],
    },
    {
      id: "11",
      name: "Rice",
      items: [
        {
          id: "201",
          name: "Chicken Fried Rice",
          price: 260,
          description:
            "E: 1142.26 KCal (163.18 KCal), C: 125.05 Grams (17.86 Grams), P: 40.11 Grams (5.73 Grams), F: 51.37 Grams (7.34 Grams)",
          rating: 4.3,
          ratings: 34,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
          veg: false,
          bestSeller: true,
        },
        {
          id: "202",
          name: "Egg Fried Rice",
          price: 220,
          description:
            "E: 1729.51 KCal (164.72 KCal), C: 204.54 Grams (19.48 Grams), P: 44.03 Grams (4.19 Grams), F: 79.02 Grams (7.53 Grams)",
          rating: 4.3,
          ratings: 52,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
          veg: false,
          bestSeller: false,
        },
        {
          id: "203",
          name: "Veg Fried Rice",
          price: 190,
          description:
            "E: 1477.00 KCal (140.67 KCal), C: 204.14 Grams (19.44 Grams), P: 22.90 Grams (2.18 Grams), F: 59.95 Grams (5.71 Grams)",
          rating: 4.6,
          ratings: 56,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
          veg: true,
          bestSeller: true,
        },
        {
          id: "204",
          name: "Jeera Rice",
          price: 195,
          description:
            "E: 1832.30 KCal (174.50 KCal), C: 246.73 Grams (23.50 Grams), P: 27.51 Grams (2.62 Grams), F: 78.15 Grams (7.44 Grams)",
          rating: 4.5,
          ratings: 48,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
          veg: true,
          bestSeller: false,
        },
      ],
    },
  ];

  const ScrollViewRef = useRef(null);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = 650;
  const scrollToCategory = (index) => {
    const yOffset = index * ITEM_HEIGHT;
    Animated.timing(scrollAnim, {
      toValue: yOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    ScrollViewRef.current.scrollTo({ y: yOffset, animated: true });
  };
  return (
    <SafeAreaView className="flex-1">
      <ScrollView ref={ScrollViewRef} className=" bg-white">
        <View className="flex flex-row justify-between mt-[5px] p-4">
          <Ionicons
            onPress={() => router.back()}
            style={{ paddingRight: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />

          <View className="flex flex-row gap-4">
            <SimpleLineIcons name="camera" size={24} color="black" />
            <Ionicons name="bookmark-outline" size={24} color="black" />
            <MaterialCommunityIcons
              name="share-outline"
              size={24}
              color="black"
            />
          </View>
        </View>

        <View className="justify-center items-center">
          <Text className="text-2xl font-bold text-black p-4">
            {params.name}
          </Text>
          <Text className="text-[18px] text-gray-500 font-[500] ">
            North India fast food 160 for one
          </Text>

          <View className="flex-row justify-center items-center my-[12px] ">
            <View className="flex flex-row items-center p-2  space-x-1 bg-yellow-500 rounded-lg">
              <Ionicons name="star" size={16} color="green" />
              <Text className="text-white text-[18px] ">
                {params?.aggregate_rating}
              </Text>
            </View>

            <Text className="text-[14px] font-[500] ml-4">3.2k+ Ratings</Text>
          </View>

          <View className="flex-row justify-center items-center my-[12px] rounded-[20px] bg-[#d0f0c0] px-[10px] py-[5px] ">
            <Text>30 - 40 mins 6 km | Bangalore</Text>
          </View>
        </View>

        {menu?.map((item, index) => (
          <FoodItem key={index} item={item} />
        ))}
      </ScrollView>

      <View
        className={`absolute ${
          cartItems.length > 0 ? "bottom-[76px]" : "bottom-[14px]"
        } left-[10px] flex-row items-center gap-2`}
      >
        {menu?.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => scrollToCategory(index)}
            className="bg-red-400 py-2 px-4 rounded-full "
          >
            <Text className="text-[16px] text-center font-bold text-white ">
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        className={`absolute ${
          cartItems.length > 0 ? "bottom-[70px]" : "bottom-[10px]"
        } right-[10px] bg-black py-4 px-5  rounded-full items-center justify-center `}
      >
        <Ionicons name="fast-food-outline" size={24} color="white" />
        <Text className="text-white font-[600]">Menu</Text>
      </Pressable>

      <ReactNativeModal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="w-[220px] h-[250px] bg-black absolute bottom-[35px] right-[10px] rounded-[10px] ">
          {menu?.map((item, index) => (
            <View
              key={index}
              className="pt-[20px] px-[20px] flex-row items-center justify-between "
            >
              <Text className="text-[#d0d0d0] font-[500] text-[18px] ">
                {item?.name}
              </Text>

              <Text className="text-[#d0d0d0] font-[500] text-[18px] ">
                {item.items.length}{" "}
              </Text>
            </View>
          ))}
        </View>
      </ReactNativeModal>

      {cartItems.length > 0 && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/cart",
              params: { name: params.name },
            })
          }
          className="bg-[#10bca2] w-[340px] py-2 px-4 rounded-full absolute bottom-[10px] left-[40px]"
        >
          <Text className="text-[16px] text-center font-bold text-white  ">
            {cartItems.length} items added
          </Text>

          <Text className="text-[12px] text-center font-bold text-white  ">
            Add items(s) worth 240 to reduce surg fee by Rs 35.
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default Hotel;

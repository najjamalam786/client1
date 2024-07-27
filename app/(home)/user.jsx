import {
  View,
  Text,
  Pressable,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import UserLocation from "../../components/UserLocation";
import { useSelector } from "react-redux";
import Logout from "../../components/Logout.jsx";

const UserPage = () => {
  const { userId } = useSelector((state) => state.user);

  return (
    <SafeAreaView className="flex-1 bg-[#d4edee81]">
      <ScrollView className="flex-1 bg-[#d4edee81]">
        <View className="flex-row items-center bg-white justify-between px-4 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{
                backgroundColor: "#d9d9da",
                borderRadius: 50,
                padding: 10,
              }}
            />
          </TouchableOpacity>

          <Text className="text-[16px] font-[600] text-[#070707] ">
            Hey! Welcome
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => Alert.alert("User Details")}
          className="flex-row items-center justify-start space-x-2 p-4 bg-white mt-4 mx-4 rounded-l-[50px] rounded-r-[20px]"
        >
          <View
            style={{
              backgroundColor: "#25cb25",
              width: 65,
              height: 65,
              borderRadius: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-white text-[18px] font-bold">
              <Ionicons name="person" size={30} color="white" />
            </Text>
          </View>
          <View className="flex-col items-start space-y-2">
            <Text className="text-[16px] font-[600] text-[#070707] ">
              #{userId}
            </Text>
            <Text className="text-[12px] font-semibold text-[#dd3232] ">
              View Profile Details
            </Text>
          </View>
        </TouchableOpacity>

        <View className=" px-4 pt-6 bg-white mt-4">
          <Text className="text-[16px] font-[800] text-[#070707] ">
            Your Address
          </Text>
          <UserLocation />
        </View>
        <View className="flex-1 py-4 items-center justify-center bg-[#d4edee81]">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => Alert.alert("Admin")}
              className="flex items-center justify-center w-[180px]  rounded-[16px] pb-2 mx-[10px] border-[1px] border-gray-300 bg-white"
            >
              <View className="bg-[#42b0ff4e] w-[180px] h-[100px] items-center justify-center rounded-t-[16px] ">
                <Image
                  source={require("../../assets/bag.png")}
                  className="w-[60px] h-[60px]"
                />
              </View>

              <Text className="text-[18px] font-[500] mt-[6px]">Profile</Text>
              <Text className="text-[10px] text-gray-500 mt-[3px]">
                All order Items
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push("/seeorders");
              }}
              className="flex items-center justify-center w-[180px]  rounded-[16px] pb-2 mx-[10px] border-[1px] border-gray-300 bg-white"
            >
              <View className="bg-[#42b0ff4e] w-[180px] h-[100px] items-center justify-center rounded-t-[16px] ">
                <Image
                  source={require("../../assets/bag.png")}
                  className="w-[60px] h-[60px]"
                />
              </View>

              <Text className="text-[18px] font-[500] mt-[6px]">Order</Text>
              <Text className="text-[10px] text-gray-500 mt-[3px]">
                All order Items
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mt-4">
            <TouchableOpacity
              onPress={() => {
                router.replace("/cart");
              }}
              className="flex items-center justify-center w-[180px]  rounded-[16px] pb-2 mx-[10px] border-[1px] border-gray-300 bg-white"
            >
              <View className="bg-[#42b0ff4e] w-[180px] h-[100px] items-center justify-center rounded-t-[16px] ">
                <Image
                  source={require("../../assets/bag.png")}
                  className="w-[60px] h-[60px]"
                />
              </View>

              <Text className="text-[18px] font-[500] mt-[6px]">Your Cart</Text>
              <Text className="text-[10px] text-gray-500 mt-[3px]">
                All cart items delete here
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/addItems")}
              className="flex items-center justify-center w-[180px]  rounded-[16px] pb-2 mx-[10px] border-[1px] border-gray-300 bg-white"
            >
              <View className="bg-[#3488db] w-[178px] h-[100px] items-center justify-center rounded-t-[16px] ">
                <Image
                  source={require("../../assets/bag.png")}
                  className="w-[60px] h-[60px]"
                />
              </View>

              <Text className="text-[18px] font-[500] mt-[6px]">Add Items</Text>
              <Text className="text-[10px] text-gray-500 mt-[3px]">
                All food Items created here
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MemberShip design */}
        <View className="p-4 bg-white mt-4">
          <Text className="text-[16px] font-[600] text-[#070707] ">
            Membership timeline and details
          </Text>

          <TouchableOpacity
            onPress={() => {
              Alert.alert("Get 10% OFF on your Food Membership");
            }}
            className="flex-row items-center justify-between bg-[#25cb25] p-4 rounded-[10px] mt-2"
          >
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-[16px] ">
                  Your Membership Subscription
                </Text>
              </View>
              <Text className="text-white text-[12px] font-semibold">
                Become a Food House Member and get exclusive offers{" "}
              </Text>
            </View>
            <View className="w-[110px] flex-row items-center justify-start  bg-[#25cb25] border-2 border-white px-4 py-[10px]  rounded-[10px]">
              <FontAwesome
                name="group"
                size={18}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white text-[16px] font-bold ">View</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/*  Services, About us, Contact us */}

        <View>
          <View className="flex-row items-center justify-between p-4 bg-white mt-4">
            <View className="flex-row items-center gap-4 ">
              <FontAwesome name="handshake-o" size={20} color="black" />
              <View className="">
                <Text className="text-[16px] font-[600] text-[#070707] ">
                  Our Service
                </Text>
                <Text>Here are some of our services</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </View>

          <View className="flex-row items-center justify-between p-4 bg-white mt-4">
            <View className="flex-row items-center gap-4 ">
              <FontAwesome6 name="users-rays" size={24} color="black" />
              <View className="">
                <Text className="text-[16px] font-[600] text-[#070707] ">
                  About Us
                </Text>
                <Text>Who we are and what we do</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </View>

          <View className="flex-row items-center justify-between p-4 bg-white mt-4">
            <View className="flex-row items-center gap-4 ">
              <FontAwesome name="question-circle-o" size={24} color="black" />
              <View className="">
                <Text className="text-[16px] font-[600] text-[#070707] ">
                  FAQ's
                </Text>
                <Text>Frequently asked questions </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </View>

          <View className="flex-row items-center justify-between p-4 bg-white mt-4">
            <View className="flex-row items-center gap-4 ">
              <Ionicons name="call-outline" size={24} color="black" />
              <View className="">
                <Text className="text-[16px] font-[600] text-[#070707] ">
                  Contact Us
                </Text>
                <Text>Contact us for any query</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </View>
          <Logout />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserPage;

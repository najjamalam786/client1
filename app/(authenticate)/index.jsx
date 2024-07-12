import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const Authentication = () => {
  const [mobNum, setMobNum] = useState("");

  const router = useRouter();
  const LogIn = async () => {
    if (mobNum.length === 10) {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/verify_phone`, {
          mobileNum: mobNum,
        })
        .then(async (response) => {
          if (response.data) {
            await axios
              .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/message`, {
                mobileNum: mobNum,
              })
              .then(() => {
                Alert.alert(`Success OTP sent ${mobNum}`);
                router.push("/OTPverify");
              });
          }
        })
        .catch((error) => {
          console.log("error catch", error);
        });
    } else {
      Alert.alert("Please enter valid mobile number");
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={["#F8C500", "#FADA2D"]} style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" backgroundColor="#F8C500" />

          <View className="h-[220px]  items-center justify-center px-[20px] pb-[4px]">
            <Text className="text-[24px] font-bold text-[#ff0021] ">
              FoodHouse
            </Text>
          </View>

          <View className="flex-1 items-center bg-white rounded-tl-[120px] ">
            <KeyboardAvoidingView className=" mt-[120px] ">
              <Text className="text-slate-500 text-[18px] font-semibold ">
                Enter your mobile number
              </Text>

              <View className="flex-row items-center space-x-2 bg-[#f0f8ff] py-[5px] rounded-[10px] mt-[22px] ">
                <Text className="text-gray-700 text-[18px] my-[14px] pl-4 w-[50] font-bold ">
                  +91
                </Text>
                <TextInput
                  value={mobNum}
                  keyboardType="numeric"
                  onChangeText={(text) => setMobNum(text)}
                  placeholder="Mobile"
                  placeholderTextColor="gray"
                  className="text-gray-500 text-[20px] tracking-[1.2px] w-[300] font-semibold "
                />
              </View>
              <Pressable
                onPress={() => {
                  LogIn();
                }}
                className="bg-[#ff0021] rounded-[10px] my-[10px] py-4 mt-[50px] "
              >
                <Text className="text-center font-[600] text-[18px] text-white uppercase">
                  Continue
                </Text>
              </Pressable>
            </KeyboardAvoidingView>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default Authentication;

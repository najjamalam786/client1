import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OTPTextView from "react-native-otp-textinput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserID } from "../../redux/features/UserSlice.js";
import { useRouter } from "expo-router";

const OTPverify = () => {
  const router = useRouter();
  const dispatchEvent = useDispatch();
  const [otp, setOtp] = useState("");

  const submitOTP = async () => {
    if (otp.length > 0) {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/verify_otp`, {
          otp: otp,
        })
        .then((response) => {
          if (response.data._id) {
            dispatchEvent(setUserID(response.data._id));
            axios
              .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/validate`, {
                _id: response.data._id,
                validUser: true,
              })
              .then((response) => {
                if (response.data === true) {
                  dispatchEvent(setToken(true));
                  router.replace("/(home)");
                }
              });
          } else if (response.data === false) {
            Alert.alert("Wrong OTP");
          } else {
            Alert.alert("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (otp.length === 0) {
      Alert.alert("Please enter OTP");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#F8C500", "#FADA2D"]} style={{ flex: 1 }}>
        {/* <StatusBar hidden /> */}
        <StatusBar barStyle="dark-content" backgroundColor="#F8C500" />
        <View className="h-[220px]  items-center justify-center px-[20px] pb-[4px]">
          <Text className="text-[24px] font-bold text-[#ff0021] ">
            OTP Verification
          </Text>
          <Text className="text-[16px] font-semibold text-[#373837] ">
            Please enter your OTP to continue
          </Text>
        </View>

        <View className="flex-1 items-center bg-white rounded-tl-[120px] ">
          <KeyboardAwareScrollView className=" mt-[80px] ">
            <Text className="text-[18px] text-slate-500 font-bold py-4">
              Enter OTP
            </Text>

            <OTPTextView
              textInputStyle={style.OTPstyle}
              handleTextChange={(text) => setOtp(text)}
              inputCount={5}
              tintColor={"#4bb04b"}
            />
            <View className="flex-row justify-between ">
              <Text className="text-[18px] text-[#4bb04b] font-bold py-2">
                Resend OTP
              </Text>
              <Text className="text-[18px] text-[#4bb04b] font-bold py-2">
                00:00
              </Text>
            </View>

            <Pressable
              onPress={() => submitOTP()}
              className="mt-[28px] bg-[#ff0021] rounded-[10px] py-4"
            >
              <Text className="text-[18px] text-center text-[#ffff00] uppercase font-bold ">
                Submit
              </Text>
            </Pressable>
          </KeyboardAwareScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  OTPstyle: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: 50,
    height: 50,
  },
});
export default OTPverify;

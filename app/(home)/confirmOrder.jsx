import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import TabBar from "../../components/TabBar";

const Order = () => {
  const params = useLocalSearchParams();
  const [tip, setTip] = useState(0);
  const { coordinate } = useSelector((state) => state.user);

  const time = moment().format("LT");
  const userLatitude = coordinate.latitude;
  const userLongitude = coordinate.longitude;
  const mapView = useRef(null);
  const [coordinates] = useState([
    {
      latitude: userLatitude,
      longitude: userLongitude,
    },
    {
      latitude: 25.575012091019623,
      longitude: 85.0687756575644,
    },
  ]);

  useEffect(() => {
    mapView.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#d4edee81]">
      <StatusBar backgroundColor="#d4edee81" />

      <ScrollView>
        <View className="flex-row items-center justify-between h-[60px]  p-[10px] ">
          <View>
            <Text className="text-[16px] font-[600] text-black">
              Delivery in 25 mins
            </Text>
            <Text className="text-[14px] font-[600] text-black">
              Order placed at {time}
            </Text>
          </View>

          <Text className="uppercase text-[18px] font-[600] text-black">
            Help
          </Text>
        </View>

        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          className="h-[400px] w-[100%]"
        >
          <Marker
            key={1}
            coordinate={coordinates[0]}
            pinColor="#f6b9b1"
            title="Your Location"
            description="Dlivery in 25 mins"
            image={require("../../assets/location-pin.png")}
          />
          <Marker
            coordinate={coordinates[1]}
            pinColor="#99fa99"
            title="FoodHouse"
            description="Preparing your food"
            image={require("../../assets/gps.png")}
          />

          <Polyline
            coordinates={coordinates}
            strokeColor="black"
            lineDashPattern={[4]}
            strokeWidth={3}
          />
        </MapView>

        <View className="h-[320] w-[100%] bg-white border-t-[20px] ">
          <View className="p-[10px]">
            <Text className="font-[500] text-[16px] text-center ">
              {params.name} has accepted your order
            </Text>
            <View className="flex-row mt-[20px] ">
              <FontAwesome5
                name="hand-holding-heart"
                size={24}
                color="#0bc4ae"
              />
              <View className="ml-[10px] ">
                <Text className="font-[500] text-[18px] px-[2px] mb-[6px] ">
                  Tip Your hunger Saviour
                </Text>

                <Text className="font-[600] text-[16px] text-[#696969] mr-[10px] px-[2px] ">
                  {" "}
                  Thank your delivery partener for helping you stay safe
                  indoors. Support them through these tough times with a tip
                </Text>

                <Pressable className="pt-[20px] flex-row items-center ">
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(30)}
                    className="bg-[#f5f5f5] px-[10px] mx-[10px] rounded-[10px] "
                  >
                    <Text className="p-[10px] text-[#002d62] font-bold ">
                      ₹30
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(50)}
                    className="bg-[#f5f5f5] mx-[10px] items-center rounded-[10px] "
                  >
                    <Text className="p-[4px] text-[14px] font-bold text-[#002d62] ">
                      ₹50
                    </Text>

                    <Text className=" bg-orange-500 px-[10px] text-[14px] font-bold text-white ">
                      Most Tipped
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(70)}
                    className="bg-[#f5f5f5] px-[10px] mx-[10px] rounded-[10px] "
                  >
                    <Text className="p-[10px] text-[#002d62] font-bold ">
                      ₹70
                    </Text>
                  </TouchableOpacity>
                </Pressable>
              </View>
            </View>

            {tip ? (
              <View>
                <Text>
                  please pay {"₹"} {tip} to your delivery agent at the time of
                  delivery
                </Text>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setTip(0)}
                  className="p-[10px] ml-[10px] mr-[10px] absolute top-[40px] pb-[40px] "
                >
                  <Text className="text-[#ec2b31f4] font-[700] text-[14px] ">
                    (Cancel)
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <TabBar />
    </SafeAreaView>
  );
};

export default Order;

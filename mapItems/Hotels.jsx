import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Hotels = ({ item }) => {
  const router = useRouter();
  return (
    <>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/hotel",
            params: {
              id: item.id,
              name: item.name,
              adress: item.adress,
              smalladress: item.smalladress,
              cuisines: item.cuisines,
              aggregate_rating: item.aggregate_rating,
            },
          })
        }
        style={{ margin: 10 }}
      >
        <Image
          source={{ uri: item.featured_image }}
          style={{
            width: "100%",
            aspectRatio: 6 / 4,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />

        <View
          style={{
            paddingVertical: 4,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{ paddingVertical: 10, fontWeight: "bold", fontSize: 20 }}
            >
              {item.name}
            </Text>

            <Text style={{ fontSize: 18, color: "gray" }}>
              North Indian fast food 160 for one
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 14, color: "gray" }}>
              {item.time}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              backgroundColor: "#F56A4E",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <Ionicons name="star" size={16} color="green" />
            <Text style={{ color: "white" }}>{item.aggregate_rating}</Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            borderColor: "#c8c8c8",
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 5,
            gap: 5,
          }}
        >
          <MaterialCommunityIcons
            name="brightness-percent"
            size={24}
            color="#1f75fe"
          />

          <Text
            style={{
              color: "gray",
              marginLeft: 5,
              color: "#1f75fe",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            20% OFF up to Rs 100
          </Text>
        </View>
      </Pressable>
    </>
  );
};

export default Hotels;

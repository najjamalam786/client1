import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { addCartItems } from "../redux/features/CartSlice";
import axios from "axios";

const FoodBox = ({ item, index }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userId } = useSelector((state) => state.user);

  const [qty, setQty] = useState(0);

  const router = useRouter();

  const dispatchEvent = useDispatch();

  useEffect(() => {
    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/get-cart`, {
        userId: userId,
      })
      .then((response) => {
        if (response.data) {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i]._id === item._id) {
              setQty(response.data[i].quantity);
            }
          }
        } else {
          setQty(0);
        }
      });
    // console.log("useEffect");
  }, []);
  const handleClick = async (items) => {
    // dispatchEvent(addCartItems(""));
    // console.log(items._id);
    try {
      if (userId) {
        if (cartItems) {
          for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i]._id === items._id) {
              axios
                .post(
                  `${process.env.EXPO_PUBLIC_API_URL}/api/user/update-cart`,
                  {
                    userId: userId,
                    _id: items._id,
                    quantity: cartItems[i].quantity + 1,
                  }
                )
                .then((response) => {
                  setQty(cartItems[i].quantity + 1);
                  dispatchEvent(addCartItems(response.data));
                });
              return;
            }
          }
        }
        await axios
          .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/add-to-cart`, {
            userId: userId,
            userCart: items,
          })
          .then((response) => {
            // console.log("add cart", response.data);
            setQty(1);
            dispatchEvent(addCartItems(response.data));
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View key={index} className="px-4 ">
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-[#FED000] rounded-b-[50px] rounded-t-[20px] "
        onPress={
          () => {}
          // router.push({
          //   pathname: "/hotel",
          //   params: {
          //     id: item.id,
          //     name: item.name,
          //     adress: item.adress,
          //     smalladress: item.smalladress,
          //     cuisines: item.cuisines,
          //     aggregate_rating: item.aggregate_rating,
          //   },
          // })
        }
        style={{ margin: 10 }}
      >
        <View>
          <Image
            source={{ uri: item.imageURL }}
            style={{
              width: "100%",
              aspectRatio: 6 / 4,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              handleClick(item);
            }}
            className="absolute top-0 right-0 bg-[#29df29] p-2 rounded-bl-[14px] rounded-tr-[20px]"
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>

          {qty > 0 && (
            <Text className="absolute top-[-14px] right-0 font-[900] text-white bg-[#e80013] rounded-full px-[10px] py-[4px] ">
              {" "}
              {qty}
              {/* {index} */}
            </Text>
          )}

          {/* {selected ? (
                      <Pressable className=" flex-row items-center absolute top-0 right-0 font-[900] bg-[#e80013] rounded-bl-[16px] px-[10px] py-[8px]  ">
                        <Pressable
                          onPress={() => {
                            if (additems === 1) {
                              dispatchEvent(removeFromCart(item));
                              setAddItems(0);
                              setSelected(false);
                              return;
                            }
                            setAddItems((currentValue) => currentValue - 1);
                            dispatchEvent(decrementQuantity(item));
                          }}
                        >
                          <Text className="text-[18px] font-bold text-white  ">
                            {" "}
                            −{" "}
                          </Text>
                        </Pressable>

                        <View>
                          <Text className="text-[14px] font-bold text-white px-[10px]  ">
                            {additems}
                          </Text>
                        </View>

                        <Pressable
                          onPress={() => {
                            setAddItems((currentValue) => currentValue + 1);
                            dispatchEvent(incrementQuantity(item));
                          }}
                        >
                          <Text className="text-[18px] text-white  "> + </Text>
                        </Pressable>
                      </Pressable>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setSelected(true);
                          if (additems === 0) {
                            setAddItems((currentValue) => currentValue + 1);
                          }
                          dispatchEvent(addToCart(item));
                        }}
                        className="absolute top-0 right-0 bg-[#29df29] p-2 rounded-bl-[14px] rounded-tr-[20px]"
                      >
                        <Ionicons name="add" size={24} color="white" />
                      </TouchableOpacity>
                    )} */}
        </View>

        <View
          style={{
            paddingVertical: 4,
            paddingHorizontal: 10,
          }}
        >
          <View>
            <Text
              className="text-slate-800"
              style={{
                paddingVertical: 5,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>
            <Text
              className="text-slate-800 absolute top-[-10px] right-[10px] text-[18px] font-bold bg-[#29df29] px-4 py-1 rounded-b-[12px]  "
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
              }}
            >
              ₹{item.price}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              gap: 5,
            }}
          >
            <Text className="text-slate-600 w-[70%]  text-[14px] ">
              {item && item.description.length > 50
                ? item.description.substr(0, 47) + "..."
                : item.description}
            </Text>
            <Text
              className={`${
                item.foodType === "veg" ? "bg-[#14ab03]" : "bg-[#a60a0a]"
              }  text-white font-bold text-[14px] rounded-[5px] px-2 py-1`}
            >
              {item.foodType}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            borderColor: "white",
            marginHorizontal: 10,
            marginTop: 5,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
            marginVertical: 10,
            gap: 5,
          }}
        >
          <MaterialCommunityIcons
            name="brightness-percent"
            size={24}
            color="#2e46fc"
          />

          <Text
            style={{
              marginLeft: 5,
              color: "#2e46fc",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            20% OFF up to Rs 100
          </Text>
        </View>
      </TouchableOpacity>

      {/* <View>
                  <View>
                    <Image
                      source={{ uri: item.imageURL }}
                      className="w-full h-[200px]"
                    />
                  </View>
                  <Text>{item.name}</Text>

                  {currentUser ? "" : ""}
                </View> */}
    </View>
  );
};

export default FoodBox;

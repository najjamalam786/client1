import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getStorage,
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase/firebase.config.js";
import axios from "axios";

const AddItems = () => {
  const [fields, setFields] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [alertStatus, setAlertStatus] = useState("");
  const [msg, setMsg] = useState(null);
  const [weeks, setWeeks] = useState(null);
  const [filePercent, setFilePercent] = useState(0);

  const [foodData, setFoodData] = useState({
    name: "",
    imageURL: "",
    week: "",
    day: "",
    foodType: "",
    pieces: "",
    quantity: 1,
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  // Pick an image from the library
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setFields(false);
    setAlertStatus("");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.assets[0].uri);

    if (!result.canceled) {
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.assets[0].uri, true);
        xhr.send(null);
      });

      // set metadata of image
      // create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
        // contentType: "image/png",
      };

      // uploade image on storage
      const storage = getStorage(app);
      const storageRef = ref(storage, "Categories/" + Date.now());

      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setFilePercent(Math.round(progress));
          setMsg("Uploading image...");
          setFields(true);
        },
        (error) => {
          // Handle unsuccessful uploads
          setAlertStatus("faild");
          setMsg("Picture not uploaded, Please try again");
          setFields(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFoodData({ ...foodData, imageURL: downloadURL });
            setMsg("Image uploaded successfully");
            setAlertStatus("success");
            setFields(true);
            setTimeout(() => {
              setFields(false);
              setAlertStatus("");
            }, 2000);
          });
        }
      );
    }
  };

  const uploadImage = async () => {
    // convert image into blob image
  };

  const deleteImage = () => {
    const storage = getStorage(app);
    const deleteRef = ref(storage, foodData.imageURL);

    // Delete the file
    deleteObject(deleteRef)
      .then(() => {
        setFoodData({ ...foodData, imageURL: "" });
        setMsg("Image deleted successfully");
        setAlertStatus("success");
        setFields(true);
      })
      .catch((error) => {
        console.log("Error deleting image:", error);
      });

    // File deleted successfully
  };

  const submitData = async () => {
    try {
      if (
        foodData.name &&
        foodData.week &&
        foodData.day &&
        foodData.imageURL &&
        foodData.price &&
        foodData.foodType &&
        foodData.description
      ) {
        await axios
          .post(
            `${process.env.EXPO_PUBLIC_API_URL}/api/item/add-items`,
            foodData
          )
          .then((response) => {
            if (response.data) {
              setMsg("Food added successfully");
              setAlertStatus("success");
              setFields(true);
              setFoodData({
                name: "",
                imageURL: "",
                week: "",
                day: "",
                foodType: "",
                price: "",
                description: "",
              });
            } else {
              setMsg("Something went wrong");
              setAlertStatus("faild");
              setFields(true);
            }
          });
      } else {
        setMsg("Please fill all the fields");
        setAlertStatus("faild");
        setFields(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`${process.env.EXPO_PUBLIC_API_URL}/api/item/week`)
        .then((response) => {
          setWeeks(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#e6e8e8]">
      <ScrollView className="flex-1 ">
        <View>
          <View className="flex-row items-end gap-4 px-6 py-4 bg-white ">
            <MaterialCommunityIcons
              name="food-turkey"
              size={30}
              color="black"
            />
            <TextInput
              placeholder="Give me a title name..."
              className=" text-[18px] w-[300px]  font-bold text-black"
              value={foodData.name}
              onChangeText={(text) => {
                setFoodData({ ...foodData, name: text });
                setFields(false);
                setAlertStatus("");
              }}
            />
          </View>

          <View className="flex-1 p-4 bg-white mt-4">
            <View className="bg-teal-600 rounded-[10px] mt-4 ">
              <Picker
                selectedValue={foodData.week}
                onValueChange={(itemValue) => {
                  setFoodData({ ...foodData, week: itemValue });
                  setFields(false);
                  setAlertStatus("");
                }}
                style={{ color: "white" }}
              >
                <Picker.Item label="Select Week" value="" />
                {weeks &&
                  weeks.map((week) => (
                    <Picker.Item
                      key={week._id}
                      label={`Week ${week.index}`}
                      value={`week ${week.index}`}
                    />
                  ))}
              </Picker>
            </View>

            <View className="bg-teal-600 rounded-[10px] mt-4">
              <Picker
                selectedValue={foodData.day}
                onValueChange={(itemValue) => {
                  setFoodData({ ...foodData, day: itemValue });
                  setFields(false);
                  setAlertStatus("");
                }}
                style={{
                  color: "white",
                }}
              >
                <Picker.Item label="Select Day" value="" />
                {weeks &&
                  weeks[0].week.map((day) => (
                    <Picker.Item
                      key={day._id}
                      label={day.name}
                      value={day.urlParamName}
                    />
                  ))}
              </Picker>
            </View>
          </View>

          <View className="flex-1 py-4 px-6 gap-[10px] bg-white mt-4">
            {foodData.imageURL ? (
              <>
                <Image
                  source={{ uri: foodData.imageURL }}
                  name="image"
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                <TouchableOpacity
                  onPress={() => deleteImage()}
                  className="p-4 bg-white absolute top-[10px] right-[10px]  mt-[-50px] rounded-bl-[30px] "
                >
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => pickImage()}
                className="flex-1 items-center justify-center py-[30px] rounded-lg bg-green-300 "
              >
                <Ionicons name="cloud-upload" size={84} color="white" />
                {fields ? (
                  filePercent > 0 && filePercent < 100 ? (
                    <Text className="text-[#f51703] font-bold text-[18px]">{`Uploading ${filePercent}%`}</Text>
                  ) : filePercent === 100 ? (
                    <Text className="text-[#1a1af7] font-bold text-center text-[18px]">
                      Image Successful Uploaded!{"\n "}
                      Upload Image Again
                    </Text>
                  ) : (
                    <Text className="text-black font-bold text-[18px]">
                      Upload Image Again
                    </Text>
                  )
                ) : (
                  <Text className="text-black font-bold text-[18px]">
                    Upload Image
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-1 gap-4  p-4 bg-white mt-4">
            <View className="  bg-white  mt-4">
              <View className=" bg-teal-500 rounded-[10px]  ">
                <Picker
                  selectedValue={foodData.foodType}
                  onValueChange={(text) => {
                    setFoodData({ ...foodData, foodType: text });
                    setFields(false);
                    setAlertStatus("");
                  }}
                  style={{ color: "white" }}
                >
                  <Picker.Item label="Select Category" value="" />
                  <Picker.Item label="Veg" value="veg" />
                  <Picker.Item label="Non-Veg" value="non-veg" />
                </Picker>
              </View>

              <View className=" bg-gray-300 rounded-[10px] mt-4 ">
                <TextInput
                  placeholder="Food price..."
                  placeholderTextColor="black"
                  keyboardType="numeric"
                  maxLength={10}
                  minLength={1}
                  className="p-4 text-[16px] font-bold"
                  value={foodData.price}
                  onChangeText={(text) => {
                    setFoodData({ ...foodData, price: text });
                    setFields(false);
                    setAlertStatus("");
                  }}
                />
              </View>
            </View>
            <View className=" bg-gray-300 rounded-[10px]  ">
              <TextInput
                placeholder="Food description..."
                placeholderTextColor="black"
                multiline={true}
                numberOfLines={10}
                style={{
                  height: 200,
                  textAlignVertical: "top",
                  padding: 20,
                  fontSize: 16,
                  color: "black",
                }}
                value={foodData.description}
                onChangeText={(text) => {
                  setFoodData({ ...foodData, description: text });
                  setFields(false);
                  setAlertStatus("");
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className={`${alertStatus === "success" && "bg-green-500"} ${
          alertStatus === "faild" && "bg-red-500"
        } ${
          alertStatus === "" && "bg-[#F8C500]"
        } px-4 justify-center rounded-t-[14px] `}
      >
        {fields ? (
          <Text className="text-white w-full text-center  p-4 text-[20px] font-semibold">
            {msg}
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => submitData()}
            className="w-full  p-4 items-center justify-center "
          >
            <Text className="text-white text-[18px] font-semibold uppercase ">
              Submit Data
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddItems;

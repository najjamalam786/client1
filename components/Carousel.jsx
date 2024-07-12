import { View, Text, Image, FlatList, Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";

const Carousel = () => {
  const flatlistRef = useRef();

  //Get screen width dimension
  const screenWidth = Dimensions.get("window").width;

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      id: "1",

      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "2",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "3",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "4",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "5",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  // Display Images UI
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{ width: screenWidth }}
        className="flex items-center justify-center mt-[20px]"
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 370, height: 200 }}
          className="rounded-[20px] mx-2 shadow-[20px] "
        />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;

    const activeIndex = Math.round(scrollPosition / screenWidth);
    // console.log("working", activeIndex);
    setCurrentIndex(activeIndex);
  };

  // Render Dot Indicators
  const renderDots = () => {
    return images.map((dot, index) => {
      if (currentIndex === index) {
        return (
          <View
            key={index}
            className="w-[10px] h-[10px] rounded-full mx-2 bg-[#25cb25] "
          ></View>
        );
      } else {
        return (
          <View
            key={index}
            className="w-[10px] h-[10px]  rounded-full mx-2 bg-gray-300"
          ></View>
        );
      }
    });
  };

  // Auto Scroll (looping)
  // useEffect(() => {
  //   // if currentIndex === last index --> then jump back to the first index
  //   let interval = setInterval(() => {
  //     if (currentIndex === images.length - 1) {
  //       flatlistRef.current?.scrollToIndex({
  //         index: 0,
  //         animated: true,
  //       });
  //     }
  //     // else if currentIndex === 0 --> then jump to the last index
  //     else if (currentIndex >= 0) {
  //       flatlistRef.current?.scrollToIndex({
  //         index: currentIndex + 1,
  //         animated: true,
  //       });
  //     }
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentIndex]);

  const getItemLayout = (data, index) => {
    return {
      length: screenWidth,
      offset: screenWidth * index, // for first image -> 300 * 0 = 0 pixel (offset), second image -> 300 * 1 = 300 pixel (offset)
      index: index,
    };
  };

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={images}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />

      <View className="flex-row justify-center mt-1">{renderDots()}</View>
    </View>
  );
};

export default Carousel;

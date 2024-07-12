import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

const Explore = () => {

    //categories
    const data = [
        {
            id: "0",
            name: "Offers",
            description: "Upto 50% off",
            image: "https://cdn-icons-png.flaticon.com/128/9356/9356378.png",
        },
        {
            id: "1",
            name: "Legends",
            description: "Across India",
            image: "https://cdn-icons-png.flaticon.com/128/8302/8302686.png",
        },
        {
            id: "2",
            name: "Gourmet",
            description: "Selections",
            image: "https://cdn-icons-png.flaticon.com/128/1065/1065715.png",
        },
        {
            id: "3",
            name: "Healthy",
            description: "Curated dishes",
            image: "https://cdn-icons-png.flaticon.com/128/415/415744.png",
        },
    ];
    return (
        <View>
            <Text className="text-[18px] text-center uppercase  font-[500] tracking-[8px] text-gray-500 mt-[20px] px-[10px] ">Explore</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-[40px] ">

                {data.map((item, index) => (
                    <View key={index} className="flex items-center justify-center w-[90px]  rounded-[5px] p-2 mx-[10px] border-[1px] border-gray-300 bg-white">

                        <Image
                            source={{ uri: item.image }} className="w-[50px] h-[50px]" />

                        <Text className="text-[14px] font-[500] mt-[6px]">{item.name}</Text>
                        <Text className="text-[12px] text-gray-500 mt-[3px]">{item.description}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Explore
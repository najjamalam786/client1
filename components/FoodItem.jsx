import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import MenuItem from './MenuItem';

const FoodItem = ({ item }) => {
    const data = [item];
    return (
        <View>
            {data?.map((item, index) => (
                <View key={index}>

                    <Pressable className=" m-[10px] flex-row items-center justify-between p-2 border-b border-gray-200 ">

                        <Text className="text-[20px] font-[500]">{item.name} ({item?.items?.length})</Text>
                        <AntDesign name='down' size={16} color={'gray'} />
                    </Pressable>
                    {item.items.map((item, index) => (
                        <MenuItem key={index} item={item} />
                    ))}
                </View>

            ))}
        </View>
    )
}

export default FoodItem
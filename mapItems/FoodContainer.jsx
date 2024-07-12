import { View } from "react-native";
import React, { useRef } from "react";

import FoodBox from "./FoodBox";

const FoodContainer = ({ flag, dataValue }) => {
  const foodContainer = useRef();
  // const [qty, setQty] = useState(0);

  return (
    <View ref={foodContainer}>
      {dataValue && dataValue.length > 0
        ? dataValue
            .slice(0)
            .reverse()
            .map((item, index) => (
              <FoodBox item={item} key={item._id} index={index} />
            ))
        : ""}
    </View>
  );
};

export default FoodContainer;

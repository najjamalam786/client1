// import { View, Text } from "react-native";
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import OrderItems from "../mapItems/OrderItems";

// const UserOrders = () => {
//   const { orderItems } = useSelector((state) => state.order);

//   return (
//     <View className="p-4">
//       {orderItems && orderItems.length > 0 ? (
//         <View>
//           {orderItems
//             .slice(0)
//             .reverse()
//             .map((item) => (
//               <OrderItems key={item._id} orders={item} />
//             ))}
//         </View>
//       ) : (
//         <Text>No Orders</Text>
//       )}
//     </View>
//   );
// };

// export default UserOrders;

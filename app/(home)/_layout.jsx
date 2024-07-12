import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store, persistor } from "../../redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

const HomeLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="hotel" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="confirmOrder" />
          <Stack.Screen name="address" />
          <Stack.Screen name="orderDetails" />
        </Stack>
      </PersistGate>
    </Provider>
  );
};

export default HomeLayout;

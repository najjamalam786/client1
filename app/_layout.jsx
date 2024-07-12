import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;

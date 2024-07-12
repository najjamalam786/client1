import React from "react";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

const Main = () => {
  const { token } = useSelector((state) => state.user);
  return (
    <>
      {token ? (
        <Redirect href="/(home)" />
      ) : (
        <Redirect href="/(authenticate)" />
      )}
    </>
  );
};

export default Main;

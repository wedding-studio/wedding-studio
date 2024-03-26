import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const getLogin = async () => {
    try {
      const isLogin = await AsyncStorage.getItem("isLogin");

      if (isLogin === "true") {
        router.push("/(tabs)/home");
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLogin();
  });
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.image}
      />
      <Text style={styles.textLogo}>Wedding Studio</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  textLogo: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
});

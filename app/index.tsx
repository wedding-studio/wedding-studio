import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

const index = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(auth)/signin");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
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

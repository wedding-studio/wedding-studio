import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";

const home = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 10,
          gap: 10,
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.image}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Text style={styles.textLogo}>Wedding</Text>
          <Text style={styles.textLogo}>Studio</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
  },
  textLogo: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
});

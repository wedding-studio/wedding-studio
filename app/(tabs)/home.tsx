import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";

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
      <PieChart
        data={[
          {
            name: "Seoul",
            population: 21500000,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Toronto",
            population: 2800000,
            color: "rgba(0, 0, 0, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Beijing",
            population: 527612,
            color: "rgba(123, 31, 162, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "New York",
            population: 8538000,
            color: "rgba(0, 0, 0, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Moscow",
            population: 11920000,
            color: "rgba(0, 0, 0, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
        ]}
        width={200}
        height={200}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
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

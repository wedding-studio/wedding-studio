import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useRef, useMemo } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { BarChart, PieChart } from "react-native-chart-kit";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const home = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handelOpenPress = () => {
    bottomSheetRef.current?.expand();
  };
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const renderBackdrop = useCallback(
    (prop: any) => (
      <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...prop} />
    ),
    []
  );

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <ScrollView>
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
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
              borderRadius: 20,
              margin: 5,
              gap: 3,
              paddingVertical: 10,
              backgroundColor: "#fff",
            }}
            onPress={handelOpenPress}
          >
            <Text>Hôm nay, 27/03/2024</Text>
            <AntDesign name="caretdown" size={18} color="gray" />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              gap: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              margin: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Công việc
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                gap: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#3ed94e",
                  borderRadius: 30,
                }}
              >
                <Image
                  source={require("../../assets/images/done.png")}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#fff",
                    flex: 1,
                  }}
                >
                  Đã xong 10
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#f8e32f",
                  borderRadius: 30,
                }}
              >
                <Image
                  source={require("../../assets/images/progress.png")}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#fff",
                    flex: 1,
                  }}
                >
                  Đang làm 10
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#f40c1d",
                  borderRadius: 30,
                }}
              >
                <Image
                  source={require("../../assets/images/notdone.png")}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#fff",
                    flex: 1,
                  }}
                >
                  Chưa làm 10
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              gap: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              margin: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Doanh thu
            </Text>
            <BarChart
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                ],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 20}
              height={220}
              yAxisLabel="$"
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              gap: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              margin: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
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
                  color: "rgba(123, 234, 164, 1)",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "New York",
                  population: 8538000,
                  color: "rgba(234, 123, 164, 1)",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Moscow",
                  population: 11920000,
                  color: "rgba(123, 234, 164, 1)",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
              ]}
              width={Dimensions.get("window").width - 20}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </ScrollView>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          enableHandlePanningGesture={true}
          handleIndicatorStyle={{
            backgroundColor: "#000",
          }}
          backdropComponent={renderBackdrop}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "left",
              padding: 10,
            }}
          >
            Thời gian
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingBottom: 10,
              marginHorizontal: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Hôm nay
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingBottom: 10,
              marginHorizontal: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              7 ngày qua
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingBottom: 10,
              marginHorizontal: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Tháng này
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingBottom: 10,
              marginHorizontal: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Tháng trước
            </Text>
          </TouchableOpacity>
        </BottomSheet>
      </GestureHandlerRootView>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

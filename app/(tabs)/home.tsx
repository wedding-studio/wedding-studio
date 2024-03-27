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
import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { BarChart, PieChart } from "react-native-chart-kit";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const home = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [status, setstatus] = useState([]);
  const [employee, setemployee] = useState({});
  const [revenue, setRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [labelsBarChart, setlabelsBarChart] = useState([]);
  const [dataBarChart, setdataBarChart] = useState([]);
  const [serviceUsage, setserviceUsage] = useState([]);
  const [pieData, setPieData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const getEmployee = async () => {
    try {
      const employee = await AsyncStorage.getItem("employee");
      if (employee !== null) {
        setemployee(JSON.parse(employee));
        getStatus(JSON.parse(employee).id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/statistics/task/all/${id}`
      );

      setstatus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRevenue = async (time: string, labelType: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/statistics/revenue/${time}`
      );
      if (response.data) {
        setRevenue(response.data.revenue);
        setTotalRevenue(response.data.totalRevenue);
        if (labelType === "month") {
          setlabelsBarChart(
            response.data.revenue.map((item) => `Tháng ${item.month}`)
          );
        } else if (labelType === "hour") {
          setlabelsBarChart(
            response.data.revenue.map((item) => `${item.hour}`)
          );
        }
        setdataBarChart(response.data.revenue.map((item) => item.total));
      } else {
        setRevenue([]);
        setTotalRevenue(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const colors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  const getServicesUsage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/statistics/service/usage`
      );

      const pieChartData = response.data
        .map((item, index) => {
          const population = Number(item.totalQuantity);
          if (isNaN(population)) {
            console.error(
              `Invalid population for item ${index}: ${item.totalQuantity}`
            );
            return null;
          }

          return {
            name: item._id,
            population: population,
            color: colors[index % colors.length],
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        })
        .filter((item) => item !== null);

      setPieData(pieChartData);
      setIsLoading(false);
      console.log("serviceUsage", response.data);
      console.log("pieChart", pieChartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployee();
    getRevenue("day", "hour");
    getServicesUsage();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);
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

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.image}
            />
            <View style={styles.textLogoContainer}>
              <Text style={styles.textLogo}>Wedding</Text>
              <Text style={styles.textLogo}>Studio</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={handelOpenPress}
          >
            <Text>Hôm nay, 27/03/2024</Text>
            <AntDesign name="caretdown" size={18} color="gray" />
          </TouchableOpacity>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Công việc</Text>
            <View style={styles.statusContainer}>
              {status.map((item, index) => {
                let backgroundColor;
                let statusText;
                let image;

                switch (item.status) {
                  case 1:
                    backgroundColor = "#3ed94e";
                    statusText = "Đã xong";
                    image = require("../../assets/images/done.png");
                    break;
                  case 2:
                    backgroundColor = "#f8e32f";
                    statusText = "Đang làm";
                    image = require("../../assets/images/progress.png");
                    break;
                  case 3:
                    backgroundColor = "#f40c1d";
                    statusText = "Chưa làm";
                    image = require("../../assets/images/notdone.png");
                    break;
                  default:
                    backgroundColor = "#fff";
                    statusText = "Không xác định";
                }

                return (
                  <View
                    key={index}
                    style={[styles.statusItem, { backgroundColor }]}
                  >
                    <Image source={image} style={{ width: 30, height: 30 }} />
                    <Text style={styles.statusText}>
                      {statusText} {item.count}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Doanh thu</Text>
            <Text
              style={{
                fontSize: 16,
                color: "#000",
              }}
            >
              Tổng: {totalRevenue} tr
            </Text>
            <BarChart
              data={{
                labels: labelsBarChart,
                datasets: [
                  {
                    data: dataBarChart,
                  },
                ],
              }}
              width={Dimensions.get("window").width - 20}
              height={220}
              yAxisLabel="tr"
              showValuesOnTopOfBars={true}
              fromZero={true}
              showBarTops={true}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>
              Dịch vụ được sử dụng nhiều nhất
            </Text>
            <PieChart
              data={pieData}
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
              paddingLeft="5"
              absolute
              center={[10, 10]}
              hasLegend={true}
              avoidFalseZero={true}
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
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  textLogoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  textLogo: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
  dateContainer: {
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
  },
  cardContainer: {
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  statusItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
});

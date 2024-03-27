import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";

const profile = () => {
  const [user, setUser] = useState("");

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("employee");
      setUser(JSON.parse(user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <AntDesign name="user" size={24} color="black" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text>{user.email}</Text>
          {user.role === true ? (
            <Text>Quản trị viên</Text>
          ) : (
            <Text>Nhân viên</Text>
          )}
        </View>
        <AntDesign name="right" size={24} color="black" />
      </View>

      <View style={styles.menuItem}>
        <AntDesign name="user" size={24} color="black" />
        <Text style={styles.menuText}>Khách hàng</Text>
        <AntDesign name="right" size={24} color="black" />
      </View>

      <View style={styles.menuItem}>
        <Feather name="users" size={24} color="black" />
        <Text style={styles.menuText}>Nhân viên</Text>
        <AntDesign name="right" size={24} color="black" />
      </View>

      <View style={styles.menuItem}>
        <AntDesign name="setting" size={24} color="black" />
        <Text style={styles.menuText}>Cài đặt</Text>
        <AntDesign name="right" size={24} color="black" />
      </View>

      <View style={styles.menuItem}>
        <AntDesign name="infocirlce" size={24} color="black" />
        <Text style={styles.menuText}>Giới thiệu</Text>
        <AntDesign name="right" size={24} color="black" />
      </View>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={async () => {
          await AsyncStorage.multiRemove(["token", "isLogin", "employee"]);
          router.dismissAll();
          router.replace("/(auth)/signin");
        }}
      >
        <AntDesign name="logout" size={24} color="black" />
        <Text style={styles.menuText}>Đăng xuất</Text>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    margin: 10,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    margin: 10,
    flex: 1,
    flexDirection: "column",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menuItem: {
    margin: 10,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  menuText: {
    margin: 10,
    flex: 1,
  },
});

export default profile;

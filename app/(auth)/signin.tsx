import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import TextInputComponent from "@/components/TextInputComponent";
import BottomComponent from "@/components/BottomComponent";
import * as EmailValidator from "email-validator";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
const width = Dimensions.get("window").width;
const signin = () => {
  const [Email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [status, setStatus] = useState(0);

  const validateEmail = () => {
    if (!Email) {
      setEmailError("Email is required");
      return false;
    } else if (!EmailValidator.validate(Email)) {
      setEmailError("Email is invalid");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const checkLogin = async () => {
    console.log("call" + `${process.env.REACT_APP_API_URL}/employee/login`);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/employee/login`,
        {
          email: Email,
          password: password,
        }
      );
      setStatus(response.status);

      if (response.data) {
        setIsShowModal(true);
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem(
          "employee",
          JSON.stringify(response.data.employee)
        );
        await AsyncStorage.setItem("isLogin", "true");
        router.push("/(tabs)/");
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status) {
        const status = error.response.status;

        if (status === 401) {
          setPasswordError("Password is incorrect");
        } else if (status === 404) {
          setEmailError("Email is not found");
        } else if (status === 500) {
          setEmailError("Server error");
        }
      }
    }
  };
  const handleSignIn = () => {
    if (validateEmail() && validatePassword()) {
      checkLogin();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.image}
      />
      <Text style={styles.textLogo}>Wedding Studio</Text>
      <TextInputComponent
        placeholder="Email"
        value={Email}
        icon="mail"
        isSecure={false}
        error={emailError}
        onChangeText={(text) => setEmail(text)}
        type="email"
      />
      <TextInputComponent
        placeholder="Password"
        value={password}
        icon="lock"
        isSecure={true}
        error={passwordError}
        onChangeText={(text) => setPassword(text)}
        type="password"
      />
      <BottomComponent
        title="Sign In"
        onPress={handleSignIn}
        isError={emailError || passwordError}
        width="45%"
      />
      <View>
        <Text style={{ marginTop: 20 }}>
          Don't have an account?{" "}
          <Text style={{ color: "#2051E5" }}>Sign Up</Text>
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          justifyContent: "center",
          gap: 10,
          bottom: 0,
          position: "absolute",
          marginBottom: 20,
        }}
      >
        <FontAwesome name="phone" size={24} color="black" />
        <Text style={{}}>Contact us</Text>
      </View>
      <Modal visible={isShowModal} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: width / 2 + 50,
              height: width / 2 + 50,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#2746df",
                height: 100,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <AntDesign name="checkcircle" size={50} color="#1bb511" />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >
                Success
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  marginTop: 5,
                  marginHorizontal: 10,
                }}
              >
                Sign in successfully
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => setIsShowModal(false)}
                  style={{
                    backgroundColor: "#2746df",
                    borderRadius: 10,
                    padding: 10,
                    width: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                    height: 40,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default signin;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    marginTop: 80,
  },
  textLogo: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
    marginBottom: 20,
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export interface BottomComponentProps {
  title: string;
  icon?: string;
  isError?: string;
  onPress: () => void;
  width?: string;
}

const BottomComponent = (props: BottomComponentProps) => {
  const { title, icon, isError, onPress, width } = props;
  return (
    <TouchableOpacity
      style={{
        width: width ? width : "80%",
        backgroundColor: { isError } ? "#2051E5" : "#BFCDF9",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        height: 45,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BottomComponent;

const styles = StyleSheet.create({});

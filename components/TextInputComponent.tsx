import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export interface TextInputComponentProps {
  placeholder: string;
  value: string;
  icon: string;
  isSecure: boolean;
  error?: string;
  isError?: boolean;
  type?: string;
  onChangeText: (text: string) => void;
}

const TextInputComponent = (prop: TextInputComponentProps) => {
  const {
    placeholder,
    value,
    icon,
    isSecure,
    error,
    isError,
    type,
    onChangeText,
  } = prop;

  const [secureEntry, setSecureEntry] = useState(isSecure);

  const toggleSecureEntry = () => {
    setSecureEntry(!secureEntry);
  };

  return (
    <View
      style={{
        width: "80%",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: error ? "red" : "black",
          borderWidth: 1,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderRadius: 10,
        }}
      >
        <AntDesign name={icon} size={24} color={error ? "red" : "black"} />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureEntry}
          keyboardType={type === "email" ? "email-address" : "default"}
          placeholderTextColor={error ? "red" : "black"}
          style={{
            marginLeft: 10,
            width: "80%",
            height: 40,
            flex: 1,
          }}
        />
        {type === "password" ? (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <AntDesign
              name={secureEntry ? "eye" : "eyeo"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
      ) : null}
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({});

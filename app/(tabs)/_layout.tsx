import React from "react";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
        lazy: true,
        // tabBarStyle: {
        //   height: 80,
        // },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Phân tích",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="area-chart" color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: "Dịch vụ",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: "Nhiệm vụ",
          tabBarIcon: ({ color }) => (
            <Octicons name="tasklist" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="invoice"
        options={{
          title: "Hóa đơn",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="file-text" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color }) => (
            <Octicons name="person" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

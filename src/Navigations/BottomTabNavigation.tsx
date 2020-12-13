import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { TaskListScreen, TweetListScreen } from "../Screens/Screens";

import { Provider as PaperProvider } from "react-native-paper";
import { TaskNavigation, TweetNavigation } from "./Navigations";
import { LogBox } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

//const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

export function BottomTabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "list-circle";

            if (route.name === "Task") {
              iconName = focused ? "clipboard-outline" : "clipboard-outline";
            } else if (route.name === "Tweet") {
              iconName = focused ? "chatbox-outline" : "chatbox-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#0f5c55",
          inactiveTintColor: "#c4d4e3",
        }}
      >
        <Tab.Screen name="Task" component={TaskNavigation} />
        <Tab.Screen name="Tweet" component={TweetNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

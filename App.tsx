import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SignUpScreen, BottomTabNavigation } from "./src/Screens/Screens";

export function TaskEditScreen() {
  if (true){
    return <BottomTabNavigation />; 
  } else {
    return <SignUpScreen />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

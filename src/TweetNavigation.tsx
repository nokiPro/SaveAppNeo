import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  TweetListScreen,
  TweetAddScreen,
  TaskNavigation
} from "./Screens";

const Stack = createStackNavigator();

export function TweetNavigation() {
  return (
    <Stack.Navigator initialRouteName="TweetList">
      <Stack.Screen name="TweetList" component={TweetListScreen} />
      <Stack.Screen name="TweetAdd" component={TweetAddScreen} />
      <Stack.Screen name="Tweet" component={TaskNavigation} />
    </Stack.Navigator>
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

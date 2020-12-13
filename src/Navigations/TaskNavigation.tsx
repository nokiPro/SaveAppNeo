import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  TaskListScreen,
  TaskAddScreen,
  TaskEditScreen,
  TaskDetailScreen,
  //TweetNavigation,
} from "../Screens/Screens";

const Stack = createStackNavigator();

export function TaskNavigation() {
  return (
    <Stack.Navigator initialRouteName="TaskList">
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="TaskAdd" component={TaskAddScreen} />
      <Stack.Screen name="TaskEdit" component={TaskEditScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      {/* <Stack.Screen name="Tweet" component={TweetNavigation} /> */}
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

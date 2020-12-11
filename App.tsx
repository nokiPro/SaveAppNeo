import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { TaskListScreen, TweetListScreen } from "./src/Screens";

import { Provider as PaperProvider } from "react-native-paper";
import { TaskNavigation } from './src/TaskNavigation';
import { TweetNavigation } from './src/TweetNavigation';


const Tab = createMaterialBottomTabNavigator();
//const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: "#eee", height: "10%" }}
        activeColor="red"
        inactiveColor="#3e2465"
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

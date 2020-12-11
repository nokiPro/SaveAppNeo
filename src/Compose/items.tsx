import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { FAB } from "react-native-paper";

export function Item() {
  
  return (
    <View
      style={{
        height: 220,
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "flex-start",
      }}
    >
      <FAB style={{ top: 20, left: 20 }} icon="check" onPress={() => {}} />
      <View
        style={{
          borderLeftWidth: 3,
          height: 120,
          top: 40,
          left: 45,
        }}
      ></View>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 15,
          width: "70%",
          left: "25%",
          position: "absolute",
          top: 20,
          height: 150,
          paddingBottom: 5,
          paddingLeft: 5,
        }}
        multiline={true}
        onChangeText={() => {}}
      />
      <TouchableOpacity style={{ top: 10, left: "50%" }}>
        <Text style={{fontSize: 30}}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

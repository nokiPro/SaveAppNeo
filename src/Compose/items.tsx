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
  TouchableOpacity,
  DatePickerIOS,
} from "react-native";

import { FAB } from "react-native-paper";
import { color } from "react-native-reanimated";

export interface ItemProps {
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  onPressAddButton?: () => void;
  selectMenu?: () => void;
}


export function Item(props: ItemProps) {
const [buttonColor, setButtonColor] = useState("#c4d4e3");
const [chosenDate, setChosenDate] = useState(new Date());

  const checkIcon = () => {
    if (buttonColor === "#c4d4e3") {
      setButtonColor("#2aefd1");
    } else {
      setButtonColor("#c4d4e3");
    }
  }

  return (
    <View
      style={{
        height: 220,
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "flex-start",
      }}
    >
      <FAB
        style={{ top: 20, left: 20, backgroundColor: buttonColor }}
        icon=""
        onPress={() => {
          checkIcon();
        }}
        onLongPress={props.selectMenu}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#c4d4e3",
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
        onChangeText={props.onChangeText}
        defaultValue={props.defaultValue}
      />
      <TouchableOpacity
        style={{ top: 130, left: "50%" }}
        onPress={props.onPressAddButton}
      >
        <Text style={{ fontSize: 30, color: "#c4d4e3" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

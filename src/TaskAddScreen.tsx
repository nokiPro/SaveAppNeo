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
  FlatList,
  Platform,
  ListRenderItemInfo,
  DatePickerIOS,
} from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FAB } from "react-native-paper";
import { Item } from "../src/Compose/items";
import { save } from "./TaskStore";
import { add } from "react-native-reanimated";
import { render } from "react-dom";
const screenWidth = Dimensions.get("screen").width;
//================================================================================================================================
export function TaskAddScreen() {
  const [deadlineDate, setDeadlineDate] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const [taskItems, setTaskItems] = React.useState<string[]>(["", ""]);
  const [chosenDate, setChosenDate] = useState(new Date());
  const navigation = useNavigation();

  const onSave = () => {
    console.log(deadlineDate);
    console.log(taskItems);
    console.log(taskName);
    save(deadlineDate, taskName, taskItems, Date.now());
    navigation.goBack();
  };
  const [date, setDate] = useState<number>(Date.now());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  // const iosDatePicker = () => {
  //   return (
  //     <DatePickerIOS
  //       style={{width: "100%"}}
  //       date={chosenDate}
  //       onDateChange={setChosenDate}
  //     />
  //   );
  // }
  // const androidDatePicker = () => {
  //   return(
  //   );
  // }
  const renderTaskItem = ({ item, index }: ListRenderItemInfo<string>) => {
    return (
      <Item
        defaultValue={item}
        onPressAddButton={() => {
          const newTaskItems = taskItems.slice();
          newTaskItems.splice(index + 1, 0, "");
          setTaskItems(newTaskItems);
          console.log(taskItems);
        }}
        onChangeText={(text) => {
          taskItems[index] = text;
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1, width: screenWidth * 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputLimit}
              placeholder="タスク名"
              autoCapitalize="none"
              onChangeText={(taskName) => {
                setTaskName(taskName);
              }}
            />
            <TextInput
              style={styles.inputLimit}
              placeholder="締切日"
              autoCapitalize="none"
              onChangeText={(deadlineDate) => {
                setTaskName(deadlineDate);
              }}
            />
            <View>
              {/* <DateTimePicker
                style={{ width: 130, marginTop: 20 }}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              /> */}
            </View>
          </View>
          <FlatList
            style={{ flex: 1 }}
            data={taskItems}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          onSave();
        }}
      >
        <Text style={styles.saveButtonText}>✓</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
//=============================================================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    left: "10%",
    height: 150,
  },
  inputLimit: {
    borderBottomWidth: 2,
    borderBottomColor: "#eee",
    fontSize: 30,
    backgroundColor: "#fff",
  },
  inputTitle: {
    paddingTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#eee",
    fontSize: 30,
    backgroundColor: "#fff",
  },
  itemContainer: {
    height: 200,
    backgroundColor: "red",
    flex: 1,
    alignItems: "flex-start",
    top: 80,
  },
  saveButton: {
    backgroundColor: "#2AEFD1",
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  saveButtonText: {
    fontSize: 30,
    color: "#fff"
  }
});




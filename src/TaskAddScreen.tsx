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
  Alert,
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

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === "ios");
  //   setDate(currentDate);
  // };
  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };
  // const showDatepicker = () => {
  //   showMode("date");
  // };
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

  // const updateTaskItemAsync = async () => {
  //   const newTaskInfoList = await loadAll();
  //   setTasks(newTaskInfoList.reverse());
  // };

  //長押し削除処理
  const removeTaskItemAsync = async (index: number) => {
    const newTaskItems = taskItems.slice();
    newTaskItems.splice(index, 1);
    setTaskItems(newTaskItems);
  };

  const selectMenu = (index: number) => {
    Alert.alert(taskItems[index], "このアイテムの削除ができます。", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "削除",
        onPress: () => {
          removeTaskItemAsync(index);
        },
      },
    ]);
  };

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
        selectMenu={() => {
          selectMenu(index);
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1, width: screenWidth * 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputLimit}
              placeholder="締切日"
              autoCapitalize="none"
              onChangeText={(deadlineDate) => {
                setDeadlineDate(deadlineDate);
              }}
            />
              <TextInput
                style={styles.inputLimit}
                placeholder="タスク名"
                autoCapitalize="none"
                onChangeText={(taskName) => {
                  setTaskName(taskName);
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
            keyExtractor={(item, index) =>
              Math.random().toString() + index.toString()
            }
          />
        </KeyboardAvoidingView>
      
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
    //justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    width: screenWidth * 1,
    height: 100,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 5,
    zIndex: 10,
    padding: 10,
  },

  inputLimit: {
    fontSize: 25,
    backgroundColor: "#fff",
    margin: 5,
  },

  inputTitle: {
    paddingTop: 10,
    fontSize: 30,
    backgroundColor: "#fff",
  },

  itemContainer: {
    height: 20,
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
    color: "#fff",
  },
});

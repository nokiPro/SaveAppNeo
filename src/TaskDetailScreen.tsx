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
  Alert,
} from "react-native";

import { FAB } from "react-native-paper";
import { Item } from "../src/Compose/items";
import { useNavigation, RouteProp } from "@react-navigation/native";

import { save } from "./TaskStore";


type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, "TaskDetail">;

type Props = {
  route: TaskDetailScreenRouteProp;
};

const screenWidth = Dimensions.get("screen").width;


export function TaskDetailScreen(props: Props) {
  //const selectedItem = props.route.params.Task;
  const selectedItem = props.route.params.Task;
  const selectedTaskItem = props.route.params.Task.taskItems;
  const navigation = useNavigation();

  const [deadlineDate, setDeadlineDate] = React.useState(selectedItem.deadlineDate);
  const [taskName, setTaskName] = React.useState(selectedItem.taskName);
  const [taskItems, setTaskItems] = React.useState<string[]>(selectedTaskItem);

  const onSave = () => {
    save(deadlineDate, taskName, taskItems, selectedItem.createdAt)
    //console.log();
    navigation.goBack();
  };

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
      <ScrollView style={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1, width: screenWidth * 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputLimit}
              placeholder="締め切り"
              autoCapitalize="none"
              defaultValue={selectedItem.deadlineDate}
              onChangeText={(deadlineDate) => {
                setDeadlineDate(deadlineDate);
              }}
            />
            <TextInput
              style={styles.inputTitle}
              placeholder="タスク名"
              autoCapitalize="none"
              defaultValue={selectedItem.taskName}
              onChangeText={(taskName) => {
                setTaskName(taskName);
              }}
            />
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

  ButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    top: 360,
    left: "70%",
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

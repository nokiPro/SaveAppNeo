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
} from "react-native";

import { FAB } from "react-native-paper";
import { Item } from "../src/Compose/items";
import { useNavigation, RouteProp } from "@react-navigation/native";

import { save } from "./Store";


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

  const [deadlineDate, setDeadlineDate] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const [taskItems, setTaskItems] = React.useState<string[]>([]);

  const onSave = () => {
    save(deadlineDate, taskName, taskItems, selectedItem.createdAt)
    console.log();
    navigation.goBack();
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
            data={selectedItem.taskItems}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <FAB
            style={{ top: 60, left: "45%", width: 56, marginBottom: 50 }}
            icon="check"
            onPress={() => {onSave()}}
          />
        </KeyboardAvoidingView>
      </ScrollView>
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
});

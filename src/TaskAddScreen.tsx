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

import { useNavigation, RouteProp } from "@react-navigation/native";

import { FAB } from "react-native-paper";
import { Item } from "../src/Compose/items";

import { save } from "./Store";
import { add } from "react-native-reanimated";

// type TaskAddEditScreenRouteProp = RouteProp<RootStackParamList, "TaskAdd">;

// type Props = {
//   route: TaskAddEditScreenRouteProp;
// };

const screenWidth = Dimensions.get("screen").width;

export function TaskAddScreen() {
  const [deadlineDate, setDeadlineDate] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const [taskItems, setTaskItems] = React.useState<string[]>([""]);

  // const selectedItem = props.route.params.Task;

  const navigation = useNavigation();

  const onSave = () => {
    save(deadlineDate, taskName, taskItems, Date.now());
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
      <ScrollView>
        <KeyboardAvoidingView
          style={{ flex: 1, width: screenWidth * 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputLimit}
              placeholder="締め切り"
              autoCapitalize="none"
              onChangeText={(deadlineDate) => {
                setDeadlineDate(deadlineDate);
              }}
            />
            <TextInput
              style={styles.inputTitle}
              placeholder="タスク名"
              autoCapitalize="none"
              onChangeText={(taskName) => {
                setTaskName(taskName);
              }}
            />
          </View>

          {/* ====================================================================== */}
          <FlatList
            style={{ flex: 1 }}
            data={taskItems}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <FAB style={{ top: 130, left: "6%" }} icon="check" onPress={onSave} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
//==============================================================================
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

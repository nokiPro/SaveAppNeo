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

import { useNavigation } from "@react-navigation/native";

import { FAB } from "react-native-paper";
import { Item } from "../src/Compose/items";

import { save } from "./Store";

const screenWidth = Dimensions.get("screen").width;

export function TaskAddScreen() {
  const [deadlineDate, setDeadlineDate] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const [taskItems, setTaskItems] = React.useState<string[]>([]);
  const itemFrame = [""];

  const navigation = useNavigation();

  const onSave = () => {
    save(deadlineDate, taskName, taskItems, Date.now());
    console.log(itemFrame);
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
        }}
      />
    );
  };

  //   const DATA = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     title: 'First Item',
  //   },
  //   {
  //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //     title: 'Second Item',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //     title: 'Third Item',
  //   },
  // ];

  // const Item = ({ title }) => (
  //   <View style={styles.item}>
  //     <Text style={styles.title}>{title}</Text>
  //   </View>
  // );

  //   const renderItem = ({ item }) => (
  //     <Item title={item.title} />
  //   );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          style={{ width: screenWidth * 1 }}
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
          <View
            style={{
              height: 300,
              backgroundColor: "#fff",
              flex: 1,
              alignItems: "flex-start",
              top: 80,
            }}
          >
            <FAB
              style={{ top: 20, left: 20 }}
              icon="check"
              onPress={() => {}}
            />
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
              onChangeText={(value) => {
                const newTaskItems = taskItems.slice();
                newTaskItems[0] = value;
                setTaskItems(newTaskItems);
              }}
            />
            <TouchableOpacity
              style={{ top: 10, left: "50%" }}
              onPress={() => {
                const newTaskItems = taskItems.slice();
                newTaskItems.splice(0, 0, "new task item");
                setTaskItems(newTaskItems);
              }}
            >
              <Text style={{ fontSize: 30 }}>+</Text>
            </TouchableOpacity>
          </View>
          {/* ====================================================================== */}
          <FlatList
            data={taskItems}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* ====================================================================== */}
          <View
            style={{
              height: 280,
              backgroundColor: "#fff",
              flex: 1,
              alignItems: "flex-start",
            }}
          >
            <FAB
              style={{ top: 20, left: 20 }}
              icon="check"
              onPress={() => {}}
            />
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
              onChangeText={(value) => {
                taskItems[1] = value;
                setTaskItems(taskItems);
              }}
            />
            <FAB
              style={{ top: 130, left: "6%" }}
              icon="check"
              onPress={onSave}
            />
          </View>
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
    top: 40,
    left: "10%",
  },

  inputLimit: {
    flex: 1,
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

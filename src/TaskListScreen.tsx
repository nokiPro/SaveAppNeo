import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Alert,
} from "react-native";
import moment from "moment";

import { Provider as PaperProvider } from "react-native-paper";
import { FAB, List } from "react-native-paper";

import { useNavigation,} from "@react-navigation/native";
import { removeTaskInfoAsync, loadAll } from "./TaskStore";
import { render } from "react-dom";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("screen").width;


//=============================================================================================================
export function TaskListScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([]);

  const taskItemsList = tasks.map((task) =>
  <Text>{task.taskName}</Text>
  );
  const taskItemsListDate = tasks.map((task) => 
    <Text>{task.deadlineDate}</Text>
  );
  
    const toTaskAddScreen = () => {
      console.log(tasks);
      navigation.navigate("TaskAdd");
    };
  
  useFocusEffect(
    React.useCallback(() => {
      updateTaskInfoListAsync();
      //console.log(tasks);
    }, [])
  );

  const toTaskDetailScreen = (index: number) => {
    const Task: Task = tasks[index];
    navigation.navigate("TaskDetail", { Task: Task });
  };

  const updateTaskInfoListAsync = async () => {
    const newTaskInfoList = await loadAll();
    setTasks(newTaskInfoList.reverse());
  };

  //長押し削除処理
  const removeTaskAndUpdateAsync = async (taskItem: Task) => {
    await removeTaskInfoAsync(taskItem);
    updateTaskInfoListAsync();
  };

  const selectMenu = (taskItem: Task) => {
    Alert.alert(taskItem.taskName, "このタスクの削除ができます。", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "削除",
        onPress: () => {
          removeTaskAndUpdateAsync(taskItem);
        },
      },
    ]);
  };


  //========================================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.listContainer}>
          {tasks.map((item, index) => {
            return (
              <TouchableOpacity 
                style={styles.listContainerItem}
                onPress={() => {toTaskDetailScreen(index)}}
                onLongPress={() => {selectMenu(item)}}
              >
                <Text style={styles.itemDate}>{item.deadlineDate}</Text>
                <Text style={styles.itemName}>{item.taskName}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <FAB
        style={styles.addButton}
        icon="tools"
        onPress={() => {
          toTaskAddScreen();
        }}
      />
    </SafeAreaView>
  );
}
//===========================================================================================================
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  addButton: {
    position: "absolute",
    bottom: 30,
    right: 50,
    backgroundColor: "#2aefd1",
  },

  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: screenWidth * 0.9,
    right: "5%",
  },

  listContainerItem: {
    backgroundColor: "#2aefd1",
    borderRadius: 5,
    width: 150,
    height: 80,
    padding: 5,
    marginTop: 50,
    marginLeft: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  itemDate: {
    fontSize: 20,
  },

  itemName: {
    paddingTop: 10,
    fontSize: 15,
  },
});

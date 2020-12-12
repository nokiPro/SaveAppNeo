import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Task,
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
      console.log(taskItemsList);
      navigation.navigate("TaskAdd");
    };
  
  useFocusEffect(
    React.useCallback(() => {
      updateTaskInfoListAsync();
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

  const renderTask = ({ item, index }: ListRenderItemInfo<any>) => {
    return (
      <View style={styles.flatListContainer}>
        <TouchableOpacity
          style={styles.flatListItem}
          onPress={() => {
            toTaskDetailScreen(index);
          }}
          onLongPress={() => {
            selectMenu(item);
          }}
          >
          <Text style={styles.flatListItemDate}>{item.deadlineDate}</Text>
          <Text>{item.taskName}</Text>
        </TouchableOpacity>
      </View>
    );
  };


  //========================================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.listContainer}>
          <Text>{taskItemsList}</Text>
          <Text>{taskItemsListDate}</Text>
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
    backgroundColor: "#2aefd1",
  },
});

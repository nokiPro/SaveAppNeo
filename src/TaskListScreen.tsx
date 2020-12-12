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

const screenWidth = Dimensions.get("screen").width;


//=============================================================================================================
export function TaskListScreen() {
  const navigation = useNavigation();

  const toTaskAddScreen = () => {
    navigation.navigate("TaskAdd");
  };
  const [tasks, setTasks] = useState<Task[]>([]);

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
      <ScrollView style={styles.flatListContainerNeo}>
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <FAB
        style={styles.addButton}
        icon="pencil"
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

  flatListContainerNeo: {},

  flatListContainer: {
    width: screenWidth * 1,
    alignItems: "center",
  },

  flatListItem: {
    backgroundColor: "#2aefd1",
    borderRadius: 5,
    height: 80,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    width: 200,
  },

  flatListItemDate: {
    fontSize: 25,
  },
});

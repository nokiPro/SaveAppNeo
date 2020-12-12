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
} from "react-native";
import moment from "moment";

import { Provider as PaperProvider } from "react-native-paper";
import { FAB, List } from "react-native-paper";

import { useNavigation,} from "@react-navigation/native";
import { loadAll } from "./Store";
import { render } from "react-dom";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("screen").width;

export function TaskListScreen() {
  const navigation = useNavigation();

  const toTaskAddScreen = () => {
    navigation.navigate("TaskAdd");
  };
  const [tasks, setTasks] = useState<Task[]>([]);

  const toTaskDetailScreen = (index:number) => {
    console.log(index);
    console.log(tasks[index]);
    const Task: Task = tasks[index];
    navigation.navigate("TaskDetail", { Task: Task} );
  }

  const selectMenu = () => {
    alert(`削除したいよね、、、\nでも、まだできないんよ、、`)
  }



  useEffect(() => {
    // 追加
    // asyncで非同期で読み込みとstate更新を定義
    const initialize = async () => {
      // 追加
      // awaitで読み込みが終わるまで待機
      const newTasks = await loadAll(); // 追加
      setTasks(newTasks.reverse()); // 追加
    }; // 追加
    // 画面が戻ってきた時に動作するようにnavigationの動作に追加
    navigation.addListener("focus", initialize); // 追加
  }); // 追加


//===============================================================================
  const renderTask = ({ item, index }: ListRenderItemInfo<any>) => {
    return (
      <View style={styles.flatListContainer}>
        <TouchableOpacity style={styles.flatListItem} onPress={() => {toTaskDetailScreen(index)}} onLongPress={() => {selectMenu()}}>
          <Text style={styles.flatListItemDate}>{item.deadlineDate}</Text>
          <Text>{item.taskName}</Text>
        </TouchableOpacity>
      </View>
    );
  };
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
//=====================================================================================
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
  },

  flatListContainerNeo: {
    
  },

  flatListContainer: {
    width: screenWidth * 1,
    alignItems: "center",
  },

  flatListItem: {
    backgroundColor: "#FFE3D1",
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

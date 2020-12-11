import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View , TouchableOpacity} from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, "TaskDetail">;

type Props = {
  route: TaskDetailScreenRouteProp;
};

export function TaskDetailScreen(props: Props) {
  const selectedItem = props.route.params.Task;

  const kkkk = () => {
    console.log(selectedItem);
  }

  return (
    <View style={styles.container}>
      <Text>{selectedItem.taskName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

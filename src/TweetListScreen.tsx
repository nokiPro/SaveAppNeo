import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { FAB, List } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

export function TweetListScreen() {
  const navigation = useNavigation();
  const toTweetAddScreen = () => {
    navigation.navigate("TweetAdd");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flexGrow: 1}}> 
        <View style={{alignItems: "center"}}>
          <Text>TweetListScreen</Text>
          <FAB style={{width: 56}} icon="pencil" onPress={() => {toTweetAddScreen()}} />
          <StatusBar style="auto" />
          <StatusBar style="auto" />
        </View>
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
});

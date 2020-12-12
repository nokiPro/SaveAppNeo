import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from "react-native";
import { FAB, List } from "react-native-paper";
import React, { useEffect, useState } from "react";

export function TweetAddScreen() {

  const [tweetItem, setTweetItem] = useState("")
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputTweet}
        multiline={true}
        onChangeText={(tweetItem) => {}}
      />
      <KeyboardAvoidingView>
        <FAB style={{width: 56}} icon="pencil" onPress={() => {}} />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
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

  inputTweet: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 15,
    width: "80%",
    position: "absolute",
    top: 20,
    height: 250,
    paddingBottom: 5,
    paddingLeft: 5,
  },
});

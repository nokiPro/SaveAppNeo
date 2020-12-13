import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { FAB, List } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { loadAll, removeTweetInfoAsync } from "./TweetStore";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

const screenWidth = Dimensions.get("screen").width;

export function TweetListScreen() {
  const navigation = useNavigation();

  const [tweetItems, setTweetItems] = useState<Tweet[]>([])

  useFocusEffect(
    React.useCallback(() => {
      updateTweetInfoListAsync();
    }, [])
  );


  const toTweetAddScreen = () => {
    //console.log(tweetItems);
    navigation.navigate("TweetAdd");
  };

  const updateTweetInfoListAsync = async () => {
    const newTweetInfoList = await loadAll();
    setTweetItems(newTweetInfoList.reverse());
  };

  const removeTweetAndUpdateAsync = async (tweetItem: Tweet) => {
    await removeTweetInfoAsync(tweetItem);
    updateTweetInfoListAsync();
  };

  const selectMenu = (tweetItem: Tweet) => {
    Alert.alert(tweetItem.tweetItem, "このツイートの削除ができます。", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "削除",
        onPress: () => {
          removeTweetAndUpdateAsync(tweetItem);
        },
      },
    ]);
  };


  const renderTweet = ({ item, index }: ListRenderItemInfo<any>) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          selectMenu(item);
        }}
      >
        <List.Item
          style={styles.tweetItem}
          title={item.tweetItem}
          titleNumberOfLines={5}
          description={`作成日時：${moment(item.createdAt).format(
            "yyyy-MM-DD ddd HH:mm"
          )}`}
          descriptionStyle={styles.description}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <FlatList
            style={styles.tweetList}
            data={tweetItems}
            renderItem={renderTweet}
            keyExtractor={(item, index) => index.toString()}

          />
          <StatusBar style="auto" />
        </View>
      <FAB
        style={styles.addButton}
        icon="leaf"
        onPress={() => {
          toTweetAddScreen();
        }}
      />
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

  addButton: {
    position: "absolute",
    bottom: 30,
    right: 50,
    backgroundColor: "#2aefd1",
  },

  tweetList: {
    width: screenWidth * 1,
    marginBottom: 30,
  },

  tweetItem: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#c4d4e3",
  },

  tweetItemText: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
    paddingRight: 30,
  },

  tweetItemAt: {
    textAlign: "right",
    paddingRight: 30,
    color: "#c4d4e3",
  },
  
  description: {
    flex: 1,
    textAlign: "right",
  },
});

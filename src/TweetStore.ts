import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
});

export const save = (tweetItem: string, createdAt: number) => {
    const key = "tweetList";
    storage.save({
        key: key,           // データの合言葉 keyでアンダースコア（"_"）を使用しないでください
        id: `${createdAt}`,      // これがないと常に上書きになってしまう。
        data: {
        tweetItem: tweetItem,
        createdAt: createdAt,
        },
    });
    alert("保存されました");
};

export const loadAll = async () => {
    const key = "tweetList";
    const tweets = await storage.getAllDataForKey(key);
    return tweets;
}

export const removeTweetInfoAsync = async (tweetInfo: Tweet, ) => {
    const key = "tweetList";
    await storage.remove({
        key: key,
        id: `${tweetInfo.createdAt}`,
    });
}
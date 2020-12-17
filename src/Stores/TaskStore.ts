import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
});

export const save = (deadlineDate: string, taskName: string, taskItem: string[], createdAt: number) => {
    const key = "taskList";
    storage.save({
        key: key,           // データの合言葉 keyでアンダースコア（"_"）を使用しないでください
        id: `${createdAt}`,      // これがないと常に上書きになってしまう。
        data: {
        deadlineDate: deadlineDate,
        taskName: taskName,
        taskItems: taskItem,
        createdAt: createdAt,
        },
    });
    alert("保存されました");
};


export const loadAll = async () => {
    const key = "taskList";
    const tasks = await storage.getAllDataForKey(key);
    return tasks;
}

export const removeTaskInfoAsync = async (taskInfo: Task, ) => {
    const key = "taskList";
    await storage.remove({
        key: key,
        id: `${taskInfo.createdAt}`,
    });
}

export const saveButtonStatus = (buttonColor: string) => {
    const key = "buttonColor";
    storage.save({
        key: key,           // データの合言葉 keyでアンダースコア（"_"）を使用しないでください
        id: `${buttonColor}`,      // これがないと常に上書きになってしまう。
        data: {
        buttonColor: buttonColor,
        },
    })
}

export const loadButtonColor = async () => {
    const key = "buttonColor"
    const buttonColor = await storage.getAllDataForKey(key);
    return buttonColor;
}
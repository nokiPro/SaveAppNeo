interface Task {
    deadlineDate: string;
    taskName: string;
    createdAt: number;
    items: string[];
    taskItems: string[];
}

interface Tweet {
    tweetItem: string;
    createdAt: string;
}

type RootStackParamList = {
    TaskItem: string[]
    TaskAdd: {Task: Task};
    TaskList: {Task: Task};
    TaskDetail: {Task: Task};
    TaskEdit: undefined;
    TaskNavigation: undefined;
    TweetList: {Tweet: Tweet};
    TweetAdd: {Tweet: Tweet};
    TweetNavigation: undefined;
}
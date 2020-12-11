interface Task {
    deadlineDate: string;
    taskName: string;
    createdAt: number;
    items: string[]
}

type RootStackParamList = {
    TaskItem: string[]
    TaskAdd: undefined;
    TaskList: {Task: Task};
    TaskDetail: {Task: Task};
    TaskEdit: undefined;
    TaskNavigation: undefined;
    TweetList: undefined;
    TweetAdd: undefined;
    TweetNavigation: undefined;
}
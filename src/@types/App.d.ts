interface Task {
    deadlineDate: string;
    taskName: string;
    createdAt: number;
    items: string[];
    taskItems: string[];
}

type RootStackParamList = {
    TaskItem: string[]
    TaskAdd: {Task?: Task};
    TaskList: {Task?: Task};
    TaskDetail: {Task: Task};
    TaskEdit: undefined;
    TaskNavigation: undefined;
    TweetList: undefined;
    TweetAdd: undefined;
    TweetNavigation: undefined;
}
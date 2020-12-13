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
    TaskList: {Task: Task, user: signedInUser};
    TaskDetail: {Task: Task};
    TaskEdit: undefined;
    TaskNavigation: undefined;
    TweetList: {Tweet: Tweet};
    TweetAdd: {Tweet: Tweet};
    TweetNavigation: undefined;
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
    BottomTabNavigation: undefined;
}


type RootStackParamList2 = {
    addTask: undefined;
    editTask: undefined;
};

type signedInUser = {
    email: string;
    uid: string;
}
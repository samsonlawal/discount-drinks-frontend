import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "@/utils/localStorage/AsyncStorage";

export interface TaskData {
  id: string;
  description: string;
  deadline: string;
  assignee: {
    name: string;
    email: string;
    image?: string;
    profileImage?: string;
  };
  priority: string;
  status: string;
  createdAt: string;
  workspaceName: string;
  // workspaceId: string;
}

// Define proper types for your task state
type taskState = {
  task: Array<TaskData>;
  currentTask: TaskData | null;
};

const initialState: taskState = {
  task: [],
  currentTask: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // setTasks: (state, action: PayloadAction<Array<any>>) => {
    //   // Ensure payload is always an array
    //   state.task = Array.isArray(action.payload) ? action.payload : [];
    //   saveToLocalStorage({ key: "WStasks", value: state.task });
    // },

    setTasks: (state, action: PayloadAction<Array<TaskData>>) => {
      state.task = action.payload;
      saveToLocalStorage({ key: "WStasks", value: action.payload });
    },

    setSingleTask: (state, action: PayloadAction<TaskData | null>) => {
      state.currentTask = action.payload;
      saveToLocalStorage({ key: "currentTask", value: action.payload });
    },
  },
});

// export const { setTasks } = taskSlice.actions;
export const { setTasks, setSingleTask } = taskSlice.actions;

export default taskSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTasks, createTaskAPI, deleteTaskAPI, getTaskListAPI, executeTaskAPI } from "./taskAPI";

const initialState = {
  tasks: [],
  taskList: null,
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (page) => {
    const response = await getTasks(page);
    return response;
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (task) => {
    const response = await createTaskAPI(task);
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId) => {
    const response = await deleteTaskAPI(taskId);
    return response;
  }
);

export const fetchTaskList = createAsyncThunk(
  "task/fetchTaskList",
  async (taskListId) => {
    const response = await getTaskListAPI(taskListId);
    return response;
  }
);

export const executeTask = createAsyncThunk(
  "task/executeTask",
  async (taskId) => {
    const response = await executeTaskAPI(taskId);
    return response;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
      })
      .addCase(fetchTaskList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskList = action.payload;
      })
      
  },
});

export default taskSlice.reducer;





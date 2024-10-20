import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../features/homepage/homepageSlice";
import userReducer from "../features/user/userSlice";
import taskReducer from "../features/task/taskSlice";

export default configureStore({
    reducer: {
        homepage: homepageReducer,
        user: userReducer,
        task: taskReducer,
    },
});

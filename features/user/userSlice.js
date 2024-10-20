import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    message: "",
    userInformation: {},
    bazarList: [],
    mealList: [],
    mess:{}
};

const userSlice = createSlice({
    name: "userInformation",
    initialState,
    reducers: {
        setUserInformation: (state, action) => {
            
            state.userInformation = action.payload;
        },
        setBazarList: (state, action) => {
            state.bazarList = action.payload;
        },
        setMealList: (state, action) => {
            state.mealList = action.payload;
        },
        setMess:(state,action)=>{
            state.mess=action.payload
        }
    },
});

export const { setUserInformation, setBazarList, setMealList } = userSlice.actions;
export default userSlice.reducer;
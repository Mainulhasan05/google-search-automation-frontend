import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadHomeData, loadProfileList, deleteProfile, editProfile } from "./homepageAPI";
const initialState = {
  status: "idle",
  message: "",
  data: null,
  profileData: null,
};

export const fetchHomeData = createAsyncThunk(
  "homepage/fetchHomeData",
  async () => {
    const response = await loadHomeData();
    return response;
  }
);

export const fetchProfileList = createAsyncThunk(
  "homepage/fetchProfileList",
  async (page) => {
    const response = await loadProfileList(page);
    return response;
  }
);

export const deleteProfileById = createAsyncThunk(
  "homepage/deleteProfileById",
  async (id) => {
    const response = await deleteProfile(id);
    return response;
  }
);

export const editProfileById = createAsyncThunk(
  "homepage/editProfileById",
  async (id) => {
    const response = await editProfile(id);
    return response;
  }
);



export const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProfileList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profileData = action.payload;
      })
      .addCase(deleteProfileById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProfileById.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.profileData = action.payload;
      });
  },
});

export default homepageSlice.reducer;

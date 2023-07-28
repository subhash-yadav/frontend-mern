import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchLoggedInUserOrder, updateUser } from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
  userInfo: null //this will have more info
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrder",
  async (id) => {
    const response = await fetchLoggedInUserOrder(id);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async(id)=>{
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
)
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async(id)=>{
    const response = await updateUser(id);
    return response.data;
  }
)

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more from loggedIn user info
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more from loggedIn user info
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more from loggedIn user info
        state.userInfo = action.payload;
      })
      
  },
});

export const { increment } = userSlice.actions;
export const selectUserOrders = (state)=>state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetching all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (thunkAPI) => {
    try {
      const users = await fetch("/api/all-users", {
        cache: "no-cache",
      });
      const data = await users.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Fetching a single user
export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, thunkAPI) => {
    try {
      const user = await fetch(`/api/all-users/${id}`, {
        cache: "no-cache",
      });
      const data = await user.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// user total amount
export const getUserTotalAmount = createAsyncThunk(
  "user/getUserTotalAmount",
  async (id, thunkAPI) => {
    try {
      const user = await fetch("/api/all-users", {
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await user.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserTotalAmount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTotalAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserTotalAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default UserSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// update User basic information
export const updateBasicInfo = createAsyncThunk(
  "update/updateBasicInfo",
  async (data, thunkAPI) => {
    try {
      const user = await fetch("/api/update-user", {
        method: "PATCH",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await user.json();
      if (response.status === 200) {
        toast.success("User updated successfully!");
        return response.body;
      } else {
        toast.error(response.message);
        return thunkAPI.rejectWithValue({ error: response.message });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const updateSlice = createSlice({
  name: "update",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBasicInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBasicInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateBasicInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default updateSlice.reducer;

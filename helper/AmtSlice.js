import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
export const AmtSlice = createSlice({
  name: "amt",
  initialState: {
    amount: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
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
export default AmtSlice.reducer;

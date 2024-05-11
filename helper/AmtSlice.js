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
// get all users payment history
export const getAllUsersPaymentHistory = createAsyncThunk(
  "user/getAllUsersPaymentHistory",
  async (_, thunkAPI) => {
    try {
      const users = await fetch("/api/payment", {
        next: { revalidate: 5000 },
      });
      const data = await users.json();
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
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTotalAmount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTotalAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.amount = action.payload;
      })
      .addCase(getUserTotalAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllUsersPaymentHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsersPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default AmtSlice.reducer;

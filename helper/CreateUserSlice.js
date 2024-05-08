import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Creating a new user
export const CreateUser = createAsyncThunk(
  "create/createUser",
  async (data, thunkAPI) => {
    try {
      const user = await fetch("/api/register-user", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data?.name,
          phone: data?.phone,
          email: data?.email,
          password: data?.password,
          domains: data?.domains,
          hosting: data?.hosting,
          dashboard: data?.dashboard,
          cpanel: data?.cpanel,
          adminSettings: data?.adminSettings,
        }),
      });
      const response = await user.json();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const CreateUserSlice = createSlice({
  name: "create",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(CreateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default CreateUserSlice.reducer;

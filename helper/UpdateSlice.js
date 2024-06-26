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
// update User Domain information
export const updateDomainInfo = createAsyncThunk(
  "update/updateDomainInfo",
  async (data, thunkAPI) => {
    try {
      const domain = await fetch("/api/update-domain", {
        method: "PATCH",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data?.userId,
          domainId: data?.domainId,
          updateData: data?.updateData,
        }),
      });
      const response = await domain.json();
      if (response.status === 200) {
        toast.success("Domain updated successfully!");
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
// udpate User Hosting information
export const updateHostingInfo = createAsyncThunk(
  "update/updateHostingInfo",
  async (data, thunkAPI) => {
    try {
      const hosting = await fetch("/api/update-hosting", {
        method: "PATCH",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data?.userId,
          hostingId: data?.hostingId,
          updateData: data?.updateData,
        }),
      });
      const response = await hosting.json();
      if (response.status === 200) {
        toast.success("Hosting updated successfully!");
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

// update dashboard information
export const UpdateDashboard = createAsyncThunk(
  "update/updateDashboard",
  async (data, thunkAPI) => {
    try {
      const dashboard = await fetch("/api/update-dashboard", {
        method: "PATCH",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await dashboard.json();
      if (response.status === 200) {
        toast.success("Dashboard updated successfully!");
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
// update cPanel information
export const UpdateCpanel = createAsyncThunk(
  "update/updateCpanel",
  async (data, thunkAPI) => {
    try {
      const cpanel = await fetch("/api/update-cpanel", {
        method: "PATCH",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await cpanel.json();
      if (response.status === 200) {
        toast.success("cPanel updated successfully!");
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
    builder
      .addCase(updateDomainInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDomainInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateDomainInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateHostingInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHostingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateHostingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(UpdateDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(UpdateDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(UpdateCpanel.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateCpanel.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(UpdateCpanel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default updateSlice.reducer;

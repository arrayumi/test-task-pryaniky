import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../shared/api/api";

const initialState = {
  isAuthorized: localStorage.getItem("access") || false,
  errMessage: "",
  isPageLoading: false,
};

export const login = createAsyncThunk(
  "user/login",
  async function (data, { rejectWithValue, dispatch }) {
    try {
      const res = await api.login(data);
      console.log(res);
      localStorage.setItem("access", res.data.data.token);
    } catch (err) {
      const errorData = {
        message: err.response.data.detail,
        code: err.code,
      };
      return rejectWithValue(errorData);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload;
    },
    setErrMessage(state, action) {
      state.errMessage = action.payload;
    },
    setIsPageLoading(state, action) {
      state.isPageLoading = action.payload;
    },
    logout(state) {
      console.log("logout");
      state.isAuthorized = false;
      localStorage.removeItem("access");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isPageLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isAuthorized = true;
      state.isPageLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.errMessage = action.payload?.message || "Login failed";
    });
  },
});

export const { setIsAuthorized, setIsPageLoading, setErrMessage } =
  userSlice.actions;

export default userSlice.reducer;

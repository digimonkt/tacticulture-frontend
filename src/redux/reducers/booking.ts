import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ServerError } from "@/api/types";
import { guestOtpSubmitAPI, guestRegistrationAPI } from "../../api/booking";

const initialState = {
  guestRegistrationStatus: "",
  registrationData: {},
};

export const guestRegistration = createAsyncThunk<{
  state: RootState;
  rejectValue: ServerError;
}>(
  "booking/guestRegistration",
  async (email, { getState, rejectWithValue }) => {
    console.log(email, "email");
    const res = await guestRegistrationAPI(email);
    if (res.remote === "success") {
      console.log(res, "res");
      return res.data;
    } else {
      return rejectWithValue(res?.error);
    }
  }
);

export const guestOtpSubmit = createAsyncThunk<{
  state: RootState;
  rejectValue: ServerError;
}>("booking/guestOtpSubmit", async (data, { getState, rejectWithValue }) => {
  console.log(data, "data");
  const res = await guestOtpSubmitAPI(data);
  if (res.remote === "success") {
    console.log(res, "res");
    return res.data;
  } else {
    return rejectWithValue(res?.error);
  }
});

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(guestRegistration.fulfilled, (state, action) => {
      state.registrationData = action.payload;
      state.guestRegistrationStatus = "success";
    });
    builder.addCase(guestRegistration.rejected, (state, action) => {
      state.guestRegistrationStatus = "fail";
    });

    builder.addCase(guestOtpSubmit.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(guestOtpSubmit.rejected, (state, action) => {});
  },
});

export default bookingSlice.reducer;

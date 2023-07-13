/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ServerError } from "@/api/types";
import {
  guestBookingAPI,
  guestOtpSubmitAPI,
  guestProfileCreateAPI,
  guestRegistrationAPI,
} from "../../api/booking";
import { bookingPayload, getBookingType } from "@/types/booking";

const initialState = {
  guestRegistrationStatus: "",
  guestOtpStatus: "",
  guestProfileStatus: "",
  registrationData: { email: "", verification_code: "" },
  bookingData: { eventId: 0, date: "", type: "", time: "", title: "" },
  bookingConfirm: "",
  informationRequirement: {},
};

export const guestRegistration = createAsyncThunk<{
  state: RootState;
  rejectValue: ServerError;
}>(
  "booking/guestRegistration",
  // @ts-ignore
  async (email, { getState, rejectWithValue }) => {
    // @ts-ignore
    const res = await guestRegistrationAPI(email);
    console.log(res, "res hai ye");
    if (res.remote === "success") {
      // @ts-ignore
      return { email: email, verification_code: res.data.verification_code };
    } else {
      return rejectWithValue(res?.error);
    }
  }
);

export const guestOtpSubmit = createAsyncThunk<{
  state: RootState;
  rejectValue: ServerError;
  // @ts-ignore
}>("booking/guestOtpSubmit", async (data, { getState, rejectWithValue }) => {
  const res = await guestOtpSubmitAPI(data);
  if (res.remote === "success") {
    return res.data;
  } else {
    return rejectWithValue(res?.error);
  }
});

export const guestProfileCreate = createAsyncThunk<{
  state: RootState;
  rejectValue: ServerError;
}>(
  "booking/guestProfileCreate",
  // @ts-ignore
  async (data, { getState, rejectWithValue }) => {
    const res = await guestProfileCreateAPI(data);
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res?.error);
    }
  }
);

// export const guestBooking = createAsyncThunk<
//   getBookingType,
//   bookingPayload,
//   {
//     state: RootState;
//     rejectValue: ServerError;
//   }
// >("booking/guestBooking", async (data, { rejectWithValue }) => {
//   const res = await guestBookingAPI(data);

//   if (res.remote === "success") {
//     return res.data;
//   } else {
//     return rejectWithValue(res?.error);
//   }
// });

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingData: (state) => {
      state.registrationData = { email: "", verification_code: "" };
      state.bookingData = {
        eventId: 0,
        date: "",
        type: "",
        time: "",
        title: ""
      };
    },
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
    setInformationAndRequirement: (state, action) => {
      state.informationRequirement = {
        ...state.informationRequirement,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(guestRegistration.fulfilled, (state, action) => {
      // @ts-ignore
      state.registrationData = action.payload;
      state.guestRegistrationStatus = "success";
    });
    builder.addCase(guestRegistration.rejected, (state, action) => {
      state.guestRegistrationStatus = "fail";
    });

    builder.addCase(guestOtpSubmit.fulfilled, (state, action) => {
      state.guestOtpStatus = "success";
    });
    builder.addCase(guestOtpSubmit.rejected, (state, action) => {
      state.guestOtpStatus = "fail";
    });

    builder.addCase(guestProfileCreate.fulfilled, (state, action) => {
      state.guestProfileStatus = "success";
    });
    builder.addCase(guestProfileCreate.rejected, (state, action) => {
      state.guestProfileStatus = "fail";
    });

    // builder.addCase(guestBooking.fulfilled, (state, action) => {
    //   state.bookingConfirm = "success";
    // });
    // builder.addCase(guestBooking.rejected, (state, action) => {
    //   state.bookingConfirm = "fail";
    // });
  },
});
export const {
  setBookingData,
  resetBookingData,
  setInformationAndRequirement,
} = bookingSlice.actions;
export default bookingSlice.reducer;

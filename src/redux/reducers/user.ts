import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ServerError } from "@/api/types";
import {
  getUserAvailabilityAPI,
  getUserDetailsAPI,
  updateUser,
  updateUserAvailabilityAPI,
} from "@/api/user";

import {
  AvailabilityGetDataType,
  AvailabilityPayloadType,
  UserDetailType,
  UpdateUserDetailPayloadType,
} from "@/api/types/user";

import { REQUEST_STATUS_TYPE } from "@/utils/enum";
import { setAlertMessage } from "./modalsToggle";
import { tokens } from "@/utils/jwtTokenStorage";

// Define a type for the slice state
interface userI {
  isLoggedIn: boolean;
  currentUser: UserDetailType;
  isUserStepActive: boolean;
  isPlanPageActive: boolean;
  defaultAvailability: AvailabilityPayloadType;
  availabilityResponse: {
    id: number;
    timeZone: string;
    availability: null;
    specificDate: null;
  };
  updateUserStatus: REQUEST_STATUS_TYPE | "";
  errroList: any;
}

// Define the initial state using that type
const initialState: userI = {
  defaultAvailability: {
    timeZone: "",
    specificDate: [
      {
        date: "",
        timeZone: "",
        availableHours: [{ fromTime: "", toTime: "" }],
      },
    ],
    userCustomAvailability: [
      { day: "", timeArray: [{ fromTime: "", toTime: "" }] },
    ],
  },
  isLoggedIn: false,
  currentUser: {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    userRoles: "",
    phoneNumber: "",
    timezone: "",
    bio: "",
    availableFrom: "",
    availableTo: "",
    offWeekdays: [],
    events: [],
    profileImage: "",
    isPublicProfile: false,
    isProfileComplete: false,
    defaultRole: "",
  },
  isUserStepActive: false,
  isPlanPageActive: false,
  availabilityResponse: {
    id: 0,
    timeZone: "",
    availability: null,
    specificDate: null,
  },
  updateUserStatus: "",
  errroList: null,
};

// fetch user details

export const getUserDetails = createAsyncThunk<
  UserDetailType,
  void,
  { state: RootState; rejectValue: ServerError }
>("users/getUserDetails", async (_, { getState, rejectWithValue }) => {
  const { userReducer } = getState();
  if (userReducer.currentUser.email) {
    return { ...userReducer.currentUser };
  }
  const res = await getUserDetailsAPI();
  if (res.remote === "success") {
    return res.data;
  } else {
    res.error.status === 401 && tokens.removeAccessToken();
    return rejectWithValue(res.error);
  }
});

// fetch user availability

export const getUserDefaultAvailability = createAsyncThunk<
  AvailabilityPayloadType,
  void,
  { state: RootState; rejectValue: ServerError }
>("getUserDefaultAvailability", async (_, { rejectWithValue }) => {
  const res = await getUserAvailabilityAPI();
  console.log(res, "get user default avaai");
  if (res.remote === "success") {
    const num = res.data.id?.toString() || "";
    localStorage.setItem("defaultAvailabilityId", num);
    return res.data;
  } else {
    return rejectWithValue(res.error);
  }
});

export const updateUserAvailability = createAsyncThunk<
  AvailabilityGetDataType,
  AvailabilityPayloadType,
  { state: RootState; rejectValue: ServerError }
>("updateUserAvailability", async (data, { rejectWithValue }) => {
  const res = await updateUserAvailabilityAPI(data);
  if (res.remote === "success") {
    return res.data;
  } else {
    return rejectWithValue(res.error);
  }
});
// update user details
export const updateUserDetails = createAsyncThunk<
  UserDetailType,
  UpdateUserDetailPayloadType,
  { state: RootState; rejectValue: ServerError }
>(
  "users/updateUserDetails",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    const { userReducer } = getState();

    const res = await updateUser(payload);

    if (res.remote === "success") {
      return { ...userReducer.currentUser, ...payload };
    } else {
      if (res.error.status === 500) {
        dispatch(
          setAlertMessage({
            error: true,
            message: res.error.errors,
            show: true,
          })
        );
      }
      return rejectWithValue(res.error.errors);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    updateCurrentUser: (state, action: PayloadAction<UserDetailType>) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    resetCurrentUser: () => initialState,
    setIsUserStepActive: (state, action: PayloadAction<boolean>) => {
      state.isUserStepActive = action.payload;
    },
    setIsPlanPageActive: (state, action: PayloadAction<boolean>) => {
      state.isPlanPageActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ======get user details handler======
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.isLoggedIn = true;
    });
    // ======update user detail handlers======
    builder.addCase(updateUserDetails.pending, (state) => {
      state.updateUserStatus = REQUEST_STATUS_TYPE.pending;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.updateUserStatus = REQUEST_STATUS_TYPE.fulfilled;
      state.currentUser = action.payload;
    });
    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.updateUserStatus = REQUEST_STATUS_TYPE.rejected;
      state.errroList = action.error;
    });
    builder.addCase(updateUserAvailability.fulfilled, (state, action) => {
      state.availabilityResponse = { ...action.payload };
    });

    builder.addCase(getUserDefaultAvailability.fulfilled, (state, action) => {
      state.defaultAvailability = { ...action.payload };
    });
  },
});

export const {
  setIsLoggedIn,
  updateCurrentUser,
  resetCurrentUser,
  setIsUserStepActive,
  setIsPlanPageActive,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isLoggedIn = (state: RootState) => state.userReducer.isLoggedIn;
export const currentUser = (state: RootState) => state.userReducer.currentUser;
export const isUserStepActive = (state: RootState) =>
  state.userReducer.isUserStepActive;
export const isPlanPageActive = (state: RootState) =>
  state.userReducer.isPlanPageActive;
export const userUpdateStatus = (state: RootState) =>
  state.userReducer.updateUserStatus;

export default userSlice.reducer;

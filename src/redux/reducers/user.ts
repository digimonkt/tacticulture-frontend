import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { ServerError } from "@/api/types";
import { getUserDetailsAPI, updateUser } from "@/api/user";
import { UserDetailType } from "@/api/types/user";
import { REQUEST_STATUS_TYPE } from "@/utils/enum";
import { setAlertMessage } from "./modalsToggle";

// Define a type for the slice state
interface userI {
  isLoggedIn: boolean;
  currentUser: UserDetailType;
  isUserStepActive: boolean;
  isPlanPageActive: boolean;
  updateUserStatus: REQUEST_STATUS_TYPE | "";
  errroList: any;
}

// Define the initial state using that type
const initialState: userI = {
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
    profileImage: null,
    isPublicProfile: false,
    isProfileComplete: false,
    defaultRole: "",
  },
  isUserStepActive: false,
  isPlanPageActive: false,
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
    return rejectWithValue(res.error);
  }
});

// update user details
export const updateUserDetails = createAsyncThunk<
  UserDetailType,
  UserDetailType,
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

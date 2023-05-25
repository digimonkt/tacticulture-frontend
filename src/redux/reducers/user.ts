import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { ServerError } from "@/api/types";
import { getUserDetailsAPI } from "@/api/user";
import { UserDetailType } from "@/types/user";

// Define a type for the slice state
interface userI {
  isLoggedIn: boolean;
  currentUser: UserDetailType;
  isUserStepActive: boolean;
  isPlanPageActive: boolean;
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
    profileImage: "",
    isPublicProfile: false,
    isProfileComplete: false,
    defaultRole: "",
  },
  isUserStepActive: false,
  isPlanPageActive: false,
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
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      // handle fulfilled action
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.isLoggedIn = true;
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

export default userSlice.reducer;

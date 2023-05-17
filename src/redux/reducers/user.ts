import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// Define a type for the slice state
interface userI {
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: userI = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isLoggedIn = (state: RootState) => state.userReducer.isLoggedIn;

export default userSlice.reducer;

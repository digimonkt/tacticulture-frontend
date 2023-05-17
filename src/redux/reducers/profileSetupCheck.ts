import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// Define a type for the slice state
interface preLoaderI {
  apprenticeFormOne: boolean;
  apprenticeFormTwo: boolean;
}

// Define the initial state using that type
const initialState: preLoaderI = {
  apprenticeFormOne: false,
  apprenticeFormTwo: false,
};

export const profileSetupCheckSlice = createSlice({
  name: "profileSetupCheck",
  initialState,
  reducers: {
    setApprenticeFormOne: (state, action: PayloadAction<boolean>) => {
      state.apprenticeFormOne = action.payload;
    },
  },
});

export const { setApprenticeFormOne } = profileSetupCheckSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const apprenticeFormOne = (state: RootState) =>
  state.profileSetupCheckReducer.apprenticeFormOne;

export default profileSetupCheckSlice.reducer;

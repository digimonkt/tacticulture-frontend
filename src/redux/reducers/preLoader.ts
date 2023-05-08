import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// Define a type for the slice state
interface preLoaderI {
 preLoader: boolean;
}

// Define the initial state using that type
const initialState: preLoaderI = {
  preLoader: false,
};

export const preLoaderSlice = createSlice({
  name: "preLoader",
  initialState,
  reducers: {
    setPreLoader: (state, action: PayloadAction<boolean>) => {
      state.preLoader = action.payload;
    },
  },
});

export const { setPreLoader } = preLoaderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const preLoader = (state: RootState) => state.PreLoaderReducer.preLoader;

export default preLoaderSlice.reducer;

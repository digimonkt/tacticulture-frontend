import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// Define a type for the slice state
interface modalsToogleI {
 alertMessage: {
    error: boolean;
    message: string;
    show: boolean;
 };
}

// Define the initial state using that type
const initialState: modalsToogleI = {
  alertMessage: {
    error: false,
    message: "",
    show: false
  },
};

export const modalsTooglesSlice = createSlice({
  name: "modalsToogles",
  initialState,
  reducers: {
    setAlertMessage: (state, action: PayloadAction<{error: boolean; message: string; show: boolean;}>) => {
      state.alertMessage = action.payload;
    },
    resetAlertMessage: (state) => {
        state.alertMessage = { error: false, message: "", show: false };
    }
  },
});

export const { setAlertMessage, resetAlertMessage } = modalsTooglesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const alertMessage = (state: RootState) => state.ModalsToogleReducer.alertMessage;

export default modalsTooglesSlice.reducer;

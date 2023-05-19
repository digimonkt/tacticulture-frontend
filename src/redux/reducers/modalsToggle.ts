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
  imageCropperToggle: boolean;
}

// Define the initial state using that type
const initialState: modalsToogleI = {
  alertMessage: {
    error: false,
    message: "",
    show: false,
  },
  imageCropperToggle: false,
};

export const modalsTooglesSlice = createSlice({
  name: "modalsToogles",
  initialState,
  reducers: {
    setAlertMessage: (
      state,
      action: PayloadAction<{ error: boolean; message: string; show: boolean }>
    ) => {
      state.alertMessage = action.payload;
    },
    resetAlertMessage: (state) => {
      state.alertMessage = { error: false, message: "", show: false };
    },
    handleImageCropperToggle: (state, action) => {
      state.imageCropperToggle = action.payload;
    },
  },
});

export const { setAlertMessage, resetAlertMessage, handleImageCropperToggle } =
  modalsTooglesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const alertMessage = (state: RootState) =>
  state.ModalsToogleReducer.alertMessage;

export const imageCropperToggle = (state: RootState) =>
  state.ModalsToogleReducer.imageCropperToggle;

export default modalsTooglesSlice.reducer;

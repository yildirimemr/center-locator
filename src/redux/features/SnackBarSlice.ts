import ISnackBar from "@/interfaces/ISnackBar";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ISnackBar = {
  isOpen: false,
  severity: "info",
  message: "",
};

export const SnackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    setSnackBar: (state, action: PayloadAction<ISnackBar>) => {
      state.isOpen = action.payload.isOpen;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    setSnackBarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export default SnackBarSlice.reducer;
export const { setSnackBar, setSnackBarOpen } = SnackBarSlice.actions;

import IBackDrop from "@/interfaces/IBackDrop";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IBackDrop = {
  isOpen: false,
  message: "",
};

export const BackDropSlice = createSlice({
  name: "backDrop",
  initialState,
  reducers: {
    setBackDrop: (state, action: PayloadAction<IBackDrop>) => {
      state.isOpen = action.payload.isOpen;
      state.message = action.payload.message;
    },
  },
});

export default BackDropSlice.reducer;
export const { setBackDrop } = BackDropSlice.actions;

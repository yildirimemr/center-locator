import IGeoCoordinates from "@/interfaces/IGeoCoordinates";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IGeoCoordinates = {
  latitude: 0.0,
  longitude: 0.0,
};

export const MouseMoveCoordinatesSlice = createSlice({
  name: "mouseMoveCoordinates",
  initialState,
  reducers: {
    setMouseCoordinates: (state, action: PayloadAction<IGeoCoordinates>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export default MouseMoveCoordinatesSlice.reducer;
export const { setMouseCoordinates } = MouseMoveCoordinatesSlice.actions;

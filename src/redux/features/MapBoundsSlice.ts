import IMapBounds from "@/interfaces/IMapBounds";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IGeoCoordinates from "@/interfaces/IGeoCoordinates";

const initialState: IMapBounds = {
  upper: {
    left: {
      latitude: 0.0,
      longitude: 0.0,
    },
    right: {
      latitude: 0.0,
      longitude: 0.0,
    },
  },
  bottom: {
    left: {
      latitude: 0.0,
      longitude: 0.0,
    },
    right: {
      latitude: 0.0,
      longitude: 0.0,
    },
  },
  center: {
    latitude: 0.0,
    longitude: 0.0,
  },
  zoomLevel: 0,
};

export const MapBoundsSlice = createSlice({
  name: "mapBounds",
  initialState,
  reducers: {
    setMapBounds: (state, action: PayloadAction<IMapBounds>) => {
      state.upper = action.payload.upper;
      state.bottom = action.payload.bottom;
      state.center = action.payload.center;
      state.zoomLevel = action.payload.zoomLevel;
    },
    setZoomLevel: (state, action: PayloadAction<{ zoomLevel: number }>) => {
      state.zoomLevel = action.payload.zoomLevel;
    },
    setCenter: (state, action: PayloadAction<{ center: IGeoCoordinates }>) => {
      state.center = action.payload.center;
    },
  },
});

export default MapBoundsSlice.reducer;
export const { setMapBounds, setZoomLevel, setCenter } = MapBoundsSlice.actions;

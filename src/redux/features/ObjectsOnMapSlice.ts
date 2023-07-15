import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: GeoJSON.FeatureCollection<any> = {
  bbox: undefined,
  type: "FeatureCollection",
  features: [],
};

export const ObjectsOnMapSlice = createSlice({
  name: "objectsOnMap",
  initialState,
  reducers: {
    setGeoJSON: (
      state,
      action: PayloadAction<GeoJSON.FeatureCollection<any>>
    ) => {
      state.bbox = action.payload.bbox;
      state.type = action.payload.type;
      state.features = action.payload.features;
    },
    clearFeatures: (state) => {
      state.features.length = 0;
    },
  },
});

export default ObjectsOnMapSlice.reducer;
export const { setGeoJSON, clearFeatures } = ObjectsOnMapSlice.actions;

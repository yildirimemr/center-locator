import IBuildingsCenter from "@/interfaces/IBuildingsCenter";
import IGeoCoordinates from "@/interfaces/IGeoCoordinates";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IBuildingsCenter = {
  buildingsCenter : []
};

export const BuildingsCenterSlice = createSlice({
  name: "buildingsCenter",
  initialState,
  reducers: {
    setBuildingCenters: (state, action: PayloadAction<IGeoCoordinates[]>) => {
      state.buildingsCenter = action.payload
    },
    appendBuildingCenters: (state, action: PayloadAction<IGeoCoordinates>) => {
      state.buildingsCenter.push(action.payload);
    },
    clearBuildingCenters: (state) => {
      state.buildingsCenter.length = 0;
    },
  },
});

export default BuildingsCenterSlice.reducer;
export const {
  setBuildingCenters,
  appendBuildingCenters,
  clearBuildingCenters,
} = BuildingsCenterSlice.actions;

import ICenterBuildings from "@/interfaces/ICenterBuildings";
import ICenters from "@/interfaces/ICenters";
import IGeoCoordinates from "@/interfaces/IGeoCoordinates";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ICenters = {
  numberOfCenters: 0,
  centers: [],
  centerBuildings: [],
};

export const CentersSlice = createSlice({
  name: "centers",
  initialState,
  reducers: {
    setCenters: (state, action: PayloadAction<IGeoCoordinates[]>) => {
      state.centers = action.payload;
    },
    clearCenters: (state) => {
      state.centers.length = 0;
    },
    setNumberOfCenters: (state, action: PayloadAction<number>) => {
      state.numberOfCenters = Math.floor(action.payload);
    },
    setCenterBuildings: (state, action: PayloadAction<ICenterBuildings[]>) => {
      state.centerBuildings = action.payload;
    },
    clearCenterBuildings: (state) => {
      state.centerBuildings.length = 0;
    },
    setAllCenters: (state, action: PayloadAction<ICenters>) => {
      state.numberOfCenters = action.payload.numberOfCenters;
      state.centers = action.payload.centers;
      state.centerBuildings = action.payload.centerBuildings;
    },
    clearAllCenters: (state) => {
      state.numberOfCenters = 0;
      state.centers.length = 0;
      state.centerBuildings.length = 0;
    },
  },
});

export default CentersSlice.reducer;
export const {
  setCenters,
  clearCenters,
  setNumberOfCenters,
  setCenterBuildings,
  clearAllCenters,
  setAllCenters,
  clearCenterBuildings,
} = CentersSlice.actions;

import IGeneralSettings from "@/interfaces/IGeneralSettings";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IGeneralSettings = {
  numberOfMainCenters: 0,
  isCentersOnBuilding: true,
};

export const GeneralSettingsSlice = createSlice({
  name: "generalSettings",
  initialState,
  reducers: {
    setGeneralSettings: (state, action: PayloadAction<IGeneralSettings>) => {
      state.isCentersOnBuilding = action.payload.isCentersOnBuilding;
      state.numberOfMainCenters = action.payload.numberOfMainCenters;
    },
    setNumberOfMainCenters: (state, action: PayloadAction<number>) => {
      state.numberOfMainCenters = action.payload;
    },
    setIsCentersOnBuildings: (state, action: PayloadAction<boolean>) => {
      state.isCentersOnBuilding = action.payload;
    },
  },
});

export default GeneralSettingsSlice.reducer;
export const {
  setGeneralSettings,
  setNumberOfMainCenters,
  setIsCentersOnBuildings,
} = GeneralSettingsSlice.actions;

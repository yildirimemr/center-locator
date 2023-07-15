import { configureStore } from "@reduxjs/toolkit";
import { MouseMoveCoordinatesSlice } from "./features/MouseMoveCoordinatesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { MapBoundsSlice } from "./features/MapBoundsSlice";
import { ObjectsOnMapSlice } from "./features/ObjectsOnMapSlice";
import { BuildingsCenterSlice } from "./features/BuildingsCenterSlice";
import { BackDropSlice } from "./features/BackDropSlice";
import { SnackBarSlice } from "./features/SnackBarSlice";
import { CentersSlice } from "./features/CentersSlice";
import { GeneralSettingsSlice } from "./features/GeneralSettingsSlice";

export const store = configureStore({
  reducer: {
    mouseMoveCoordinates: MouseMoveCoordinatesSlice.reducer,
    mapBounds: MapBoundsSlice.reducer,
    objectsOnMap: ObjectsOnMapSlice.reducer,
    buildingsCenter: BuildingsCenterSlice.reducer,
    backDrop: BackDropSlice.reducer,
    snackBar: SnackBarSlice.reducer,
    centers: CentersSlice.reducer,
    generalSettings: GeneralSettingsSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

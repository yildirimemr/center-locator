import React from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import kmeansClustering from "@/utils/kmeansClustering";
import {
  clearAllCenters,
  setAllCenters,
} from "@/redux/features/CentersSlice";
import ICenters from "@/interfaces/ICenters";
import { clearBuildingCenters } from "@/redux/features/BuildingsCenterSlice";
import { setSnackBar } from "@/redux/features/SnackBarSlice";
import { setBackDrop } from "@/redux/features/BackDropSlice";

const ResultButton = () => {
  const dispatch = useAppDispatch();
  const buildings = useAppSelector((state) => state.buildingsCenter);
  const generalSettings = useAppSelector((state) => state.generalSettings);

  const handleClick = () => {
    if (buildings.buildingsCenter.length === 0) {
      dispatch(
        setSnackBar({
          isOpen: true,
          severity: "error",
          message: "No buildings were found.",
        })
      );
      return;
    }

    if (
      generalSettings.numberOfMainCenters < 1 ||
      generalSettings.numberOfMainCenters > buildings.buildingsCenter.length
    ) {
      dispatch(
        setSnackBar({
          isOpen: true,
          severity: "error",
          message:
            "Number of main centers must be between 1 and number of buildings.",
        })
      );
      return;
    }
    try {
      dispatch(
        setBackDrop({
          isOpen: true,
          message: "Main centers are being detected...",
        })
      );
      dispatch(clearAllCenters());
      dispatch(clearBuildingCenters());
      const result: ICenters | null = kmeansClustering(
        buildings.buildingsCenter,
        generalSettings.numberOfMainCenters,
        generalSettings.isCentersOnBuilding
      );
      dispatch(setAllCenters(result!));
    } finally {
      dispatch(
        setBackDrop({
          isOpen: false,
          message: "",
        })
      );
    }
  };
  return (
    <Button variant="contained" sx={{ margin: 3 }} onClick={handleClick} disabled={buildings.buildingsCenter.length === 0}>
      Calculate Centers
    </Button>
  );
};

export default ResultButton;

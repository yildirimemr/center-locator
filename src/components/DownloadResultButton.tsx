"use client";

import React from "react";
import { Button } from "@mui/material";
import { useAppSelector } from "@/redux/store";

const DownloadResultButton = () => {
  const centers = useAppSelector((state) => state.centers);

  const handleClick = () => {
    const blob = new Blob([JSON.stringify(centers)], {type: "application/json"});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "centers.json";
    a.click();
  };
  return (
    <Button
      variant="contained"
      sx={{ margin: 3 }}
      onClick={handleClick}
      disabled={
        centers.numberOfCenters === 0 ||
        centers.centers.length === 0 ||
        centers.centerBuildings.length === 0
      }
    >
      Download Result
    </Button>
  );
};

export default DownloadResultButton;

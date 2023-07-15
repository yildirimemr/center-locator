"use client";

import React from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppSelector } from "@/redux/store";

const BackDropProgress = () => {
  const backdropProps = useAppSelector((state) => state.backDrop);
  return (
    <Backdrop
      sx={{ color: "#e0e0e0", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropProps.isOpen}
    >
      <CircularProgress color="inherit" />
      <Box
        sx={{
          top: -75,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color={grey[300]} sx={{ textAlign: "center" }}>
          {backdropProps.message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default BackDropProgress;

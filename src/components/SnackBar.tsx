"use client";

import { setSnackBarOpen } from "@/redux/features/SnackBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackBar = () => {
  const snackbarProps = useAppSelector((state) => state.snackBar);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackBarOpen(false));
  };

  return (
    <Snackbar
      open={snackbarProps.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      key={"topcenter"}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarProps.severity}
        sx={{ width: "100%" }}
      >
        {snackbarProps.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;

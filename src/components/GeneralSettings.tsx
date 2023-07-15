"use client";

import React, { useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  Slider,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setIsCentersOnBuildings,
  setNumberOfMainCenters,
} from "@/redux/features/GeneralSettingsSlice";

const GeneralSettings = () => {
  const [value, setValue] = React.useState<number>(1);
  const buildings = useAppSelector((state) => state.buildingsCenter);
  const dispatch = useAppDispatch();

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(typeof newValue === "number" ? newValue : newValue[0]);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };
  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (buildings.buildingsCenter.length) {
      setValue(buildings.buildingsCenter.length);
    }
  };

  useEffect(() => {
    dispatch(setNumberOfMainCenters(value));
  }, [value]);

  return (
    <Box sx={{ width: "100%", margin: 3, maxWidth: "fit-content" }}>
      <Typography id="input-slider" gutterBottom>
        Number of Centers
      </Typography>
      <Grid container spacing={2} alignItems="centers">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            disabled={buildings.buildingsCenter.length === 0}
            min={1}
            max={buildings.buildingsCenter.length}
          />
        </Grid>
        <Grid item xs>
          <Input
            value={value}
            onChange={handleInputChange}
            // onBlur={handleBlur}
            disabled={buildings.buildingsCenter.length === 0}
            inputProps={{
              step: 1,
              min: 1,
              max: buildings.buildingsCenter.length,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
      <FormGroup sx={{ marginTop: 2 }}>
        <FormControlLabel
          disabled={buildings.buildingsCenter.length === 0}
          control={
            <Checkbox
              defaultChecked
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setIsCentersOnBuildings(event.target.checked));
              }}
            />
          }
          label="Centers on the building"
        />
      </FormGroup>
    </Box>
  );
};

export default GeneralSettings;

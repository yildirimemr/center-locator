"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "@mui/material";
import IGeoCoordinates from "@/interfaces/IGeoCoordinates";
import { setBuildingCenters } from "@/redux/features/BuildingsCenterSlice";
import { clearFeatures } from "@/redux/features/ObjectsOnMapSlice";
import { setBackDrop } from "@/redux/features/BackDropSlice";
import { setSnackBar } from "@/redux/features/SnackBarSlice";
import { clearAllCenters } from "@/redux/features/CentersSlice";

const GetBuildingsCenterButton = () => {
  const dispatch = useAppDispatch();
  const objects = useAppSelector((state) => state.objectsOnMap);
  const handleClick = async () => {
    try {
      dispatch(
        setBackDrop({
          isOpen: true,
          message: "Buildings are being detected...",
        })
      );
      const allCenters = await buildingsCenterHandler();
      if (allCenters.length === 0) {
        dispatch(
          setSnackBar({
            isOpen: true,
            severity: "info",
            message: "No buildings were found in the selected area.",
          })
        );
      }
      dispatch(setBuildingCenters(allCenters));
      dispatch(clearFeatures());
      dispatch(clearAllCenters());
      dispatch(setBackDrop({ isOpen: false, message: "" }));
      if (allCenters.length != 0) {
        dispatch(
          setSnackBar({
            isOpen: true,
            severity: "success",
            message: "Buildings marked successfully.",
          })
        );
      }
    } catch (error) {
      dispatch(setBackDrop({ isOpen: false, message: "" }));
      let errorMessage: string = "";
      if (typeof error === "string") {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(
        setSnackBar({
          isOpen: true,
          severity: "error",
          message: errorMessage,
        })
      );
    }
  };

  const buildingsCenterHandler = async () => {
    const allCenters: IGeoCoordinates[] = [];

    for (const feature of objects.features) {
      let bbox: string = "";
      feature.geometry.coordinates[0].forEach((element: any) => {
        bbox += `${element[1]} ${element[0]} `;
      });
      bbox = bbox.trimEnd();
      const response = await fetch(
        "https://www.overpass-api.de/api/interpreter?",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: `
[out:json];
(
  way["building"](poly:"${bbox}");
  relation["building"](poly:"${bbox}");
);
out center;
      `,
        }
      );
      const reader = response.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();
      if (reader) {
        let allDataString: string = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          allDataString += value;
        }
        const allDataJson = JSON.parse(allDataString);
        allDataJson.elements?.forEach((element: any) => {
          if (element) {
            const _center: IGeoCoordinates = {
              latitude: element.center.lat,
              longitude: element.center.lon,
            };
            allCenters.push(_center);
          }
        });
      }
    }
    return allCenters;
  };

  return <Button variant="contained" onClick={handleClick} sx={{margin:3}}>Get Buildings</Button>;
};

export default GetBuildingsCenterButton;

"use client";

import IGeoCoordinates from "@/interfaces/IGeoCoordinates";
import { setMouseCoordinates } from "@/redux/features/MouseMoveCoordinatesSlice";
import { useAppDispatch } from "@/redux/store";
import { useMapEvents } from "react-leaflet";

const MouseCoordinates = () => {
  const dispatch = useAppDispatch();
  const map = useMapEvents({
    mousemove: (e) => {
      const mouseCoordinates: IGeoCoordinates = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      };
      dispatch(setMouseCoordinates(mouseCoordinates));
    },    
  });
  return null;
};

export default MouseCoordinates;

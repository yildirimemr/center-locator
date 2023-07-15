"use client";

import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import LeafletDrawer from "./LeafletDrawer";
import MouseCoordinates from "./MouseCoordinates";

const BaseMap = () => {
  const [randColors, setRandColors] = useState<string[]>([]);
  const randomColorHandler = require("randomcolor");
  const mouseCoordinates = useAppSelector(
    (state) => state.mouseMoveCoordinates
  );

  const buildings = useAppSelector((state) => state.buildingsCenter);
  const centers = useAppSelector((state) => state.centers);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (centers.numberOfCenters > 0) {
      setRandColors(
        randomColorHandler({
          count: centers.numberOfCenters,
          luminosity: 'bright'         
        })
      );
    }
  }, [centers]);

  useEffect(() => {
    const attrDiv = document.getElementsByClassName(
      "leaflet-control-attribution"
    )[0];
    const element = document.getElementById("latlongspan");
    const coordinatesText = `Lat: ${mouseCoordinates.latitude.toFixed(
      6
    )} , Lng: ${mouseCoordinates.longitude.toFixed(6)} | `;
    if (element) {
      element.innerHTML = coordinatesText;
    } else {
      const baseSpan = document.createElement("span");
      baseSpan.id = "latlongspan";
      const textNode = document.createTextNode(coordinatesText);
      baseSpan.append(textNode);
      attrDiv.insertBefore(baseSpan, attrDiv.firstChild);
    }
  }, [mouseCoordinates]);

  return (
    <MapContainer center={[41.112, 29.023]} zoom={16} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletDrawer />
      <MouseCoordinates />
      {buildings.buildingsCenter.map((center, index) => (
        <Circle
          key={index}
          center={[center.latitude, center.longitude]}
          radius={3}
          pathOptions={{ color: "red" }}
        />
      ))}
      {centers.centers.map((center, index) => (
        <Circle
          key={index}
          center={[center.latitude, center.longitude]}
          radius={20}
          pathOptions={{ color: randColors[index] }}
        />
      ))}
      {centers.centerBuildings.map((centerBuilding, centerBuildingIndex) =>
        centerBuilding.buildings.map((building, buildingIndex) => (
          <Circle
            key={buildingIndex}
            center={[building.latitude, building.longitude]}
            radius={3}
            pathOptions={{ color: randColors[centerBuildingIndex] }}
          />
        ))
      )}
    </MapContainer>
  );
};

export default BaseMap;

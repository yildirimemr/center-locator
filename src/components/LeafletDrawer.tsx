"use client";

import React, { useEffect, useRef, useState } from "react";
import "node_modules/leaflet-draw/dist/leaflet.draw.css";
import { FeatureGroup, GeoJSON, Rectangle, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setGeoJSON } from "@/redux/features/ObjectsOnMapSlice";
import { setMapBounds } from "@/redux/features/MapBoundsSlice";
import IGeoCoordinates from "@/interfaces/IGeoCoordinates";
import { LatLng, LatLngBounds } from "leaflet";
import IBoundCorners from "@/interfaces/IBoundCorners";
import IMapBounds from "@/interfaces/IMapBounds";

const LeafletDrawer = () => {
  const [screenRec, setScreenRec] = useState<JSX.Element[]>([]);
  const objects = useAppSelector((state) => state.objectsOnMap);
  const dispatch = useAppDispatch();
  const map = useMap();
  const featureGroupRef = useRef<L.FeatureGroup>(null);
  
  const handleChange = () => {
    const objectsOnMap =
      featureGroupRef.current?.toGeoJSON() as GeoJSON.FeatureCollection<any>;
    dispatch(setGeoJSON(objectsOnMap));
  };

  const mapBoundsHandler = (
    center: LatLng,
    zoom: number,
    bounds: LatLngBounds
  ) => {
    const _center: IGeoCoordinates = {
      latitude: center.lat,
      longitude: center.lng,
    };

    const _zoom: number = zoom;

    const _boundUpperRight: IGeoCoordinates = {
      latitude: bounds.getNorthEast().lat,
      longitude: bounds.getNorthEast().lng,
    };
    const _boundBottomLeft: IGeoCoordinates = {
      latitude: bounds.getSouthWest().lat,
      longitude: bounds.getSouthWest().lng,
    };
    const _boundUpperLeft: IGeoCoordinates = {
      latitude: _boundUpperRight.latitude,
      longitude: _boundBottomLeft.longitude,
    };
    const _boundBottomRight: IGeoCoordinates = {
      latitude: _boundBottomLeft.latitude,
      longitude: _boundUpperRight.longitude,
    };

    const _upper: IBoundCorners = {
      left: _boundUpperLeft,
      right: _boundUpperRight,
    };
    const _bottom: IBoundCorners = {
      left: _boundBottomLeft,
      right: _boundBottomRight,
    };

    const _bounds: IMapBounds = {
      upper: _upper,
      bottom: _bottom,
      center: _center,
      zoomLevel: _zoom,
    };

    dispatch(setMapBounds(_bounds));
  };

  useEffect(() => {
    const attrDiv = document.getElementsByClassName(
      "leaflet-draw-toolbar-top"
    )[0];
    const aElement = document.createElement("a");
    aElement.className = "custom-draw-button";
    aElement.title = "Screen to polygon";
    aElement.addEventListener("click", function handleClick(event) {
      const mapBounds = map.getBounds();
      const mapZoomLevel = map.getZoom();
      const mapCenter = map.getCenter();
      mapBoundsHandler(mapCenter, mapZoomLevel, mapBounds);
      const recElement = (
        <Rectangle bounds={mapBounds} key={Date.now()}/>
      );
      setScreenRec((current) => [...current, recElement]);
    });
    attrDiv.appendChild(aElement);
  }, []);

  useEffect(() => {
    handleChange();
  }, [screenRec]);

  useEffect(() => {
    if (objects.features.length === 0){
      featureGroupRef.current?.clearLayers()
    }
  }, [objects])
  
  return (
    <FeatureGroup ref={featureGroupRef}>
      <EditControl
        position="topright"
        onEdited={handleChange}
        onCreated={handleChange}
        onDeleted={handleChange}
        draw={{
          circlemarker: false,
          marker: false,
          polyline: false,
          circle: false,
          polygon: true,
          rectangle: true,
        }}
      />
      {screenRec.map((element) => element)}
    </FeatureGroup>
  );
};

export default LeafletDrawer;

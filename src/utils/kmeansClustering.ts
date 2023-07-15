import ICenterBuildings from "@/interfaces/ICenterBuildings";
import ICenters from "@/interfaces/ICenters";
import IGeoCoordinates from "@/interfaces/IGeoCoordinates";
import kmeans from "kmeans-ts";
import { KMeans } from "kmeans-ts";

const kmeansClustering = (
  geoCoordinates: IGeoCoordinates[],
  numberOfCenters: number,
  isCentersOnBuildings: boolean
): ICenters | null => {
  try {
    const data: Array<Array<number>> = [];
    geoCoordinates.forEach((i) => {
      data.push([i.latitude, i.longitude]);
    });
    if (data.length === 0) {
      return null;
    }

    const result: ICenters = {
      numberOfCenters: 0,
      centers: [],
      centerBuildings: [],
    };
    const centerBuildings: ICenterBuildings[] = [];
    const _kmeans: KMeans = kmeans(data, numberOfCenters, "kmeans++", 20);

    for (let i = 0; i < _kmeans.centroids.length; i++) {
      let _center: IGeoCoordinates = {
        latitude: _kmeans.centroids[i][0],
        longitude: _kmeans.centroids[i][1],
      };
      const _buildings: IGeoCoordinates[] = [];
      for (let j = 0; j < _kmeans.indexes.length; j++) {
        if (_kmeans.indexes[j] === i) {
          _buildings.push(geoCoordinates[j]);
          continue;
        }
      }
      centerBuildings.push({ center: _center, buildings: _buildings });
      result.centers.push(_center);
    }

    //TODO : review this condition more effective
    if (isCentersOnBuildings){
      const newCenters : IGeoCoordinates[] = []
      centerBuildings.forEach(i => {
        const distances: number[] = []
        i.buildings.forEach((j) => {
          const dLat = i.center.latitude - j.latitude
          const dLong = i.center.longitude - j.longitude
          const distance = Math.sqrt(Math.pow(dLat,2) + Math.pow(dLong,2))
          distances.push(distance)
        })
        const minValue:number = Math.min(...distances)
        const minValueIndex : number = distances.indexOf(minValue)
        const newCenter:IGeoCoordinates = {
          latitude : i.buildings[minValueIndex].latitude,
          longitude : i.buildings[minValueIndex].longitude,
        }
        newCenters.push(newCenter)
        i.center = newCenter;
      })
      result.centers = newCenters;
    }

    result.centerBuildings = centerBuildings;
    result.numberOfCenters = numberOfCenters;

    return result;
  } catch {
    return null;
  }
};

export default kmeansClustering;

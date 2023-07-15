import IGeoCoordinates from "@/interfaces/IGeoCoordinates";
import ICenterBuildings from "./ICenterBuildings";

export default interface ICenters {
  numberOfCenters: number;
  centers: IGeoCoordinates[];
  centerBuildings : ICenterBuildings[];
}


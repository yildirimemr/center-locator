import IBoundCorners from "./IBoundCorners";
import IGeoCoordinates from "./IGeoCoordinates";

export default interface IMapBounds {
  upper : IBoundCorners
  bottom : IBoundCorners
  zoomLevel: number;
  center: IGeoCoordinates;
}

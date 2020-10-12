export interface AreaInfo {
  citycode: string;
  adcode: string;
  name: string;
  center: string;
  level: string;
  districts: Array<AreaInfo>;
}

export type Symptoms =
  | "temperature"
  | "heartRate"
  | "respirationRate"
  | "bloodOxygen"
  | "cough";

export interface Stats {
  max: number | 0;
  min: number | 0;
  average: number | 0;
}

export type Symptoms = "temperature" | "heartRate" | "bloodOxygen" | "cough";

export interface Stats {
  max: number | 0;
  min: number | 0;
  average: number | 0;
}

import { Threshold } from "../generated/graphql";

export const toThresholdMap = (
  thresholds: Threshold
): Record<string, number[]> => {
  return {
    temperature: [thresholds.temperature],
    bloodOxygen: [thresholds.bloodOxygen],
    respirationRate: [
      thresholds.respirationRateMax,
      thresholds.respirationRateMin,
    ],
    heartRate: [thresholds.heartRateMin, thresholds.heartRateMax],
    cough: [thresholds.cough],
  };
};

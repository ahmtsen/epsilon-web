import { GetSymptomDataByUserQuery } from "../generated/graphql";
import { Stats } from "./types";

const average = (array: number[]): number => {
  return array.reduce((sum, x) => sum + x, 0) / array.length;
};

export const calculateStats = (data: GetSymptomDataByUserQuery): Stats => {
  let array: number[] = data.getSymptomDataByUser.data!.map((x) => x.value);
  return {
    max: Math.max(...array),
    min: Math.min(...array),
    average: parseFloat(average(array).toFixed(2)),
  };
};

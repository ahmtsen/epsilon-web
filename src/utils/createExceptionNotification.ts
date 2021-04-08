import { Exception } from "../generated/graphql";

export const createExceptionNotification = (exception: Exception): string => {
  let symptom: string;
  let unit: string;
  if (exception.cause == "temperature") {
    symptom = "Temperature";
    unit = "°C";
  } else if (exception.cause == "bloodOxygen") {
    symptom = "Blood oxygen";
    unit = "%";
  } else if (exception.cause == "heartRate") {
    symptom = "Heart rate";
    unit = "bpm";
  } else if (exception.cause == "respirationRate") {
    symptom = "Respiration rate";
    unit = "breaths/min";
  } else if (exception.cause == "cough") {
    symptom = "Cough count";
    unit = "";
  } else {
    symptom = exception.cause;
    unit = "";
  }

  return `${symptom} symptom is measured ${
    exception.actualValue
  } ${unit} at ${new Date(parseInt(exception.timestamp)).toLocaleString()}.`;
};

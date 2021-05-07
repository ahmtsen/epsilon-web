import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureLow,
  faTint,
  faHeartbeat,
  faHeadSideCough,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Exception } from "../generated/graphql";
import { Symptoms } from "./types";

export const createExceptionDisplay = (exception: Exception): string => {
  if (exception.cause != "cough")
    return `
    <div>
        <p>${getSymptomName(
          exception.cause as Symptoms
        )} symptom exceeded threshold for ${
      exception.anomaly_length
    } data in total of ${exception.data_length}.</p>
  <img width="415px" src="${exception.chart}"/>
    </div>
    `;
  else
    return `
  <div>
      <h4>${getSymptomName(
        exception.cause as Symptoms
      )} symptom exceeded threshold.</h4>
      <p>${exception.anomaly_length} ${getSymptomName(
      exception.cause as Symptoms
    ).toLowerCase()} data is collected. Threshold is ${exception.threshold}.</p>

  </div>
  `;
};

export const getSymptomName = (symptom: Symptoms): string => {
  switch (symptom) {
    case "temperature":
      return "Temperature";
    case "bloodOxygen":
      return "Blood Oxygen";
    case "heartRate":
      return "Heart Rate";
    case "cough":
      return "Cough Count";
    default:
      return "";
  }
};

export const getSymptomIcon = (symptom: Symptoms): React.ReactChild => {
  switch (symptom) {
    case "temperature":
      return <FontAwesomeIcon icon={faTemperatureLow} />;
    case "bloodOxygen":
      return <FontAwesomeIcon icon={faTint} />;
    case "heartRate":
      return <FontAwesomeIcon icon={faHeartbeat} />;
    case "cough":
      return <FontAwesomeIcon icon={faHeadSideCough} />;
    default:
      return "";
  }
};

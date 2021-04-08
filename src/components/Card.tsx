import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CardContainer from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { green, red } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Check, ErrorOutline, MoreVert } from "@material-ui/icons";
import React from "react";
import Swal from "sweetalert2";
import { Questionnaire } from "../generated/graphql";
import { createQuestionnaireDisplay } from "../utils/createQuestionnaireDisplay";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 400,
    },
    warning: {
      backgroundColor: red[500],
      margin: "0",
      padding: "0",
    },
    success: {
      backgroundColor: green[500],
      margin: "0",
      padding: "0",
    },
  })
);
interface CardProps {
  timestamp: Date;
  result: boolean;
  answers: Questionnaire;
}
export const Card: React.FC<CardProps> = ({ timestamp, result, answers }) => {
  const classes = useStyles();
  return (
    <CardContainer className={classes.root}>
      <CardHeader
        action={
          <IconButton
            onClick={() =>
              Swal.fire({
                backdrop: false,
                title: timestamp.toLocaleString(),
                html: createQuestionnaireDisplay(answers),
                icon: result ? "error" : "success",
                confirmButtonText: "Close",
                allowOutsideClick: false,
                footer: "Epsilon Inc. COVID-19 Symptom Tracking",
              })
            }
          >
            <MoreVert />
          </IconButton>
        }
        avatar={
          <Avatar
            aria-label="recipe"
            className={!result ? classes.success : classes.warning}
          >
            {result ? <ErrorOutline /> : <Check />}
          </Avatar>
        }
        title="Questionnaire answered at"
        subheader={timestamp.toLocaleString()}
        titleTypographyProps={{ variant: "subtitle1" }}
        subheaderTypographyProps={{ variant: "h6", color: "primary" }}
      />
    </CardContainer>
  );
};

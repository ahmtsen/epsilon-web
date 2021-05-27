import {
  Backdrop,
  Button,
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Theme
} from "@material-ui/core";
import { Create } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import * as Survey from "survey-react";
import Swal from "sweetalert2";
import { Card } from "../components/Card";
import { NavBar } from "../components/NavBar";
import {
  useCreateQuestionnaireMutation,
  useGetQuestionnaireDataByUserQuery
} from "../generated/graphql";
import { getQuestionnaireResult } from "../utils/getQuestionnaireResult";
import { questionnaireModel } from "../utils/questionnaireModel";
import { useIsAuth } from "../utils/useIsAuth";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "10px",
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    gridItem: {
      padding: "0 15px !important",
    },
    gridContainer: {
      margin: "0 -15px !important",
      width: "unset",
    },
  })
);

export const Questionnaire: React.FC = () => {
  useIsAuth();
  const classes = useStyles();
  const [, createQuestionnaire] = useCreateQuestionnaireMutation();
  const [{ fetching, data }, reExecQuery] =
    useGetQuestionnaireDataByUserQuery();
  const [isNewQuestionnaire, setIsNewQuestionnaire] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useHistory();

  const onComplete = async (survey: Survey.SurveyModel) => {
    setIsNewQuestionnaire(false);
    setIsLoading(true);
    const result = getQuestionnaireResult(survey.data);
    await createQuestionnaire({
      input: {
        timestamp: new Date(),
        question1: survey.data.q1 && JSON.stringify(survey.data.q1),
        question2: survey.data.q2 && JSON.stringify(survey.data.q2),
        question3: survey.data?.q3,
        question4: survey.data.q4 && JSON.stringify(survey.data.q4),
        question5: survey.data?.q5,
        question6: survey.data?.q6,
        result: result,
      },
    });
    setIsLoading(false);
    Swal.fire({
      icon: result ? "error" : "success",
      title: result ? "Seek medical help!" : "Have a nice day!",
      text: result
        ? "Risk found from questionnaire answers! Please seek medical help immediately."
        : "No risk found from questionnaire answers!",
      footer: "Epsilon Inc. COVID-19 Symptom Tracking",
      allowOutsideClick: false,
      backdrop: false,
      confirmButtonText: "OK",
    }).then(() => {
      reExecQuery();
      router.replace("/dashboard");
    });
  };
  const model = new Survey.Model(questionnaireModel);
  Survey.StylesManager.applyTheme("darkblue");

  if (fetching || !data || isLoading) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress size={150} color="inherit" />
      </Backdrop>
    );
  }
  return (
    <NavBar>
      <Button
        size="large"
        startIcon={<Create />}
        variant="contained"
        color="primary"
        onClick={() => setIsNewQuestionnaire(true)}
      >
        New Questionnaire
      </Button>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {data.getQuestionnaireDataByUser.questionnaires
            ? data.getQuestionnaireDataByUser.questionnaires.map(
                (questionnaire) => {
                  return (
                    <Grid item lg={3} key={questionnaire.id}>
                      <Card
                        result={questionnaire.result}
                        timestamp={new Date(parseInt(questionnaire.timestamp))}
                        answers={questionnaire}
                      />
                    </Grid>
                  );
                }
              )
            : null}
        </Grid>
      </div>
      {isNewQuestionnaire && (
        <Survey.SurveyWindow
          model={model}
          onComplete={onComplete}
          isExpanded={true}
        />
      )}
    </NavBar>
  );
};

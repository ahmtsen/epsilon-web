import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import * as Survey from "survey-react";
import { NavBar } from "../components/NavBar";
import {
  useCreateQuestionnaireMutation,
  useGetQuestionnaireDataByUserQuery,
} from "../generated/graphql";
import { getQuestionnaireResult } from "../utils/getQuestionnaireResult";
import { questionnaireModel } from "../utils/questionnaireModel";
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircleOutlineSharp,
} from "@material-ui/icons";
import { CardItem } from "../components/CardItem";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
  })
);

export const Questionnaire: React.FC = () => {
  const classes = useStyles();
  const router = useHistory();
  const [, createQuestionnaire] = useCreateQuestionnaireMutation();
  const [{ fetching, data }] = useGetQuestionnaireDataByUserQuery();
  const [isNewQuestionnaire, setIsNewQuestionnaire] = useState(false);

  const onComplete = async (survey: Survey.SurveyModel) => {
    setIsNewQuestionnaire(false);
    await createQuestionnaire({
      input: {
        timestamp: new Date(),
        question1: survey.data.q1 && JSON.stringify(survey.data.q1),
        question2: survey.data.q2 && JSON.stringify(survey.data.q2),
        question3: survey.data?.q3,
        question4: survey.data.q4 && JSON.stringify(survey.data.q4),
        question5: survey.data?.q5,
        question6: survey.data?.q6,
        result: getQuestionnaireResult(survey.data),
      },
    });
    router.replace(router.location);
  };
  const model = new Survey.Model(questionnaireModel);
  Survey.StylesManager.applyTheme("darkblue");

  if (fetching || !data) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress size={150} color="inherit" />
      </Backdrop>
    );
  }

  return (
    <NavBar>
      <Button onClick={() => setIsNewQuestionnaire(true)}>
        New Questionnaire
      </Button>
      <div className={classes.root}>
        <CardItem
          cardTitle={new Date().toISOString()}
          cardContent="Content"
          icon={<CheckCircleOutlineSharp />}
        />
        {data.getQuestionnaireDataByUser.questionnaires ? (
          data.getQuestionnaireDataByUser.questionnaires.map(
            (questionnaire) => {
              return (
                <Accordion
                  key={questionnaire.id}
                  style={{
                    backgroundColor: questionnaire.result
                      ? "#ff0015"
                      : "#55ff00",
                    marginBottom: "20px",
                    color: "white",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      {new Date(
                        parseInt(questionnaire.timestamp)
                      ).toLocaleString()}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{questionnaire.question1}</Typography>
                    <Typography>{questionnaire.question2}</Typography>
                    <Typography>{questionnaire.question3}</Typography>
                    <Typography>{questionnaire.question4}</Typography>
                    <Typography>{questionnaire.question5}</Typography>
                    <Typography>{questionnaire.question6}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            }
          )
        ) : (
          <h1>No Data</h1>
        )}
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

import {
  Avatar,
  Backdrop,
  Card as CardContainer,
  CardHeader,
  CircularProgress,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { MoreVert } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { NavBar } from "../components/NavBar";
import {
  Exception,
  useGetExceptionsQuery,
  useReadExceptionMutation,
} from "../generated/graphql";
import {
  createExceptionDisplay,
  getSymptomIcon,
  getSymptomName,
} from "../utils/createExceptionDisplay";
import { Symptoms } from "../utils/types";
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
    warning: {
      backgroundColor: red[500],
      margin: "0",
      padding: "0",
    },
  })
);
export const Notifications: React.FC = () => {
  useIsAuth();
  const classes = useStyles();
  const [{ fetching, data }, reGetExceptions] = useGetExceptionsQuery();
  const [, readException] = useReadExceptionMutation();
  const [notReadedExceptions, setNotReadedExceptions] = useState<Exception[]>(
    []
  );
  const [readedExceptions, setReadedExceptions] = useState<Exception[]>([]);

  useEffect(() => {
    if (!fetching && data) {
      if (data?.getExceptions.length != 0) {
        const readed = data?.getExceptions.filter((x) => x.readStatus);
        const notReaded = data?.getExceptions.filter((x) => !x.readStatus);
        setNotReadedExceptions(notReaded);
        setReadedExceptions(readed);
      }
    }
  }, [fetching, data]);

  if (fetching || !data) {
    return (
      <NavBar>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress size={150} color="inherit" />
        </Backdrop>
      </NavBar>
    );
  }

  return (
    <NavBar>
      <div className={classes.root}>
        {notReadedExceptions && notReadedExceptions.length != 0 && (
          <div>
            <h1>New Notifications</h1>
            <Grid container spacing={3}>
              {notReadedExceptions?.map((exception) => {
                return (
                  <Grid item lg={3} key={exception.id}>
                    <CardContainer className={classes.root}>
                      <CardHeader
                        action={
                          <IconButton
                            onClick={async () => {
                              Swal.fire({
                                backdrop: false,
                                title: new Date(
                                  exception.timestamp
                                ).toLocaleString(),
                                html: createExceptionDisplay(exception),
                                icon: "error",
                                confirmButtonText: "Close",
                                allowOutsideClick: false,
                                footer:
                                  "Epsilon Inc. COVID-19 Symptom Tracking",
                              });
                              await readException({ id: exception.id });
                              reGetExceptions();
                            }}
                          >
                            <MoreVert />
                          </IconButton>
                        }
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.warning}
                          >
                            {getSymptomIcon(exception.cause as Symptoms)}
                          </Avatar>
                        }
                        title={getSymptomName(exception.cause as Symptoms)}
                        subheader={new Date(
                          exception.timestamp
                        ).toLocaleString()}
                        titleTypographyProps={{ variant: "subtitle1" }}
                        subheaderTypographyProps={{
                          variant: "h6",
                          color: "primary",
                        }}
                      />
                    </CardContainer>
                  </Grid>
                );
              })}
            </Grid>
            <hr />
          </div>
        )}
        <Grid container spacing={3}>
          {readedExceptions
            ? readedExceptions.map((exception) => {
                return (
                  <Grid item lg={3} key={exception.id}>
                    <CardContainer className={classes.root}>
                      <CardHeader
                        action={
                          <IconButton
                            onClick={() =>
                              Swal.fire({
                                backdrop: false,
                                title: new Date(
                                  exception.timestamp
                                ).toLocaleString(),
                                html: createExceptionDisplay(exception),
                                icon: "error",
                                confirmButtonText: "Close",
                                allowOutsideClick: false,
                                footer:
                                  "Epsilon Inc. COVID-19 Symptom Tracking",
                              })
                            }
                          >
                            <MoreVert />
                          </IconButton>
                        }
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.warning}
                          >
                            {getSymptomIcon(exception.cause as Symptoms)}
                          </Avatar>
                        }
                        title={getSymptomName(exception.cause as Symptoms)}
                        subheader={new Date(
                          exception.timestamp
                        ).toLocaleString()}
                        titleTypographyProps={{ variant: "subtitle1" }}
                        subheaderTypographyProps={{
                          variant: "h6",
                          color: "primary",
                        }}
                      />
                    </CardContainer>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </div>
    </NavBar>
  );
};

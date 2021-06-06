import {
    Backdrop,
    CircularProgress,
    createStyles,
    makeStyles,
    Theme
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { NavBar } from "../components/NavBar";
import { useGetUserThresholdQuery } from "../generated/graphql";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    table: {
      maxWidth: 300,
    },
  })
);

export const Profile: React.FC = () => {
  const classes = useStyles();
  const [{ data, fetching }] = useGetUserThresholdQuery();

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
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Symptom</TableCell>
              <TableCell align="right">Threshold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Temperature
              </TableCell>
              <TableCell align="right">
                {data.getUserThreshold.temperature}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Blood Oxygen
              </TableCell>
              <TableCell align="right">
                {data.getUserThreshold.bloodOxygen}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Heart Rate Minimum
              </TableCell>
              <TableCell align="right">
                {data.getUserThreshold.heartRateMin}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Heart Rate Maximum
              </TableCell>
              <TableCell align="right">
                {data.getUserThreshold.heartRateMax}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Cough Count
              </TableCell>
              <TableCell align="right">{data.getUserThreshold.cough}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </NavBar>
  );
};

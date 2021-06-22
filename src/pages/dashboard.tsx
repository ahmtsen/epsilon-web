import {
  faHeadSideCough,
  faHeartbeat,
  faTemperatureLow,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Backdrop,
  CircularProgress,
  makeStyles,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { NavBar } from "../components/NavBar";
import SymptomLayout from "../components/SymptomLayout";
import { TabPanel } from "../components/TabPanel";
import { useGetUserThresholdQuery, useMeQuery } from "../generated/graphql";
import { toThresholdMap } from "../utils/toThresholdMap";
import { useIsAuth } from "../utils/useIsAuth";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
function a11yProps(index: number) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const Dashboard: React.FC = () => {
  useIsAuth();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };
  const [thresholds, setThresholds] =
    useState<ReturnType<typeof toThresholdMap>>();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState<number>(0);
  const [{ fetching, data }] = useGetUserThresholdQuery();
  const [{ data: me, fetching: meFetch }] = useMeQuery();
  const router = useHistory();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    socket.on("data", () => {
      setRefresh(Math.random() * 100);
    });
  }, []);
  useEffect(() => {
    if (!fetching && data) {
      if (!meFetch && me?.me?.questionnaireNeeded === true && !shown) {
        setShown(true);
        Swal.fire({
          icon: "info",
          title: "Daily Questionnaire",
          text: "Please do not forget to answer daily questionnaire!",
          footer: "Epsilon Inc. COVID-19 Symptom Tracking",
          allowOutsideClick: false,
          backdrop: false,
          confirmButtonText: "ANSWER",
        }).then(async (result) => {
          if (result.isConfirmed) {
            router.push("/questionnaire");
          }
        });
      }
    }
  }, [me, meFetch, data, fetching]);

  useEffect(() => {
    if (!fetching) {
      if (data?.getUserThreshold.temperature) {
        setThresholds(toThresholdMap(data.getUserThreshold));
      }
      setIsLoading(false);
    }
  }, [fetching, data]);
  if (isLoading || !thresholds) {
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
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            centered
          >
            <Tab
              label="Temperature"
              icon={<FontAwesomeIcon size="2x" icon={faTemperatureLow} />}
              {...a11yProps(0)}
            />
            <Tab
              label="Heart Rate"
              icon={<FontAwesomeIcon size="2x" icon={faHeartbeat} />}
              {...a11yProps(1)}
            />
            <Tab
              label="Blood Oxygen"
              icon={<FontAwesomeIcon size="2x" icon={faTint} />}
              {...a11yProps(2)}
            />
            <Tab
              label="Cough Count"
              icon={<FontAwesomeIcon size="2x" icon={faHeadSideCough} />}
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <SymptomLayout
            title="Temperature"
            symptom="temperature"
            unit="°C"
            refresh={refresh}
            thresholds={thresholds.temperature}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SymptomLayout
            title="Heart Rate"
            symptom="heartRate"
            unit="bpm"
            refresh={refresh}
            thresholds={thresholds.heartRate}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SymptomLayout
            title="Blood Oxygen"
            symptom="bloodOxygen"
            unit="%"
            refresh={refresh}
            thresholds={thresholds.bloodOxygen}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SymptomLayout
            title="Cough Count"
            symptom="cough"
            unit="coughs/day"
            refresh={refresh}
            thresholds={thresholds.cough}
          />
        </TabPanel>
      </div>
    </NavBar>
  );
};

import {
  faHeadSideCough,
  faHeartbeat,
  faLungs,
  faTemperatureLow,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, makeStyles, Tab, Tabs, Theme } from "@material-ui/core";
import React from "react";
import { NavBar } from "../components/NavBar";
import { TabPanel } from "../components/TabPanel";
import { useIsAuth } from "../utils/useIsAuth";
import SymptomLayout from "../components/SymptomLayout";

function a11yProps(index: any) {
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
}));

export const Dashboard = () => {
  useIsAuth();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
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
              label="Respiration Rate"
              icon={<FontAwesomeIcon size="2x" icon={faLungs} />}
              {...a11yProps(3)}
            />
            <Tab
              label="Cough Count"
              icon={<FontAwesomeIcon size="2x" icon={faHeadSideCough} />}
              {...a11yProps(4)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <SymptomLayout
            title="Temperature"
            symptom="temperature"
            unit="degC"
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SymptomLayout title="Heart Rate" symptom="heartRate" unit="bpm" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SymptomLayout title="Blood Oxygen" symptom="bloodOxygen" unit="%" />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SymptomLayout
            title="Respiration Rate"
            symptom="respirationRate"
            unit="breath/min"
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <SymptomLayout title="Cough Count" symptom="cough" unit="cough/day" />
        </TabPanel>
      </div>
    </NavBar>
  );
};

import {
  Backdrop,
  CircularProgress,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGetSymptomDataByUserQuery } from "../generated/graphql";
import { Symptoms } from "../utils/types";
import Graph from "./Graph";
interface SymptomLayoutProps {
  symptom: Symptoms;
  title: string;
  unit: string;
  thresholds: number[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const SymptomLayout: React.FC<SymptomLayoutProps> = ({
  symptom,
  title,
  unit,
  thresholds,
}) => {
  const classes = useStyles();
  const [symptomData, setSymptomData] = useState<unknown[][]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [{ fetching, data }] = useGetSymptomDataByUserQuery({
    variables: { symptom: symptom },
  });
  useEffect(() => {
    if (!fetching && data?.getSymptomDataByUser.data) {
      const sorted = data.getSymptomDataByUser.data.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      const datas = sorted.map((x) => [x.timestamp, x.value]);
      setSymptomData(datas);
    }
    setIsLoading(false);
  }, [fetching, data]);

  if (isLoading) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress size={150} color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Container maxWidth={false} style={{ padding: 0, paddingTop: 30 }}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Graph
            options={{
              id: "chart_" + symptom,
              title: {
                text: title,
                style: {
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#263238",
                },
              },
              annotations: {
                yaxis: thresholds?.map((x) => {
                  return {
                    y: x,
                    borderColor: "#FF0000",
                    label: {
                      borderColor: "#FF0000",
                      style: {
                        color: "#fff",
                        background: "#FF0000",
                        fontSize: "15px",
                      },
                    },
                  };
                }),
              },
              xaxis: {
                type: "datetime",
              },
              stroke: {
                curve: "smooth",
              },
              colors: ["#0c458a"],
              tooltip: {
                x: {
                  format:
                    symptom === "cough" ? "dd MMM yyyy" : "dd MMMM yyyy HH:mm",
                },
                y: {
                  formatter: function (value: string) {
                    return value + " " + unit;
                  },
                },
              },
            }}
            series={[
              {
                name: title,
                data: symptomData,
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SymptomLayout;

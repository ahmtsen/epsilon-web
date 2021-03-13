import {
  Backdrop,
  CircularProgress,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGetSymptomDataByUserQuery } from "../generated/graphql";
import { calculateStats } from "../utils/calculateStats";
import { Stats, Symptoms } from "../utils/types";
import Graph from "./Graph";
interface SymptomLayoutProps {
  symptom: Symptoms;
  title: string;
  unit: string;
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
}) => {
  const classes = useStyles();
  const [stats, setStats] = useState<Stats>();
  const [symptomData, setSymptomData] = useState<any[][]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [range, setRange] = useState(0);
  const [{ fetching, data }] = useGetSymptomDataByUserQuery({
    variables: { symptom: symptom },
  });

  useEffect(() => {
    if (!fetching && data?.getSymptomDataByUser.data) {
      setStats(calculateStats(data));
      const sorted = data.getSymptomDataByUser.data.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      const datas = sorted.map((x) => [x.timestamp, x.value]);
      setSymptomData(datas);
      setIsLoading(false);
      const _range =
        new Date(datas![datas!.length - 1][0]).getTime() -
        (datas!.length - 100 < 0
          ? new Date(datas![0][0]).getTime()
          : new Date(datas![datas!.length - 100][0]).getTime());
      console.log(_range);
      setRange(-1 * _range);
    }
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
            title={title}
            options={{
              id: "chart_" + symptom,
              chart: {
                events: {
                  beforeZoom: function (ctx: any) {
                    ctx.w.config.xaxis.range = undefined;
                  },
                },
              },
              annotations: {
                yaxis: [
                  {
                    y: 38,
                    borderColor: '#FF0000',
                    label: {
                      borderColor: '#FF0000',
                      style: {
                        color: '#fff',
                        background: '#FF0000',
                        fontSize:'15px'
                      },
                      text: 'Threshold'
                    }
                  }
                ],
              },
              xaxis: {
                type: "datetime",
                range: range,
              },
              stroke: {
                curve: "smooth",
              },
              colors: ["#000000"],
              tooltip: {
                x: {
                  format: "dd MMM yyyy hh:mm",
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

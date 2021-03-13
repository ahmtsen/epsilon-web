import { Box, Card, CardHeader, Divider } from "@material-ui/core";
import React from "react";
import Chart from "react-apexcharts";
interface GraphProps {
  title: string;
  options: object;
  series: any[];
}

const Graph: React.FC<GraphProps> = ({ title, options, series }) => {
  return (
    <Card>
      <Divider />
      <Box>
        <Chart options={options} series={series} type="line" height={740} />
      </Box>
    </Card>
  );
};

export default Graph;

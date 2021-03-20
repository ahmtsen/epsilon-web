import { Box, Card, Divider } from "@material-ui/core";
import React from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";
interface GraphProps {
  options: Record<string, unknown>;
  series: unknown[];
}

const Graph: React.FC<GraphProps> = ({ options, series }) => {
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

Graph.propTypes = {
  options: PropTypes.any.isRequired,
  series: PropTypes.arrayOf(PropTypes.any).isRequired,
};

import React from "react";
import Plot from "react-plotly.js";
const LineChart = ({
  x1,
  y1,
  title,
  code,
  description,
  date,
  xAxisLabel,
  yAxisLabel,
  experimentType,
  height,
  width,
}) => {
  //import more props for x and y axis for other plots - maybe set limit of up to 5?
  return (
    <div>
      <Plot
        data={[
          { x: x1, y: y1, line: { color: "#B188" } },
          // { type: "line", x: [-1, -0.5], y: [0.0005, 0.0008] },
          // { type: "line", x: x2, y: y2 },
        ]}
        layout={{
          title: {
            text: title,
            // font: {
            //   family: "Courier New, monospace",
            //   size: 24,
            // },
            // xref: "paper",
            // x: 0.05,
          },
          height: height,
          width: width,
          xaxis: {
            title: xAxisLabel,
          },
          yaxis: {
            title: yAxisLabel,
          },
          // paper_bgcolor: "#e0bab4",
          plot_bgcolor: "#f7eeec",
        }}
      />
    </div>
  );
};

export default LineChart;

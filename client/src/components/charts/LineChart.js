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
  let lineColor;

  if (experimentType === "characterisation") {
    lineColor = "#6C5DD3";
  } else if (experimentType === "electrochemistry") {
    lineColor = "#7FBA7A";
  } else if (experimentType === "photocatalysis") {
    lineColor = "#FFCE73";
  } else if (experimentType === "battery") {
    lineColor = "#FFA2C0";
  } else if (experimentType === "exploratory") {
    lineColor = "#F45252";
  }
  return (
    <div>
      <Plot
        data={[
          { x: x1, y: y1, line: { color: lineColor } }, //#B17BFF //#B188
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
            // showgrid: false,
          },
          yaxis: {
            title: yAxisLabel,
            // showgrid: false,
          },
          // paper_bgcolor: "#e0bab4",
          plot_bgcolor: "#f7eeec",
        }}
      />
    </div>
  );
};

export default LineChart;

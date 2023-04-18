import React from "react";
import LineChart from "components/charts/LineChart";

import {
  Typography,
  Box,
  Card,
  List,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

const PlotCard = ({
  title,
  code,
  experimentType,
  date,
  id,
  x,
  y,
  xAxisLabel,
  yAxisLabel,
}) => {
  let tagColor;

  if (experimentType === "characterisation") {
    tagColor = "#6C5DD3";
  } else if (experimentType === "electrochemistry") {
    tagColor = "#7FBA7A";
  } else if (experimentType === "photocatalysis") {
    tagColor = "#FFCE73";
  } else if (experimentType === "battery") {
    tagColor = "#FFA2C0";
  } else if (experimentType === "exploratory") {
    tagColor = "#F45252";
  }

  return (
    <Link to={`/plots/show/${id}`} key={id}>
      <Card
        variant="outlined"
        sx={{
          maxWidth: "500px",
          // textDecoration: "none",
          padding: "10px",
          // bgcolor: "#f4f5fe",
          bgcolor: "#ffffff",
          "&:hover": {
            boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.3)",
          },
          cursor: "pointer",
          borderRadius: "10px",
          m: "10px",
        }}
        elevation={0}
      >
        <Box width="100%" sx={{ borderRadius: "10px" }}>
          <LineChart
            x1={x}
            y1={y}
            height={400}
            width={500}
            experimentType={experimentType}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
            date={date}
            title={title}
          />
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "10px",
            paddingX: "5px",
          }}
        >
          <Stack direction="column" gap={1}>
            <Typography fontSize={16} fontWeight={500} color="#11142d">
              {code}
            </Typography>
            {/* <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place sx={{ fontSize: 18, color: "#11142d", marginTop: 0.5 }} />
          <Typography fontSize={14} color="#808191">
            {location}
          </Typography>
          </Stack> */}
          </Stack>
          <Stack direction="column" gap={1} alignItems="flex-end">
            {/* add here - if experimentType === 'certainexperiment' render <Box bgcolor='colour....'></Box> */}

            <Box
              px={1.5}
              py={0.5}
              borderRadius={1}
              // bgcolor="#b988ff"
              bgcolor={tagColor}
              height="fit-content"
            >
              <Typography
                fontSize={12}
                fontWeight={600}
                color="#fcfcfc"
                textTransform="capitalize"
              >
                {experimentType}
              </Typography>
            </Box>
            <Typography fontSize={14} color="#11142D">
              {/* {date.toString().split("T")[0].replaceAll("-", "/")} */}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
  // return <List>{title}</List>;
};

export default PlotCard;

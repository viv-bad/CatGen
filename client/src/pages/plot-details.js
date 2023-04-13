import { Box, Typography, Stack, Rating } from "@mui/material";
import { Place, Star } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useParams, useNavigate } from "react-router-dom";
import LineChart from "components/charts/LineChart";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";

const PlotDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const plotDetails = data?.data ?? {};
  console.log(plotDetails);
  const {
    title,
    code,
    description,
    _id,
    experimentType,
    location,
    rating,
    date,
    x,
    y,
    xAxisLabel,
    yAxisLabel,
  } = plotDetails;

  if (isLoading) {
    return <div>Loading plot...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const handleDeletePlot = () => {
    const response = window.confirm(
      `Are you sure you want to delete this plot?`
    );
    if (response) {
      mutate(
        {
          resource: "plots",
          id,
        },
        {
          onSuccess: () => {
            navigate("/plots");
          },
        }
      );
    }
  };

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
    <div>
      <Box
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        width="fit-content"
      >
        <Typography fontSize={25} fontWeight={500} color="#11142d">
          Details for plot
        </Typography>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          {code}
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          gap={4}
        >
          <Box flex={1} maxwidth={764}>
            <LineChart
              height={600}
              width={800}
              x1={x}
              y1={y}
              title={title}
              code={code}
              description={description}
              experimentType={experimentType}
              date={date}
              xAxisLabel={xAxisLabel}
              yAxisLabel={yAxisLabel}
              className="property_details_img"
            />

            <Box mt="5px">
              <Stack
                direction="row"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="center"
              >
                <Box
                  px={1.5}
                  py={0.5}
                  borderRadius={1}
                  mb="15px"
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
                <Box>
                  <Rating
                    name="rating-feedback"
                    // defaultValue={rating}
                    // value={experimentDetails.rating}
                    value={rating ? rating : 3}
                    readOnly
                    max={5}
                    emptyIcon={
                      <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                    // onClick={() => console.log()}
                  />
                </Box>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="center"
              >
                <Box>
                  <Typography fontSize={22} fontWeight={600} color="#11142d">
                    {title}
                  </Typography>

                  <Stack mt={0.5} direction="row" alignItems="center">
                    <Place sx={{ color: "#808191" }} />
                    <Typography fontSize={14} color="#808191">
                      {/* {experimentDetails.location} */}
                      {location}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    mt="10px"
                    color="#11142d"
                  >
                    Completed on:{" "}
                    {/* {date.toString().split("T")[0].replaceAll("-", "/")} */}
                    {/* {date.toString().split("T")[0].replaceAll("-", "/")} */}
                    {date}
                  </Typography>
                  <Stack direction="row" alignItems="flex-end" gap={1}>
                    <Typography
                      fontSize={14}
                      color="#808191"
                      mb={0.5}
                    ></Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack mt="25px" direction="column" gap="10px">
                <Typography fontSize={18} color="#11142D">
                  Plot Details
                </Typography>
                <Typography fontSize={14} color="#808191">
                  {description}
                </Typography>
              </Stack>
            </Box>
          </Box>
          {/* add new box here for user avatar */}
        </Box>
        <button onClick={() => handleDeletePlot()}>DELETE</button>
        <button onClick={() => navigate(`/plots/edit/${plotDetails._id}`)}>
          EDIT
        </button>
      </Box>

      {/*  */}
    </div>
  );
};

export default PlotDetails;

import { Box, Typography, Stack, Rating } from "@mui/material";
import {
  AccountBalance,
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  School,
  Star,
} from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useParams, useNavigate } from "react-router-dom";
import LineChart from "components/charts/LineChart";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { CustomButton } from "components";

function checkImage(url) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const PlotDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity({});

  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const plotDetails = data?.data ?? {};
  // console.log(plotDetails);
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

  const isCurrentUser = user.email === plotDetails.creator.email;

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
                    {date.toString().split("T")[0].replaceAll("-", "/")}
                    {/* {date} */}
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
          <Box
            width="100%"
            flex={1}
            maxWidth={326}
            display="flex"
            flexDirection="column"
            gap="20px"
          >
            <Stack
              width="100%"
              p={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid #E4E4E4"
              borderRadius={2}
            >
              <Stack
                mt={2}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <img
                  src={
                    checkImage(plotDetails.creator.avatar)
                      ? plotDetails.creator.avatar
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                  alt="avatar"
                  width={90}
                  height={90}
                  style={{
                    borderRadius: "100%",
                    objectFit: "cover",
                  }}
                />

                <Box mt="15px">
                  <Typography fontSize={18} fontWeight={600} color="#11142D">
                    {plotDetails.creator.name}
                  </Typography>
                  <Typography mt="5px" fontSize={14} fontWeight={400}>
                    Researcher
                  </Typography>
                </Box>
                <Stack
                  mt="15px"
                  direction="column"
                  alignItems="center"
                  gap={0.5}
                >
                  <Stack mt="5px" direction="row" alignItems="center" gap={0.5}>
                    <AccountBalance sx={{ color: "#808191" }} />
                    <Typography fontSize={14} fontWeight={400} color="#808191">
                      Department of Chemistry
                    </Typography>
                  </Stack>
                  <Stack mt="5px" direction="row" alignItems="center" gap={0.5}>
                    <School sx={{ color: "#808191" }} />
                    <Typography fontSize={14} fontWeight={400} color="#808191">
                      University of Cambridge
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  mt={1.5}
                  fontSize={16}
                  fontWeight={600}
                  color="#11142D"
                >
                  {plotDetails.creator.allPlots.length} Plots
                  {/* change above to 'allExperiments' */}
                </Typography>
              </Stack>
              <Stack
                width="100%"
                mt="25px"
                direction="row"
                flexWrap="wrap"
                gap={2}
              >
                <CustomButton
                  title={!isCurrentUser ? "Message" : "Edit"}
                  backgroundColor="#29bf73"
                  color="#FCFCFC"
                  fullWidth
                  icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                  handleClick={() => {
                    if (isCurrentUser) {
                      navigate(`/plots/edit/${plotDetails._id}`);
                    }
                  }}
                />
                <CustomButton
                  title={!isCurrentUser ? "Call" : "Delete"}
                  backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
                  color="#FCFCFC"
                  fullWidth
                  icon={!isCurrentUser ? <Phone /> : <Delete />}
                  handleClick={() => {
                    if (isCurrentUser) handleDeletePlot();
                  }}
                />
              </Stack>
            </Stack>
            {/* <Stack>
              <img
                src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                width="100%"
                height={306}
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
            </Stack>

            <Box>
              <CustomButton
                title="Book Now"
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
              />
            </Box> */}
          </Box>
        </Box>
        {/* <button onClick={() => handleDeletePlot()}>DELETE</button>
        <button onClick={() => navigate(`/plots/edit/${plotDetails._id}`)}>
          EDIT
        </button> */}
      </Box>

      {/*  */}
    </div>
  );
};

export default PlotDetails;

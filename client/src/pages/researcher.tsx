import React from "react";
import { useList } from "@pankod/refine-core"; //quickly fetch list of useers
import { Box, Grid, Typography } from "@pankod/refine-mui";

import { ResearcherCard } from "components";
import { CircularProgress } from "@pankod/refine-mui";

const Researchers = () => {
  const { data, isLoading, isError } = useList({
    resource: "users",
  });

  const allResearchers = data?.data ?? [];
  // console.log(allResearchers);
  if (isLoading)
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item>
          <Box>
            <Typography
              display="flex"
              flexDirection="column"
              gap={2}
              align="center"
              alignItems="center"
              justifyContent="center"
              fontSize={24}
            >
              Loading Researchers... <CircularProgress color="success" />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  if (isError) return <div>Error.</div>;

  return (
    <div>
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          Researcher List
        </Typography>
        <Box
          mt="20px"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            backgroundColor: "#fcfcfc",
          }}
        >
          {allResearchers.map((researcher) => (
            <ResearcherCard
              key={researcher._id}
              id={researcher._id}
              name={researcher.name}
              email={researcher.email}
              avatar={researcher.avatar}
              noOfExperiments={researcher.allExperiments.length}
              noOfPlots={researcher.allPlots.length}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Researchers;

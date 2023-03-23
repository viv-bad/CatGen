import React from "react";
import { useList } from "@pankod/refine-core"; //quickly fetch list of useers
import { Box, Typography } from "@pankod/refine-mui";

import { ResearcherCard } from "components";

const Researchers = () => {
  const { data, isLoading, isError } = useList({
    resource: "users",
  });

  const allResearchers = data?.data ?? [];
  if (isLoading) return <div>Loading...</div>;
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
              noOfExperiments={researcher.allProperties.length}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Researchers;

import { useOne } from "@pankod/refine-core";
import { Box, CircularProgress, Grid, Typography } from "@pankod/refine-mui";
import { useParams } from "@pankod/refine-react-router-v6";
import { Profile } from "components";

const ResearcherProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  const myProfile = data?.data ?? [];
  console.log(myProfile);
  if (!isLoading)
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
              Loading {myProfile.name.split(" ")[0]}'s Profile{" "}
              <CircularProgress color="success" />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Profile
        type="User"
        name={myProfile.name}
        email={myProfile.email}
        avatar={myProfile.avatar}
        experiments={myProfile.allExperiments}
        plots={myProfile.allPlots}
      />
    </div>
  );
};

export default ResearcherProfile;

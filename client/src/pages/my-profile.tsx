import { Add } from "@mui/icons-material";
import { useGetIdentity, useOne, useTable } from "@pankod/refine-core";
import { CircularProgress } from "@pankod/refine-mui";
import { Box, Grid, Typography } from "@pankod/refine-mui";
import { Navigate, useNavigate } from "@pankod/refine-react-router-v6";
import { CustomButton, Profile } from "components";

const MyProfile = () => {
  const { data: user } = useGetIdentity();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid,
  });
  const navigate = useNavigate();
  const myProfile = data?.data ?? [];

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
              Loading Your Profile... <CircularProgress color="success" />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Profile
        type="My"
        name={myProfile.name}
        email={myProfile.email}
        avatar={myProfile.avatar}
        experiments={myProfile.allExperiments}
        plots={myProfile.allPlots}
      />
    </div>
  );
};

export default MyProfile;

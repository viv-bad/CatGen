import { Add, Email, Phone, Place } from "@mui/icons-material";
import { Box, Stack, Typography } from "@pankod/refine-mui";

import { ProfileProps, PropertyProps, PlotProps } from "interfaces/common";
import ExperimentCard from "./ExperimentCard";
import PlotCard from "./PlotCard";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useGetIdentity, useOne, useTable } from "@pankod/refine-core";
import CustomButton from "./CustomButton";

function checkImage(url: any) {
  let img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const Profile = ({
  type,
  name,
  avatar,
  email,
  experiments,
  plots,
}: ProfileProps) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Stack display="flex" flexDirection="row" justifyContent="space-between">
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          {type} Profile
        </Typography>
        {type === "My" ? (
          <CustomButton
            title="Edit Profile"
            handleClick={() => navigate("/my-profile/edit")}
            backgroundColor="#B153FF"
            color="#fcfcfc"
            icon={<Add />}
          />
        ) : null}
      </Stack>

      <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2.5,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
            width={340}
            height={320}
            alt="abstract"
            className="my_profile-bg"
          />
          <Box
            flex={1}
            sx={{
              marginTop: { md: "58px" },
              marginLeft: { xs: "20px", md: "0px" },
            }}
          >
            <Box
              flex={1}
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              gap="20px"
            >
              <img
                src={
                  checkImage(avatar)
                    ? avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                width={78}
                height={78}
                alt="user_profile"
                className="my_profile_user-img"
              />

              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap="30px"
              >
                <Stack direction="column">
                  <Typography fontSize={22} fontWeight={600} color="#11142D">
                    {name}
                  </Typography>
                  <Typography fontSize={16} color="#808191">
                    Researcher
                  </Typography>
                </Stack>

                <Stack direction="column" gap="30px">
                  <Stack gap="15px">
                    <Typography fontSize={14} fontWeight={500} color="#808191">
                      Address
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap="10px"
                    >
                      <Place sx={{ color: "#11142D" }} />
                      <Typography fontSize={14} color="#11142D">
                        Department of Chemistry, Lensfield Rd, Cambridge, CB2
                        1EW, UK
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" flexWrap="wrap" gap="20px" pb={4}>
                    <Stack flex={1} gap="15px">
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        color="#808191"
                      >
                        Phone Number
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="10px"
                      >
                        <Phone sx={{ color: "#11142D" }} />
                        <Typography fontSize={14} color="#11142D" noWrap>
                          +0123 456 7890
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack flex={1} gap="15px">
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        color="#808191"
                      >
                        Email
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="10px"
                      >
                        <Email sx={{ color: "#11142D" }} />
                        <Typography fontSize={14} color="#11142D">
                          {email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {experiments.length > 0 && (
        <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
          <Typography fontSize={18} fontWeight={600} color="#11142D">
            {type} Experiments
          </Typography>

          <Box
            mt={2.5}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2.5,
            }}
          >
            {experiments?.map((experiment: PropertyProps) => (
              <ExperimentCard
                key={experiment._id}
                id={experiment._id}
                title={experiment.title}
                code={experiment.code}
                experimentType={experiment.experimentType}
                location={experiment.location}
                date={experiment.date}
                photo={experiment.photo}
              />
            ))}
          </Box>
        </Box>
      )}

      {plots.length > 0 && (
        <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
          <Typography fontSize={18} fontWeight={600} color="#11142D">
            {type} plots
          </Typography>

          <Box
            mt={2.5}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2.5,
            }}
          >
            {plots?.map((plot: PlotProps) => (
              <PlotCard
                key={plot._id}
                title={plot.title}
                code={plot.code}
                experimentType={plot.experimentType}
                date={plot.date}
                // rating={plot.rating}
                id={plot._id}
                x={plot["x"]}
                y={plot["y"]}
                xAxisLabel={plot["xAxisLabel"]}
                yAxisLabel={plot["yAxisLabel"]}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;

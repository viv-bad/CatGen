import React from "react";
import { AgentCardProp, InfoBarProps } from "interfaces/agent";
import {
  Biotech,
  EmailOutlined,
  LocationCity,
  Phone,
  Place,
} from "@mui/icons-material";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import { Link } from "@pankod/refine-react-router-v6";

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack flex={1} minWidth={{ xs: "100%", sm: 300 }} gap={1.5} direction="row">
    {icon}
    <Typography fontSize={14} color="#808191">
      {name}
    </Typography>
  </Stack>
);

const ResearcherCard = ({
  id,
  email,
  name,
  avatar,
  noOfExperiments,
}: AgentCardProp) => {
  const { data: currentUser } = useGetIdentity();

  const generateLink = () => {
    if (currentUser.email === email) return "/my-profile";

    return `/researchers/show/${id}`;
  };

  return (
    <div>
      <Box
        component={Link}
        to={generateLink()}
        width="100%"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "20px",
          padding: "20px",
          "&:hover": {
            boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1",
          },
        }}
      >
        <img
          src={avatar}
          alt="user"
          width={90}
          height={90}
          style={{ borderRadius: 8, objectFit: "cover" }}
        />
        <Stack
          direction="column"
          justifyContent="space-between"
          flex={1}
          gap={{ xs: 4, sm: 2 }}
        >
          <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
            <Typography fontSize={22} fontWeight={600} color="#11142d">
              {name}
            </Typography>
            <Typography fontSize={14} color="#808191">
              Researcher
            </Typography>
          </Stack>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            {/* infobar here */}
            <InfoBar
              icon={<EmailOutlined sx={{ color: "#808191" }} />}
              name={email}
            />

            <InfoBar
              icon={<Place sx={{ color: "#808191" }} />}
              name="Cambridge, UK"
            />

            <InfoBar
              icon={<Phone sx={{ color: "#808191" }} />}
              name="+52 55654611"
            />
          </Stack>

          <InfoBar
            icon={<Biotech sx={{ color: "#808191" }} />}
            name={`${noOfExperiments} Experiments`}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default ResearcherCard;

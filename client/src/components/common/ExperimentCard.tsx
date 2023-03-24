import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@pankod/refine-mui";
import { PropertyCardProps } from "interfaces/property";

const ExperimentCard = ({
  id,
  title,
  code,
  experimentType,
  date,
  location,
  photo,
}: PropertyCardProps) => {
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
  // date = date.toString().split("T")[0].replaceAll("-", "/");
  return (
    <Card
      component={Link}
      to={`/experiments/show/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        // textDecoration: "none",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.2)",
        },
        cursor: "pointer",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo}
        alt="card image"
        sx={{
          borderRadius: "10px",
        }}
      />
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
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place sx={{ fontSize: 18, color: "#11142d", marginTop: 0.5 }} />
            <Typography fontSize={14} color="#808191">
              {location}
            </Typography>
          </Stack>
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
              {/* {date.toString().split("T")[0].replaceAll("-", "/")} */}
              {/* {experimentType[0].toUpperCase() + experimentType.substring(1)} */}
              {experimentType}
            </Typography>
          </Box>
          <Typography fontSize={14} color="#11142D">
            {date.toString().split("T")[0].replaceAll("-", "/")}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ExperimentCard;

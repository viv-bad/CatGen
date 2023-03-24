import { Typography, Box, Stack, Rating } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
  School,
  AccountBalance,
} from "@mui/icons-material";

import { CustomButton } from "components";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const ExperimentDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity({
    // v3LegacyAuthProviderCompatible: true,
  });
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const experimentDetails = data?.data ?? {};

  if (isLoading) {
    return <div>Loading experiment...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const isCurrentUser = user.email === experimentDetails.creator.email;

  const handleDeleteExperiment = () => {
    const response = window.confirm(
      `Are you sure you want to delete this experiment?`
    );
    if (response) {
      mutate(
        {
          resource: "experiments",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/experiments");
          },
        }
      );
    }
  };

  let tagColor;

  if (experimentDetails.experimentType === "characterisation") {
    tagColor = "#6C5DD3";
  } else if (experimentDetails.experimentType === "electrochemistry") {
    tagColor = "#7FBA7A";
  } else if (experimentDetails.experimentType === "photocatalysis") {
    tagColor = "#FFCE73";
  } else if (experimentDetails.experimentType === "battery") {
    tagColor = "#FFA2C0";
  } else if (experimentDetails.experimentType === "exploratory") {
    tagColor = "#F45252";
  }

  const ratingStars = Array.from(
    { length: experimentDetails.rating },
    (_, i) => i + 1
  );

  return (
    <div>
      <Box
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        width="fit-content"
      >
        <Typography fontSize={25} fontWeight={500} color="#11142d">
          Details for experiment
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {experimentDetails.code}
          </Typography>
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          gap={4}
        >
          <Box flex={1} maxWidth={764}>
            <img
              src={experimentDetails.photo}
              alt={experimentDetails.title}
              height={400}
              // height={400}
              // width={400}
              style={{
                objectFit: "scale-down",
                borderRadius: "10px",
              }}
              className="property_details-img" //change to experiment_details-img
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
                    {experimentDetails.experimentType}
                  </Typography>
                </Box>
                <Box>
                  {/* {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={`star-${1}`} sx={{ color: "#f2c94c" }} /> // make dynamic
                  ))} */}
                  {/* {ratingStars.map((star) => (
                    <Star
                      key={`star-${star}`}
                      sx={{ color: "#f2c94c", opacity: 0.8 }}
                    /> // make dynamic
                  ))} */}

                  <Rating
                    name="rating-feedback"
                    // defaultValue={experimentDetails.rating}
                    value={experimentDetails.rating}
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
                  <Typography
                    fontSize={22}
                    fontWeight={600}
                    color="#11142d"
                    // textTransform="capitalize"
                  >
                    {experimentDetails.title}
                  </Typography>

                  <Stack mt={0.5} direction="row" alignItems="center">
                    <Place sx={{ color: "#808191" }} />
                    <Typography fontSize={14} color="#808191">
                      {experimentDetails.location}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  {/* add furhter property details here, such as price, description etc... */}
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    mt="10px"
                    color="#11142d"
                  >
                    Completed on:{" "}
                    {experimentDetails.date
                      .toString()
                      .split("T")[0]
                      .replaceAll("-", "/")}
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
                  Experimental Details
                </Typography>
                <Typography fontSize={14} color="#808191">
                  {experimentDetails.description}
                </Typography>
              </Stack>
            </Box>
          </Box>
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
                    checkImage(experimentDetails.creator.avatar)
                      ? experimentDetails.creator.avatar
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
                    {experimentDetails.creator.name}
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
                  {experimentDetails.creator.allProperties.length} Experiments
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
                      navigate(`/experiments/edit/${experimentDetails._id}`);
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
                    if (isCurrentUser) handleDeleteExperiment();
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
      </Box>
    </div>
  );
};

export default ExperimentDetails;

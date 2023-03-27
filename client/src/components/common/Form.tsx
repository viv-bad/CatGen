import React from "react";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
} from "@pankod/refine-mui";

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";
import { Star } from "@mui/icons-material";

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  propertyImage,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a property
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0px",
                  fontSize: 16,
                  input: { color: "#11142d" },
                }}
              >
                Experiment Title
              </FormHelperText>
              <TextField
                sx={{
                  input: { color: "#1142d" },
                }}
                width="75%"
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                {...register("title", {
                  required: true,
                })}
              />
            </FormControl>

            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0px",
                  fontSize: 16,
                  input: { color: "#11142d" },
                }}
              >
                Experiment Code
              </FormHelperText>
              <TextField
                sx={{
                  input: { color: "#1142d" },
                }}
                width="25%"
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                {...register("code", {
                  required: true,
                })}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0px",
                fontSize: 16,
                input: { color: "#11142d" },
              }}
            >
              Experimental Details
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Write description"
              color="info"
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#919191",
              }}
              {...register("description", {
                required: true,
              })}
            />
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  input: { color: "#11142d" },
                }}
              >
                Select Experiment Type
              </FormHelperText>
              <Select
                sx={{
                  input: { color: "#1142d" },
                }}
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="exploratory"
                {...register("experimentType", { required: true })}
              >
                <MenuItem value="characterisation">Characterisation</MenuItem>
                <MenuItem value="electrochemistry">Electrochemistry</MenuItem>
                <MenuItem value="exploratory">Exploratory</MenuItem>
                <MenuItem value="photocatalysis">Photocatalysis</MenuItem>
                <MenuItem value="battery">Battery</MenuItem>
                <MenuItem value="fuel cell">Fuel Cell</MenuItem>
                <MenuItem value="Impedance">Impedance</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0px",
                  fontSize: 16,
                  input: { color: "#11142d" },
                }}
              >
                Date of Experiment
              </FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                type="date"
                variant="outlined"
                {...register("date", {
                  required: true,
                })}
              />
            </FormControl>

            {/* add rating out of 5 here */}
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  input: { color: "#11142d" },
                }}
              >
                Experiment rating
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="1"
                {...register("rating", { required: true })}
              >
                <MenuItem value={1}>
                  {[1].map((star) => (
                    <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} /> // make dynamic
                  ))}
                </MenuItem>
                <MenuItem value={2}>
                  {[1, 2].map((star) => (
                    <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} /> // make dynamic
                  ))}
                </MenuItem>
                <MenuItem value={3}>
                  {[1, 2, 3].map((star) => (
                    <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} /> // make dynamic
                  ))}
                </MenuItem>
                <MenuItem value={4}>
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} /> // make dynamic
                  ))}
                </MenuItem>
                <MenuItem value={5}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} /> // make dynamic
                  ))}
                </MenuItem>

                {/* <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem> */}
              </Select>
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0px",
                fontSize: 16,
                input: { color: "#11142d" },
              }}
            >
              Enter Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register("location", {
                required: true,
              })}
            />
          </FormControl>

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography
                color="#11142d"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Upload Plot
              </Typography>
              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontsize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{ wordBreak: "break-all" }}
            >
              {propertyImage?.name}
            </Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;

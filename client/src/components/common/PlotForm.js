import React, { useState } from "react";
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
} from "@mui/material";
import { Star } from "@mui/icons-material";

const PlotForm = ({
  type,
  register,
  onFinish,
  formLoading,
  onFinishHandler,
  handleSubmit,
  handleTitleChange,
  handleCodeChange,
  handleDateChange,
  handleExperimentTypeChange,
  handleXAxisLabelChange,
  handleYAxisLabelChange,
  handleDescriptionChange,
  handleLocationChange,
  handleRatingChange,
  handleOnFileChange,
  handleFileUpload1,
  file,
}) => {
  // const [fileName, setFileName] = useState("");
  return (
    <div>
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          {type} a plot
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
            // onSubmit={handleSubmit(onFinishHandler)}
            // onSubmit={() => console.log("form submitted")}
            // onSubmit={handleFileUpload1}
          >
            <Stack direction="row" gap={4}>
              <FormControl sx={{ flex: 1 }}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0px",
                    fontSize: 16,
                    color: "#11142d",
                  }}
                >
                  Plot Title
                </FormHelperText>
                <TextField
                  width="75%"
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  // add handlechanger here onChange
                  onChange={handleTitleChange}
                  // {...register("title", { required: true })}
                />
              </FormControl>

              {/*  */}

              <FormControl sx={{ flex: 1 }}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0px",
                    fontSize: 16,
                    color: "#11142d",
                  }}
                >
                  Plot Code
                </FormHelperText>
                <TextField
                  width="25%"
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  // add handleChanger here
                  onChange={handleCodeChange}
                />
              </FormControl>
            </Stack>

            {/*  */}

            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0px",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Plot Description
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
                onChange={handleDescriptionChange}
              />
            </FormControl>

            {/*  */}

            <Stack direction="row" gap={4}>
              <FormControl sx={{ flex: 1 }}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                  }}
                >
                  Select Plot Type
                </FormHelperText>
                <Select
                  variant="outlined"
                  color="info"
                  displayEmpty
                  required
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue="exploratory"
                  onChange={handleExperimentTypeChange}
                  //onchange handler here////////////////////////////////////////////////////////////////
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
                    color: "#11142d",
                  }}
                >
                  Date
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  color="info"
                  type="date"
                  variant="outlined"
                  onChange={handleDateChange}
                />
              </FormControl>
              {/* location here */}
              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0px",
                    fontSize: 16,
                    color: "#11142d",
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
                  onChange={handleLocationChange}
                  // onLocationChange here
                  // {...register("location", {
                  //   required: true,
                  // })}
                />
              </FormControl>
              {/* ratings here */}
              <FormControl sx={{ flex: 1 }}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
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
                  defaultValue="3"
                  onChange={handleRatingChange}
                  // onChange function here?
                  // {...register("rating", { required: true })}
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

            {/*  */}

            <Stack direction="row" gap={4}>
              <FormControl sx={{ flex: 1 }}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0px",
                    fontSize: 16,
                    color: "#11142d",
                  }}
                >
                  X-axis Label
                </FormHelperText>
                <TextField
                  width="75%"
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  // add handlechanger here onChange
                  onChange={handleXAxisLabelChange}
                />
              </FormControl>

              {/*  */}

              <FormControl sx={{ flex: 1 }}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0px",
                    fontSize: 16,
                    color: "#11142d",
                  }}
                >
                  Y-axis Label
                </FormHelperText>
                <TextField
                  width="25%"
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  // add handleChanger here
                  onChange={handleYAxisLabelChange}
                />
              </FormControl>
            </Stack>
            {/*  */}

            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnFileChange}
            />
            <button
              type="submit"
              onClick={(e) => {
                handleFileUpload1(e);
              }}
              style={{ width: "5%" }}
            >
              Import CSV
            </button>
            {/* <Button
              // type="submit"
              // title={formLoading ? "Submitting..." : "Submit"}
              backgroundColor="#475be8"
              color="#fcfcfc"
            /> */}
            {/* <Button
              variant="contained"
              color="success"
              sx={{ width: "5%" }}
              onClick={(e) => {
                handleOnSubmit1(e);
              }}
            >
              Submit
            </Button> */}
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default PlotForm;
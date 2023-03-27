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

import { PlotFormProps } from "interfaces/common";
import CustomButton from "./CustomButton";
import { Star } from "@mui/icons-material";

const PlotForm = ({
  type,
  register,
  handleSubmit,
  formLoading,
  handleCsvChange,
  onFinishHandler,
  csvData,
}: // handleImageChange,
// propertyImage,
PlotFormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a plot
      </Typography>
      <form>
        <input type={"file"} accept={".csv"} />
        <button>Import CSV</button>
      </form>
      {/* <Box>
        <form>
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
                    handleCsvChange(e.target.files[0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{ wordBreak: "break-all" }}
            >
              {csvData}
            </Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box> */}
    </Box>
  );
};

export default PlotForm;

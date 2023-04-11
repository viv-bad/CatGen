import { useMemo } from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@pankod/refine-mui";

import { useNavigate } from "@pankod/refine-react-router-v6";
import { ExperimentCard, CustomButton } from "components";

const AllPlots = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  const allPlots = data?.data ?? [];
  console.log(allPlots);

  if (isLoading) return <Typography>Loading Plots...</Typography>;
  if (isError) return <Typography>Error...</Typography>;
  return (
    <div>
      <Box>
        <Box
          mt="20px"
          display="flex"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Stack direction="column" width="100%">
            <Typography fontSize={25} fontWeight={700} color="#11142d">
              {!allPlots.length
                ? "There are no plots to display..."
                : "All Plots"}
            </Typography>
            <Box
              mb={2}
              mt={3}
              display="flex"
              flexDirection="row"
              width="84%"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                flexWrap="wrap"
                mb={{ xs: "20px", sm: 0 }}
              >
                <Box
                  display="flex"
                  gap={2}
                  justifyContent="space-evenly"
                  alignItems="center"
                  justifyItems="center"
                >
                  {/* <CustomButton
                    // title={`Sort by date ${currentDate === "asc" ? "↑" : "↓"}`}
                    // handleClick={() => {
                    //   toggleSort("date");
                    // }}
                    backgroundColor="#B153FF"
                    color="#fcfcfc"
                  /> */}
                  <TextField
                    variant="outlined"
                    color="info"
                    placeholder="Search by title"
                    fullWidth
                    // value={currentFilterValues.title}
                    // onChange={(e) => {
                    //   setFilters([
                    //     {
                    //       field: "title",
                    //       operator: "contains",
                    //       value: e.currentTarget.value
                    //         ? e.currentTarget.value
                    //         : undefined,
                    //     },
                    //   ]);
                    // }}
                  />
                  <Select
                    variant="outlined"
                    color="info"
                    displayEmpty
                    required
                    inputProps={{ "aria-label": "Without label" }}
                    defaultValue=""
                    // value={currentFilterValues.experimentType}
                    // onChange={(e) => {
                    //   setFilters(
                    //     [
                    //       {
                    //         field: "experimentType",
                    //         operator: "eq",
                    //         value: e.target.value,
                    //       },
                    //     ],
                    //     "replace"
                    //   );
                    // }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {[
                      "Characterisation",
                      "Electrochemistry",
                      "Exploratory",
                      "Photocatalysis",
                      "Battery",
                      "Fuel Cell",
                      "Impedance",
                    ].map((type) => (
                      <MenuItem key={type} value={type.toLowerCase()}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CustomButton
            title="Add Experiment"
            handleClick={() => navigate("/plots/create")}
            backgroundColor="#B153FF"
            color="#fcfcfc"
            icon={<Add />}
          />
        </Stack>

        <Box
          mt="20px"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {/* {allExperiments.map((experiment) => (
            <ExperimentCard
              key={experiment._id}
              id={experiment._id}
              experimentType={experiment.experimentType}
              title={experiment.title}
              code={experiment.code}
              date={experiment.date}
              location={experiment.location}
              photo={experiment.photo}
            />
          ))} */}
        </Box>
        {/* Pagination */}
        {/* {allExperiments.length > 0 && (
          <Box display="flex" gap={2} mt={3} flexWrap="wrap">
            <CustomButton
              title="Previous"
              handleClick={() => setCurrent((prev) => prev - 1)}
              backgroundColor="#B153FF"
              color="#fcfcfc"
              disabled={!(current > 1)}
            />
            <Box
              display={{ xs: "hidden", sm: "flex" }}
              alignItems="center"
              gap="5px"
            >
              Page{" "}
              <strong>
                {current} of {pageCount}
              </strong>
            </Box>
            <CustomButton
              title="Next"
              handleClick={() => setCurrent((prev) => prev + 1)}
              backgroundColor="#B153FF"
              color="#fcfcfc"
              disabled={current === pageCount}
            />
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "Without label" }}
              defaultValue={10}
              onChange={(e) => {
                setPageSize(e.target.value ? Number(e.target.value) : 10);
              }}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <MenuItem key={size} value={size}>
                  Show {size}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )} */}
      </Box>
    </div>
  );
};

export default AllPlots;
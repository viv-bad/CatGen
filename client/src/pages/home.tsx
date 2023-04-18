import { useList } from "@pankod/refine-core";
import { CircularProgress, Grid } from "@pankod/refine-mui";
import { Typography, Box, Stack } from "@pankod/refine-mui";

import {
  PieChart,
  ExperimentReferrals,
  TotalExperiments,
  ExperimentCard,
  TopResearcher,
} from "components";
import PlotCard from "components/common/PlotCard";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "experiments",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });
  const latestExperiments = data?.data ?? [];
  // console.log(latestExperiments);

  const plotList = useList({
    resource: "plots",
    config: {
      pagination: {
        pageSize: 2,
      },
    },
  });

  const latestPlots = plotList.data?.data ?? [];

  // console.log(latestPlots);

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
              Loading Dashboard... <CircularProgress color="success" />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  if (isError) return <Typography>Something went wrong...</Typography>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Dashboard
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Experiments completed this month"
          value={68}
          series={[68, 10]}
          colors={["#8C00FF", "#0081FF"]}
        />

        <PieChart
          title="Experiments to do this month"
          value={10}
          series={[68, 78]}
          colors={["#8C00FF", "#0081FF"]}
        />

        <PieChart
          title="Total Experiments Completed"
          value={4322}
          series={[10, 25]}
          colors={["#8C00FF", "#0081FF"]}
        />

        <PieChart
          title="Annual Target of Experiments"
          value={555}
          series={[75, 25]}
          colors={["#8C00FF", "#0081FF"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalExperiments />
        <ExperimentReferrals />
      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Recent Experiments
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestExperiments.map((experiment) => (
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

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Recent Plots
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestPlots.map((experiment) => (
            //@ts-ignore
            <PlotCard
              key={experiment._id}
              title={experiment.title}
              code={experiment.code}
              experimentType={experiment.experimentType}
              date={experiment.date}
              id={experiment._id}
              x={experiment["x"]}
              y={experiment["y"]}
              xAxisLabel={experiment["xAxisLabel"]}
              yAxisLabel={experiment["yAxisLabel"]}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

import { useNavigate } from "@pankod/refine-react-router-v6";
import React, { useState } from "react";
import Papa from "papaparse";
import LineChart from "components/charts/LineChart";
import axios from "axios";
// import PlotList from "./PlotList";
// import { Link, redirect } from "react-router-dom";
import { Typography } from "@mui/material";
import PlotForm from "components/common/PlotForm";
//@ts-ignore
const CreatePlot = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();

  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [experimentType, setExperimentType] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(3);
  const [xAxisLabel, setXAxisLabel] = useState("");
  const [yAxisLabel, setYAxisLabel] = useState("");
  const [xData1, setXData1] = useState();
  const [yData1, setYData1] = useState([]);

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const fileReader = new FileReader();

  // add rating handler?
  //@ts-ignore
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  //@ts-ignore
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  //@ts-ignore

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  //@ts-ignore

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  //@ts-ignore

  const handleExperimentTypeChange = (e) => {
    setExperimentType(e.target.value);
  };
  //@ts-ignore

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  //@ts-ignore

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };
  //@ts-ignore

  const handleXAxisLabelChange = (e) => {
    setXAxisLabel(e.target.value);
  };
  //@ts-ignore

  const handleYAxisLabelChange = (e) => {
    setYAxisLabel(e.target.value);
  };
  //@ts-ignore

  const handleOnFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //
  //@ts-ignore
  const handleFileUpload1 = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = async function (event) {
        //@ts-ignore

        const csvOutput = event.target.result;
        // console.log(csvOutput);
        //@ts-ignore
        const jsonOutput = Papa.parse(csvOutput, {
          header: true,
          skipEmptyLines: true,
          //@ts-ignore

          beforeFirstChunk: function (chunk) {
            var rows = chunk.split(/\r\n|\r|\n/);
            var headings = ["x", "y"];
            //@ts-ignore
            rows[0] = headings.map((heading) => heading);
            return rows.join("\r\n");
          },
          // step: function (results, parser) {
          //   console.log("Raw data:", results.data);
          //   console.log("Raw errors:", results.errors);
          // },
          // complete: function (results, file) {
          //   console.log("Parsing complete:", results, file);
          // },
        });
        //@ts-ignore
        const { data } = jsonOutput;
        //@ts-ignore

        const x = data.map((d) => d["x"]);
        //@ts-ignore

        const y = data.map((d) => d["y"]);
        // console.log(x);
        setXData1(x);
        setYData1(y);

        // data.map((d) => {
        //   const x = [d[0]];
        //   console.log(x);
        //   // setXData1(d[0]);
        //   // setYData1(d[1]);
        // });
        // reassign object keys
        // data.map((d) => {
        //   delete Object.assign(d, { ["E/V"]: d["E / V"] })["E / V"];
        //   delete Object.assign(d, { ["I/A"]: d["I / A"] })["I / A"];
        // });
        // const x = data.map((d) => d["E/V"]);
        // const y = data.map((d) => d["I/A"]);
        // setXData1(x);
        // setYData1(y);

        const response = await axios.post(
          "http://localhost:8080/api/v1/plots",
          {
            title,
            code,
            description,
            experimentType,
            date,
            location,
            rating,
            xAxisLabel,
            yAxisLabel,
            x,
            y,
          }
        );

        console.log(response.data);
      };
      fileReader.readAsText(file);
    }
    navigate("/plots"); //change to make it navigate to /id of what you just uploaded
  };

  const onFinishHandler = async (data) => {
    if (!xData1) return alert("Please select a file!");

    // await onFinish({ ...data, photo: propertyImage.url, email: user.email });
    await onFinish({ ...data, x: xData1, y: yData1 });
  };

  return (
    <div>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        {/* {xData1 ? (
          <LineChart
            x1={xData1}
            y1={yData1}
            title={title}
            code={code}
            description={description}
            experimentType={experimentType}
            date={date}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
          />
        ) : null} */}

        {/* {xData1 ? navigate("/plots") : null} */}
      </div>
      {/* {xData1.length > 1 ? (
        <Typography variant="h4">{file.title} successfully added...</Typography>
      ) : null} */}

      <PlotForm
        //@ts-ignore
        type="Create"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        onFinishHandler={onFinishHandler}
        handleTitleChange={handleTitleChange}
        handleCodeChange={handleCodeChange}
        handleDateChange={handleDateChange}
        handleExperimentTypeChange={handleExperimentTypeChange}
        handleXAxisLabelChange={handleXAxisLabelChange}
        handleYAxisLabelChange={handleYAxisLabelChange}
        handleDescriptionChange={handleDescriptionChange}
        handleLocationChange={handleLocationChange}
        handleRatingChange={handleRatingChange}
        handleOnFileChange={handleOnFileChange}
        handleFileUpload1={handleFileUpload1}
        file={file}
      />
    </div>
  );
};

export default CreatePlot;

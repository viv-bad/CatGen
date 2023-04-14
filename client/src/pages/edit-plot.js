import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import PlotForm from "components/common/PlotForm";
import { useNavigate } from "@pankod/refine-react-router-v6";
import React, { useState } from "react";
import Papa from "papaparse";
import LineChart from "components/charts/LineChart";
import axios from "axios";
import { Typography } from "@mui/material";
//@ts-ignore

const EditPlot = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();

  const [file, setFile] = useState();
  const [fileData, setFileData] = useState({ x: [], y: [] });

  const [xData1, setXData1] = useState();
  const [yData1, setYData1] = useState([]);

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const fileReader = new FileReader();

  const handleOnFileChange = (e) => {
    // console.log("handle file change");
    setFile(e.target.files[0]);
  };

  const handleFileUpload1 = (e) => {
    console.log("handle file upload");
    // e.preventDefault();
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
        });
        //@ts-ignore
        const { data } = jsonOutput;
        //@ts-ignore
        const x = data.map((d) => d["x"]);
        //@ts-ignore

        const y = data.map((d) => d["y"]);
        // console.log(x);
        // console.log(y);
        setXData1(x);
        setYData1(y);
        // console.log(xData1);
        // console.log(yData1);
        // setFileData({ x: x.push(xData1), y: y.push(yData1) });
        // console.log(fileData);
        // console.log(xData1);
        // console.log(yData1);
      };
      fileReader.readAsText(file);
    }
    // navigate("/plots"); //change to make it navigate to /id of what you just uploaded
  };

  const onFinishHandler = async (data) => {
    console.log("handle finish");

    if (!xData1) return alert("Please select a file!");

    await onFinish({
      ...data,
      // x: fileData.x,
      // y: fileData.y,
      x: xData1,
      y: yData1,
      email: user.email,
    });
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
      ></div>

      <PlotForm
        //@ts-ignore
        type="Edit"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        onFinishHandler={onFinishHandler}
        handleOnFileChange={handleOnFileChange}
        handleFileUpload1={handleFileUpload1}
        file={file}
        fileData={fileData}
      />
    </div>
  );
};

export default EditPlot;

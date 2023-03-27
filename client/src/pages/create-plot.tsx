import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";

import Form from "components/common/Form";
import PlotForm from "components/common/PlotForm";

const CreatePlot = () => {
  const { data: user } = useGetIdentity(); //get data from the user using OAuth under the hood
  // use state for csv file here?
  const [csvData, setCsvData] = useState("");
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  // add logic for handleCSV change here
  interface CsvRow {
    [key: string]: string;
  }

  const handleCsvChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          // Step 1: Parse CSV content as string
          resolve(fileReader.result as string);
          // // const csvContent = fileReader.result.toString().trim();

          // // Step 2: Split into rows and extract headers
          // const [headerRow, ...rows] = csvContent.split("\n");
          // const headers = headerRow.split(",");

          // // Step 3: Map row content to an object with header keys
          // const data = rows.map((row) => {
          //   const values = row.split(",");
          //   const rowData: CsvRow = {};
          //   headers.forEach((header, i) => {
          //     rowData[header] = values[i]?.trim() || "";
          //   });
          //   return rowData;
          // });

          // Step 4: Set the data to state
          // setCsvData(data);
        };
        fileReader.readAsText(readFile);
      });
    reader(file).then((result: string) => setCsvData(result));

    // Step 5: Start reading the file
    // reader.readAsText(file);
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!csvData) return alert("Please select a data file.");

    await onFinish({ ...data, data: csvData, email: user.email });
  };

  console.log(csvData);

  // add logic for onfinish handler here

  return (
    <div>
      <PlotForm
        type="Create"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        handleCsvChange={handleCsvChange}
        onFinishHandler={onFinishHandler}
        csvData={csvData}
      />
    </div>
  );
};

export default CreatePlot;

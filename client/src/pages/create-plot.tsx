import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useImport } from "@pankod/refine-core";
import Form from "components/common/Form";
import PlotForm from "components/common/PlotForm";

interface IPostFile {
  title: string;
  categoryId: string;
}

export const PostList: React.FC = () => {
  const { inputProps } = useImport<IPostFile>();

  return <input {...inputProps} />;
};

const CreatePlot = () => {
  const { handleChange, inputProps } = useImport();

  useImport({
    resourceName: "create-plot",
    paparseOptions: {
      header: true,
    },
    onFinish: (result) => {
      result.succeeded.forEach((item) => {
        console.log(item);
      });

      result.errored.forEach((item) => {
        console.log(item);
      });
    },
  });

  // const [csvData, setCsvData] = useState("");
  // const { data: user } = useGetIdentity(); //get data from the user using OAuth under the hood
  // // use state for csv file here?
  // const {
  //   refineCore: { onFinish, formLoading },
  //   register,
  //   handleSubmit,
  // } = useForm();

  // // add logic for handleCSV change here
  // interface CsvRow {
  //   [key: string]: string;
  // }

  // const handleCsvChange = (file: File) => {
  //   const reader = (readFile: File) =>
  //     new Promise<string>((resolve, reject) => {
  //       const fileReader = new FileReader();
  //       fileReader.onload = () => {
  //         // Step 1: Parse CSV content as string
  //         resolve(fileReader.result as string);
  //         // // const csvContent = fileReader.result.toString().trim();

  //         // // Step 2: Split into rows and extract headers
  //         // const [headerRow, ...rows] = csvContent.split("\n");
  //         // const headers = headerRow.split(",");

  //         // // Step 3: Map row content to an object with header keys
  //         // const data = rows.map((row) => {
  //         //   const values = row.split(",");
  //         //   const rowData: CsvRow = {};
  //         //   headers.forEach((header, i) => {
  //         //     rowData[header] = values[i]?.trim() || "";
  //         //   });
  //         //   return rowData;
  //         // });

  //         // Step 4: Set the data to state
  //         // setCsvData(data);
  //       };
  //       fileReader.readAsText(readFile);
  //     });
  //   reader(file).then((result: string) => setCsvData(result));

  //   // Step 5: Start reading the file
  //   // reader.readAsText(file);
  // };

  // const onFinishHandler = async (data: FieldValues) => {
  //   if (!csvData) return alert("Please select a data file.");

  //   await onFinish({ ...data, data: csvData, email: user.email });
  // };

  // console.log(csvData);

  // // add logic for onfinish handler here

  // const [file, setFile] = useState();
  // const [file, setFile] = useState<File | null>(null);
  // const fileReader = new FileReader();

  // // const handleOnChange = (e) => {
  // //   setFile(e.target!.files[0]);
  // // };

  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newFile = e.target.files?.[0];
  //   setFile(newFile || null);
  // };

  // const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();

  //   if (file) {
  //     fileReader.onload = function (event) {
  //       // if (!event.target.files) return;
  //       const csvOutput = event.target?.result;
  //     };
  //     fileReader.readAsText(file);
  //   }
  // };

  // const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();

  //   const fileInput = e.currentTarget.querySelector('input[type="file"]');
  //   if (!fileInput) {
  //     return;
  //   }
  //   const file: File = fileInput.files?.[0];
  //   if (!file || !file.type.includes("csv")) {
  //     return;
  //   }

  //   const fileReader = new FileReader();
  //   fileReader.onload = (event) => {
  //     const csvOutput = event.target?.result;
  //     // further processing of csvOutput
  //   };
  //   fileReader.readAsText(file);
  // };

  return (
    <div>
      CreatePlot
      <input
        {...inputProps}
        type="file"
        onChange={(event) => {
          if (event.target.files) {
            handleChange({
              file: event.target.files[0],
            });
          }
        }}
      />
      {/* <PlotForm
        type="Create"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        handleCsvChange={handleCsvChange}
        onFinishHandler={onFinishHandler}
        csvData={csvData}
      /> */}
    </div>
  );
};

export default CreatePlot;

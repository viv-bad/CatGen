import React from "react";
import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

import { useNavigate } from "@pankod/refine-react-router-v6";
import Form from "components/common/Form";

const CreateExperiment = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [experimentImage, setExperimentImage] = useState({ name: "", url: "" });

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setExperimentImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!experimentImage.name) return alert("Please select an image");

    await onFinish({ ...data, photo: experimentImage.url, email: user.email });
  };

  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      experimentImage={experimentImage}
    />
  );
};

export default CreateExperiment;

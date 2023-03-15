import { BaseKey } from "@pankod/refine-core";

export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  code: string;
  description: string;
  experimentType: string;
  location: string;
  date: Date | undefined;
}

export interface ExperimentCardProps {
  id?: BaseKey | undefined;
  title: string;
  code: string;
  location: string;
  date: Date;
  photo: string;
}

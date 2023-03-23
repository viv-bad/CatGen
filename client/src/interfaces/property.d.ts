import { BaseKey } from "@pankod/refine-core";

export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
  experimentType: string;
  location: string;
  date: Date | undefined;
}

export interface PropertyCardProps {
  id?: BaseKey | undefined;
  title: string;
  experimentType: string;
  location: string;
  date: Date;
  photo: string;
}

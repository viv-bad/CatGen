export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface ProfileProps {
  type: string;
  name: string;
  avatar: string;
  email: string;
  properties: Array | undefined;
}

export interface PropertyProps {
  //change to ExperimentProps
  _id: string;
  title: string;
  code: string;
  experimentType: string;
  description: string;
  location: string;
  date: Date;
  photo: string;
  creator: string;
}

export interface FormProps {
  type: string;
  register: any;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file) => void;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  propertyImage: { name: string; url: string };
}

export interface PlotFormProps {
  type: string;
  register: any;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleCsvChange: (file) => void;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  csvData: string;
}

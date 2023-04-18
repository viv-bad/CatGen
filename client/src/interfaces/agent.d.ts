import { BaseKey } from "@pankod/refine-core";

export interface AgentCardProp {
  id?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  noOfExperiments: number;
  noOfPlots: number;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}

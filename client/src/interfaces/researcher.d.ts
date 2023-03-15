import { BaseKey } from '@pankod/refine-core';

export interface ResearcherCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
    noOfExperiments: number
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}

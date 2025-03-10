import type { DataState } from "./hooks/types";
import type { StepProps } from "./Step";

export interface WizardStepStateProps {
  index: number;
  active: boolean;
  order?: number;
}

export interface WizardProps {
  exitTo?: string;
  cancelTo?: string;
  initialValues?: DataState;
  steps: StepProps[];
}

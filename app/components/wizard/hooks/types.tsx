import type { StepProps } from '../Step';
import type { FormDataProps } from '~/components/domainSpecific/FormSchemaView';

export interface State {
  currentStep: string;
  currentStepIndex: number;
  steps: StepProps[];
  formId: string;
  submit: boolean;
}

export interface DataState extends FormDataProps {}

export type DataStateAction = {
  type: "update";
  payload: DataState,
}

export type StateAction =
  | { type: "update" }
  | { type: "nextStep" }
  | { type: "previousStep" }
  | { type: "submit" }
  | { type: "clearSubmit" };

import type { StepProps } from '../Step';
import type { FormDataProps } from '~/components/domainSpecific/FormSchemaView';

export enum ActionTypes {
  Update = 'update',
  NextStep = 'nextStep',
  PreviousStep = 'previousStep',
  Submit = 'submit',
  ClearSubmit = 'clearSubmit',
}
export interface State {
  currentStep: string;
  currentStepIndex: number;
  steps: StepProps[];
  formId: string;
  submit: boolean;
}

export interface DataState extends FormDataProps {}

export type DataStateAction = {
  type: ActionTypes;
  payload: DataState,
}

export type StateAction =
  | { type: ActionTypes.Update }
  | { type: ActionTypes.NextStep }
  | { type: ActionTypes.PreviousStep }
  | { type: ActionTypes.Submit }
  | { type: ActionTypes.ClearSubmit };

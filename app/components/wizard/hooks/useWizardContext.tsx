// @TODO: Split by reducer, state, and context improve types
import {
  useContext,
  useReducer,
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
} from "react";

import { State, StateAction, ActionTypes } from "./types";

import type { StepProps } from "../Step";

const DEFAULT_FORM_ID = "wizard";
const WizardContext = createContext<State | null>(null);
const WizardDispatchContext = createContext<Dispatch<StateAction> | null>(null);

const stateReducer = (state: State, action: StateAction): State => {
  switch (action.type) {
    case ActionTypes.NextStep: {
      const nextIndex = Math.min(
        state.currentStepIndex + 1,
        state.steps.length - 1,
      );

      return {
        ...state,
        currentStepIndex: nextIndex,
        currentStep: state.steps[nextIndex].step,
        submit: false,
      };
    }

    case ActionTypes.PreviousStep: {
      const nextIndex = Math.max(state.currentStepIndex - 1, 0);

      return {
        ...state,
        currentStepIndex: nextIndex,
        currentStep: state.steps[nextIndex].step,
        submit: false,
      };
    }

    case ActionTypes.Submit: {
      return {
        ...state,
        submit: true,
      };
    }

    case ActionTypes.ClearSubmit: {
      return {
        ...state,
        submit: false,
      };
    }

    default:
      return state;
  }
};

export const WizardProvider: FC<
  PropsWithChildren<{
    steps: StepProps[];
    formId?: string;
  }>
> = ({ steps, formId, children }) => {
  const [currentState, dispatch] = useReducer(stateReducer, {
    currentStepIndex: 0,
    currentStep: steps[0].step,
    steps,
    formId: formId ?? DEFAULT_FORM_ID,
    submit: false,
  });

  if (steps.length === 0) {
    console.warn("[WizardProvider] Steps can't be an empty array");
  }

  return (
    <WizardContext.Provider value={{ ...currentState }}>
      <WizardDispatchContext.Provider value={dispatch}>
        {children}
      </WizardDispatchContext.Provider>
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => {
  const context = useContext(WizardContext);

  if (!context) {
    throw new Error("useWizardContext must be used within a WizardProvider");
  }

  return {
    steps: context.steps,
    currentStepIndex: context.currentStepIndex,
    submit: context.submit,
    shouldSubmit: context.submit,
    currentStep: context.currentStep,
    firstStep: context.currentStepIndex === 0,
    lastStep: context.currentStepIndex === context.steps.length - 1,
    getFormIdForStep: (step: string) => {
      const stepItem = context.steps.find((s) => s.step === step);

      if (!stepItem) {
        console.warn(`[useWizardContext] Invalid step ${step}`);
        return "undefined";
      }

      return `${context.formId}-${stepItem.step}`;
    },
    getFormIdForStepIndex: (stepIndex: number) => {
      if (!context.steps[stepIndex]) {
        console.warn(`[useWizardContext] Invalid step ${stepIndex}`);
        return "undefined";
      }

      return `${context.formId}-${context.steps[stepIndex].step}`;
    },
  };
};

export const useWizardDispatchContext = () => {
  const context = useContext(WizardDispatchContext);

  if (!context) {
    throw new Error(
      "useWizardDispatchContext must be used within a WizardProvider",
    );
  }

  return context;
};

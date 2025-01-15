import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@remix-run/react";
import classNames from "classnames";
import type { Dispatch, FC, PropsWithChildren, ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";
import { Widget, WidgetContent } from "~/components/Widget";
import { Button, ButtonIcon } from "~/ui/Button";
import { Icon } from "~/ui/Icon";

// VIEWS

export const Wizard: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="overflow-hidden flex flex-col gap-6 items-start max-w-5xl max-h-full h-fit w-full py-2">
      {children}
    </div>
  );
};

export const WizardDefaultHeader: FC<{
  exitTo: string;
  cancelTo: string;
  steps: Array<{ step: string; title: string }>;
}> = ({ exitTo, cancelTo, steps }) => {
  const { currentStep } = useWizardContext();

  return (
    <WizardHeader>
      <WizardHeaderBack exitTo={exitTo} />
      <WizardHeaderSteps>
        {steps.map(({ step, title }, index) => (
          <WizardHeaderStep
            key={index}
            index={index}
            active={step === currentStep}
          >
            {title}
          </WizardHeaderStep>
        ))}
      </WizardHeaderSteps>
      <WizardHeaderActions cancelTo={cancelTo} />
    </WizardHeader>
  );
};

export const WizardHeaderBase: FC<{ children?: ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <Widget className={classNames("shrink-0", className)}>
      <WidgetContent>
        <div className="flex flex-nowrap gap-2 justify-between px-4 py-3 rounded">
          {children}
        </div>
      </WidgetContent>
    </Widget>
  );
};

export const WizardHeader: FC<{ children?: ReactNode }> = ({ children }) => {
  return <WizardHeaderBase>{children}</WizardHeaderBase>;
};

export const WizardHeaderBack: FC<{ exitTo: string }> = ({ exitTo }) => {
  const navigate = useNavigate();

  const { firstStep } = useWizardContext();
  const wizardDispatch = useWizardDispatchContext();

  const onBack = () => {
    if (firstStep) {
      navigate(exitTo);
    } else {
      wizardDispatch({ type: "previousStep" });
    }
  };

  return <ButtonIcon icon={faArrowLeft} onClick={() => onBack()} />;
};

export const WizardHeaderActions: FC<{ cancelTo: string }> = ({ cancelTo }) => {
  const navigate = useNavigate();

  const { currentStep, getFormIdForStep } = useWizardContext();

  return (
    <div className="flex gap-2">
      <Button type="button" onClick={() => navigate(cancelTo)}>
        Cancel
      </Button>
      <Button
        form={getFormIdForStep(currentStep)}
        variant="primary"
        type="submit"
        name={"intent"}
      >
        Continue
        <Icon icon={faArrowRight} />
      </Button>
    </div>
  );
};

export const WizardHeaderSteps: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-nowrap gap-6 items-center justify-center">
      {children}
    </div>
  );
};

export const WizardHeaderStep: FC<
  PropsWithChildren<{
    index: number;
    active: boolean;
  }>
> = ({ index, active, children }) => (
  <div className="flex flex-wrap gap-2 items-center justify-center">
    <div
      className={classNames(
        "flex items-center justify-center min-w-[18px] min-h-[18px]",
        "font-mono text-sm leading-none",
        "rounded-md",
        { "bg-grey-90 ": !active },
        { "text-purple-50 border border-purple-50 bg-white": active },
      )}
    >
      {index + 1}
    </div>
    <div
      className={classNames("text-base text-txt-light", {
        "text-purple-50": active,
      })}
    >
      {children}
    </div>
  </div>
);

export const WizardContent: FC<{
  className?: string;
  children?: ReactNode;
}> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        className,
        "overflow-hidden flex flex-col w-full h-fit max-h-full",
      )}
    >
      {children}
    </div>
  );
};

// PROVIDER

interface Step {
  step: string;
  title: string;
}

interface State {
  currentStep: string;
  currentStepIndex: number;
  steps: Step[];
  formId: string;
  submit: boolean;
}

type StateAction =
  | { type: "nextStep" }
  | { type: "previousStep" }
  | { type: "submit" }
  | { type: "clearSubmit" };

const stateReducer = (state: State, action: StateAction): State => {
  switch (action.type) {
    case "nextStep": {
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

    case "previousStep": {
      const nextIndex = Math.max(state.currentStepIndex - 1, 0);

      return {
        ...state,
        currentStepIndex: nextIndex,
        currentStep: state.steps[nextIndex].step,
        submit: false,
      };
    }

    case "submit": {
      return {
        ...state,
        submit: true,
      };
    }

    case "clearSubmit": {
      return {
        ...state,
        submit: false,
      };
    }

    default:
      return state;
  }
};

const defaultFormId = "wizard";

const WizardContext = createContext<State | null>(null);
const WizardDispatchContext = createContext<Dispatch<StateAction> | null>(null);

export const WizardProvider: FC<
  PropsWithChildren<{
    steps: Step[];
    formId?: string;
  }>
> = ({ steps, formId, children }) => {
  const [currentState, dispatch] = useReducer(stateReducer, {
    currentStepIndex: 0,
    currentStep: steps[0].step,
    steps,
    formId: formId ?? defaultFormId,
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

import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  PropsWithChildren,
} from "react";

import type { DataState, DataStateAction } from "./types";

const stateReducer = (state: DataState, action: DataStateAction): DataState => {
  switch (action.type) {
    case "update": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};

const WizardDataContext = createContext<DataState | null>(null);
const WizardDataDispatchContext = createContext<Dispatch<DataStateAction> | null>(
  null
);

export const WizardDataProvider = (props:  PropsWithChildren<{ initialValues?: DataState | null; }>) => {
  const { children, initialValues = {} } = props;
  const [currentState, dispatch] = useReducer(stateReducer, {
    ...initialValues,
  });

  return (
    <WizardDataContext.Provider value={{ ...currentState }}>
      <WizardDataDispatchContext.Provider value={dispatch}>
        {children}
      </WizardDataDispatchContext.Provider>
    </WizardDataContext.Provider>
  );
};

export const useWizardDataContext = () => {
  const context = useContext(WizardDataContext);

  if (!context) {
    throw new Error(
      "useWizardDataContext must be used within a WizardDataProvider"
    );
  }

  return {
    ...context,
  };
};

export const useWizardDataDispatchContext = () => {
  const context = useContext(WizardDataDispatchContext);

  if (!context) {
    throw new Error(
      "useProductDispatchContext must be used within a WizardDataProvider"
    );
  }

  return context;
};

import { useEffect, PropsWithChildren } from "react";
import { useSubmit } from "@remix-run/react";

import {
  useWizardContext,
  useWizardDataContext,
  useWizardDispatchContext,
} from ".";

export const WizardContent = (props: PropsWithChildren) => {
  const { children } = props;

  const submit = useSubmit();
  const { shouldSubmit } = useWizardContext();
  const data = useWizardDataContext();
  const wizardDispatch = useWizardDispatchContext();

  useEffect(() => {
    if (shouldSubmit) {
      // @TODO: Add as a prop API to allow custom submit
      submit(
        { actionType: "create", redirectTo: "/", ...data },
        { method: "POST", encType: "application/json" }
      );

      wizardDispatch({ type: "clearSubmit" });
    }
  }, [shouldSubmit, submit, wizardDispatch, JSON.stringify(data)]);

  return (
    <div className="overflow-hidden flex flex-col gap-6 items-start max-w-5xl max-h-full h-fit w-full py-2">
      {children}
    </div>
  );
};

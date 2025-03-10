import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@remix-run/react";

import { ButtonIcon } from "~/ui/Button";

import { useWizardContext, useWizardDispatchContext } from "../";

import type { WizardHeaderBackProps } from ".";

export const HeaderBack = (props: WizardHeaderBackProps) => {
  const { exitTo } = props;
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

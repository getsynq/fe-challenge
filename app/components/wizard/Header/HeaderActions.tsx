import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@remix-run/react";

import { Button } from "~/ui/Button";
import { Icon } from "~/ui/Icon";

import { useWizardContext } from "../";
import { WizardHeaderActionsProps } from '.'

export const HeaderActions = (props: WizardHeaderActionsProps) => {
  const { cancelTo } = props;
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

import get from "lodash/get";

import { Widget, WidgetContent } from "~/components/Widget";

import { useWizardContext, useWizardDataContext, WizardProps } from "../";
import {
  HeaderBack,
  HeaderStep,
  HeaderActions,
} from ".";


export const Header = (props: WizardProps) => {
  const { exitTo = "/", cancelTo = "/", steps } = props;
  const { currentStep } = useWizardContext();
  const dataContext = useWizardDataContext();

  return (
    <Widget className="shrink-0">
      <WidgetContent>
        <div className="flex flex-nowrap gap-2 justify-between px-4 py-3 rounded">
          <HeaderBack exitTo={exitTo} />
          <div className="flex flex-nowrap gap-6 items-center justify-center">
            {steps.flatMap(({ step, title, order, isVisibleCondition }, index) => {
              // @TODO: Re-use as a common utils
              const { key, value } = isVisibleCondition || { key: '', value: '' };
              const conditionDataValue = get(dataContext, key);
              const shouldRender = isVisibleCondition ? conditionDataValue === value : true;
              return (
                shouldRender ? (
                  <HeaderStep
                    key={`step-${index}`}
                    order={order}
                    index={index}
                    active={step === currentStep}
                  >
                    {title}
                  </HeaderStep>
                ) : []
              )
            })}
          </div>
          <HeaderActions cancelTo={cancelTo} />
        </div>
      </WidgetContent>
    </Widget>
  );
};


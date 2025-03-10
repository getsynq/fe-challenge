import { useCallback } from "react";
import classNames from "classnames";
import { Widget, WidgetContent } from "~/components/Widget";
import FormSchemaView, { FormDataProps } from "~/components/domainSpecific/FormSchemaView";

import {
  useWizardContext,
  useWizardDispatchContext,
  useWizardDataContext,
  useWizardDataDispatchContext,
  ActionTypes,
} from "../";
import { StepProps } from '.';
import get from "lodash/get";

export const Step = (props: StepProps) => {
  const {
    step,
    formSchema,
    formFields,
    isVisibleCondition,
    submitType = ActionTypes.NextStep,
    getChild,
  } = props;

  const { getFormIdForStep, currentStep } = useWizardContext();
  const dataContext = useWizardDataContext();
  const wizardDispatch = useWizardDispatchContext();
  const wizardDataDispatch = useWizardDataDispatchContext();

  // @TODO: Re-use as a common utils
  const { key, value } = isVisibleCondition || { key: '', value: '' };
  const conditionDataValue = get(dataContext, key);
  const shouldRender = isVisibleCondition ? conditionDataValue === value : true;

  const onSubmit = useCallback((submission: FormDataProps = {}) => {
    wizardDataDispatch({ type: ActionTypes.Update, payload: submission });
    wizardDispatch({ type: submitType });
  }, [submitType]);

  return (
    shouldRender ? (
      <Widget className={classNames({ hidden: step !== currentStep })}>
        <WidgetContent className="!overflow-auto">
          <FormSchemaView
            className="h-fit"
            formId={getFormIdForStep(step)}
            initialValues={dataContext}
            onSubmit={({ submission }) => onSubmit(submission)}
            formSchema={formSchema}
            formFields={formFields}
          >
            {getChild ? getChild(dataContext) : null}
          </FormSchemaView>
        </WidgetContent>
      </Widget>
    ) : null
  );
};


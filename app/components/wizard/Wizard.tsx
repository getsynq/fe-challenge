import WizardHeader from './Header'
import Step from './Step'
import {
  WizardProvider,
  WizardDataProvider,
  WizardContent,
  WizardProps,
} from ".";


export const Wizard = (props: WizardProps) => {
  const { steps, initialValues } = props;

  return (
    <WizardProvider steps={steps}>
      <WizardDataProvider initialValues={initialValues}>
        <WizardContent>
          <div className="flex flex-col gap-4 w-full">
            <WizardHeader {...props} />

            <div className="overflow-hidden flex flex-col w-full h-fit max-h-full">
              {steps.flatMap(({ step, title, formFields, formSchema, getChild, isVisibleCondition }, index) => (
                <Step
                  key={`step-${index}`}
                  isVisibleCondition={isVisibleCondition}
                  getChild={getChild}
                  title={title}
                  formFields={formFields}
                  formSchema={formSchema}
                  step={step}
                />
              ))}
            </div>
          </div>
        </WizardContent>
      </WizardDataProvider>
    </WizardProvider>
  );
};

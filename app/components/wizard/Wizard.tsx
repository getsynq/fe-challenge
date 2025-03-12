import WizardHeader from './Header'
import Step from './Step'
import {
  WizardProvider,
  WizardDataProvider,
  WizardContent,
  WizardProps,
} from ".";

// @TODO: Refactor to use other than context/provider hell)) redux/mobX
export const Wizard = (props: WizardProps) => {
  const { steps, initialValues } = props;

  return (
    <WizardProvider steps={steps}>
      <WizardDataProvider initialValues={initialValues}>
        <WizardContent>
          <div className="flex flex-col gap-4 w-full">
            <WizardHeader {...props} />

            <div className="overflow-hidden flex flex-col w-full h-fit max-h-full">
              {steps.map((props, index) => (
                <Step key={`step-${index}`} {...props}/>
              ))}
            </div>
          </div>
        </WizardContent>
      </WizardDataProvider>
    </WizardProvider>
  );
};

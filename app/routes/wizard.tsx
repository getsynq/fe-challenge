import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import classNames from "classnames";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  jsonWithError,
  jsonWithSuccess,
  redirectWithSuccess,
} from "remix-toast";
import { z } from "zod";

import { Summary, SummaryItem } from "~/components/formFields/Summary";
import { Widget, WidgetContent } from "~/components/Widget";
import {
  useWizardContext,
  useWizardDispatchContext,
  Wizard,
  WizardContent,
  WizardHeader,
  WizardHeaderActions,
  WizardHeaderBack,
  WizardHeaderStep,
  WizardHeaderSteps,
  WizardProvider,
} from "~/components/wizard/wizard";
import { FormBaseProps } from "~/models/forms";
import { Checkbox } from "~/ui/Checkbox";
import {
  FormBase,
  FormControl,
  FormControlLabel,
  FormDescription,
  FormField,
  FormGroup,
  FormLabel,
  FormMessage,
  FormRadioGroup,
} from "~/ui/Form";
import { Input, Textarea } from "~/ui/Input";
import { RadioGroupItem } from "~/ui/Radio";
import { fakeDelay } from "~/utils/general";

// FORMS
// Forms should be defined in a separate file. We reuse them most of the time.

// FORM - FOR STEP 1

const options = ["option1", "option2"] as const;

const formStep1Schema = z.object({
  radioGroup: z.enum(options),
});
type FormStep1Schema = z.infer<typeof formStep1Schema>;

const FormStep1: FC<FormBaseProps<FormStep1Schema>> = ({
  formId,
  initialValues,
  className,
  onSubmit,
}) => {
  const [form, { radioGroup }] = useForm<FormStep1Schema>({
    id: formId,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",

    onSubmit(event, { formData, submission }) {
      event.preventDefault();

      if (submission?.status !== "success") {
        console.warn(submission?.error);
        return;
      }
      onSubmit({ formData, submission: submission.value });
    },

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formStep1Schema });
    },

    defaultValue: initialValues,
  });

  return (
    <FormBase autoComplete="off" {...getFormProps(form)} className={className}>
      <FormField>
        <FormLabel>Select option</FormLabel>

        <FormRadioGroup
          name={radioGroup.name}
          defaultValue={radioGroup.initialValue}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              label={option}
              labelFor={`${radioGroup.id}-${index}`}
            >
              <RadioGroupItem value={option} id={`${radioGroup.id}-${index}`} />
            </FormControlLabel>
          ))}
        </FormRadioGroup>
        {radioGroup.errors && (
          <FormMessage variant="error">{radioGroup.errors}</FormMessage>
        )}
      </FormField>
    </FormBase>
  );
};

// FORM - FOR STEP 2A

const formStep2ASchema = z.object({
  description: z
    .string()
    .max(10000, "Description can be at most 256 characters long")
    .optional(),
  checkbox: z.boolean().optional(),
});
type FormStep2ASchema = z.infer<typeof formStep2ASchema>;

const FormStep2A: FC<FormBaseProps<FormStep2ASchema>> = ({
  formId,
  initialValues,
  className,
  onSubmit,
}) => {
  const [form, { checkbox, description }] = useForm<FormStep2ASchema>({
    id: formId,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",

    onSubmit(event, { formData, submission }) {
      event.preventDefault();

      if (submission?.status !== "success") {
        console.warn(submission?.error);
        return;
      }

      onSubmit({ formData, submission: submission.value });
    },

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formStep2ASchema });
    },

    defaultValue: initialValues,
  });

  return (
    <FormBase autoComplete="off" {...getFormProps(form)} className={className}>
      <FormField>
        <FormControlLabel label="You are awesome" labelFor={checkbox.id}>
          <Checkbox
            name={checkbox.name}
            id={checkbox.id}
            defaultChecked={checkbox.initialValue === "on"}
          />
        </FormControlLabel>

        <FormMessage variant="info">
          Choose this if you want to be awesome!
        </FormMessage>
      </FormField>

      <FormField>
        <FormLabel>
          Description <span className="text-txt-light">(optional)</span>
        </FormLabel>
        <FormControl>
          <Textarea
            {...getTextareaProps(description)}
            rows={2}
            placeholder="Add a description"
          />
        </FormControl>

        {description.errors && (
          <FormMessage variant="error">{description.errors}</FormMessage>
        )}
      </FormField>
    </FormBase>
  );
};

// FORM - FOR STEP 2B

const optionsToCheck = ["check1", "check2", "check3"] as const;

const formStep2BSchema = z.object({
  // This is a workaround for zod if we want to have email in optional steps.
  // This is required as we can't pass in undefined as value so we make the empty string a valid value.
  email: z.union([z.string().email(), z.literal("")]),
  checkboxGroup: z
    .array(z.enum(optionsToCheck))
    .nonempty("At least one item must be selected"),
});
type FormStep2BSchema = z.infer<typeof formStep2BSchema>;

const FormStep2B: FC<FormBaseProps<FormStep2BSchema>> = ({
  formId,
  initialValues,
  className,
  onSubmit,
}) => {
  const [form, { email, checkboxGroup }] = useForm<FormStep2BSchema>({
    id: formId,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",

    onSubmit(event, { formData, submission }) {
      event.preventDefault();

      if (submission?.status !== "success") {
        console.warn(submission?.error);
        return;
      }

      onSubmit({ formData, submission: submission.value });
    },

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formStep2BSchema });
    },

    defaultValue: initialValues,
  });

  return (
    <FormBase autoComplete="off" {...getFormProps(form)} className={className}>
      <FormField>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            {...getInputProps(email, { type: "email" })}
            className="w-full"
          />
        </FormControl>

        {email.errors && (
          <FormMessage variant="error">{email.errors}</FormMessage>
        )}
      </FormField>

      <FormField>
        <FormLabel>Checkbox group</FormLabel>
        <FormControl>
          <FormGroup>
            {optionsToCheck.map((option, index) => (
              <FormControlLabel
                label={option}
                labelFor={`${checkboxGroup.id}-${index}`}
                key={index}
              >
                <Checkbox
                  id={`${checkboxGroup.id}-${index}`}
                  name={checkboxGroup.name}
                  value={option}
                  defaultChecked={
                    checkboxGroup.initialValue &&
                    Array.isArray(checkboxGroup.initialValue)
                      ? checkboxGroup.initialValue.includes(option)
                      : checkboxGroup.initialValue === option
                  }
                />
              </FormControlLabel>
            ))}
          </FormGroup>

          {checkboxGroup.errors && (
            <FormMessage variant="error">{checkboxGroup.errors}</FormMessage>
          )}
        </FormControl>
      </FormField>
    </FormBase>
  );
};

// FORM - FOR STEP 3

const formStep3Schema = z.object({
  name: z
    .string()
    .min(3, "Must be at least 3 character long")
    .max(256, "Name can be at most 256 characters long"),
});
type FormStep3Schema = z.infer<typeof formStep3Schema>;

const FormStep3: FC<PropsWithChildren<FormBaseProps<FormStep3Schema>>> = ({
  formId,
  initialValues,
  className,
  children,
  onSubmit,
}) => {
  const [form, { name }] = useForm<FormStep3Schema>({
    id: formId,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",

    onSubmit(event, { formData, submission }) {
      event.preventDefault();

      if (submission?.status !== "success") {
        console.warn(submission?.error);
        return;
      }

      onSubmit({ formData, submission: submission.value });
    },

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formStep3Schema });
    },

    defaultValue: initialValues,
  });

  return (
    <FormBase autoComplete="off" {...getFormProps(form)} className={className}>
      <FormField>
        <FormLabel>Name</FormLabel>
        <FormDescription>Write an awesome name.</FormDescription>

        <FormControl>
          <Input
            {...getInputProps(name, { type: "text" })}
            className="w-full"
          />
        </FormControl>

        {name.errors && (
          <FormMessage variant="error">{name.errors}</FormMessage>
        )}
      </FormField>

      {children}
    </FormBase>
  );
};

// WIZARD DATA PROVIDER

const wizardDataSchema = formStep1Schema
  .merge(formStep2ASchema)
  .merge(formStep2BSchema)
  .merge(formStep3Schema);

type WizardDataSchema = z.infer<typeof wizardDataSchema>;

type State = WizardDataSchema;

type StateAction = { type: "update"; payload: Partial<State> };

const stateReducer = (state: State, action: StateAction): State => {
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

const initialState: State = {
  checkboxGroup: ["check1"],
  email: "",
  radioGroup: "option1",
  name: "",
  description: "",
  checkbox: false,
};

const WizardDataContext = createContext<State | null>(null);
const WizardDataDispatchContext = createContext<Dispatch<StateAction> | null>(
  null
);

const WizardDataProvider: FC<
  PropsWithChildren<{
    initialValues?: State | null;
  }>
> = ({ children, initialValues }) => {
  const [currentState, dispatch] = useReducer(stateReducer, {
    ...(initialValues ?? initialState),
  });

  return (
    <WizardDataContext.Provider value={{ ...currentState }}>
      <WizardDataDispatchContext.Provider value={dispatch}>
        {children}
      </WizardDataDispatchContext.Provider>
    </WizardDataContext.Provider>
  );
};

const useWizardDataContext = () => {
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

const useWizardDataDispatchContext = () => {
  const context = useContext(WizardDataDispatchContext);

  if (!context) {
    throw new Error(
      "useProductDispatchContext must be used within a WizardDataProvider"
    );
  }

  return context;
};

// LOADER

export async function loader() {
  return json({});
}

// ACTION

// Since the wizard has optional sections based on selection on first step
// this whole schema is made optional. This could be refined by only making
// the steps that are dynamic optional.
const actionSchema = wizardDataSchema.partial().extend({
  actionType: z.literal("create"),
  redirectTo: z.string().optional(),
});

export async function action({ request }: ActionFunctionArgs) {
  const json = await request.json();

  const submission = actionSchema.safeParse(json);

  if (!submission.success) {
    throw new Error(`[Test-Action] Invalid action data: ${submission.error}`);
  }

  try {
    // do stuff :)
    await fakeDelay(1000);

    if (submission.data.redirectTo) {
      return redirectWithSuccess("/", "Form submitted successfully.");
    }

    return jsonWithSuccess(
      {
        kind: "success" as const,
      },
      "Form submitted successfully."
    );
  } catch (error) {
    return jsonWithError(
      {
        kind: "error" as const,
      },
      "Could not complete the action."
    );
  }
}

// VIEW

const wizardSteps = [
  { step: "step1", title: "Step 1" },
  { step: "step2", title: "Step 2" },
  { step: "step3", title: "Step 3" },
];

export default function WizardExample() {
  return (
    <div className="overflow-hidden grid grid-cols-1 w-full min-h-screen mx-auto max-w-5xl">
      <WizardProvider steps={wizardSteps}>
        <WizardDataProvider>
          <Wizard>
            <Workflow />
          </Wizard>
        </WizardDataProvider>
      </WizardProvider>
    </div>
  );
}

// WORKFLOW

const Workflow: FC = () => {
  const submit = useSubmit();

  const { steps, currentStep, shouldSubmit } = useWizardContext();
  const data = useWizardDataContext();
  const wizardDispatch = useWizardDispatchContext();

  useEffect(() => {
    if (shouldSubmit) {
      // Submit to action here
      submit(
        { actionType: "create", redirectTo: "/", ...data },
        { method: "POST", encType: "application/json" }
      );

      wizardDispatch({ type: "clearSubmit" });
    }
  }, [shouldSubmit, submit, wizardDispatch]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <WizardHeader>
        <WizardHeaderBack exitTo="/" />
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
        <WizardHeaderActions cancelTo="/" />
      </WizardHeader>

      <WizardContent>
        <Step1 step={steps[0].step} />
        <Step2 step={steps[1].step} />
        <Step3 step={steps[2].step} />
      </WizardContent>
    </div>
  );
};

// STEPS

const Step1: FC<{ step: string }> = ({ step }) => {
  const { getFormIdForStep, currentStep } = useWizardContext();
  const { radioGroup } = useWizardDataContext();
  const wizardDispatch = useWizardDispatchContext();
  const wizardDataDispatch = useWizardDataDispatchContext();

  const onSubmit = (submission: FormStep1Schema) => {
    wizardDataDispatch({ type: "update", payload: submission });
    wizardDispatch({ type: "nextStep" });
  };

  return (
    <Widget className={classNames({ hidden: step !== currentStep })}>
      <WidgetContent className="!overflow-auto">
        <FormStep1
          className={"h-fit"}
          formId={getFormIdForStep(step)}
          initialValues={{ radioGroup }}
          onSubmit={({ submission }) => onSubmit(submission)}
        />
      </WidgetContent>
    </Widget>
  );
};

const Step2: FC<{ step: string }> = ({ step }) => {
  const { getFormIdForStep, currentStep } = useWizardContext();
  const { radioGroup, checkbox, description, email, checkboxGroup } =
    useWizardDataContext();

  const wizardDispatch = useWizardDispatchContext();
  const wizardDataDispatch = useWizardDataDispatchContext();

  const onSubmitA = (submission: FormStep2ASchema) => {
    wizardDataDispatch({ type: "update", payload: submission });
    wizardDispatch({ type: "nextStep" });
  };
  const onSubmitB = (submission: FormStep2BSchema) => {
    wizardDataDispatch({ type: "update", payload: submission });
    wizardDispatch({ type: "nextStep" });
  };

  return (
    <Widget className={classNames({ hidden: step !== currentStep })}>
      <WidgetContent className="!overflow-auto">
        {radioGroup === "option1" && (
          <FormStep2A
            className={"h-fit"}
            formId={getFormIdForStep(step)}
            initialValues={{ checkbox, description }}
            onSubmit={({ submission }) => onSubmitA(submission)}
          />
        )}
        {radioGroup === "option2" && (
          <FormStep2B
            className={"h-fit"}
            formId={getFormIdForStep(step)}
            initialValues={{ email, checkboxGroup }}
            onSubmit={({ submission }) => onSubmitB(submission)}
          />
        )}
      </WidgetContent>
    </Widget>
  );
};

const Step3: FC<{ step: string }> = ({ step }) => {
  const { getFormIdForStep, currentStep } = useWizardContext();
  const data = useWizardDataContext();

  const wizardDispatch = useWizardDispatchContext();
  const wizardDataDispatch = useWizardDataDispatchContext();

  const onSubmit = (submission: FormStep3Schema) => {
    wizardDataDispatch({ type: "update", payload: submission });

    // This is the last step so we submit the form.
    // We could also here do some more validation, including async validation.
    // This is why we don't automatically mark the wizard as done and require explicit action.
    wizardDispatch({ type: "submit" });
  };

  return (
    <Widget className={classNames({ hidden: step !== currentStep })}>
      <WidgetContent className="!overflow-auto">
        <FormStep3
          className={"h-fit"}
          formId={getFormIdForStep(step)}
          initialValues={{ name: data.name }}
          onSubmit={({ submission }) => onSubmit(submission)}
        >
          <Summary>
            <SummaryItem label="Email">{data.email}</SummaryItem>
            <SummaryItem label="Description">{data.description}</SummaryItem>
          </Summary>
        </FormStep3>
      </WidgetContent>
    </Widget>
  );
};
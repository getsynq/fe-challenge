import get from "lodash/get";
import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  jsonWithError,
  jsonWithSuccess,
  redirectWithSuccess,
} from "remix-toast";
import { z } from "zod";

import { fakeDelay } from "~/utils/general";

import Wizard, { StepProps, ActionTypes } from "~/components/wizard";
import { Summary, SummaryItem } from "~/components/formFields/Summary";
import {
  FormFields,
  FormDataProps,
  FormFieldTypes,
} from "~/components/domainSpecific/FormSchemaView";

// @TODO: Probably move schemas to a common place being re-used for backend sync
// FORM - FOR STEP 1
const options = ["option1", "option2"] as const;
const formStep1Schema = z.object({
  radioGroup: z.enum(options),
});
const formStep1Fields = [
  {
    name: "radioGroup",
    options,
    label: "Select option",
    type: FormFieldTypes.Radio,
  },
];

// FORM - FOR STEP 2A
const formStep2ASchema = z.object({
  description: z
    .string()
    .max(10000, "Description can be at most 256 characters long")
    .optional(),
  checkbox: z.boolean().optional(),
});
const formStep2AFields = [
  {
    name: "checkbox",
    label: "You are awesome",
    labelFor: true,
    info: "Choose this if you want to be awesome!",
    type: FormFieldTypes.Checkbox,
  },
  {
    name: "description",
    label: "Description",
    isOptional: true,
    placeholder: "Add a description",
    type: FormFieldTypes.Textarea,
  },
];

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
const formStep2BFields = [
  {
    name: "email",
    label: "Email",
    type: FormFieldTypes.Input,
    inputType: 'email',
  },
  {
    name: "checkboxGroup",
    label: "Checkbox group",
    type: FormFieldTypes.CheckboxFormGroup,
    groupOptions: optionsToCheck,
  },
] as FormFields;

// FORM - FOR STEP 3
const formStep3Schema = z.object({
  name: z
    .string()
    .min(3, "Must be at least 3 character long")
    .max(256, "Name can be at most 256 characters long"),
});
const formStep3Fields = [
  {
    name: "name",
    label: "Name",
    description: "Write an awesome name.",
    type: FormFieldTypes.Input,
    inputType: 'text',
  },
]

// WIZARD DATA PROVIDER
const wizardDataSchema = formStep1Schema
  .merge(formStep2ASchema)
  .merge(formStep2BSchema)
  .merge(formStep3Schema);
// ACTION
// Since the wizard has optional sections based on selection on first step
// this whole schema is made optional. This could be refined by only making
// the steps that are dynamic optional.
const actionSchema = wizardDataSchema.partial().extend({
  actionType: z.literal("create"),
  redirectTo: z.string().optional(),
});

// LOADER
export async function loader() {
  return json({});
}

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
export default function WizardExample2() {
  const wizardSteps = [
    {
      order: 1,
      step: "step1",
      title: "Step 1",
      formSchema: formStep1Schema,
      formFields: formStep1Fields,
    },
    {
      order: 2,
      step: "step2",
      title: "Step 2",
      isVisibleCondition: { key: "radioGroup", value: "option1" },
      formSchema: formStep2ASchema,
      formFields: formStep2AFields,
    },
    {
      order: 2,
      step: "step2",
      title: "Step 2",
      isVisibleCondition: { key: "radioGroup", value: "option2" },
      formSchema: formStep2BSchema,
      formFields: formStep2BFields,
    },
    {
      order: 3,
      step: "step3",
      title: "Step 3",
      submitType: ActionTypes.Submit,
      formSchema: formStep3Schema,
      formFields: formStep3Fields,
      getChild: (data: FormDataProps) => (
        <Summary>
          <SummaryItem label="Selected Option">{get(data, 'radioGroup')}</SummaryItem>
          {data.radioGroup === "option1" ? (
            <>
              {data.description && (
                <SummaryItem label="Description">{get(data, 'description')}</SummaryItem>
              )}
              <SummaryItem label="Is Awesome">
                {data.checkbox ? "Yes" : "No"}
              </SummaryItem>
            </>
          ) : (
            <>
              <SummaryItem label="Email">{data.email}</SummaryItem>
              <SummaryItem label="Selected Items">
                {
                  Array.isArray(get(data, 'checkboxGroup', []))
                    ? (get(data, 'checkboxGroup') as []).join(", ")
                    : get(data, 'checkboxGroup.data')
                }
              </SummaryItem>
            </>
          )}
        </Summary>
      )
    }
  ] as StepProps[];
  const initialState = {
    checkboxGroup: ["check1"],
    email: "",
    radioGroup: "option1",
    name: "",
    description: "",
    checkbox: false,
  };

  return (
    <div className="overflow-hidden grid grid-cols-1 w-full min-h-screen mx-auto max-w-5xl">
      <Wizard initialValues={initialState} steps={wizardSteps} />
    </div>
  );
}

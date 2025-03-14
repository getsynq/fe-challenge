import { useCallback, PropsWithChildren } from "react";
import { ZodSchema } from "zod";
import { parseWithZod } from "@conform-to/zod";
import {
  getFormProps,
  getTextareaProps,
  getInputProps,
  useForm,
  FieldMetadata,
} from "@conform-to/react";
import get from "lodash/get";

import {
  FormBase,
  FormControl,
  FormControlLabel,
  FormField,
  FormDescription,
  FormGroup,
  FormLabel,
  FormMessage,
  FormRadioGroup,
} from "~/ui/Form";
import { RadioGroupItem } from "~/ui/Radio";
import { Checkbox } from "~/ui/Checkbox";
import { Textarea, Input } from "~/ui/Input";

import {
  FormFieldTypes,
  FormSchemaViewProps,
  FormDataProps,
  SubmissionProps,
  FormFields,
  FieldProps,
} from ".";
import { IS_CHECKED_VALUE } from "./constants";

// @TODO: Nice to have common unit test with base snaps at least
export const FormSchemaView = (props: PropsWithChildren<FormSchemaViewProps>) => {
  const {
    formId,
    initialValues,
    className,
    onSubmit,
    formSchema = {},
    formFields = [],
    children,
  } = props;

  const [form, values] = useForm<FormDataProps>({
    id: formId,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    defaultValue: initialValues,
    onSubmit(event, data) {
      const { formData, submission } = data;
      const { status, value, error } = submission as SubmissionProps;
      event.preventDefault();
      // @TODO: Use status as a common enum
      if (status !== "success") {
        console.warn(error);
        return;
      }
      onSubmit({ formData, submission: value });
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema as ZodSchema });
    },
  });
  const valuesStr = JSON.stringify(values);
  const formFieldsStr = JSON.stringify(formFields);

  // @TODO: Move as a local utils + unit tests
  const buildFormFields = useCallback((fields: FormFields, fieldsValues: Record<string, FieldProps>) =>
    fields.map((field, index) => {
      // @TODO: more flexible input props i.e maxValue, minValue, etc
      const {
        type,
        inputType,
        name,
        label,
        description,
        options = [],
        placeholder,
        groupOptions = [],
        rows = 2,
        info,
        isOptional,
      } = field;
      const valuesByName = get(fieldsValues, name);
      // @TODO: Simplify this to have common wrap FormField + child depend of input type
      switch (type) {
        // @TODO: Add more form group types
        case FormFieldTypes.CheckboxFormGroup:
          return (
            <FormField key={`field-${name}-${index}`}>
              <FormControl>
                <FormGroup>
                   {
                     groupOptions.map((option, index) => (
                       <FormControlLabel
                         label={option}
                         labelFor={`${valuesByName.id}-${index}`}
                         key={index}
                       >
                         <Checkbox
                           id={`${valuesByName.id}-${index}`}
                           name={valuesByName.name}
                           value={option}
                           defaultChecked={
                             valuesByName.initialValue &&
                             Array.isArray(valuesByName.initialValue)
                               ? valuesByName.initialValue.includes(option)
                               : valuesByName.initialValue === option
                           }
                         />
                       </FormControlLabel>
                     ))
                   }
                </FormGroup>
              </FormControl>
              {info ? <FormMessage variant="info">{info}</FormMessage> : null}

              {valuesByName.errors ? <FormMessage variant="error">{valuesByName.errors}</FormMessage> : null}
            </FormField>
          );
        case FormFieldTypes.Input:
          return (
            <FormField key={`field-${name}-${index}`}>
              {
                label ? (
                  <FormLabel>
                    {label}
                    {isOptional ? <span className="text-txt-light">(optional)</span> : null}
                  </FormLabel>
                ) : null
              }
              {
                description ? <FormDescription>{description}</FormDescription> : null
              }
              <FormControl>
                <Input
                  {...getInputProps(valuesByName as FieldMetadata, { ariaAttributes: true, type: inputType ? inputType : 'text' })}
                  placeholder={placeholder}
                />
              </FormControl>

              {valuesByName.errors ? <FormMessage variant="error">{valuesByName.errors}</FormMessage> : null}
            </FormField>
          );
        case FormFieldTypes.Textarea:
          return (
            <FormField key={`field-${name}-${index}`}>
              {
                label ? (
                  <FormLabel>
                    {label}
                    {isOptional ? <span className="text-txt-light">(optional)</span> : null}
                  </FormLabel>
                ) : null
              }
              <FormControl>
                <Textarea
                  {...getTextareaProps(valuesByName as FieldMetadata)}
                  rows={rows}
                  placeholder={placeholder}
                />
              </FormControl>

              {valuesByName.errors ? <FormMessage variant="error">{valuesByName.errors}</FormMessage> : null}
            </FormField>
          );
        case FormFieldTypes.Checkbox:
          return (
            <FormField key={`field-${name}-${index}`}>
              <FormControlLabel
                labelFor={valuesByName.id}
                label={`${label} ${isOptional ? <span className="text-txt-light">(optional)</span> : ''}`
                }>
                <Checkbox
                  name={valuesByName.name}
                  id={valuesByName.id}
                  defaultChecked={valuesByName.initialValue === IS_CHECKED_VALUE}
                />
              </FormControlLabel>
              {info ? <FormMessage variant="info">{info}</FormMessage> : null}

              {valuesByName.errors ? <FormMessage variant="error">{valuesByName.errors}</FormMessage> : null}
            </FormField>
          );
        case FormFieldTypes.Radio:
          return (
            <FormField key={`field-${name}-${index}`}>
              {
                label ? (
                 <FormLabel>
                   {label}
                   {isOptional ? <span className="text-txt-light">(optional)</span> : null}
                 </FormLabel>
                ) : null
              }
              <FormRadioGroup
                name={name}
                defaultValue={valuesByName.initialValue}
              >
                {options?.map((option, index) => (
                  <FormControlLabel
                    key={`${name}-${index}`}
                    label={option}
                    labelFor={`${name}-${index}`}
                  >
                    <RadioGroupItem value={option} id={`${name}-${index}`} />
                  </FormControlLabel>
                ))}
              </FormRadioGroup>
              {valuesByName.errors ? <FormMessage variant="error">{valuesByName.errors}</FormMessage> : null}
            </FormField>
          )
      }
    }),
    [valuesStr, formFieldsStr],
  )

  return (
    <FormBase autoComplete="off" {...getFormProps(form)} className={className}>
      {buildFormFields(formFields, values as Record<string, FieldProps>)}
      {children}
    </FormBase>
  );
};

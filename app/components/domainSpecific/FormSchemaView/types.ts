import { ReactNode } from "react";
import { ZodSchema } from "zod";

// @TODO: More form elements to be added
export enum FormFieldTypes {
  Input = 'input',
  Textarea = 'textarea',
  Radio = 'radio',
  Checkbox = 'checkbox',
  CheckboxFormGroup = 'checkboxFormGroup',
}

export type FieldValue = string | number | boolean | null | undefined;

export type FieldProps = {
  id?: string,
  name?: string,
  value?: string;
  initialValue?: string;
  errors?: string[];
}

export type FormDataProps = {
  [keys: string]: FieldValue | FieldValue[];
}

export type SubmissionProps = {
  // @TODO: Define status as a common enum
  status: string,
  value?: FormDataProps;
  error?: string;
}

export type FormSubmissionState = {
  submission?: FormDataProps;
  formData: FormData;
}

export interface FormField {
  type: FormFieldTypes;
  name: string;
  inputType?: 'text' | 'number' | 'search' | 'time' | 'hidden' | 'color' | 'checkbox' | 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'password' | 'radio' | 'range' | 'tel' | 'url' | 'week';
  options?: readonly string[],
  groupOptions?: readonly string[],
  label?: ReactNode;
  description?: ReactNode;
  isOptional?: boolean;
  info?: ReactNode;
  placeholder?: string;
  rows?: number;
}

export type FormFields = FormField[];

export interface FormSchemaViewProps {
  formId: string;
  formSchema: ZodSchema;
  onSubmit(data: FormSubmissionState): void;
  className?: string;
  initialValues?: FormDataProps;
  formFields: FormFields;
}



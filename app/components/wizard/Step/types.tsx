import type { ReactNode } from "react";
import type { ZodSchema } from "zod";

import type { FormDataProps, FormFields } from "~/components/domainSpecific/FormSchemaView";

// @TODO: Improve is visible type
export interface StepProps {
  step: string,
  title?: string,
  order?: number,
  getChild?: (data: FormDataProps) => ReactNode,
  isVisibleCondition?: Record<'key' | 'value', string>,
  formFields: FormFields,
  formSchema: ZodSchema,
}


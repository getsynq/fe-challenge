import type { FieldMetadata } from "@conform-to/react";
import { getTextareaProps } from "@conform-to/react";
import type { FC } from "react";
import { FormField, FormMessage, FormLabel, FormControl } from "~/ui/Form";
import { Textarea } from "~/ui/Input";

export const DescriptionField: FC<{
  config: FieldMetadata<string | undefined>;
}> = ({ config }) => {
  return (
    <FormField className="flex-1">
      <FormLabel htmlFor={config.id}>Description (optional)</FormLabel>
      <FormControl className="flex">
        <Textarea
          {...getTextareaProps(config)}
          rows={2}
          placeholder="Add a description"
          maxLength={512}
        />
      </FormControl>
      {config.errors && (
        <FormMessage variant="error">{config.errors}</FormMessage>
      )}
    </FormField>
  );
};

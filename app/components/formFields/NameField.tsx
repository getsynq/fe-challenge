import type { FieldMetadata } from "@conform-to/react";
import { getInputProps } from "@conform-to/react";
import type { FC } from "react";
import { FormField, FormMessage, FormLabel, FormControl } from "~/ui/Form";
import { Input } from "~/ui/Input";

export const NameField: FC<{
  label?: string;
  config: FieldMetadata<string | undefined>;
}> = ({ config, label: title = "Name" }) => {
  return (
    <FormField>
      <FormLabel htmlFor={config.id}>{title}</FormLabel>
      <FormControl>
        <Input
          {...getInputProps(config, { type: "text" })}
          autoFocus
          placeholder="Name"
        />
      </FormControl>
      {config.errors && (
        <FormMessage variant="error">{config.errors}</FormMessage>
      )}
    </FormField>
  );
};

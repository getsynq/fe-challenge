import type { FieldMetadata } from "@conform-to/react";
import { getInputProps } from "@conform-to/react";
import type { FC } from "react";
import {
  FormField,
  FormDescription,
  FormMessage,
  FormLabel,
  FormControl,
} from "~/ui/Form";
import { Input } from "~/ui/Input";

export const SubjectField: FC<{
  config: FieldMetadata<string | undefined>;
}> = ({ config }) => {
  return (
    <FormField>
      <FormLabel htmlFor={config.id}>Subject</FormLabel>
      <FormDescription>
        This is the subject of the message that will be sent to the user. It
        should provide a brief, concise summary of the alert.
      </FormDescription>

      <FormControl>
        <Input
          {...getInputProps(config, { type: "text" })}
          autoFocus
          placeholder="Message subject"
        />
      </FormControl>

      {config.errors && (
        <FormMessage variant="error">{config.errors}</FormMessage>
      )}
    </FormField>
  );
};

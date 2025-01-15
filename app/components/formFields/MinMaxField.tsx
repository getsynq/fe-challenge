import { getInputProps, type FieldMetadata } from "@conform-to/react";
import type { FC } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "~/ui/Form";
import { Input } from "~/ui/Input";

export const MinMaxField: FC<{
  min: FieldMetadata<number | string>;
  max: FieldMetadata<number | string>;
  unit?: string;
}> = ({ min, max, unit = "" }) => (
  <div className="flex gap-6 items-start">
    <div className="pt-11 text-txt-light">Between</div>
    <FormField>
      <FormLabel>Min</FormLabel>

      <FormControl className="flex items-center gap-1">
        <Input
          autoFocus
          {...getInputProps(min, { type: "number" })}
          className="w-full"
        />
        {unit}
      </FormControl>

      {min.errors && (
        <FormMessage variant="error">{min.errors.join(", ")}</FormMessage>
      )}
    </FormField>

    <div className="pt-11 text-txt-light"> and </div>
    <FormField>
      <FormLabel>Max</FormLabel>

      <FormControl className="flex items-center gap-1">
        <Input {...getInputProps(max, { type: "number" })} className="w-full" />
        {unit}
      </FormControl>

      {max.errors && (
        <FormMessage variant="error">{max.errors.join(", ")}</FormMessage>
      )}
    </FormField>
  </div>
);

import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import type { CheckboxProps } from "@radix-ui/react-checkbox";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import classNames from "classnames";
import type { RefAttributes } from "react";
import { forwardRef } from "react";
import { Icon } from "./Icon";

export const Checkbox = forwardRef<
  HTMLButtonElement,
  CheckboxProps &
    RefAttributes<HTMLButtonElement> & { variant?: "default" | "bright" }
>(function SynqCheckbox(
  { checked, className, variant = "default", ...props },
  ref,
) {
  return (
    <Root
      ref={ref}
      className={classNames(
        className,
        "flex flex-nowrap items-center justify-center",
        "w-4 h-4",
        "border border-solid rounded-sm",
        "data-[state=checked]:border-blue-40 data-[state=checked]:bg-blue-40",
        "focus-visible:!border-purple-50 focus-visible:outline-none",
        "disabled:opacity-60",

        { "border-border-base": variant === "default" },
        { "border-grey-70 bg-white": variant === "bright" },
      )}
      {...{
        ...props,
        ...(checked !== undefined
          ? { checked: checked === true || checked === "indeterminate" }
          : {}),
      }}
    >
      <Indicator className="flex w-3 h3">
        <Icon
          className="text-sm leading-none text-white"
          icon={checked === "indeterminate" ? faMinus : faCheck}
        />
      </Indicator>
    </Root>
  );
});

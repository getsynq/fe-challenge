import type {
  RadioGroupItemProps,
  RadioGroupProps,
} from "@radix-ui/react-radio-group";
import { Root, Item } from "@radix-ui/react-radio-group";
import type { FC, RefAttributes } from "react";
import { forwardRef } from "react";
import classNames from "classnames";

export const RadioGroup: FC<
  RadioGroupProps &
    RefAttributes<HTMLDivElement> & { variant?: "vertical" | "horizontal" }
> = ({ children, variant = "vertical", ...props }) => {
  return (
    <Root
      className={classNames({
        "flex flex-col gap-1": variant === "vertical",
        "flex flex-wrap gap-4": variant === "horizontal",
      })}
      {...props}
    >
      {children}
    </Root>
  );
};

export const RadioGroupItem = forwardRef<
  HTMLButtonElement,
  RadioGroupItemProps & RefAttributes<HTMLButtonElement>
>(function SynqCheckbox({ className, ...props }, ref) {
  return (
    <Item
      ref={ref}
      className={classNames(
        "flex flex-nowrap items-center justify-center",
        "w-4 h-4",
        "border border-solid border-border-base rounded-full",
        "aria-checked:border-blue-40 aria-checked:border-[6px]",
        className,
      )}
      {...props}
    />
  );
});

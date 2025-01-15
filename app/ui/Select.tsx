import type { FieldMetadata } from "@conform-to/react";
import { useInputControl } from "@conform-to/react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type {
  SelectContentProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectTriggerProps,
} from "@radix-ui/react-select";
import {
  Content,
  Item,
  ItemText,
  Label,
  Portal,
  Root,
  Icon as SelectIcon,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import classNames from "classnames";
import {
  useEffect,
  type FC,
  type PropsWithChildren,
  type RefAttributes,
} from "react";
import { Icon } from "./Icon";

const baseTrigger = {
  base: [
    "box",
    "justify-between",
    "bg-btn-bg",
    "text-btn-txt",
    "rounded",
    "border border-border-base",
    "data-[state=open]:border-border-neutral",
    "data-[placeholder]:text-txt-light",
  ],

  hover: ["hover:bg-btn-hover"],
  active: ["active:bg-btn-bg-active"],
  focus: ["focus-visible:outline-2", "focus-visible:outline-offset-2"],
  disabled: [
    "disabled:text-btn-txt-disabled",
    "disabled:border-btn-border-disabled",
    "disabled:bg-btn-bg-disabled",
  ],
};

const baseItem = {
  base: ["box text-txt-dark", "rounded", "cursor-pointer"],
  focus: ["focus-visible:outline", "focus-visible:-outline-offset-1"],
  hover: ["hover:bg-btn-hover"],
  checked: ["data-[state=checked]:bg-btn-hover"],
  disabled: [
    "data-[disabled]:text-txt-placeholder",
    "data-[disabled]:cursor-default",
  ],
};

const baseContent = {
  base: [
    "bg-white",
    "rounded",
    "border",
    "border-solid",
    "border-border-base",
    "shadow-lg z-40",
  ],
  animation: [
    "motion-safe:data-[state=open]:data-[side=top]:animate-[slideDownAndFade_150ms_cubic-bezier(0.16,_1,_0.3,_1)]",
    "motion-safe:data-[state=open]:data-[side=right]:animate-[slideLeftAndFade_150ms_cubic-bezier(0.16,_1,_0.3,_1)]",
    "motion-safe:data-[state=open]:data-[side=bottom]:animate-[slideUpAndFade_150ms_cubic-bezier(0.16,_1,_0.3,_1)]",
    "motion-safe:data-[state=open]:data-[side=left]:animate-[slideRightAndFade_150ms_cubic-bezier(0.16,_1,_0.3,_1)]",
  ],
};

export const SelectTrigger: FC<
  SelectTriggerProps &
    RefAttributes<HTMLButtonElement> & {
      size?: "sm" | "base";
    }
> = ({ children, className, size = "base", ...props }) => {
  return (
    <Trigger
      className={classNames(
        baseTrigger.base,
        baseTrigger.hover,
        baseTrigger.focus,
        baseTrigger.active,
        baseTrigger.disabled,
        { "box-sm text-base": size === "base" },
        { "box-xs text-sm": size === "sm" },
        className,
      )}
      {...props}
    >
      {children}
      <SelectIcon>
        <Icon icon={faChevronDown} className="text-txt-placeholder" />
      </SelectIcon>
    </Trigger>
  );
};

export const SelectContent: FC<
  SelectContentProps &
    RefAttributes<HTMLDivElement> & {
      size?: "sm" | "base";
    }
> = ({ children, className, size = "base", ...props }) => {
  return (
    <Portal>
      <Content
        className={classNames(
          baseContent.base,
          className,
          { "box-sm": size === "base" },
          { "box-xs": size === "sm" },
        )}
        {...props}
      >
        <Viewport className="py-1.5">{children}</Viewport>
      </Content>
    </Portal>
  );
};

export const SelectItem: FC<
  SelectItemProps &
    RefAttributes<HTMLDivElement> & {
      size?: "sm" | "base";
    }
> = ({ children, className, disabled, size = "base", ...props }) => {
  return (
    <Item
      className={classNames(
        className,
        baseItem.base,
        baseItem.focus,
        baseItem.hover,
        baseItem.checked,
        baseItem.disabled,
        { "box-sm text-base": size === "base" },
        { "box-xs text-sm": size === "sm" },
        { "pointer-events-none": disabled },
      )}
      disabled={disabled}
      {...props}
    >
      <ItemText>{children}</ItemText>
    </Item>
  );
};

export const SelectLabel: FC<
  SelectLabelProps & RefAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <Label className={classNames("", className)} {...props}>
      {children}
    </Label>
  );
};

interface SelectFormProps {
  config: FieldMetadata<string>;
  options?: SelectProps;
}

export const FormSelect: FC<
  {
    onChange?(value: string): void;
  } & PropsWithChildren<SelectFormProps>
> = ({ children, options, onChange, config }) => {
  const control = useInputControl(config);

  useEffect(
    () => options && control.change(options.value || ""),
    [control, options],
  );

  return (
    <Root
      {...options}
      name={config.name}
      defaultValue={config.initialValue}
      onValueChange={(value: string) => {
        control.change(value);
        if (onChange) {
          onChange(value);
        }
      }}
    >
      {children}
    </Root>
  );
};

export { Root as Select, Value as SelectValue };

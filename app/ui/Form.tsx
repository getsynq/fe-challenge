import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck, faChevronRight, faCircleExclamation,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import type { LabelProps } from "@radix-ui/react-label";
import { Root as LabelRoot } from "@radix-ui/react-label";
import type { RadioGroupProps } from "@radix-ui/react-radio-group";
import { Root as RadioGroupRoot } from "@radix-ui/react-radio-group";
import type { FormProps } from "@remix-run/react";
import { Form } from "@remix-run/react";
import classNames from "classnames";
import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  RefAttributes,
} from "react";
import { forwardRef } from "react";
import { Icon } from "./Icon";

// FORM

export const FormBase: FC<
  FormProps & RefAttributes<HTMLFormElement> & { inline?: boolean }
> = ({ children, className, inline = false, ...props }) => {
  return (
    <Form
      autoComplete="off"
      method="POST"
      className={classNames(className, "w-full flex flex-col gap-6", {
        "max-w-5xl mx-auto p-6": !inline,
      })}
      {...props}
    >
      {children}
    </Form>
  );
};

// FORM SECTION

export const FormSection: FC<ComponentPropsWithoutRef<"section">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={classNames("w-full flex flex-col gap-6", className)} {...props}>
      {children}
    </section>
  );
};

export const FormSectionTitle: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={classNames("text-xl text-txt-dark my-2", className)}>
      {children}
    </div>
  );
};

export const FormSectionDescription: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={classNames("text-base text-txt-light my-2.5", className)}>
      {children}
    </div>
  );
};

// FORM SECTION DETAILS

export const FormSectionDetails: FC<ComponentPropsWithoutRef<"details">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <details
      className={classNames(
        className,
        "group w-full mt-10 [&_>_*:nth-child(2)]:mt-0",
      )}
      {...props}
    >
      {children}
    </details>
  );
};

export const FormSectionDetailsSummary: FC<
  ComponentPropsWithoutRef<"summary"> & { invalid?: boolean }
> = ({ children, className, invalid, ...props }) => {
  return (
    <summary
      className={classNames(
        className,
        "mb-3 flex flex-nowrap gap-2 items-center cursor-pointer list-none",
        "[&::-webkit-details-marker]:hidden",
        "hover:bg-list-item-hover",
      )}
      {...props}
    >
      <Icon
        icon={faChevronRight}
        className={classNames(
          "text-sm",
          "rotate-0",
          "transition-transform",
          "group-open:rotate-90",
          { "hidden group-open:block": invalid },
        )}
      />
      {invalid && (
        <Icon
          icon={faCircleExclamation}
          className="text-base text-error group-open:hidden"
        />
      )}
      <div
        className={classNames("shrink-0 text-base", {
          "text-link": !invalid,
          "text-error group-open:text-link": invalid,
        })}
      >
        {children}
      </div>
      <div className="bg-border-base flex-1 h-px" />
    </summary>
  );
};

// FORM FIELDSET

export const FormFieldset = forwardRef<
  HTMLFieldSetElement,
  ComponentPropsWithRef<"fieldset">
>(function SynqFormFieldSet({ children, className, ...props }, ref) {
  return (
    <fieldset
      ref={ref}
      className={classNames(
        "p-4 border border-border-base rounded flex flex-col gap-6",
        className,
      )}
      {...props}
    >
      {children}
    </fieldset>
  );
});

// FORM LEGEND

export const FormLegend: FC<ComponentPropsWithoutRef<"legend">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <legend
      className={classNames(className, "text-base text-txt-dark px-1.5")}
      {...props}
    >
      {children}
    </legend>
  );
};

// FORM FIELD

export const FormField: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={classNames(className, "flex flex-col gap-0.5")}>{children}</div>;
};

type FormFieldMessageVariant = "info" | "error" | "success" | "plain";
type FormFieldMessageSize = "base" | "sm";

const formFieldMessageIcon: Record<FormFieldMessageVariant, IconProp | null> = {
  info: faInfoCircle,
  error: faCircleExclamation,
  success: faCheck,
  plain: null,
};

// FORM MESSAGE

export const FormMessage: FC<{
  children: ReactNode;
  icon?: IconProp;
  variant?: FormFieldMessageVariant;
  size?: FormFieldMessageSize;
  className?: string;
}> = ({ children, icon, className, variant = "info", size = "base" }) => {
  if (size === "sm") {
    return (
      <div
        className={classNames(className, "mt-1.5 text-sm", {
          "text-label-txt-info": variant === "info",
          "text-label-txt-error": variant === "error",
          "text-label-txt-success": variant === "success",
          "text-label-txt-neutral": variant === "plain",
        })}
      >
        <div>{children}</div>
      </div>
    );
  }

  const messageIcon = icon ?? formFieldMessageIcon[variant];

  return (
    <div
      className={classNames(
        className,
        "flex flex-nowrap items-center gap-2 mt-2 px-2 py-1.5 text-base rounded",
        {
          "text-label-txt-info bg-label-bg-info border-label-txt-info":
            variant === "info",
          "text-label-txt-error bg-label-bg-error border-label-txt-error":
            variant === "error",
          "text-label-txt-success bg-label-bg-success border-label-txt-success":
            variant === "success",
          "text-label-txt-neutral bg-label-bg-neutral border-label-txt-neutral":
            variant === "plain",
        },
      )}
    >
      {messageIcon && <Icon icon={messageIcon} className="shrink-0" />}
      <div>{children}</div>
    </div>
  );
};

// FORM LABEL

export const FormLabel: FC<LabelProps & RefAttributes<HTMLLabelElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <LabelRoot
      className={classNames("text-base text-txt-dark", className)}
      {...props}
    >
      {children}
    </LabelRoot>
  );
};

// FORM DESCRIPTION

export const FormDescription: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={classNames(className, "text-base text-txt-light mt-1 mb-1")}
    >
      {children}
    </div>
  );
};

// FORM CONTROL

export const FormControl: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(className, "mt-1 [&_>_*]:w-full")}>
      {children}
    </div>
  );
};

export const FormControlLabel: FC<{
  label: ReactNode;
  labelFor?: string;
  labelPosition?: "left" | "right";
  children: ReactNode;
  className?: string;
}> = ({ label, labelPosition = "right", labelFor, children, className }) => {
  return (
    <div className={classNames(className, "flex flex-nowrap gap-2 mt-1")}>
      {labelPosition === "left" && (
        <FormLabel htmlFor={labelFor}>{label}</FormLabel>
      )}
      {children}
      {labelPosition === "right" && (
        <FormLabel htmlFor={labelFor}>{label}</FormLabel>
      )}
    </div>
  );
};

// FORM GROUP

export const FormGroup: FC<{
  variant?: "horizontal" | "vertical";
  children: ReactNode;
  className?: string;
}> = ({ children, className, variant = "vertical" }) => {
  return (
    <div
      className={classNames(className, {
        "space-y-2 mt-3": variant === "vertical",
        "flex gap-4 mt-6 items-baseline [&_>_*]:mt-0": variant === "horizontal",
      })}
    >
      {children}
    </div>
  );
};

export const FormRadioGroup: FC<
  RadioGroupProps &
    RefAttributes<HTMLDivElement> & {
      variant?: "horizontal" | "vertical";
      children: ReactNode;
      className?: string;
    }
> = ({ children, className, variant = "vertical", ...props }) => {
  return (
    <RadioGroupRoot
      className={classNames(className, {
        "space-y-2 mt-3": variant === "vertical",
        "flex gap-4 mt-6 items-baseline [&_>_*]:mt-0": variant === "horizontal",
      })}
      {...props}
    >
      {children}
    </RadioGroupRoot>
  );
};

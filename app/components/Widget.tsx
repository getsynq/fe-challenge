import type { CheckboxProps } from "@radix-ui/react-checkbox";
import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import classNames from "classnames";
import type {
  ComponentPropsWithoutRef,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import { Checkbox } from "~/ui/Checkbox";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "~/ui/Tooltip";

export const Widget: FC<
  {
    overflow?: boolean;
    children?: ReactNode | undefined;
  } & HTMLAttributes<HTMLDivElement>
> = ({ className, overflow = false, children, ...props }) => (
  <div
    data-testid="widget"
    className={classNames(className, "flex flex-col w-full", {
      "overflow-hidden max-h-full": !overflow,
    })}
    {...props}
  >
    {children}
  </div>
);

export const WidgetHeader: FC<
  {
    children?: ReactNode | undefined;
    variant?: "default" | "left";
  } & HTMLAttributes<HTMLDivElement>
> = ({ children, className, variant = "default" }) => (
  <div
    className={classNames(
      className,
      "flex flex-nowrap items-center gap-2 py-1.5 shrink-0 px-4",
      {
        "justify-between": variant === "default",
      },
    )}
  >
    {children}
  </div>
);

export const WidgetContent: FC<
  PropsWithChildren<{
    className?: string;
    variant?: "default" | "clear" | "border" | "inline";
  }>
> = ({ children, className, variant = "default" }) => {
  const classes = classNames(
    className,
    "overflow-hidden box-vertical",
    { "bg-white": variant === "clear" },
    { "border border-border-base rounded-md": variant === "default" },
    {
      "bg-white border border-border-base rounded-md": variant === "border",
    },

    {
      "bg-white border-b border-t border-border-base": variant === "inline",
    },
  );

  return <div className={classes}>{children}</div>;
};

const titleVariants = {
  default: "text-txt-light text-sm font-bold uppercase",
  plain: "text-txt-dark text-base",
};

export const WidgetHeaderTitle: FC<
  PropsWithChildren<{
    className?: string;
    variant?: keyof typeof titleVariants;
  }>
> = ({ children, className, variant = "default" }) => (
  <div
    className={classNames(
      className,
      "flex items-baseline gap-2",
      titleVariants[variant],
    )}
  >
    {children}
  </div>
);

export const WidgetHeaderCheckbox: FC<
  CheckboxProps & {
    listSize?: "sm" | "base" | "lg";
    variant?: "default" | "bright";
  }
> = ({ variant, listSize = "base", ...props }) => (
  <div
    className={classNames({
      "pl-1": listSize === "sm",
      "pl-2": listSize === "base",
      "px-3": listSize === "lg",
    })}
  >
    <Checkbox {...props} variant={variant} />
  </div>
);

export const WidgetHeaderLink: FC<
  LinkProps & { tooltip?: ReactNode; disabled?: boolean }
> = ({ children, tooltip, disabled, ...props }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="block w-fit">
        <Link
          className="font-normal text-base text-link normal-case aria-disabled:pointer-events-none aria-disabled:text-btn-txt-disabled"
          aria-disabled={disabled}
          {...props}
        >
          {children}
        </Link>
      </span>
    </TooltipTrigger>
    {disabled && tooltip && (
      <TooltipContent variant="light" side="top">
        <TooltipArrow variant="light" />
        {tooltip}
      </TooltipContent>
    )}
  </Tooltip>
);

export const WidgetHeaderButton: FC<
  ComponentPropsWithoutRef<"button"> & { tooltip?: ReactNode }
> = ({ tooltip, children, ...props }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="block w-fit">
        <button
          className="font-normal text-base text-link normal-case"
          {...props}
        >
          {children}
        </button>{" "}
      </span>
    </TooltipTrigger>
    {tooltip && (
      <TooltipContent variant="light" side="top">
        <TooltipArrow variant="light" />
        {tooltip}
      </TooltipContent>
    )}
  </Tooltip>
);

export const WidgetHeaderInfo: FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => (
  <div
    className={classNames(
      "flex flex-nowrap items-center gap-2 ml-auto text-txt-light text-sm",
    )}
  >
    {children}
  </div>
);

export const WidgetContentSection: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={classNames("box-vertical inline-box-base py-2.5", className)}
    >
      {children}
    </div>
  );
};

export const WidgetContentSectionTitle: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={classNames("box inline-box-sm text-txt-light px-4", className)}
    >
      {children}
    </div>
  );
};

export const WidgetContentSectionContent: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={classNames("box inline-box-base px-4", className)}
    >
      {children}
    </div>
  );
};

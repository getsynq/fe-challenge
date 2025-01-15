import type {
  TooltipArrowProps,
  TooltipContentProps,
  TooltipProps,
  TooltipTriggerProps,
} from "@radix-ui/react-tooltip";
import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";
import classNames from "classnames";
import {
  Children,
  type FC,
  type PropsWithChildren,
  type RefAttributes,
} from "react";

const tooltip = {
  base: ["p-2 z-40", "text-sm shadow-[2px_2px_12px_2px_hsl(0_0%_0%_/_0.1)]"],
  animation: [
    "motion-safe:data-[state=delayed-open]:data-[side=top]:animate-[ttSlideDownAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]",
    "motion-safe:data-[state=delayed-open]:data-[side=right]:animate-[ttSlideLeftAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]",
    "motion-safe:data-[state=delayed-open]:data-[side=bottom]:animate-[ttSlideUpAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]",
    "motion-safe:data-[state=delayed-open]:data-[side=left]:animate-[ttSlideRightAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]",
  ],
};
const tooltipVariants = {
  default: {
    base: ["text-white", "bg-grey-10"],
    fill: ["fill-grey-10"],
  },
  primary: {
    base: ["text-white", "bg-purple-50", "rounded"],
    fill: ["fill-purple-50"],
  },
  light: {
    base: ["text-txt-dark", "bg-white", "rounded"],
    fill: ["fill-white"],
  },
};

export const Tooltip: FC<TooltipProps> = ({ children, ...props }) => (
  <Provider>
    <Root {...props}>{children}</Root>
  </Provider>
);

export const TooltipTrigger: FC<
  TooltipTriggerProps & RefAttributes<HTMLButtonElement>
> = ({ children, ...props }) => <Trigger {...props}>{children}</Trigger>;

export const TooltipContent: FC<
  TooltipContentProps &
    RefAttributes<HTMLDivElement> & { variant?: keyof typeof tooltipVariants }
> = ({ children, className, variant = "default", forceMount, ...props }) => (
  <Portal forceMount={forceMount}>
    <Content
      className={classNames(
        className,
        tooltip.base,
        tooltipVariants[variant].base,
        tooltip.animation,
      )}
      {...props}
    >
      {children}
    </Content>
  </Portal>
);

export const TooltipArrow: FC<
  TooltipArrowProps & { variant?: keyof typeof tooltipVariants }
> = ({ variant = "default", ...props }) => (
  <Arrow className={classNames(tooltipVariants[variant].fill)} {...props} />
);

// DISABLED TOOLTIP

export const LockedTooltip: FC<
  PropsWithChildren<{ message?: string | null; showMessage: boolean }>
> = ({ children, message, showMessage }) => {
  Children.only(children);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="block w-fit">
          {children}
        </span>
      </TooltipTrigger>
      {showMessage && (
        <TooltipContent variant="light" side="bottom">
          <TooltipArrow variant="light" />
          {message || "You do not have the permissions to perform this action"}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

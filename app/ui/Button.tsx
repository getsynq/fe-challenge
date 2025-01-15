import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";
import classNames from "classnames";
import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import { Icon, LoadingIcon } from "./Icon";

export type ButtonVariant =
  | "default"
  | "dashed"
  | "dark"
  | "textDark"
  | "success"
  | "danger"
  | "text"
  | "primary";

export type ButtonSize = "sm" | "base" | "lg";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function SynqButton(
    {
      children,
      className,
      variant = "default",
      size = "base",
      loading = false,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={classNames(
          className,

          "relative",
          "font-body whitespace-nowrap",
          "rounded border",
          "focus-visible:outline focus-visible:outline-2",

          {
            "text-btn-txt bg-btn-bg border-btn-border hover:bg-btn-hover active:bg-btn-active":
              variant === "default",

            "text-btn-txt bg-btn-bg border-btn-border border-dashed hover:bg-btn-hover active:bg-btn-active":
              variant === "dashed",

            "text-white bg-transparent border-btn-border-base hover:bg-grey-30 active:bg-grey-40":
              variant === "dark",

            "text-white bg-transparent border-transparent hover:bg-grey-30 active:bg-grey-40":
              variant === "textDark",

            "text-btn-txt-success bg-btn-bg border-btn-border-success hover:bg-btn-hover-success active:bg-btn-active-success":
              variant === "success",

            "text-btn-txt-danger bg-btn-bg border-btn-border-danger hover:bg-btn-hover-danger active:bg-btn-active-danger":
              variant === "danger",

            "text-btn-txt bg-transparent border-transparent hover:bg-btn-hover active:bg-btn-active":
              variant === "text",

            "text-btn-txt-primary bg-purple-50 border-purple-50 hover:bg-purple-60 active:bg-purple-70":
              variant === "primary",

            "min-h-6 px-2 py-0.5 text-sm": size === "sm",
            "min-h-8 px-3 py-1.5 text-base": size === "base",
            "min-h-10 px-3 py-1.5 text-base": size === "lg",

            "focus-visible:-outline-offset-2 focus-visible:outline-purple-50":
              variant !== "primary",
            "focus-visible:-outline-offset-4 focus-visible:outline-white":
              variant === "primary",
          },

          "disabled:text-btn-txt-disabled disabled:border-btn-border-disabled disabled:pointer-events-none disabled:bg-btn-bg-disabled",
        )}
        {...props}
      >
        <div
          className={classNames("flex items-center", {
            "gap-1": size === "sm",
            "gap-1.5": size === "base",
            "gap-2": size === "lg",

            "opacity-0": loading,
          })}
        >
          {children}
        </div>
        {loading && <LoadingIcon className="absolute inset-0 m-auto" />}
      </button>
    );
  },
);

// BUTTON ANCHOR
// Note: use this when you want to link outside of the app
// NOTE: Let's stop using this. We should just use a regular "a" tag to do this and use text.

export type ButtonAnchorVariant = "default";

type ButtonAnchorProps = ComponentPropsWithRef<"a"> & {
  variant?: ButtonAnchorVariant;
  size?: ButtonSize;
  disabled?: boolean;
};

export const ButtonAnchor = forwardRef<HTMLAnchorElement, ButtonAnchorProps>(
  function SBA(
    { children, className, variant = "default", size = "base", ...props },
    ref,
  ) {
    return (
      <a
        ref={ref}
        className={classNames(
          className,

          "flex items-center",
          "font-body whitespace-nowrap",
          "rounded border",

          {
            "text-btn-txt bg-btn-bg border-btn-border hover:bg-btn-hover active:bg-btn-active":
              variant === "default",
          },

          {
            "gap-1 min-h-6 px-2 py-0.5 text-sm": size === "sm",
            "gap-1.5 min-h-8 px-3 py-1.5 text-base": size === "base",
            "gap-2 min-h-10 px-3 py-1.5 text-base": size === "lg",
          },

          "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple-50",
          "disabled:text-btn-txt-disabled disabled:border-btn-border-disabled disabled:pointer-events-none disabled:bg-btn-bg-disabled",
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);

// BUTTON LINK
// NOTE: Let's stop using this. We should use Remix "Link" component to do this and use text.

export type ButtonLinkVariant = "default";

type ButtonLinkProps = RemixLinkProps & {
  variant?: ButtonLinkVariant;
  size?: ButtonSize;
  disabled?: boolean;
};

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function SBL(
    {
      children,
      className,
      variant = "default",
      size = "base",
      disabled,
      ...props
    },
    ref,
  ) {
    return (
      <Link
        ref={ref}
        aria-disabled={disabled}
        className={classNames(
          className,

          "flex items-center",
          "font-body whitespace-nowrap",
          "rounded border",

          {
            "text-btn-txt bg-btn-bg border-btn-border hover:bg-btn-hover active:bg-btn-active":
              variant === "default",
          },

          {
            "gap-1 min-h-6 px-2 py-0.5 text-sm": size === "sm",
            "gap-1.5 min-h-8 px-3 py-1.5 text-base": size === "base",
            "gap-2 min-h-10 px-3 py-1.5 text-base": size === "lg",
          },

          "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple-50",
          "aria-disabled:text-btn-txt-disabled aria-disabled:border-btn-border-disabled aria-disabled:pointer-events-none aria-disabled:bg-btn-bg-disabled",
        )}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

// BUTTON ICON

const buttonIcon = {
  base: ["flex flex-col w-fit gap-1 justify-center items-center rounded"],
  hover: ["hover:bg-btn-hover"],
  active: ["active:bg-btn-bg-active"],
  focus: [
    "focus:outline-none",
    "focus-visible:border-2 focus-visible:border-btn-border-focus",
  ],
  disabled: ["disabled:text-btn-txt-disabled", "disabled:pointer-events-none"],
};
const buttonIconVariants = {
  default: {
    base: [
      "min-w-[32px] min-h-[32px] bg-transparent",
      "text-base text-btn-txt",
    ],
  },

  list: {
    base: [
      "min-w-[24px] min-h-[24px] bg-transparent",
      "text-base text-btn-txt",
    ],
  },

  stroke: {
    base: [
      "group min-w-[32px] min-h-[32px] p-0.5 bg-btn-bg",
      "border border-solid border-btn-border",
      "text-base text-btn-txt",
    ],
    inner: ["flex flex-1 gap-1 items-center justify-center w-full rounded-sm"],
    disabled: [
      "disabled:border-btn-border-disabled disabled:bg-btn-bg-disabled",
    ],
    disabledInner: ["group-disabled:bg-btn-bg-disabled"],
  },
  nav: {
    base: ["min-w-[32px] min-h-[32px] bg-transparent text-txt-light text-2xl"],
  },
  secondary: {
    base: ["min-w-[24px] min-h-[24px] bg-transparent text-base text-btn-txt"],
    hover: ["hover:bg-btn-bg-active"],
  },
  dark: {
    base: ["min-w-[32px] min-h-[32px] bg-transparent", "text-base text-white"],
    hover: ["hover:bg-grey-30"],
    active: ["active:bg-grey-50"],
  },
};

type ButtonIconProps = ComponentPropsWithRef<"button"> & {
  icon: IconProp;
  variant?: keyof typeof buttonIconVariants;
  disabled?: boolean;
};

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  function SynqButtonIcon(
    { icon, className, variant = "default", disabled, ...props },
    ref,
  ) {
    switch (variant) {
      case "default": {
        const styles = classNames(
          className,
          buttonIcon.base,
          buttonIconVariants.default.base,
          buttonIcon.focus,
          buttonIcon.hover,
          buttonIcon.active,
          buttonIcon.disabled,
        );

        return (
          <button ref={ref} className={styles} {...props} disabled={disabled}>
            <Icon fixedWidth icon={icon} />
          </button>
        );
      }

      case "list": {
        const styles = classNames(
          className,
          buttonIcon.base,
          buttonIconVariants.list.base,
          buttonIcon.focus,
          buttonIcon.hover,
          buttonIcon.active,
          buttonIcon.disabled,
        );

        return (
          <button ref={ref} className={styles} {...props} disabled={disabled}>
            <Icon fixedWidth icon={icon} />
          </button>
        );
      }

      case "stroke": {
        const outer = classNames(
          className,
          buttonIcon.base,
          buttonIconVariants.stroke.base,
          buttonIcon.focus,
          buttonIcon.disabled,
          buttonIconVariants.stroke.disabled,
        );

        const inner = classNames(
          buttonIconVariants.stroke.inner,
          buttonIcon.hover,
          buttonIcon.active,
          buttonIconVariants.stroke.disabledInner,
        );

        return (
          <button ref={ref} className={outer} {...props} disabled={disabled}>
            <div className={inner}>
              <Icon fixedWidth icon={icon} />
            </div>
          </button>
        );
      }

      case "secondary": {
        const styles = classNames(
          className,
          buttonIcon.base,
          buttonIconVariants.secondary.base,
          buttonIcon.focus,
          buttonIconVariants.secondary.hover,
          buttonIcon.active,
          buttonIcon.disabled,
        );

        return (
          <button ref={ref} className={styles} {...props} disabled={disabled}>
            <Icon fixedWidth icon={icon} />
          </button>
        );
      }

      case "nav": {
        const styles = classNames(
          className,
          buttonIcon.base,
          buttonIconVariants.nav.base,
          buttonIcon.focus,
          buttonIcon.hover,
          buttonIcon.active,
          buttonIcon.disabled,
        );

        return (
          <button ref={ref} className={styles} {...props} disabled={disabled}>
            <Icon fixedWidth icon={icon} />
          </button>
        );
      }

      case "dark": {
        const styles = classNames(
          className,
          buttonIcon.base,
          buttonIconVariants.dark.base,
          buttonIcon.focus,
          buttonIconVariants.dark.hover,
          buttonIconVariants.dark.active,
        );

        return (
          <button ref={ref} className={styles} {...props} disabled={disabled}>
            <Icon fixedWidth icon={icon} />
          </button>
        );
      }
    }
  },
);

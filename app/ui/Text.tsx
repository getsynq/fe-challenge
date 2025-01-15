import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";
import classNames from "classnames";
import type { FC, ReactNode } from "react";
import { Icon } from "./Icon";

export const TextLink: FC<RemixLinkProps & { disabled?: boolean }> = ({
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <Link
      className={classNames(
        className,
        "group/link",
        "hover:underline aria-disabled:pointer-events-none",
        "[&>*]:hover:underline",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2 focus-visible:rounded-sm"
      )}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </Link>
  );
};

export const TextPath: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className={
        "flex flex-nowrap gap-1 items-center min-w-0 max-w-fit ml-9 text-sm text-txt-light"
      }
    >
      <Icon className="text-sm text-txt-light" icon={faArrowRight} />
      {children}
    </div>
  );
};

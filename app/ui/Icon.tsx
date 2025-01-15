import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import type { FC } from "react";

// ICON

export const Icon: FC<FontAwesomeIconProps> = ({ className, ...props }) => (
  <FontAwesomeIcon className={classNames(className, "shrink-0")} {...props} />
);

export const LoadingIcon: FC<Omit<FontAwesomeIconProps, "icon">> = (props) => {
  return <Icon icon={faCircleNotch} spin {...props} />;
};

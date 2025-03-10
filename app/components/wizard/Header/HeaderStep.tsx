import classNames from "classnames";

import type { PropsWithChildren } from "react";
import type { WizardStepStateProps } from "../";

export const HeaderStep = (props: PropsWithChildren<WizardStepStateProps>) => {
  const { index, order, active, children } = props;

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      <div
        className={classNames(
          "flex items-center justify-center min-w-[18px] min-h-[18px]",
          "font-mono text-sm leading-none",
          "rounded-md",
          {"bg-grey-90 ": !active},
          {"text-purple-50 border border-purple-50 bg-white": active},
        )}
      >
        {order || index + 1}
      </div>
      <div
        className={classNames("text-base text-txt-light", {
          "text-purple-50": active,
        })}
      >
        {children}
      </div>
    </div>
  );
}

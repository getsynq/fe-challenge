import classNames from "classnames";
import type { FC, HTMLAttributes } from "react";

export const Skeleton2: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        className,
        "bg-grey-90 motion-safe:animate-pulse max-w-full rounded-lg h-4",
      )}
      {...props}
    />
  );
};

const skeletonVariants = {
  xs: "h-3",
  sm: "h-4",
  base: "h-5",
  lg: "h-8",
};

export const Skeleton: FC<
  HTMLAttributes<HTMLDivElement> & { size?: keyof typeof skeletonVariants }
> = ({ className, size = "base", ...props }) => {
  return (
    <div
      className={classNames(
        className,
        skeletonVariants[size],
        "bg-grey-90 motion-safe:animate-pulse rounded",
      )}
      {...props}
    />
  );
};

import { type FC, type PropsWithChildren } from "react";

export const SummaryItem: FC<PropsWithChildren & { label: string }> = ({
  label,
  children,
}) => {
  return (
    <div className="box inline-box-lg text-base">
      <div className="w-1/4 text-txt-light text-right">{label}</div>
      <div className="w-3/4 flex gap-2 items-center">{children}</div>
    </div>
  );
};

export const Summary: FC<PropsWithChildren & { title?: string }> = ({
  children,
  title = "Summary",
}) => {
  return (
    <div className="box-vertical inline-box-base mt-6">
      <h2 className="text-txt-light text-sm font-bold uppercase">{title}</h2>

      <div className="flex flex-col p-4 gap-2 border border-border-base rounded">
        {children}
      </div>
    </div>
  );
};

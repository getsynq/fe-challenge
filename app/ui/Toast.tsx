import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type {
  ToastActionProps,
  ToastDescriptionProps,
  ToastProps,
  ToastViewportProps,
} from "@radix-ui/react-toast";
import {
  Action,
  Description,
  Provider,
  Root,
  Viewport,
} from "@radix-ui/react-toast";
import classNames from "classnames";
import { debounce } from "lodash-es";
import {
  useEffect,
  useMemo,
  useState,
  type FC,
  type RefAttributes,
} from "react";
import type { ToastVariant } from "~/models/toast";
import { useSynqStore } from "~/store";
import { Icon } from "~/ui/Icon";
import { ButtonIcon } from "./Button";

const Toast: FC<ToastProps & RefAttributes<HTMLLIElement>> = ({
  children,
  className,
  id,
  ...props
}) => {
  const removeToast = useSynqStore((state) => state.removeToast);
  const [open, setOpen] = useState(true);

  // We debounce remove so that animation can play out
  const debouncedRemove = useMemo(
    () =>
      debounce((id: string) => {
        removeToast(id);
      }, 100),
    [removeToast],
  );

  useEffect(
    () => () => {
      debouncedRemove.cancel();
    },
    [debouncedRemove],
  );

  const remove = () => {
    setOpen(false);
    if (id) debouncedRemove(id);
  };

  return (
    <Root
      open={open}
      className={classNames(
        "flex flex-nowrap items-center w-fit",
        "gap-3 pl-3 pr-2 py-2 bg-toast-bg rounded shadow-lg",
        "motion-safe:data-[state=open]:animate-[toastSlideIn_150ms_cubic-bezier(0.16,1,0.3,1)]",
        "motion-safe:data-[state=closed]:animate-[hide_100ms_ease-in]",
        "motion-safe:data-[swipe=move]:translate-x-[--radix-toast-swipe-move-x]",
        "motion-safe:data-[swipe=cancel]:translate-x-0",
        "motion-safe:data-[swipe=cancel]:animate-[transform_200ms_ease-out]",
        "motion-safe:data-[swipe=end]:animate-[toastSwipeOut_100ms_ease-out]",
        className,
      )}
      onOpenChange={(open) => {
        if (!open && id) {
          setOpen(false);
          debouncedRemove(id);
        }
      }}
      {...props}
    >
      {children}
      {id && (
        <ButtonIcon variant="dark" icon={faClose} onClick={() => remove()} />
      )}
    </Root>
  );
};

const ToastIcon: FC<{ icon: IconProp; variant: ToastVariant }> = ({
  icon,
  variant,
}) => {
  return (
    <div
      className={classNames(
        "flex shrink-0 items-center justify-center w-[30px] h-[30px] rounded-full",
        {
          "bg-toast-icon-bg-success": variant === "success",
          "bg-toast-icon-bg-warn": variant === "warning",
        },
      )}
    >
      <Icon
        className={classNames("text-base", {
          "text-toast-icon-txt-success": variant === "success",
          "text-toast-icon-txt-warn": variant === "warning",
        })}
        icon={icon}
      />
    </div>
  );
};

const ToastDescription: FC<
  ToastDescriptionProps & RefAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <Description
      className={classNames("flex-1 text-base text-toast-txt", className)}
      {...props}
    >
      {children}
    </Description>
  );
};

const ToastAction: FC<ToastActionProps & RefAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Action asChild {...props}>
      <button
        className={classNames(
          "px-3 py-1.5 text-base text-white border border-solid border-white rounded",
          className,
        )}
      >
        {children}
      </button>
    </Action>
  );
};

const ToastViewport: FC<
  ToastViewportProps & RefAttributes<HTMLOListElement>
> = ({ className, ...props }) => {
  return (
    <Viewport
      className={classNames(
        className,
        "fixed flex flex-col max-w-xl items-end",
        "bottom-0 right-0",
        "gap-2 m-0 p-[--viewport-padding]",
        "list-none z-50 outline-none",
      )}
      {...props}
    />
  );
};

export {
  Toast,
  ToastAction,
  ToastDescription,
  ToastIcon,
  Provider as ToastProvider,
  ToastViewport
};


import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useActionData, useFetchers } from "@remix-run/react";
import { isObject } from "lodash-es";
import type { FC, ReactElement } from "react";
import { useEffect, useMemo } from "react";
import type { ToastMessage, ToastVariant } from "~/models/toast";
import { useSynqStore } from "~/store";
import {
  Toast,
  ToastDescription,
  ToastIcon,
  ToastProvider,
  ToastViewport,
} from "~/ui/Toast";

const icons: Record<ToastVariant, IconDefinition> = {
  success: faCheck,
  warning: faTimes,
  error: faExclamationTriangle,
  info: faInfoCircle,
};

export const ToastRenderer: FC = () => {
  const toasts = useSynqStore((state) => state.toasts);

  const toastsArray = Object.entries(toasts);

  return (
    toastsArray.length !== 0 && (
      <ToastProvider>
        {toastsArray.map(([id, toast]) => (
          <Toast key={id} id={id} defaultOpen>
            <ToastIcon icon={icons[toast.variant]} variant={toast.variant} />
            <ToastDescription>{convertToLink(toast.message)}</ToastDescription>
          </Toast>
        ))}

        <ToastViewport />
      </ToastProvider>
    )
  );
};

function convertToLink(str: string): ReactElement {
  // Regular expression to match the custom link format
  const linkRegex = /<([^|]+)\|([^>]+)>/;

  const match = str.match(linkRegex);
  if (!match) {
    return <>{str}</>;
  }

  const [fullMatch, linkText, url] = match;
  const parts = str.split(fullMatch);

  return (
    <>
      {parts[0]}
      <Link className="underline" to={url}>
        {linkText}
      </Link>
      {parts[1]}
    </>
  );
}

export const useToastsFromNavigation = () => {
  const addToast = useSynqStore((state) => state.addToast);
  const actionData = useActionData();

  const fetchers = useFetchers();

  const actions = useMemo(
    () =>
      fetchers
        .filter(
          (fetcher) =>
            fetcher.state === "loading" &&
            fetcher.formMethod &&
            fetcher.data &&
            "toastMessage" in fetcher.data,
        )
        .map<ToastMessage>((fetcher) => fetcher.data.toastMessage),
    [fetchers],
  );

  useEffect(() => {
    actions.forEach((action) =>
      addToast({
        id: action.id,
        variant: action.variant || "success",
        message: action.message || "",
      }),
    );
  }, [actions, addToast]);

  useEffect(() => {
    if (actionData && isObject(actionData) && "toastMessage" in actionData) {
      const toast = actionData.toastMessage as ToastMessage;

      addToast({
        id: toast.id,
        variant: toast.variant || "success",
        message: toast.message || "",
      });
    }
  }, [actionData, addToast]);
};

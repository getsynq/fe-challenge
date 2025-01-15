import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useFetcher } from "@remix-run/react";
import { useCallback, useEffect } from "react";
import {
  jsonWithError,
  jsonWithSuccess,
  redirectWithSuccess,
} from "remix-toast";
import invariant from "tiny-invariant";
import { z } from "zod";

import { fakeDelay } from "~/utils/general";

export const formSchemaA = z.object({
  valueForA: z.string(),
});
export const formSchemaB = z.object({
  valueForB: z.string(),
});

export type FormSchemaA = z.input<typeof formSchemaA>;
export type FormSchemaB = z.input<typeof formSchemaB>;

// IMPORTANT
// This file is a template for creating a new resource route.
// It should always be put under "resource" routes and should be named after the resource.
// It should not export a view component, but only the loader, action, and hooks.

// LOADER

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const value = url.searchParams.get("value");

  invariant(value, "[Test-Loader] No value provided!");

  try {
    // load data
    await fakeDelay(1000);

    return json({
      kind: "success" as const,
      value,
      test: Math.random() * 6540654,
    });

    // Use jsonWithSuccess/error/warn for success responses with a toast message
    /* return jsonWithSuccess(
      {
        user,
        value,
        loadedData: { test: "data" },
      },
      { message: "Data loaded successfully!" },
    ); */
  } catch (error) {
    return jsonWithError(
      {
        kind: "error" as const,
      },
      "Could not load data."
    );
  }
}

type TestResponse = typeof loader;
export type TestData = Awaited<
  ReturnType<Awaited<ReturnType<TestResponse>>["json"]>
>;

// ACTION
// Schema for action should be defined next to the action and should not be exported.
// It requires the actionType field to be defined as a literal type and can extend existing form schemas.

const actionSchema = z.discriminatedUnion("actionType", [
  formSchemaA.extend({ actionType: z.literal("actionA") }),
  formSchemaB.extend({
    actionType: z.literal("actionB"),
    propForActionOnly: z.string(),
  }),
  z.object({
    actionType: z.literal("actionC"),
    value: z.string(),
    redirectTo: z.string().optional(),
  }),
]);

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: actionSchema,
  });

  if (submission.status !== "success") {
    throw new Error(`[Test-Action] No action data provided`);
  }

  try {
    switch (submission.value.actionType) {
      case "actionA": {
        // do stuff :)
        await fakeDelay(1000);

        return jsonWithSuccess(
          {
            kind: "success" as const,
            reply: submission.reply(),
          },
          "Action A performed."
        );
      }

      case "actionB": {
        // do stuff :)
        await fakeDelay(1000);

        return jsonWithSuccess(
          {
            kind: "success" as const,
            reply: submission.reply(),
          },
          "Action B performed."
        );
      }

      case "actionC": {
        // do stuff :)
        await fakeDelay(1000);

        if (submission.value.redirectTo) {
          return redirectWithSuccess("/", "Action C performed.");
        }

        return jsonWithSuccess(
          {
            kind: "success" as const,
            reply: submission.reply(),
          },
          "Action C performed."
        );
      }

      default:
        throw new Error(`[Test-Action] Unsupported action type!`);
    }
  } catch (error) {
    return jsonWithError(
      {
        kind: "error" as const,
        message: "Could not complete the action."
      },
      "Could not complete the action."
    );
  }
}

type TestAction = typeof action;

// HOOKS

// HOOKS - LOADING
// Bellow are shown multiple ways of how the hook can be defined based on context/need.
// In general we should only expose one of them.

// This hook will load the data automatically once the hook is used.
// Useful when we just want to load the data without any user interaction
// or when we don't depend on some other async value.
export const useTestA = (requiredValue: string) => {
  const { load, data, state } = useFetcher<TestResponse>();

  useEffect(() => {
    load(`/fetchers?value=${requiredValue}`);
  }, [load, requiredValue]);

  return {
    loading: state !== "idle",
    data: data ?? null,
  };
};

// This hook will expose the load method that can be used at any time.
// Useful when user action is require or if we need to wait for some other async value.
export const useTestB = () => {
  const { load, data, state } = useFetcher<TestResponse>();

  const loadData = useCallback(
    (requiredValue: string) => {
      load(`/fetchers?value=${requiredValue}`);
    },
    [load]
  );

  return {
    loadData,
    loading: state !== "idle",
    data: data ?? null,
  };
};

// HOOKS - ACTIONS

type UseTestActionProps = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  onActionState?: (state: "idle" | "loading" | "submitting") => void;
};

export const useTestAction = ({
  onSuccess,
  onError,
  onActionState,
}: UseTestActionProps) => {
  const {
    submit,
    data: actionData,
    state: actionState,
  } = useFetcher<TestAction>();

  // This is only required when we want to impact the UI based on the action state.
  // For most situations it can be omitted.
  useEffect(() => {
    if (onActionState) {
      onActionState(actionState);
    }

    if (
      onSuccess &&
      actionState === "idle" &&
      actionData &&
      actionData.kind === "success" &&
      actionData.reply.status === "success"
    ) {
      onSuccess();
    }

    if (
      onError &&
      actionState === "idle" &&
      actionData &&
      actionData.kind === "error" &&
      'message' in actionData
    ) {
      onError(actionData.message);
    }
  }, [actionData, actionState, onActionState, onError, onSuccess]);

  // Receives a submission object and adds fields required for the action.
  // This way we don't need to add action fields to the form as hidden fields.
  const actionA = useCallback(
    (formData: FormData) => {
      formData.append("actionType", "actionA");
      submit(formData, {
        method: "POST",
        action: "/fetchers",
      });
    },
    [submit]
  );

  // Receives a formData object and appends fields required for the action.
  // This way we don't need to add action fields to the form as hidden fields.
  const actionB = useCallback(
    (formData: FormData, redirectTo?: string) => {
      formData.append("actionType", "actionB");
      formData.append("propForActionOnly", "Value included in action data");

      if (redirectTo) {
        formData.append("redirectTo", redirectTo);
      }

      submit(formData, {
        method: "POST",
        action: "/fetchers",
      });
    },
    [submit]
  );

  // Receives a value and creates a form data object to be submitted
  // First argument for submit is the FormData object.
  // In this example we provide an object that gets converted to FormData automatically,
  // so form data limitation need to be taken into account.
  // We could also create a FormData object manually and pass it to the submit function.
  const actionC = useCallback(
    (value: string, redirectTo?: string) => {
      submit(
        {
          actionType: "actionC",
          value,
          ...(redirectTo ? { redirectTo } : {}),
        },
        {
          method: "POST",
          action: "/fetchers",
        }
      );
    },
    [submit]
  );

  return {
    actionA,
    actionB,
    actionC,
    submitting: actionState !== "idle",
    actionData,
    actionState,
  };
};

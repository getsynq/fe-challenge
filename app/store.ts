import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ToastMessage } from "./models/toast";

// TYPES

// TYPES - WORKSPACE

type WorkspaceSlice = {
  toasts: Record<string, ToastMessage>;
  addToast: (toast: ToastMessage) => void;
  removeToast: (id: string) => void;
};

// TYPES - STORE

type Store = WorkspaceSlice;

// STORE

// STORE - WORKSPACE

const createWorkspaceSlice: StateCreator<
  WorkspaceSlice,
  [["zustand/devtools", never]],
  [],
  WorkspaceSlice
> = (set) => ({
  // TOASTS
  toasts: {},
  addToast: (toast: ToastMessage) => {
    set((state) => ({
      ...state,
      toasts: { ...state.toasts, [toast.id]: toast },
    }));
  },
  removeToast: (id: string) => {
    set((state) => {
      const newToasts = { ...state.toasts };
      delete newToasts[id];

      return {
        ...state,
        toasts: newToasts,
      };
    });
  },
});

// STORE - SYNQ
export const useSynqStore = create<Store>()(
  devtools((...a) => ({
    ...createWorkspaceSlice(...a),
  }))
);

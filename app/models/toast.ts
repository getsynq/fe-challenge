export type ToastVariant = "error" | "info" | "success" | "warning";

export type ToastMessage = {
  id: string;
  message: string;
  variant: ToastVariant;
};

export interface FormBaseProps<T> {
  className?: string;
  formId: string;
  initialValues?: T;
  onSubmit({
    submission,
    formData,
  }: {
    submission: T;
    formData: FormData;
  }): void;
}

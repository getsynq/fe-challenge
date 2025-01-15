import classNames from "classnames";
import type {
  ElementRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function SynqInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className={classNames(
        "px-2 py-1.5 text-base text-txt-dark border border-border-base rounded",
        "caret-blue-50 placeholder:text-txt-placeholder",
        "focus:outline-none focus:border-purple-50",
        "disabled:bg-grey-96",
        "aria-invalid:border-red-60",
        className,
      )}
    />
  );
});

export const Textarea = forwardRef<
  ElementRef<"textarea">,
  { noResize?: boolean } & TextareaHTMLAttributes<ElementRef<"textarea">>
>(function SynqInput({ className, noResize, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      {...props}
      className={classNames(
        "px-2 py-1.5 text-base text-txt-dark border border-border-base rounded",
        "caret-blue-50 placeholder:text-txt-placeholder",
        "focus:outline-none focus:border-purple-50",
        "aria-invalid:border-red-60",
        { "resize-none": noResize },
        className,
      )}
    />
  );
});

export const CommentTextArea = forwardRef<
  ElementRef<"textarea">,
  { noResize?: boolean } & TextareaHTMLAttributes<ElementRef<"textarea">>
>(function SynqInput({ className, noResize, rows, ...props }, ref) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(ref, () => textAreaRef.current!);

  useEffect(() => {
    const ref = textAreaRef.current;

    const updateTextareaHeight = () => {
      if (ref) {
        ref.style.height = "auto";
        ref.style.height = `${ref.scrollHeight + 2}px`;
      }
    };

    updateTextareaHeight();

    ref?.addEventListener("input", updateTextareaHeight);

    return () => ref?.removeEventListener("input", updateTextareaHeight);
  }, []);

  return (
    <textarea
      autoComplete="off"
      ref={textAreaRef}
      rows={rows ?? 1}
      spellCheck={true}
      {...props}
      className={classNames(
        "overflow-auto max-h-80 min-w-0 w-full px-2 py-1.5 resize-none",
        "text-base text-txt-dark whitespace-pre-wrap break-words",
        "border border-border-base rounded",
        "caret-blue-50 placeholder:text-txt-placeholder",
        "focus:outline-none focus:border-purple-50",
        "aria-invalid:border-red-60",
        { "resize-none": noResize },
        className,
      )}
    />
  );
});

export const FileInput = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "type">
>(function SynqInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="file"
      {...props}
      className={classNames(
        "flex items-center",
        "px-2 py-1.5 text-base text-txt-dark border border-border-base rounded",
        "file:border-0 file:bg-transparent file:font-mono file:text-sm file:text-txt-light",
        "placeholder:text-txt-placeholder",
        "focus:outline-none focus:border-purple-50",
        "disabled:bg-grey-96",
        className,
      )}
    />
  );
});

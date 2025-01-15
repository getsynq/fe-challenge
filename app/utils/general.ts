// Exhaustive switch check
export function assertUnreachable(x: never): never {
  throw new Error(
    `Should cover all cases! Case not covered ${JSON.stringify(x)}`,
  );
}

// Use with filter method to filter out null, undefined or both
export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}

export function notEmptyString<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined && value !== "";
}

export function includes<T extends U, U>(
  arr: ReadonlyArray<T>,
  el: U,
): el is T {
  return arr.includes(el as T);
}

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const allUnionTypesArray =
  <T>() =>
  <U extends T[]>(
    array: U & ([T] extends [U[number]] ? unknown : "missing values"),
  ) =>
    array;

export function stripHttpProtocol(url: string) {
  return url.replace(/(^\w+:|^)\/\//, "");
}

export const fakeDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
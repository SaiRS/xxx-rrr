import { isArray } from 'is-what';

export function validateArray<T = any>(arr: any, defaultValue: T[] = []): T[] {
  if (isArray(arr)) {
    return arr;
  } else {
    return defaultValue;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeDeep<T>(defaults: T, overrides: unknown): T {
  if (overrides === undefined || overrides === null) {
    return defaults;
  }

  if (Array.isArray(defaults)) {
    return (Array.isArray(overrides) ? overrides : defaults) as T;
  }

  if (!isPlainObject(defaults) || !isPlainObject(overrides)) {
    return overrides as T;
  }

  const result = { ...defaults } as Record<string, unknown>;
  for (const key of Object.keys(overrides)) {
    const defaultVal = (defaults as Record<string, unknown>)[key];
    const overrideVal = overrides[key];
    if (defaultVal !== undefined) {
      result[key] = mergeDeep(defaultVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }
  return result as T;
}

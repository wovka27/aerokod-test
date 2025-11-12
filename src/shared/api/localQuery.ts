export const localQuery = async <T>(fn: () => T) => {
  try {
    const result = fn();

    if (result === undefined || result === null) {
      return { data: [] as T };
    }

    return { data: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: { message } };
  }
};

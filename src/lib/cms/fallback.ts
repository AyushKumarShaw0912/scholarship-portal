export async function withCmsFallback<T>(
  fetchFromCms: () => Promise<T | null>,
  fallback: () => T | Promise<T>,
  context = "cms",
): Promise<T> {
  try {
    const result = await fetchFromCms();

    if (result === null) {
      return await fallback();
    }

    return result;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[${context}] Falling back to static content.`, error);
    }
    return await fallback();
  }
}

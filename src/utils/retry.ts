/** Simple exponential back‑off retry helper */
export async function retry<T>(fn: () => Promise<T>, attempts = 3, baseDelay = 800): Promise<T> {
  let lastError: any;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      // only wait if we have another attempt left
      if (i < attempts - 1) {
        const wait = baseDelay * Math.pow(2, i); // 800ms, 1.6s, 3.2s …
        await new Promise(res => setTimeout(res, wait));
      }
    }
  }
  throw lastError;
}

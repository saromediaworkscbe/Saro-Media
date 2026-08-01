/**
 * API boundary for the contact form. Swap the fake latency for a real
 * POST (e.g. fetch('/api/brief', ...)) without touching the component.
 */
export const submitBrief = async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (import.meta.env.DEV) console.info('[contact] brief submitted', payload);
  return { ok: true };
};

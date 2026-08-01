import { useEffect } from 'react';

/**
 * Tag any element as a cursor target. The global <Cursor /> listens for
 * pointerover on [data-cursor] and morphs accordingly.
 * Usage: <div {...cursorProps('view')}> or useCursor(ref, 'view')
 */
export const cursorProps = (variant = 'hover', label = '') => ({
  'data-cursor': variant,
  'data-cursor-label': label,
});

export const useCursor = (ref, variant = 'hover', label = '') => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.setAttribute('data-cursor', variant);
    if (label) el.setAttribute('data-cursor-label', label);
    return () => {
      el.removeAttribute('data-cursor');
      el.removeAttribute('data-cursor-label');
    };
  }, [ref, variant, label]);
};

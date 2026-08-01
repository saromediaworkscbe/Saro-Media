import { useLayoutEffect, useRef } from 'react';
import SplitType from 'split-type';

/**
 * Split an element's text into lines/words/chars once fonts are ready
 * (splitting before fonts load produces wrong line breaks).
 *
 * Returns a ref for the element and a ref holding the SplitType instance.
 * Reverts the split on unmount so React never diffs against mutated DOM.
 */
export const useSplitText = (types = 'lines', onSplit) => {
  const elementRef = useRef(null);
  const splitRef = useRef(null);
  const onSplitRef = useRef(onSplit);
  onSplitRef.current = onSplit;

  useLayoutEffect(() => {
    const el = elementRef.current;
    if (!el) return undefined;

    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      splitRef.current = new SplitType(el, { types, lineClass: 'line' });
      el.classList.add('line-mask');
      onSplitRef.current?.(splitRef.current, el);
    });

    return () => {
      cancelled = true;
      splitRef.current?.revert();
      splitRef.current = null;
    };
  }, [types]);

  return { elementRef, splitRef };
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ForwardedRef, Ref, RefCallback } from "react";
import { useCallback, useRef } from "react";

export const useCombinedRefs = <T>(...refs: Array<Ref<T>>): Ref<T> =>
  useCallback(
    (element: T) =>
      refs.forEach((ref) => {
        if (!ref) {
          return;
        }

        // Ref can have two types - a function or an object. We treat each case.
        if (typeof ref === "function") {
          return ref(element);
        }

        // As per https://github.com/facebook/react/issues/13029
        // it should be fine to set current this way.
        (ref as any).current = element;
      }),
    [refs]
  );

/**
 * Takes a forwarded ref and returns a ref and a callback ref
 * to work with. This is more straight forward than combining them
 * on a single ref instances that may or may not have a .current value
 */
export const useForwardedRef = <T extends HTMLElement>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  forwardedRef: ForwardedRef<T>
) => {
  const ref = useRef<T | null>(null);

  const callbackRef = useCallback<RefCallback<T>>(
    (node) => {
      if (!node) return;
      ref.current = node;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      forwardedRef = ref;
    },
    [forwardedRef]
  );
  return {
    callbackRef,
    ref,
  };
};

import { useLayoutEffect } from "react";

export function useLockedBody(locked = false) {
  useLayoutEffect(() => {
    if (!locked) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    //   lock scroll
    document.body.style.overflow = "hidden";

    // scrollbar width
    const root = document.getElementById("root");
    const scrollBarWidth =
      root !== null ? root.offsetWidth - root.scrollWidth : 0;

    if (!Number.isNaN(scrollBarWidth)) {
      const widthInPX = `${scrollBarWidth}px`;
      document.body.style.paddingRight = widthInPX;
    }

    return () => {
      document.body.style.overflow = originalOverflow;

      if (!Number.isNaN(scrollBarWidth)) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);
}

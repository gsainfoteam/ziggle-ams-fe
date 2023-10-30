import { useRef } from "react";

function useCarouselScroll({
  next,
  prev,
  threshold = 5,
}: {
  next: () => void;
  prev: () => void;
  threshold?: number;
}) {
  const scrollTimestamp = useRef(Date.now());

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    const timeSinceLastScrollinMs = now - scrollTimestamp.current;
    if (timeSinceLastScrollinMs > 500) {
      scrollTimestamp.current = now;
      if (e.deltaX > threshold) {
        next();
      }
      if (e.deltaX < -threshold) {
        prev();
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      next();
    }
    if (e.key === "ArrowLeft") {
      prev();
    }
  };

  return {
    onWheel,
    onKeyDown,
  };
}

export default useCarouselScroll;

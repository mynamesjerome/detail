/**
 * Utility functions for smooth animated scrolling with cubic easing
 */

export function animateScrollTo(targetY: number, duration: number = 750): Promise<void> {
  return new Promise((resolve) => {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) {
      resolve();
      return;
    }
    const startTime = performance.now();

    // Smooth cubic bezier easing: acceleration until halfway, then deceleration
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}

export function animateHorizontalScroll(
  element: HTMLElement,
  distance: number,
  duration: number = 500
): Promise<void> {
  return new Promise((resolve) => {
    const startX = element.scrollLeft;
    const startTime = performance.now();

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      element.scrollLeft = startX + distance * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}

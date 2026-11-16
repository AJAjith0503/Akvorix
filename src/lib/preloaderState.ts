let hasPreloadedGlobal = false;
const doneCallbacks: Array<() => void> = [];

// Clear any stale sessionStorage flag from prior versions so refresh always shows the preloader
if (typeof window !== "undefined") {
  try {
    sessionStorage.removeItem("akvorix_preloader_done");
  } catch {}
}

export const preloaderState = {
  isDone(): boolean {
    return hasPreloadedGlobal;
  },
  markDone() {
    hasPreloadedGlobal = true;
    // Notify all listeners that preloader has finished
    doneCallbacks.forEach((cb) => {
      try { cb(); } catch {}
    });
    doneCallbacks.length = 0;
    // Also dispatch a window event so any component can react without tight coupling
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("preloader-complete"));
    }
  },
  /** Register a one-time callback that fires when markDone() is called.
   *  If already done, fires immediately (next microtask). */
  onDone(cb: () => void) {
    if (hasPreloadedGlobal) {
      Promise.resolve().then(cb);
    } else {
      doneCallbacks.push(cb);
    }
  },
  reset() {
    hasPreloadedGlobal = false;
  },
};

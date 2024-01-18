export function loadFromLocalStorage(key) {
  if (typeof window !== "undefined") {
    try {
      const serialisedState = window.localStorage.getItem(key);
      if (serialisedState !== null) {
        return JSON.parse(serialisedState);
      }
      return undefined;
    } catch (err) {
      console.warn(err);
      return undefined;
    }
  }
}

export function saveToLocalStorage(key, state) {
  if (typeof window !== "undefined") {
    try {
      const serialState = JSON.stringify(state);
      window.localStorage.setItem(key, serialState);
    } catch (err) {
      throw new Error("Save state in local storage error:", err);
    }
  }
}

export function clearLocalStorage(key) {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
}

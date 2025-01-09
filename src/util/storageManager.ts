const storageManager = {
  setItem<T>(key: string, value: T): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(`Error setting item in localStorage with key "${key}":`, e);
    }
  },

  getItem<T>(key: string): T | null {
    try {
      const jsonValue = localStorage.getItem(key);
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      return value;
    } catch (e) {
      console.error(`Error getting item from localStorage: ${e}`);
      return null;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing item from localStorage: ${e}`);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(`Error clearing localStorage: ${e}`);
    }
  },

  getMultipleItems(keys: string[]): Record<string, unknown> {
    try {
      const result: Record<string, unknown> = {};
      keys.forEach((key) => {
        const jsonValue = localStorage.getItem(key);
        result[key] = jsonValue !== null ? JSON.parse(jsonValue) : null;
      });
      return result;
    } catch (e) {
      console.error("Error getting multiple items from localStorage:", e);
      return {};
    }
  },
};

export { storageManager };
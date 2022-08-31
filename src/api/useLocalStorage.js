/**
 * Use a value from localStorage. Value can be anything serializable as JSON.
 */
import {
  customRef,
} from 'vue';

const cache = new Map();

//------------------------------------------------------------------------------
function loadValue(key) {
  const s = localStorage.getItem(key);
  return s
    ? JSON.parse(s)
    : undefined;
}

//------------------------------------------------------------------------------
function cacheGetValue(key) {
  return cache.get(key);
}

//------------------------------------------------------------------------------
function cacheSetValue(key, value) {
  cache.set(key, value);
}

//------------------------------------------------------------------------------
function cacheAddValue(key, defaultValue) {
  const valueRef = customRef((track, trigger) => {
    let value = defaultValue;
    let isLoaded = false;

    return {
      get() {
        track();
        if (!isLoaded) {
          isLoaded = true;
          const loadedValue = loadValue(key);
          if (typeof loadedValue !== 'undefined') {
            value = loadedValue;
          }
        }
        return value;
      },

      set(newValue) {
        value = newValue;
        localStorage.setItem(key, JSON.stringify(value));
        trigger();
      },
    };
  });

  cacheSetValue(key, valueRef);
  return valueRef;
}

//------------------------------------------------------------------------------
function useLocalStorage(key, defaultValue) {
  return cacheGetValue(key) || cacheAddValue(key, defaultValue);
}

export default useLocalStorage;

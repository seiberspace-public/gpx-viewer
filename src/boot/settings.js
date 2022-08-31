import {
  LS_APP_VERSION,

  LS_MAP_VIEW,
  LS_MAP_PROVIDERS,
  LS_UI_OPTIONS_EXPANDED,
  LS_UI_DATALAYERS_EXPANDED,
  LS_UI_PROVIDERLAYERS_EXPANDED,
  LS_UI_LOCATION_CURSOR_VISIBLE,

  DEFAULT_PROVIDERS,
  DEFAULT_VIEW,
} from 'src/constants.js';

import useLocalStorage from 'api/useLocalStorage.js';

// migrate storage
const storageVersion = useLocalStorage(LS_APP_VERSION);
if (!storageVersion.value) {
  localStorage.clear();
  storageVersion.value = process.env.APP_VERSION;
}

// Providers: Change attribute 'provider' to 'data' (0.5.0)
const storedProviders = useLocalStorage(LS_MAP_PROVIDERS, DEFAULT_PROVIDERS);
storedProviders.value = storedProviders.value.map((provider) => {
  if (provider.provider) {
    provider.data = provider.provider;
    delete provider.provider;
  }
  return provider;
});

// Set some defaults
useLocalStorage(LS_MAP_VIEW, DEFAULT_VIEW);
useLocalStorage(LS_MAP_PROVIDERS, DEFAULT_PROVIDERS);
useLocalStorage(LS_UI_DATALAYERS_EXPANDED, true);
useLocalStorage(LS_UI_PROVIDERLAYERS_EXPANDED, false);
useLocalStorage(LS_UI_OPTIONS_EXPANDED, true);
useLocalStorage(LS_UI_LOCATION_CURSOR_VISIBLE, true);

import {
  reactive,
} from 'vue';

import providerData from './providers.json';

const providers = reactive(providerData);

/*
// The following code is for generating the providers.json,
// without the "disabled"-flags.

//------------------------------------------------------------------------------
function compareProviders(a, b) {
  return a.label.localeCompare(b.label);
}

//------------------------------------------------------------------------------
function createProviders() {
  const entries = window.L.TileLayer.Provider.providers;

  for (const [label, value] of Object.entries(entries)) {
    const item = { label };
    if (value.variants) {
      const children = Object.keys(value.variants).map((variantLabel) => ({
        label: variantLabel,
        provider: `${label}.${variantLabel}`,
      }));
      children.sort(compareProviders);
      item.children = children;
    } else {
      item.provider = label;
    }
    providers.push(item);
  }

  providers.sort(compareProviders);
  console.log(JSON.stringify(providers, null, 2));
}
*/

//------------------------------------------------------------------------------
function useTileProviders() {
  return {
    providers,
  };
}

export default useTileProviders;

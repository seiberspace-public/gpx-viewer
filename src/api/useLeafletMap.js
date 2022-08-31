import { DEFAULT_MAP_OPTIONS } from 'src/constants.js';

import {
  ref,
  markRaw,
  customRef,
} from 'vue';

//------------------------------------------------------------------------------
// Reactive lat, lng and zoom of map.
function createViewRef(map, onMapReady) {
  return customRef((track, trigger) => {
    const value = {
      lat: 0,
      lng: 0,
      zoom: 1,
    };

    function handleViewUpdate() {
      Object.assign(value, map.value.getCenter());
      value.zoom = map.value.getZoom();
      trigger();
    }

    onMapReady(() => {
      map.value.on('moveend', handleViewUpdate);
      map.value.on('zoomend', handleViewUpdate);
    });

    return {
      get() {
        track();
        return value;
      },

      set(newValue) {
        if (map.value) {
          map.value.setView([newValue.lat, newValue.lng], newValue.zoom);
          // Updating value and calling trigger() happens in event handler when
          // map established new view.
        } else {
          Object.assign(value, newValue);
          trigger();
        }
      },
    };
  });
}

//------------------------------------------------------------------------------
// Provides a leaflet-map with a reactive view, lifetime management
// and a onMapReady-hook.
function useLeafletMap() {
  const map = ref(null);

  const readyHandlers = [];

  const mapApi = {
    map,
  };

  mapApi.onMapReady = async (fn) => {
    if (map.value) {
      await fn(mapApi);
    } else {
      readyHandlers.push(fn);
    }
  };

  // Init view.
  mapApi.view = createViewRef(map, mapApi.onMapReady);

  mapApi.create = async (mapElement) => {
    try {
      map.value = markRaw(L.map(mapElement.value, DEFAULT_MAP_OPTIONS));
      map.value.setView([0, 0], 1);
      for (const handler of readyHandlers) {
        await handler(mapApi);
      }
      readyHandlers.splice(0, readyHandlers.length);
    } catch (error) {
      map.value = null;
      throw error;
    }
  };

  mapApi.destroy = () => {
    if (map.value) {
      map.value.remove();
      map.value = null;
    }
  };

  return mapApi;
}

export default useLeafletMap;

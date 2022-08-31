import {
  watch,
} from 'vue';

import providerLayerFactory from './providerLayerFactory.js';
import dataLayerFactory from './dataLayerFactory.js';

//------------------------------------------------------------------------------
function removeLayer(leafletLayer) {
  if (leafletLayer.layer) {
    leafletLayer.layer.remove();
    leafletLayer.layer = null;
  }
}

//------------------------------------------------------------------------------
async function updateLayer(mapApi, leafletLayer, layer, index) {
  if (leafletLayer.layer
    && (
      (leafletLayer.data !== layer.data) || !layer.visible)) {
    removeLayer(leafletLayer);
  }

  leafletLayer.data = layer.data;

  if (!leafletLayer.layer && layer.visible) {
    leafletLayer.layer = await leafletLayer.factoryFn(layer);
    leafletLayer.layer.addTo(mapApi.map.value);
    leafletLayer.layer.setZIndex(index);
    if (leafletLayer.createdCallback) {
      leafletLayer.createdCallback(leafletLayer.layer, layer);
    }
  }

  if (leafletLayer.zIndex !== index) {
    leafletLayer.zIndex = index;
    leafletLayer.layer?.setZIndex(index);
  }
}

//------------------------------------------------------------------------------
function createLayer(mapApi, factoryFn, createdCallback) {
  const leafletLayer = {
    factoryFn,
    createdCallback,
    layer: null,
    index: -1,
  };
  leafletLayer.update = updateLayer.bind(null, mapApi, leafletLayer);
  leafletLayer.remove = removeLayer.bind(null, leafletLayer);

  mapApi.map.value.once('unload', leafletLayer.remove);

  return leafletLayer;
}

//------------------------------------------------------------------------------
function watchLayers(mapApi, layers, factoryFn, createdCallback) {
  const leafletLayers = [];

  function update() {
    const { length } = layers;
    for (const [index, layer] of layers.entries()) {
      const leafletLayer = leafletLayers[index]
        || (leafletLayers[index] = createLayer(mapApi, factoryFn, createdCallback));
      leafletLayer.update(layer, length - index);
    }

    leafletLayers.splice(layers.length, leafletLayers.length)
      .forEach((leafletLayer) => {
        leafletLayer.remove();
      });
  }

  watch(layers, update);
  mapApi.onMapReady(update);

  return leafletLayers;
}

//------------------------------------------------------------------------------
// Sits on top of a mapApi returned by useLeafletMap() and provides reactive layer
// management.
function useMapLayers(mapApi, providerLayers, dataLayers) {
  watchLayers(mapApi, providerLayers, providerLayerFactory, (rawLayer, layer) => {
    layer.attribution = rawLayer.getAttribution();
  });

  watchLayers(mapApi, dataLayers, dataLayerFactory);

  return {
    ...mapApi,

    providerLayers,
    dataLayers,
  };
}

export default useMapLayers;

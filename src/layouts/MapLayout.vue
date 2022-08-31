<template>
  <q-layout view="hHr lpR fFf">
    <q-drawer
      v-model="drawerVisible"
      persistent
      elevated
      overlay
      no-swipe-open
      no-swipe-close
      no-swipe-backdrop
      behavior="mobile"
      side="right"
      :width="340"
      class="right-drawer"
    >
      <MapUi />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <AppFooter />

    <q-btn
      @click="drawerVisible = !drawerVisible"
      :color="drawerVisible ? 'secondary' : 'white'"
      :text-color="drawerVisible ? 'white' : 'secondary'"
      class="animate-colors drawer-button"
      icon="map"
      padding="sm"
      round
    >
      <template v-slot:tooltip>
        <q-tooltip :delay="1000">{{t('mapSettings')}}</q-tooltip>
      </template>
    </q-btn>
  </q-layout>
</template>

<script>
import {
  defineComponent,
  provide,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  watch,
} from 'vue';
import MapUi from 'components/MapUi.vue';
import AppFooter from 'components/AppFooter.vue';

import {
  LS_MAP_PROVIDERS,
  LS_MAP_VIEW,
  LS_UI_OPTIONS_EXPANDED,
} from 'src/constants.js';
import useLocalStorage from 'api/useLocalStorage.js';
import useMapLayers from 'api/useMapLayers.js';
import useLeafletMap from 'api/useLeafletMap.js';
import useMapWithRouter from 'api/useMapWithRouter.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MapLayout',

  components: {
    MapUi,
    AppFooter,
  },

  setup() {
    // Provides a context for the current map.
    // Connects the context to localStorage for the view and providers.
    const { providerLayers, dataLayers } = inject('mapLayers');
    const mapContext = useMapLayers(useLeafletMap(), providerLayers, dataLayers);
    const storedView = useLocalStorage(LS_MAP_VIEW);
    const storedProviders = useLocalStorage(LS_MAP_PROVIDERS);
    const drawerVisible = useLocalStorage(LS_UI_OPTIONS_EXPANDED);

    useMapWithRouter(mapContext);

    // Sync with stored settings.
    mapContext.onMapReady(({ view }) => {
      // View -> stored value.
      // Source of truth is always the view, which in turn follows user actions,
      // either navigating or zooming/panning the map.
      watch(view, (newValue) => {
        storedView.value = newValue;
      }, { deep: true });

      // Providers
      mapContext.providerLayers.splice(
        0,
        mapContext.providerLayers.length,
        ...storedProviders.value,
      );

      watch(mapContext.providerLayers, () => {
        storedProviders.value = mapContext.providerLayers;
      });
    });

    onBeforeMount(() => {
      document.documentElement.classList.add('fullscreen');
    });

    onBeforeUnmount(() => {
      document.documentElement.classList.remove('fullscreen');
    });

    // Provide map data.
    provide('mapContext', mapContext);

    return {
      drawerVisible,
    };
  },
});
</script>

<style lang="scss">
.right-drawer {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer-button {
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 5000;
}
</style>

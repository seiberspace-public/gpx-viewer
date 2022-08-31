<template>
  <q-page class="page flex items-center justify-center">
    <div ref="mapElement" class="map"></div>
    <q-icon
      v-if="cursorVisible"
      class="center-crosshair"
      name="location_searching"
      color="black"
      size="2rem"
    />
    <q-banner v-if="lastError" rounded class="text-white bg-red">
      <template v-slot:avatar>
        <q-icon name="error" color="white" />
      </template>
      <div class="text-overline">{{t('errorCreateMap')}}</div>
      <div>{{lastError.message}}</div>
    </q-banner>
  </q-page>
</template>

<script>
import {
  defineComponent,
  inject,
  ref,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import {
  LS_UI_LOCATION_CURSOR_VISIBLE,
} from 'src/constants.js';
import useLocalStorage from 'api/useLocalStorage.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MapPage',

  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const {
      create,
      destroy,
    } = inject('mapContext');

    const mapElement = ref(null);
    const lastError = ref(null);
    const cursorVisible = useLocalStorage(LS_UI_LOCATION_CURSOR_VISIBLE);

    useMeta(() => ({
      title: `${route.params?.lat} ${route.params?.lng} Z: ${route.params?.zoom}`,
    }));

    onMounted(async () => {
      try {
        lastError.value = null;
        await create(mapElement);
      } catch (error) {
        lastError.value = error;
      }
    });

    onBeforeUnmount(() => {
      destroy();
    });

    return {
      t,
      mapElement,
      lastError,
      cursorVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.map {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.center-crosshair {
  display: block;
  z-index: 500;
  pointer-events: none;
  -webkit-text-stroke: 1px white;
}
</style>

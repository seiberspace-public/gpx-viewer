<template>
  <q-item class="q-pa-md flex items-center">
    <q-item-section avatar>
      <q-icon
        :name="cursorVisible ? 'location_searching' : 'location_disabled'"
        class="cursor-pointer"
        :color="cursorVisible ? 'grey-9' : 'grey-6'"
        @click="toggleCursorVisible"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label :lines="1">
        {{t('location', { lat, lng })}}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn
        size="xs"
        padding="xs"
        flat
        icon="content_copy"
        @click="copyLocation"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { copyToClipboard, useQuasar } from 'quasar';

import {
  LS_UI_LOCATION_CURSOR_VISIBLE,
} from 'src/constants.js';
import useLocalStorage from 'api/useLocalStorage.js';

//------------------------------------------------------------------------------
function formatLatLng(value) {
  return (parseFloat(value) || 0).toFixed(8);
}

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PositionItem',

  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const quasar = useQuasar();
    const cursorVisible = useLocalStorage(LS_UI_LOCATION_CURSOR_VISIBLE);

    const lat = computed(() => formatLatLng(route.params.lat));
    const lng = computed(() => formatLatLng(route.params.lng));

    async function copyLocation() {
      await copyToClipboard(`${route.params.lat},${route.params.lng}`);
      quasar.notify({
        message: t('copied'),
      });
    }

    function toggleCursorVisible() {
      cursorVisible.value = !cursorVisible.value;
    }

    return {
      t,
      lat,
      lng,
      cursorVisible,
      copyLocation,
      toggleCursorVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-page-sticky {
  z-index: 1000;
}
</style>

<template>
  <LayerList
    icon="mode_of_travel"
    itemKey="dataLayers"
    v-model="expanded"
    no-sort
    :label="t('dataLayers')"
    @itemclick="setBoundsToLayer"
  >
    <template #item="{ index }">
      <GpxLayerListItem :index="index" />
    </template>

    <template #add="addItem">
      <q-item>
        <q-item-section class="items-center">
          <SelectFilesButton
            unelevated
            size="sm"
            color="secondary"
            multiple
            accept=".gpx, .xml"
            :label="t('addGpxLayer')"
            @selected="(files) => loadFiles(files, addItem)"
          />
        </q-item-section>
      </q-item>
    </template>
  </LayerList>
</template>

<script>
import {
  defineComponent,
  markRaw,
  inject,
} from 'vue';

import LayerList from 'components/LayerList.vue';
import GpxLayerListItem from 'components/GpxLayerListItem.vue';
import SelectFilesButton from 'components/SelectFilesButton.vue';

import {
  LS_UI_DATALAYERS_EXPANDED,
  LS_UI_OPTIONS_EXPANDED,
} from 'src/constants.js';
import useLocalStorage from 'api/useLocalStorage.js';
import { useI18n } from 'vue-i18n';
import {
  loadGpx,
  createId,
} from 'api/dataLayerFactory.js';

//------------------------------------------------------------------------------
async function createGpxItem(file) {
  const data = markRaw(await loadGpx(await file.text()));
  return {
    data,
    id: createId(),
    name: file.name,
    icon: 'layers',
    date: file.lastModifiedDate,
    size: file.size,
    distance: (data.get_distance() / 1000).toFixed(3),
    trackName: data.get_name(),
    visible: true,
  };
}

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'GpxLayerList',

  components: {
    LayerList,
    GpxLayerListItem,
    SelectFilesButton,
  },

  setup() {
    const { t } = useI18n();
    const { map, dataLayers } = inject('mapContext');
    const expanded = useLocalStorage(LS_UI_DATALAYERS_EXPANDED);
    const drawerVisible = useLocalStorage(LS_UI_OPTIONS_EXPANDED);

    async function loadFiles(files, addItem) {
      for (const file of files) {
        addItem(await createGpxItem(file));
      }
    }

    async function setBoundsToLayer(index) {
      map.value.fitBounds(dataLayers[index].data.getBounds());
      drawerVisible.value = false;
    }

    return {
      t,
      expanded,
      loadFiles,
      setBoundsToLayer,
    };
  },
});
</script>

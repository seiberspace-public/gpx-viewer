<template>
  <LayerList
    icon="map"
    itemKey="providerLayers"
    v-model="expanded"
    :label="t('providerLayers')"
  >
    <template #item="{ index }">
      <ProviderLayerListItem :index="index" />
    </template>

    <template #add="addItem">
      <q-item>
        <q-item-section class="items-center">
          <q-btn
            unelevated
            size="sm"
            color="secondary"
            multiple
            accept=".gpx, .xml"
            :label="t('addMapLayer')"
            @click="addMapLayerVisible = true"
          />
          <q-dialog v-model="addMapLayerVisible">
            <q-card class="dialog provider-list">
              <q-card-section>
                <div class="text-h6">{{t('addMapLayer')}}</div>
              </q-card-section>

              <q-card-section style="overflow: auto;padding-top: 0;">
                <ProviderLayerTree
                  inject-selected="providerTreeExpanded"
                  @select="(item) => {addItem(item);addMapLayerVisible = false;}" />
              </q-card-section>

              <q-separator />
              <q-card-actions align="right">
                <q-btn
                  flat
                  :label="t('g.close')"
                  color="grey-8"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-item-section>
      </q-item>
    </template>
  </LayerList>
</template>

<script>
import {
  defineComponent,
  ref,
  provide,
} from 'vue';

import LayerList from 'components/LayerList.vue';
import ProviderLayerListItem from 'components/ProviderLayerListItem.vue';
import ProviderLayerTree from 'components/ProviderLayerTree.vue';

import { LS_UI_PROVIDERLAYERS_EXPANDED } from 'src/constants.js';
import useLocalStorage from 'api/useLocalStorage.js';
import { useI18n } from 'vue-i18n';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'ProviderLayerList',

  components: {
    ProviderLayerTree,
    LayerList,
    ProviderLayerListItem,
  },

  setup() {
    const { t } = useI18n();
    const addMapLayerVisible = ref(false);
    const expanded = useLocalStorage(LS_UI_PROVIDERLAYERS_EXPANDED);

    // Keep this here so it persists across various invokations of
    // the dialog.
    const providerTreeExpanded = ref([]);
    provide('providerTreeExpanded', providerTreeExpanded);

    return {
      t,
      addMapLayerVisible,
      expanded,

    };
  },
});
</script>

<style lang="scss" scoped>
.provider-list {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>

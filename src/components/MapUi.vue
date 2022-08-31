<template>
  <div class="text-h5 q-pa-md">{{t('mapSettings')}}</div>
  <q-separator />

  <q-list class="scroll">
    <PositionItem />
    <GpxLayerList />
    <ProviderLayerList />
    <q-expansion-item
      header-class="text-subtitle1"
      icon="settings"
      :label="t('otherSettings')"
      expand-separator
    >
      <q-item>
        <q-item-section avatar>
          <q-icon name="language" />
        </q-item-section>
        <q-item-section>
          <LanguageSelect dense />
        </q-item-section>
      </q-item>
    </q-expansion-item>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import PositionItem from 'components/PositionItem.vue';
import GpxLayerList from 'components/GpxLayerList.vue';
import ProviderLayerList from 'components/ProviderLayerList.vue';
import LanguageSelect from 'components/LanguageSelect.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MapUi',

  components: {
    PositionItem,
    GpxLayerList,
    ProviderLayerList,
    LanguageSelect,
  },

  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style lang="scss" scoped>
.q-page-sticky {
  z-index: 1000;
}
</style>

<template>
  <q-item-section avatar class="no-sort">
    <q-toggle dense v-model="layer.visible" />
  </q-item-section>

  <q-item-section class="sort-handle">
    <q-item-label class="ellipsis">{{layer.data}}</q-item-label>
    <q-item-label caption :lines="2"><div v-html="layer.attribution" /></q-item-label>
  </q-item-section>

  <q-item-section side class="no-sort">
    <q-btn
      color="negative"
      outline
      round
      size="sm"
      icon="delete"
      @click="removeLayer"
    />
  </q-item-section>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'ProviderLayerListItem',

  props: {
    index: {
      type: Number,
      requred: true,
    },
  },

  setup(props) {
    const mapContext = inject('mapContext');
    const layer = computed(() => mapContext.providerLayers[props.index]);

    function removeLayer() {
      mapContext.providerLayers.splice(props.index, 1);
    }

    return {
      layer,
      removeLayer,
    };
  },
});
</script>

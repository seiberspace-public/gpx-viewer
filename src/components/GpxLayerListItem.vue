<template>
  <q-item-section avatar class="no-sort">
    <q-toggle dense v-model="layer.visible" />
  </q-item-section>

  <q-item-section>
    <q-item-label overline class="ellipsis">{{layer.name}}</q-item-label>
    <q-item-label class="ellipsis">{{layer.trackName}}</q-item-label>
    <q-item-label caption class="ellipsis">{{layer.distance}} km</q-item-label>
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
  name: 'GpxLayerListItem',

  props: {
    index: {
      type: Number,
      requred: true,
    },
  },

  setup(props) {
    const mapContext = inject('mapContext');
    const layer = computed(() => mapContext.dataLayers[props.index]);

    function removeLayer() {
      mapContext.dataLayers.splice(props.index, 1);
    }

    return {
      layer,
      removeLayer,
    };
  },
});
</script>

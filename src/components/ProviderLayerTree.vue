<template>
  <q-tree
    :nodes="providers"
    node-key="label"
    v-model:expanded="expanded"
    class="scroll"
  >
    <template #default-header="{node}">
      <div class="q-tree__node--link" @click="selectNode(node)">
        {{node.label}}
      </div>
    </template>
  </q-tree>
</template>

<script>
import {
  defineComponent,
  ref,
  inject,
  computed,
} from 'vue';

import useTileProviders from 'api/useTileProviders.js';
import { useI18n } from 'vue-i18n';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'ProviderLayerTree',

  props: {
    injectSelected: {
      type: String,
      default: '',
    },
  },

  emits: ['select'],

  setup(props, { emit }) {
    const { t } = useI18n();
    const { providers: list } = useTileProviders();

    // Hide disabled (requiring registration) providers.
    const providers = computed(() => list.filter(({ disabled }) => !disabled));

    const expanded = props.injectSelected
      ? inject(props.injectSelected)
      : ref([]);

    function selectNode(node) {
      if (!node.children) {
        emit('select', {
          data: node.provider,
          visible: true,
        });
      }
    }

    return {
      t,
      providers,
      expanded,
      selectNode,
    };
  },
});
</script>

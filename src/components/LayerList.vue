<template>
  <q-expansion-item
    header-class="text-subtitle1"
    expand-separator
    :class="{'sortable': !noSort}"
  >
    <VueDraggable
      :list="items"
      :animation="200"
      :touchStartThreshold="10"
      :delay="300"
      :delayOnTouchOnly="true"
      filter=".no-sort"
      :disabled="noSort"
      @start="drag=true"
      @end="drag=false"
      item-key="id"
    >
      <template #item="{element: item, index}">
        <q-item :clickable="noSort" @click="emit('itemclick', index)">
          <slot name="item" v-bind="{ item, index }"/>
        </q-item>
      </template>
    </VueDraggable>
    <slot name="add" v-bind="addItem"/>
  </q-expansion-item>
</template>

<script>
import {
  defineComponent,
  inject,
  computed,
  ref,
} from 'vue';

import VueDraggable from 'vuedraggable';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'LayerList',

  components: {
    VueDraggable,
  },

  props: {
    itemKey: {
      type: String,
      required: true,
    },

    noSort: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const mapContext = inject('mapContext');
    const drag = ref(false);
    const items = computed({
      get() {
        return mapContext[props.itemKey];
      },

      set(newValue) {
        mapContext[props.itemKey] = newValue;
      },
    });

    function addItem(item) {
      mapContext[props.itemKey].unshift(item);
    }

    return {
      items,
      addItem,
      drag,
      emit,
    };
  },
});
</script>

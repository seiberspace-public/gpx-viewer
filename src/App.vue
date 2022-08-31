<template>
  <router-view />
</template>

<script>
import {
  defineComponent,
  provide,
  reactive,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'App',

  setup() {
    // These should survive destruction of a map, so provide them from the top.
    const providerLayers = reactive([]);
    const dataLayers = reactive([]);

    provide('mapLayers', {
      providerLayers,
      dataLayers,
    });
  },
});
</script>

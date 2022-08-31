<template>
  <q-layout view="hHr lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <AppFooter />
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

import AppFooter from 'components/AppFooter.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MapLayout',

  components: {
    AppFooter,
  },
});
</script>

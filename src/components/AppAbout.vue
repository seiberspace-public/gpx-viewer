<template>
  <component
    class="about-card"
    :is="AppAbout"
    :flat="$q.screen.lt.sm"
  >
    <slot />
  </component>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import useContent from 'i18n/useContent.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'IndexPage',

  setup() {
    const { t } = useI18n();
    const AppAbout = useContent('AppAbout');

    return {
      t,
      AppAbout,
    };
  },
});
</script>

<style lang="scss" scoped>
.about-card {
  width: 580px;
  max-width: 100%;
}
</style>

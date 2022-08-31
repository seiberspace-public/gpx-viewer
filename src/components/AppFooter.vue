<template>
  <q-footer bordered class="bg-white text-black q-px-xs footer">
    <div class="flex items-center justify-center text-overline">
      <router-link :to="{ name: 'about' }" class="item">
        {{t('aboutTitle')}}, {{t('creditsLink')}}, {{t('gdprLink')}}
      </router-link>
    </div>
  </q-footer>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import { useI18n } from 'vue-i18n';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AppFooter',

  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style scoped lang="scss">
.footer {

  a.item {
    line-height: 3em;
    text-decoration: none;
    color: var(--q-primary);
  }
  a.item:hover,
  a.item:active {
    text-decoration: underline;
  }

  .item + .item:before {
    color: $grey-6;
    content: "•";
    padding: 0.3em;
  }
}
</style>

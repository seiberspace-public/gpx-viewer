<template>
  <q-page class="flex column items-center q-pa-sm q-pa-md-lg">
    <q-btn
      unelevated
      size="sm"
      class="self-start"
      icon="arrow_back"
      :label="t('g.back')"
      @click="back"
    />
    <AppAbout />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useMeta } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import AppAbout from 'components/AppAbout';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AboutPage',

  components: {
    AppAbout,
  },

  setup() {
    const { t } = useI18n();

    const router = useRouter();

    useMeta(() => ({
      title: t('aboutTitle'),
    }));

    return {
      t,
      back: router.back,
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

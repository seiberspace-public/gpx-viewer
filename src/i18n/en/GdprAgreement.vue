<template>
  <q-card-section class="q-py-none">
    <p>
      <strong>
        If you don't agree with that, you can't use this website.
      </strong>
    </p>
    <p>
      In this case please close this window or tab.
      Since up to this point no map data was loaded, no dataexchange with
      any third party occured.
    </p>
  </q-card-section>

  <q-separator inset />

  <q-card-section>
    <q-checkbox
      v-model="agreed"
      dense
    >
      <strong>I agree with that and want to use the maps.</strong>
    </q-checkbox>
  </q-card-section>

  <q-card-section class="flex justify-center">
    <q-btn
      :label="t('goToMap')"
      :to="to"
      :disable="!agreed"
      color="primary"
      icon="map"
      flat
    />
  </q-card-section>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { LS_GDPR_AGREED } from 'src/constants.js';
import useLocalStorage from 'api/useLocalStorage.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'GdprAgreement',

  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const to = computed(() => route.redirectedFrom || '/map');
    const agreed = useLocalStorage(LS_GDPR_AGREED, false);

    return {
      t,
      agreed,
      to,
    };
  },
});
</script>

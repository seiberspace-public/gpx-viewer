<template>
  <q-card-section class="q-py-none">
    <p>
      <strong>
        Wenn Sie damit nicht einverstanden sind, können Sie diese Website
        nicht nutzen.
      </strong>
    </p>
    <p>
      In diesem Fall schließen Sie dieses Fenster oder Tab.
      Da bis jetzt noch keine Karten geladen wurden, fand auch keinerlei
      Datenübertragung an Dritte statt.
    </p>
  </q-card-section>

  <q-separator inset />

  <q-card-section>
    <q-checkbox
      v-model="agreed"
      dense
    >
      <strong>Ich bin damit einverstanden und möchte die Karte benutzen.</strong>
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

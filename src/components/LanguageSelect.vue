<template>
  <q-select
    outlined
    emit-value
    map-options
    v-model="locale"
    :options="LANG_OPTIONS"
  >
    <template v-slot:selected-item="scope">
      <q-item-section side>
        <q-icon :name="scope.opt.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ scope.opt.label }}</q-item-label>
      </q-item-section>
    </template>

    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section side>
          <q-icon :name="scope.opt.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import {
  defineComponent,
  readonly,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';

import { LS_UI_LOCALE } from 'src/constants.js';
import useLocalStorage from 'api/useLocalStorage.js';

const LANG_OPTIONS = readonly([
  {
    label: 'English (US)',
    value: 'en-US',
    icon: 'img:/icons/us.svg',
  },
  {
    label: 'Deutsch',
    value: 'de-DE',
    icon: 'img:/icons/de.svg',
  },
]);

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'LanguageSelect',

  setup() {
    const { t, locale } = useI18n({ useScope: 'global' });
    const localeFromSettings = useLocalStorage(LS_UI_LOCALE);

    watch(locale, (newValue) => {
      localeFromSettings.value = newValue;
    });

    return {
      LANG_OPTIONS,
      t,
      locale,
    };
  },
});
</script>

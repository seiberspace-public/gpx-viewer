import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import { LS_UI_LOCALE } from 'src/constants.js';
import messages from 'src/i18n';
import useLocalStorage from 'api/useLocalStorage.js';

const FALLBACK_LOCALE = 'en';

//------------------------------------------------------------------------------
function getLocale(availableLocales) {
  const localesToTry = [useLocalStorage(LS_UI_LOCALE).value];
  if (availableLocales.includes(navigator.language)) {
    localesToTry.push(navigator.language);
  }
  localesToTry.push(...navigator.languages);
  return localesToTry.find((locale) => availableLocales.includes(locale)) || FALLBACK_LOCALE;
}

//------------------------------------------------------------------------------
export default boot(({ app }) => {
  const locale = getLocale(Object.keys(messages));
  useLocalStorage(LS_UI_LOCALE).value = locale;
  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: FALLBACK_LOCALE,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});

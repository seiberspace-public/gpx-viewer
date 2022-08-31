import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import AppAboutEn from 'i18n/en/AppAbout.vue';
import AppAboutDe from 'i18n/de/AppAbout.vue';

import GdprAgreementEn from 'i18n/en/GdprAgreement.vue';
import GdprAgreementDe from 'i18n/de/GdprAgreement.vue';

const components = {
  AppAbout: {
    'de-DE': AppAboutDe,
    'en-US': AppAboutEn,
  },

  GdprAgreement: {
    'de-DE': GdprAgreementDe,
    'en-US': GdprAgreementEn,
  },
};

//------------------------------------------------------------------------------
function useContent(name) {
  const component = components[name];
  if (!component) {
    throw new Error('Component not found.');
  }
  const { locale } = useI18n();
  return computed(() => component[locale.value]);
}

export default useContent;

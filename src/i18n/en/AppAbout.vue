<template>
  <q-card>
    <q-card-section>
      <q-card-section horizontal>
        <div class="q-pr-md">
          <div class="text-h5 text-primary q-pb-md">{{productName}}</div>
          <div class="q-pb-md flex"><LanguageSelect dense /></div>
          <div class="text-subtitle2">&copy; {{authorName}} 2022</div>
          <div class="text-caption">Version: {{version}}</div>
          <p class="q-mt-md q-mb-none">
            Actually just a GPX-Viewer I built for a friend.
          </p>
        </div>
        <q-space />

        <div class="q-pl-md flex items-start">
          <img alt="Logo" src="/icons/favicon-96x96.png">
        </div>
      </q-card-section>
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="text-h6 q-pb-md">Credits</div>
      <p>
        First I'd like to mention <a href="https://leafletjs.com/" target="_blank">Leaflet</a>.
        Best regards to <a href="https://agafonkin.com/" target="_blank">Volodymyr Agafonkin</a>
        for that.
      </p>
      <p>
        To display GPX-files I'm using
        <a href="https://github.com/mpetazzoni/leaflet-gpx" target="_blank">leaflet-gpx</a>.
      </p>
      <p>
        Map providers are read from
        <a href="https://github.com/leaflet-extras/leaflet-providers" target="_blank">leaflet-providers</a>.
      </p>
      <p>
        And of course my best regards to <a href="https://vuejs.org/" target="_blank">Vue.js</a> and
        <a href="https://quasar.dev/" target="_blank">Quasar</a>.
      </p>

      <div class="text-h6 q-pb-md">Privacy</div>
      <p>
        <strong>This website does neither collect nor store any personal data.</strong>
      </p>
      <p>
        Only some UI-state is stored in your browser's local storage.
        These are e.g. the names of your selected map providers, or info about
        the expanded state of some UI-elements. This is for your comfort, at no
        point any of these are sent to our server.
      </p>

      <div class="text-h6 q-pb-md">Location</div>
      <p>
        You will possibly be asked to allow access to your location data.
        This data is processed only in your browser, and only to position the
        map initially to your location.
        <strong>You can deny that, and still use this website.</strong>
      </p>

      <div class="text-h6 q-pb-md">Map provider</div>
      <p>
        This website displays map tiles (means images) from third party providers.
        These images will be loaded from the provider's website.
      </p>
      <p>
        These providers might be able to, depending on your browser settings,
        use independently from <i>this</i> website cookies on your computer.
      </p>
    </q-card-section>
    <slot />
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import LanguageSelect from 'components/LanguageSelect.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AppAbout',

  components: {
    LanguageSelect,
  },

  setup() {
    return {
      authorName: process.env.APP_AUTHOR,
      version: process.env.APP_VERSION,
      productName: process.env.APP_PRODUCT_NAME,
    };
  },
});
</script>

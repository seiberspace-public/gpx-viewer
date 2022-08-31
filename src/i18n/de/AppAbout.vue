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
            Eigentlich nur ein GPX-Viewer, den ich für einen Freund gebaut hab.
          </p>
        </div>
        <q-space />

        <div class="q-pl-md flex items-start">
          <img alt="Logo" src="/icons/favicon-96x96.png">
        </div>
      </q-card-section>
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="text-h6 q-pb-md">Danksagung</div>
      <p>
        Als erstes wäre da <a href="https://leafletjs.com/" target="_blank">Leaflet</a>
        zu nennen. Besten Dank an <a href="https://agafonkin.com/" target="_blank">Volodymyr Agafonkin</a>
        dafür.
      </p>
      <p>
        Zur Darstellung von GPX-Dateien verwende ich
        <a href="https://github.com/mpetazzoni/leaflet-gpx" target="_blank">leaflet-gpx</a>.
      </p>
      <p>
        Anbieter von Karten werden aus
        <a href="https://github.com/leaflet-extras/leaflet-providers" target="_blank">leaflet-providers</a>
        gelesen.
      </p>
      <p>
        Und natürlich meinen Dank an <a href="https://vuejs.org/" target="_blank">Vue.js</a> und
        <a href="https://quasar.dev/" target="_blank">Quasar</a>.
      </p>

      <div class="text-h6 q-pb-md">Datenschutz</div>
      <p>
        <strong>Diese Website erhebt oder speichert keinerlei personenbezogene Daten.</strong>
      </p>
      <p>
        Lediglich in Ihrem Browser werden Daten der Benutzeroberfläche gespeichert.
        Das sind z.B. die Namen der ausgewählten Karten, und Informationen, ob bestimmte
        Elemente der Benutzeroberfläche geöffnet oder geschlossen sind. Das dient
        einzig und alleine Ihrem Komfort, zu keiner Zeit werden diese Daten an
        uns übertragen.
      </p>

      <div class="text-h6 q-pb-md">Standort</div>
      <p>
        Unter Umständen werden Sie gefragt, ob Sie Zugriff auf Ihre Standortdaten
        erlauben wollen. Diese Daten werden lediglich in Ihrem Browser verarbeitet,
        um die Anfangsdarstellung der Karte auf Ihre Position zu setzen.
        <strong>Sie können dies ablehnen, und die Karte trotzdem nutzen.</strong>
      </p>

      <div class="text-h6 q-pb-md">Kartenanbieter</div>
      <p>
        Diese Website stellt Kartenmaterial (also Bilder) von Drittanbietern dar.
        Diese Bilder werden von der Website des Anbieters geladen.
      </p>
      <p>
        Diese Anbieter sind gegebenenfalls, abhängig von Ihren Browsereinstellungen,
        in der Lage, unabhängig von <i>dieser</i> Website auf Ihrem Computer Cookies
        zu benutzen.
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

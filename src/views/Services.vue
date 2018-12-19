<template>
  <v-layout>
    <v-flex>
      <v-card class="pa-3">
        <v-card-title>
          <h2 class="red--text text--darken-3 mb-0">Offener Kundenservice Bereich</h2>
        </v-card-title>
        <v-card-text>
          <p>Teilen Sie und hier einfache Änderungswünsche zu Ihren Kunden- und Vertragsdaten mit. Wir bearbeiten diese schnell und unkompliziert.</p>
        </v-card-text>
      </v-card>

      <div class="mt-5"></div>
      <h3 class="my-2 font-weight-bold">Ihre persönlichen Services</h3>
      <v-layout wrap>
        <v-flex xs12 md6>
          <v-card class="pa-3" color="primary" to="/change/contact">
            <v-card-title>
              <h3 class="white--text">Änderung Adresse und Kommunikationsdaten</h3>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="pa-3" color="secondary" disabled>
            <v-card-title>
              <h3 class="white--text">Änderung Abrufkonto</h3>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <div class="mt-5"></div>
      <QuickServices />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  import QuickServices from '@/components/QuickServices.vue';
  import icons from '@/globals/icons';

  @Component({
    components: {
      QuickServices,
    },
  })
  export default class Overview extends Vue {
    private icons = icons;
  }
</script>


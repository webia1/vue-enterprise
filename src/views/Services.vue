<template>
  <v-layout>
    <v-flex>
      <v-content>
        <h3 class="mb-0">Hallo {{ $store.state.userData.personal.firstName }} {{ $store.state.userData.personal.lastName }},</h3>
        <p>Sie befinden sich im freien Kundenbereich. Teilen Sie uns hier Änderungswünsche zu Ihren Kunden- und Vertragsdaten mit. Wir bearbeiten diese schnell und unkompliziert.</p>
      </v-content>

      <v-divider class="mt-5" />

      <v-content>
        <v-layout wrap justify-center class="services">
          <v-flex xs8 sm4 class="text-xs-center">
            <h4 class="mb-4">Folgende Services stehen Ihnen aktuell zur Verfügung</h4>
          </v-flex>
          <v-flex xs8>
            <v-layout wrap justify-center>
              <v-flex xs8 sm3>
                <v-card flat class="fill-height services__item" to="/change/contact">
                  <v-card-title>
                    <h5>
                      Änderung Adresse und Kommunikationsdaten »
                    </h5>
                  </v-card-title>
                  <!-- <v-icon
                    large
                    class="services__item__icon"
                  >
                    chevron_right
                  </v-icon> -->
                </v-card>
              </v-flex>
              <!-- <v-flex xs8 sm3>
                <v-card flat class="fill-height services__item" to="/change/contact">
                  <v-card-title>
                    <h5>
                      Änderung Beitragskonto
                    </h5>
                  </v-card-title>
                  <v-icon
                    large
                    class="services__item__icon"
                  >
                    chevron_right
                  </v-icon>
                </v-card>
              </v-flex> -->
            </v-layout>
          </v-flex>
        </v-layout>
      </v-content>

      <!-- <v-divider class="my-5" />

      <QuickServices /> -->
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


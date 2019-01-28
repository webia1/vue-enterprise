<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-content>
        <h2>
          Vielen Dank {{ $store.state.userData.personal.firstName }} {{ $store.state.userData.personal.lastName }},
        </h2>
        <h3>
          Ihre neuen Daten wurde erfolgreich übermittelt
          <v-btn icon depressed :ripple="false" color="success">
            <v-icon large>
              check
            </v-icon>
          </v-btn>
        </h3>

        <v-divider class="my-5" />

        <h3>
          Adresse
        </h3>
        <p>
          {{ $store.state.userData.personal.road }},
          {{ $store.state.userData.personal.zip }} {{ $store.state.userData.personal.city }}
          ({{ $store.state.userData.personal.country }})
        </p>

        <v-divider class="my-5" />

        <template v-if="$store.state.userData.personal.communications.length">
          <h3>Kommunikationsdaten</h3>
          <dl class="mt-4">
            <template
              v-for="(item, i) in $store.state.userData.personal.communications"
            >
              <dt :key="`communication_channel_${i}`">{{ getLabelForCommunication(item) }}</dt>
              <dd :key="`communication_value_${i}`">{{ item.value }}</dd>
            </template>
          </dl>
        </template>

        <v-divider class="my-5" />

        <h3>Änderungen gültig ab</h3>
        <p>
          {{ new Date($store.state.userData.dateFrom).toLocaleDateString() }}
        </p>

        <v-divider class="my-5" />

        <h3>Bestätigungs-E-Mail</h3>
        <p>
          An die Adresse&nbsp;
          <strong>
            {{ $store.state.userData.confirmationEmail }}
          </strong>
          &nbsp;haben wir eine Eingangsbestätigung geschickt.
        </p>

        <v-divider class="my-5" />

        <v-content>
          <v-layout wrap justify-center class="services">
            <v-flex xs8 md4 class="text-xs-center">
              <h3 class="mb-8">Ende der Teststrecke</h3>
              <h2 class="mb-8">Bitte kehren Sie zurück zur Kundenbfragung.</h2>
              <!-- <h4 class="mb-4">Folgende Services stehen Ihnen aktuell zur Verfügung</h4> -->
            </v-flex>
            <v-flex xs8>
              <v-layout wrap justify-center>
                <v-flex xs8 md3>
                  <!-- <v-card flat class="fill-height services__item" to="/change/contact">
                    <v-card-title>
                      <h5>
                        Änderung Adresse und Kommunikationsdaten »
                      </h5>
                    </v-card-title>
                  </v-card> -->
                </v-flex>
                <!-- <v-flex xs8 md3>
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
      </v-content>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import CommunicationItem from '@/globals/definitions/communication-item';
  import icons from '@/globals/icons';
  import communicationLabels from '@/globals/communication-labels';
  import QuickServices from '@/components/QuickServices.vue';

  @Component({
    components: {
      QuickServices,
    },
  })
  export default class ChangeSuccess extends Vue {
    private icons = icons;

    private labels = communicationLabels;

    private styling = {
      successHighlight: {
        ...({ height: '75px' }),
        'background-color': `${this.$vuetify.theme.success} !important`,
      },
    };

    private getLabelForCommunication(item: CommunicationItem, limit?: number) {
      const channelLabel = this.labels.communications.channel[item.channel];
      const publicnessLabel =
        item.channel !== 'fax' ? `(${this.labels.communications.publicness[item.publicness]})` : '';
      const label = `${channelLabel} ${publicnessLabel}`;
      if (limit && label.length > limit) {
        return `${label.substr(0, limit)}...`;
      }
      return label;
    }

    private mounted() {
      this.$store.dispatch('userData/contactChanged');
    }
  }
</script>

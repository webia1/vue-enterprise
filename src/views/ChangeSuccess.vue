<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card dark color="success mb-3">
        <v-card-text>
          <v-layout wrap justify-center>
            <v-flex xs1>
              <v-icon x-large>check</v-icon>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card class="pa-3">
        <v-card-title>
          <h2 class="red--text text--darken-3">Vielen Dank {{ $store.state.userData.personal.firstName }} {{ $store.state.userData.personal.lastName }}</h2>
        </v-card-title>
        <v-card-text>
          <h3>Folgende Daten haben wir geändert. Es kann etwas dauern, bis Ihr Änderungswunsch in allen unseren Systemen sichtbar ist.</h3>
          <v-list>
            <!-- <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>Name</v-list-tile-sub-title>
                <v-list-tile-title>{{ $store.state.userData.personal.firstName }} {{ $store.state.userData.personal.lastName }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> -->
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>Adresse</v-list-tile-sub-title>
                <v-list-tile-title>
                  {{ $store.state.userData.personal.address }},
                  {{ $store.state.userData.personal.zip }} {{ $store.state.userData.personal.city }}
                  ({{ $store.state.userData.personal.country }})
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider />
            <v-subheader v-if="$store.state.userData.personal.communications.length">
              Kontaktmöglichkeiten
            </v-subheader>
            <v-list-tile
              v-for="(item, i) in $store.state.userData.personal.communications"
              :key="i"
            >
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  {{ getLabelForCommunication(item) }}
                </v-list-tile-sub-title>
                <v-list-tile-title>
                  {{ item.value }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <p>Änderungen sind gültig ab <strong>{{ new Date($store.state.userData.dateFrom).toLocaleDateString() }}.</strong></p>
          <p>
            An die Adresse&nbsp;
            <strong>
              {{ $store.state.userData.confirmationEmail }}
            </strong>
            &nbsp;haben wir eine Eingangsbestätigung geschickt.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            large
            color="primary"
            to="/services"
          >
            <v-icon large>{{ icons.cta }}</v-icon>
            Zurück zur Service Auswahl
          </v-btn>
        </v-card-actions>
      </v-card>

      <div class="mt-5"></div>
      <h3 class="my-2 font-weight-bold">Versicherungen digital verwalten</h3>
      <v-card class="pa-3">
        <v-card-text>
          <h3>Das ERGO Kundenportal</h3>
          <h3 class="red--text text--darken-3">"Meine Versicherungen"</h3>
        </v-card-text>
        <v-card-text>
          <p>Im Kundenbereich "Meine Versicherungen" verwalten Sie Ihre Versicherungen, Ihre Nachrichten und Ihr Profil - einfach und bequem. Registrieren Sie sich jetzt in wenigen Schritten.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            color="grey"
          >
            <v-icon>{{ icons.cta }}</v-icon>
            Jetzt registrieren
          </v-btn>
        </v-card-actions>
      </v-card>

      <div class="mt-5"></div>
      <QuickServices />
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

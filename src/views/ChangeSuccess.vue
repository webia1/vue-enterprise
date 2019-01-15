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
          <h3>Folgende Daten haben wir geändert. Bitte beachten Sie, dass es etwas dauern kann, bis Ihr Änderungswunsch in allen unseren Systemen sichtbar ist.</h3>
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
                  {{ $store.state.userData.personal.zip }} {{ $store.state.userData.personal.location }}
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
                  {{ item.channel }} ({{ item.publicness }})
                </v-list-tile-sub-title>
                <v-list-tile-title>
                  {{ item.value }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <p>
            An die Adresse&nbsp;
            <strong>
              {{ $store.state.userData.confirmationEmail }}
            </strong>
            &nbsp;haben wir eine Eingangsbestätigung geschickt.
          </p>

          <v-card>
            <v-card-text>
              <h3 class="red--text text--darken-3 mb-0">Einwilligungserklärung</h3>
              <p>
                Ich willige ein, dass ich künftig
                <span class="mx-1" style="cursor: pointer;" @click="keweElectronic = !keweElectronic"><v-icon>{{ keweElectronic ? icons.forms.checkbox_checked : icons.forms.checkbox_blank }}</v-icon> per elektronischer Post</span>
                <span class="mx-1" style="cursor: pointer;" @click="kewePhone = !kewePhone"><v-icon>{{ kewePhone ? icons.forms.checkbox_checked : icons.forms.checkbox_blank }}</v-icon> per Telefon</span>
                (bitte zutreffendes ankreuzen)
                über Versicherungs- und Finanzprodukte von Unternehmen und Vermittlern unserer Versicherung informiert werde.<br>
                Sie können mich auch zur Kundenbefragung kontaktieren.
              </p>
              <p>
                Meine Daten dürfen hierfür verarbeitet werden. Diese Einwilligung gilt unabhängig davon, ob ein Vertrag besteht. Ich kann sie jederzeit formlos für die Zukunft widerrufen.
              </p>
            </v-card-text>
          </v-card>
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

  import QuickServices from '@/components/QuickServices.vue';
  import icons from '@/globals/icons';

  @Component({
    components: {
      QuickServices,
    },
  })
  export default class ChangeSuccess extends Vue {
    private icons = icons;

    private keweElectronic = false;
    private kewePhone = false;

    private styling = {
      successHighlight: {
        ...({ height: '75px' }),
        'background-color': `${this.$vuetify.theme.success} !important`,
      },
    };

    private mounted() {
      this.$store.dispatch('userData/contactChanged');
    }
  }
</script>

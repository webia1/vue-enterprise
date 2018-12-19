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
          <h3>Folgende Daten wurden zur Änderung zur übermittelt:</h3>
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>Name</v-list-tile-sub-title>
                <v-list-tile-title>{{ $store.state.userData.personal.firstName }} {{ $store.state.userData.personal.lastName }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
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
            <v-subheader>
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
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et nihil dolorem est. Aut omnis excepturi id repellendus molestias saepe consequatur pariatur in corrupti cupiditate. Minima.</p>
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

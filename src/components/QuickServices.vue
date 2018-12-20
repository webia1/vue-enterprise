<template>
  <div>
    <h3 class="my-2 font-weight-bold">Weitere Schnell-Services für Sie zur Auswahl</h3>
    <v-layout wrap>
      <v-flex xs12 md4>
        <v-card class="pa-3 fill-height">
          <v-card-title>
            <h3>Persönlicher Kontakt</h3>
          </v-card-title>
          <v-card-text>
            <v-layout justify-space-around>
              <v-flex xs3>
                <v-btn
                  flat
                  icon
                  color="primary"
                >
                  <div>
                    <v-icon large>{{ icons.contact.phone }}</v-icon><br>
                    Telefon
                  </div>
                </v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn
                  flat
                  icon
                  color="primary"
                >
                  <div>
                    <v-icon large>{{ icons.contact.chat }}</v-icon><br>
                    Chat
                  </div>
                </v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn
                  flat
                  icon
                  color="primary"
                >
                  <div>
                    <v-icon large>{{ icons.contact.partner }}</v-icon><br>
                    Vermittler
                  </div>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="pa-3 fill-height">
          <v-card-title>
            <h3>Schaden melden</h3>
          </v-card-title>
          <v-card-text>
            <v-layout justify-space-around>
              <v-flex xs3>
                <v-btn
                  flat
                  icon
                  color="primary"
                >
                  <div>
                    <v-icon large>{{ icons.contact.phone }}</v-icon><br>
                    Telefon
                  </div>
                </v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn
                  flat
                  icon
                  color="primary"
                >
                  <div>
                    <v-icon large>{{ icons.contact.online }}</v-icon><br>
                    Online
                  </div>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="pa-3 fill-height">
          <v-card-title>
            <h3>Vermittler vor Ort</h3>
          </v-card-title>
          <v-card-text>
            <v-text-field
              box
              :append-icon="icons.search"
              label="PLZ eingeben"
              v-model="partnerZip"
              @keyup.enter="openPartnerSearch()"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import icons from '@/globals/icons';

  @Component({})
  export default class QuickServices extends Vue {
    private icons = icons;
    private partnerZip = '';

    private openPartnerSearch() {
      window.open(`https://www.ergo.de/de/ResourcesUsability/Vermittlersuche?input=${this.partnerZip}`);
    }
  }
</script>

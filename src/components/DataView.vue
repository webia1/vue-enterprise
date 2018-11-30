<template>
  <v-layout>
    <v-flex>
      <h1>Deine Daten</h1>
      <p>
        Das sind deine Stammdaten.
        Für mögliche Änderungen kannst du einfach die
        betreffenden Felder durch anklicken anpassen oder
        unsere Komfort-Funktionen nutzen.
      </p>
      <v-layout wrap>
        <v-flex xs8>
          <h2>Kontaktdaten</h2>
        </v-flex>
        <v-flex xs4>
          <router-link :to="{ name: 'data-edit', query: { area: 'personal' } }">Bearbeiten</router-link>
        </v-flex>
        <v-flex xs4>
          <v-label>
            Vorname
          </v-label>
        </v-flex>
        <v-flex xs8>
          {{ userData.personal.firstName }}
        </v-flex>
        <v-flex xs4>
          <v-label>
            Nachname
          </v-label>
        </v-flex>
        <v-flex xs8>
          {{ userData.personal.lastName }}
        </v-flex>
        <v-flex xs4>
          <v-label>
            Straße
          </v-label>
        </v-flex>
        <v-flex xs8>
          {{ userData.personal.address }}
        </v-flex>
        <v-flex xs4>
          <v-label>
            PLZ / Ort
          </v-label>
        </v-flex>
        <v-flex xs8>
          {{ userData.personal.zip }} {{ userData.personal.location }}
        </v-flex>
        <v-flex xs4>
          <v-label>
            Telefon
          </v-label>
        </v-flex>
        <v-flex xs8>
          {{ userData.personal.phoneNumber }}
        </v-flex>
        <v-flex xs4>
          <v-label>
            E-Mail
          </v-label>
        </v-flex>
        <v-flex xs8>
          {{ userData.personal.email }}
        </v-flex>
      </v-layout>
      <p></p>
      <v-layout wrap>
        <v-flex xs8>
          <h2>Bankdaten</h2>
        </v-flex>
        <v-flex xs4>
          <router-link :to="{ name: 'data-edit', query: { area: 'bank' } }">Bearbeiten</router-link>
        </v-flex>
        <v-flex xs4>
          <v-label>
            IBAN
          </v-label>
        </v-flex>
        <v-flex xs8>
          {{ userData.bank.iban | ibanMask }}
        </v-flex>
        <v-flex xs4>
          <v-label>
            BIC
          </v-label>
        </v-flex>
        <v-flex xs8>
          {{ userData.bank.bic | bicMask }}
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    filters: {
      ibanMask: (value: string) => `${'*'.repeat(value.length - 4)}${value.substr(-4)}`,
      bicMask: (value: string) => `${value.substr(0, 4)}${'*'.repeat(value.length - 4)}`,
    },
  })
  export default class DataView extends Vue {
    private get userData() {
      return this.$store.state.userData;
    }
  }
</script>

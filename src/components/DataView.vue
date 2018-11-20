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
          <router-link :to="{ name: 'data-edit', query: { area: 'contact' } }">Bearbeiten</router-link>
        </v-flex>
      </v-layout>
      <ObjectListing :data="$store.state.userData.contact" :masks="valueMasks"/>
      <p></p>
      <v-layout wrap>
        <v-flex xs8>
          <h2>Bankdaten</h2>
        </v-flex>
        <v-flex xs4>
          <router-link :to="{ name: 'data-edit', query: { area: 'bank' } }">Bearbeiten</router-link>
        </v-flex>
      </v-layout>
      <ObjectListing :data="$store.state.userData.bank" :masks="valueMasks"/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ObjectListing, { MaskFunction } from '@/components/ObjectListing.vue';
  import userData from './userData';

  @Component({
    components: {
      ObjectListing,
    },
  })
  export default class DataView extends Vue {
    private valueMasks: { [key: string]: MaskFunction } = {
      iban: (value) => `${'*'.repeat(value.length - 4)}${value.substr(-4)}`,
      bic: (value) => `${value.substr(0, 4)}${'*'.repeat(value.length - 4)}`,
    };

    private created() {
      if (!this.$store.state.userData.initialized) {
        this.$store.dispatch('userData/initializeUserData', userData);
      }
    }
  }
</script>

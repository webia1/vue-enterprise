<template>
  <v-layout>
    <v-flex>
      <h1>Deine Daten</h1>
      <p>
        Das sind deine Stammdaten bei ERGO.
        Für mögliche Änderungen kannst du einfach die
        betreffenden Felder durch anklicken anpassen oder
        unsere Komfort-Funktionen nutzen.
      </p>
      <v-text-field
        v-for="field in fieldNames"
        :label="fieldLabels[field]"
        v-model="fields[field]"
      />
      <v-btn
        :dark="hasChanges"
        :disabled="!hasChanges"
        :to="submitTarget"
        color="red"
      >
        Submit
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class DataEdit extends Vue {
    private fieldLabels: { [key: string]: string } = {
      firstName: 'Vorname',
      lastName: 'Nachname',
      address: 'Adresse',
      location: 'PLZ / Ort',
      phoneNumber: 'Telefonnummer',
      email: 'E-Mail',
    };

    private origins: { [key: string]: string } = {
      firstName: 'Nina',
      lastName: 'Traumkundin',
      address: 'Wunderschönallee 13',
      location: '40477 Düsseldorf',
      phoneNumber: '+49 151 98765432',
      email: 'ninatraumkundin@mymail.de',
    };

    private fields: { [key: string]: string } = {};

    private created() {
      this.fields = {
        ...this.origins,
      };
    }

    private get fieldNames(): string[] {
      return Object.keys(this.fields);
    }

    private get hasChanges() {
      return this.fieldNames.some(field => this.origins[field] !== this.fields[field]);
    }

    private get submitTarget() {
      return {
        path: '/data/success',
        query: {
          addressChanged: String(
            (this.origins.address !== this.fields.address)
            || (this.origins.location !== this.fields.location),
          ),
        },
      };
    }
  }
</script>

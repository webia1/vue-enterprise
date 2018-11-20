<template>
  <v-layout>
    <v-flex @keyup.enter="submit()">
      <h1>Deine Daten</h1>
      <v-text-field
        v-for="field in fieldNames"
        :label="fieldLabels[field]"
        v-model="fields[field]"
      />
      <v-btn
        :dark="hasChanges"
        :disabled="!hasChanges"
        color="red"
        @click="submit()"
      >
        Submit
      </v-btn>
      <p>{{ addressChanged }}</p>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class DataEdit extends Vue {
    @Prop() private area!: string;

    private fieldLabels: { [key: string]: string } = {
      firstName: 'Vorname',
      lastName: 'Nachname',
      address: 'Adresse',
      location: 'PLZ / Ort',
      phoneNumber: 'Telefonnummer',
      email: 'E-Mail',
    };

    private fields: { [key: string]: string } = {};

    private created() {
      this.fields = {
        ...this.$store.state.userData[this.area],
      };
    }

    private get addressChanged() {
      return String(
        (this.areaToUse.address !== this.fields.address)
        || (this.areaToUse.location !== this.fields.location),
      );
    }

    private get areaToUse() {
      return this.$store.state.userData[this.area];
    }

    private get fieldNames(): string[] {
      return Object.keys(this.fields);
    }

    private get hasChanges() {
      return this.fieldNames.some(field => this.areaToUse[field] !== this.fields[field]);
    }

    private get submitTarget() {
      return {
        path: '/data/success',
        query: {
          addressChanged: this.addressChanged,
        },
      };
    }

    private submit() {
      this.$router.push(this.submitTarget);
      const mutation = this.area === 'contact' ? 'setContactData' : 'setBankData';
      this.$store.commit(`userData/${mutation}`, this.fields);
    }
  }
</script>

<template>
  <v-layout>
    <v-flex @keyup.enter="identify()">
      <h1>Bitte identifiziere dich</h1>
      <p>
        Der Schutz deiner Daten steht bei uns an erster Stelle.
        Bitte identifiziere dich, damit wir dich für dein Anliegen
        umgehend unterstützen können.
      </p>
      <v-text-field
        label="Email"
        v-model="email"
      />
      <p>oder</p>
      <v-text-field
        label="Telefonnummer"
        v-model="phoneNumber"
      />
      <v-btn
        :dark="!disabled"
        :disabled="disabled"
        color="red"
        @click="identify()"
      >
        JETZT ANMELDEN
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Identify extends Vue {
    private email: string = '';
    private phoneNumber: string = '';
    private errors = {
      email: false,
      phoneNumber: false,
    };

    private get disabled() {
      if (
        (this.email && !this.phoneNumber)
        || (!this.email && this.phoneNumber)
      ) {
        return false;
      }
      return true;
    }

    private identify() {
      this.$router.push('/data');
    }
  }
</script>

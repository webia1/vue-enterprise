<template>
  <v-layout>
    <v-flex>
      <h1>Bitte identifiziere dich</h1>
      <p>
        Der Schutz deiner Daten steht bei uns an erster Stelle.
        Bitte identifiziere dich, damit wir dich für dein Anliegen
        umgehend unterstützen können.
      </p>
      <div>
        <v-text-field
          label="Email"
          v-model="email"
        />
      </div>
      <div>
        <v-text-field
          label="Telefonnummer"
          v-model="phoneNumber"
        />
      </div>
      <div class="control">
        <v-btn
          :dark="!disabled"
          :disabled="disabled"
          color="red"
          @click="identify()"
        >
          JETZT ANMELDEN
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  // TODO: should components which use $router or router-link be "views"
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
      this.$router.push('/data/edit');
    }
  }
</script>

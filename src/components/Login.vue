<template>
  <v-layout>
    <v-flex>
      <h1>Bitte melde dich an</h1>
      <p>Der Schutz deiner Daten steht bei uns an erster Stelle. Bitte melde dich an, damit wir dich für dein Anliegen umgehend unterstützen können.</p>
      <v-form v-model="formIsValid">
        <v-text-field box :counter="20" :rules="[validName]" label="Benutzername"/>
        <v-text-field box :rules="[validPassword]" label="Password"/>
        <v-btn color="primary" :disabled="!formIsValid">Jetzt Anmelden</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import validate from "validate.js";

@Component({})
export default class Login extends Vue {
  private formIsValid = false;

  private validName = (value: string) => {
    const errors = validate.single(value, {
      presence: { allowEmpty: false },
      length: {
        minimum: 5,
        maximum: 20,
      },
    });
    return (errors && errors[0]) || true;
  }

  private validPassword = (value: string) => {
    const errors = validate.single(value, {
      presence: { allowEmpty: false },
      length: {
        minimum: 8,
      },
    });
    return (errors && errors[0]) || true;
  }
}
</script>

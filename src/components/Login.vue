<template>
  <v-layout wrap>
    <v-flex @keyup.enter="login()">
      <h1>Bitte melde dich an</h1>
      <p>
        Der Schutz deiner Daten steht bei uns an erster Stelle. Bitte melde dich
        an, damit wir dich für dein Anliegen umgehend unterstützen können.
      </p>
      <v-text-field
        box
        label="Benutzername *"
        :rules="[isValid('username')]"
        :success="!errors.username"
        v-model="username"
      />
      <v-text-field
        box
        label="Password *"
        :rules="[isValid('password')]"
        :success="!errors.password"
        v-model="password"
      />
      <v-btn
        block
        color="primary"
        :disabled="!formIsValid"
        @click="login();"
      >
        Jetzt Anmelden
      </v-btn>
    </v-flex>
    <v-flex>
      <p>
        <router-link to="/register"
          >Keine Zugangsdaten zur Hand? Kein Problem! Einfach hier klicken um
          die alternative Anmeldung auszuführen.</router-link
        >
      </p>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import validate from 'validate.js';

import userData from './userData';

@Component({})
export default class Login extends Vue {
  // private formIsValid = false;
  private username = '';
  private password = '';
  private errors = {};

  private get formIsValid() {
    const errors = validate({
      username: this.username,
      password: this.password,
    }, {
      username: {
        presence: { allowEmpty: false },
        length: {
          minimum: 5,
          maximum: 20,
        },
      },
      password: {
        presence: { allowEmpty: false },
        length: {
          minimum: 8,
        },
      },
    });
    this.errors = errors || {}
    return !errors;
  }

  private isValid(fieldName: string) {
    return () => {
      if (this.errors) {
        // @ts-ignore
        return this.errors[fieldName] ? this.errors[fieldName][0] : true;
      }
      return true;
    };
  }

  private login() {
    if (this.formIsValid) {
      if (!this.$store.state.userData.initialized) {
        this.$store.dispatch('userData/initializeUserData', userData);
      }
      this.$router.push({ name: 'overview' });
    }
  }
}
</script>

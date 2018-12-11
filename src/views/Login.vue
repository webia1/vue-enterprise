<template>
  <v-layout wrap>
    <v-flex @keyup.enter="login()">
      <v-card>
        <v-card-title>
          <h2 class="red--text text--darken-3 mb-0">Kundenbereich "Meine Versicherungen"</h2>
        </v-card-title>
        <v-card-text>
          <p>
            Bitte melden Sie sich mit ihrem Benutzernamen und Passwort an
          </p>
          <v-layout wrap>
          <v-flex xs12 md6>
            <v-text-field
              box
              :append-icon="username !== '' ? (!errors.username ? icons.fieldStates.success : icons.fieldStates.error) : null"
              label="Benutzername *"
              :rules="[isValid('username')]"
              :success="!errors.username"
              v-model="username"
            />
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              box
              :append-icon="password !== '' ? (!errors.password ? icons.fieldStates.success : icons.fieldStates.error) : null"
              label="Password *"
              :rules="[isValid('password')]"
              :success="!errors.password"
              v-model="password"
            />
          </v-flex>
          </v-layout>
          <v-btn
            large
            color="primary"
            :disabled="!formIsValid"
            @click="login();"
          >
            <v-icon large>{{ icons.cta }}</v-icon>Login
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import validate from 'validate.js';

import icons from '@/globals/icons';
import userData from '@/globals/userData';

@Component({})
export default class Login extends Vue {
  @Prop() private successRedirect!: string|object;
  private username = '';
  private password = '';
  private errors = {};
  private icons = icons;

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
    this.errors = errors || {};
    return !errors;
  }

  private isValid(fieldName: string) {
    return () => {
      if (this.errors) {
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
      this.$router.push(this.successRedirect);
    }
  }
}
</script>

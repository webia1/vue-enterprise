<template>
  <v-layout>
    <v-flex>
      <h1>
        Bitte registriere dich
      </h1>
      <p>
        Der Schutz deiner Daten steht bei uns an erster Stelle.
        Bitte melde dich an,
        damit wir dich für dein Anliegen umgehend unterstützen können.
      </p>
      <v-text-field
        box
        label="Vorname *"
        :rules="[isValid('firstName')]"
        :success="!errors.firstName"
        v-model="firstName"
      />
      <v-text-field
        box
        label="Nachname *"
        :rules="[isValid('lastName')]"
        :success="!errors.lastName"
        v-model="lastName"
      />
      <v-text-field
        box
        return-masked-value
        hint="dd.mm.yyyy"
        label="Geburtstag *"
        mask="##.##.####"
        :rules="[isValid('birthday')]"
        :success="!errors.birthday"
        v-model="birthday"
      />
      <div
        v-if="withContractNumber"
        class="mode-changer"
      >
        <v-text-field
          box
          label="Vertragsnummer *"
          :rules="[isValid('contractNumber')]"
          :success="!errors.contractNumber"
          v-model="contractNumber"
        />
        <p class="mode-changer__content">
          <a @click="changeMode()">keine Vertragsnummer zur Hand?</a>
        </p>
      </div>
      <div
        v-if="!withContractNumber"
        class="mode-changer"
      >
        <v-text-field
          box
          label="Straße / Hausnummer *"
          :rules="[isValid('address')]"
          :success="!errors.address"
          v-model="address"
        />
        <v-text-field
          box
          label="PLZ / Ort *"
          :rules="[isValid('location')]"
          :success="!errors.location"
          v-model="location"
        />
        <p class="mode-changer__content">
          <a @click="changeMode()">Eingabe der Vertragsnummer</a>
        </p>
      </div>
      <v-btn
        block
        :dark="formIsValid"
        :disabled="!formIsValid"
        color="primary"
        @click="register()"
      >
        Jetzt Registrieren
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import validate from 'validate.js';
  import moment from 'moment';

  import userData from './userData';

  @Component({})
  export default class Identify extends Vue {
    private firstName: string = '';
    private lastName: string = '';
    private birthday: string = '';
    private contractNumber: string = '';
    private withContractNumber = true;
    private address: string = '';
    private location: string = '';
    private errors = {};

    private get formIsValid() {
      const errors = validate({
        firstName: this.firstName,
        lastName: this.lastName,
        birthday: this.birthday,
        contractNumber: this.contractNumber,
        address: this.address,
        location: this.location,
      }, {
        firstName: {
          ...this.validationConstraints.name,
        },
        lastName: {
          ...this.validationConstraints.name,
        },
        birthday: {
          presence: { allowEmpty: false },
          birthday: true,
        },
        contractNumber: {
          ...this.validationConstraints.withContractNumber
        },
        address: {
          ...this.validationConstraints.withoutContractNumber,
        },
        location: {
          ...this.validationConstraints.withoutContractNumber,
        },
      });
      this.errors = errors || {};
      return !errors;
    }

    private get validationConstraints() {
      return {
        name: {
          presence: { allowEmpty: false },
          length: {
            minimum: 5,
            maximum: 20,
          },
        },
        birthday: {
          birthday: true,
        },
        withContractNumber: {
          presence: this.withContractNumber ? { allowEmpty: false } : false,
        },
        withoutContractNumber: {
          presence: !this.withContractNumber ? { allowEmpty: false } : false,
        },
      };
    }

    private changeMode() {
      this.withContractNumber = !this.withContractNumber;
      this.contractNumber = '';
      this.address = '';
      this.location = '';
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

    private register() {
      if (this.formIsValid) {
        if (!this.$store.state.userData.initialized) {
          this.$store.dispatch('userData/initializeUserData', userData);
        }
        this.$router.push({ name: 'overview' });
      }
    }
  }
</script>

<style scoped lang="stylus">
  .mode-changer {
    position relative;
    padding-bottom: 15px;

    &__content {
      position absolute;
      right 0;
      bottom: 0;
    }
  }
</style>

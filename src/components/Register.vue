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
        ref="firstNameField"
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
      <template v-if="withContractNumber">
        <div
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
        <p>
          Die Versicherungsscheinnummer (VNR) beginnt meist mit den Buchstaben SV, LV, KV oder DA gefolgt von 1 bis 9 Ziffern (z.B. KV123456789, LV12345, SV1234567). Leerzeichen und weitere nachfolgende Zeichen bitte nicht eingeben.
        </p>
      </template>
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
      <v-checkbox
        :error="errors.termsAccepted"
        :prepend-icon="errors.termsAccepted ? 'arrow_forward' : null"
        @change="termsCheck()"
        v-model="termsAccepted"
      >
        <div slot="label">
          Ich stimme den <a href="javascript:void(0)">Nutzungsbestimmungen</a> und <a href="javascript:void(0)">Datenschutzhinweisen</a> zu.
        </div>
      </v-checkbox>
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
    private termsAccepted = false;
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
      this.termsAccepted = false;
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
      this.termsCheck();
      // @ts-ignore
      if (this.formIsValid && !this.errors.termsAccepted) {
        if (!this.$store.state.userData.initialized) {
          this.$store.dispatch('userData/initializeUserData', userData);
        }
        this.$router.push({ name: 'overview' });
      }
    }

    private termsCheck() {
      Vue.set(this.errors, 'termsAccepted', this.termsAccepted !== true);
      return this.termsAccepted === true;
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

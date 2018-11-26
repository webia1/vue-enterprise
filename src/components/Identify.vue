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
        box
        label="Vorname"
        v-model="firstName"
      />
      <v-text-field
        box
        label="Nachname"
        v-model="lastName"
      />
      <v-text-field
        box
        return-masked-value
        label="Geburtstag"
        mask="##.##.####"
        hint="dd.mm.yyyy"
        v-model="birthday"
      />
      <div
        v-if="withContractNumber"
        class="mode-changer"
      >
        <v-text-field
          box
          label="Vertragsnummer"
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
          label="Straße / Hausnummer"
          v-model="address"
        />
        <v-text-field
          box
          label="PLZ / Ort"
          v-model="location"
        />
        <p class="mode-changer__content">
          <a @click="changeMode()">Eingabe der Vertragsnummer</a>
        </p>
      </div>
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
  import validate from 'validate.js';
  import moment from 'moment';


  @Component({})
  export default class Identify extends Vue {
    private firstName: string = '';
    private lastName: string = '';
    private birthday: string = '';
    private contractNumber: string = '';
    private withContractNumber = true;
    private address: string = '';
    private location: string = '';

    private get disabled() {
      if (!this.withContractNumber) {
        return Boolean(validate({
          firstName: this.firstName,
          lastName: this.lastName,
          birthday: this.birthday,
          address: this.address,
          location: this.location,
        }, {
          firstName: {
            presence: {
              allowEmpty: false,
            },
          },
          lastName: {
            presence: {
              allowEmpty: false,
            },
          },
          birthday: {
            birthday: true,
          },
          address: {
            presence: {
              allowEmpty: false,
            },
          },
          location: {
            presence: {
              allowEmpty: false,
            },
          },
        }, {
          format: 'flat',
        }));
      }
      return Boolean(validate({
        firstName: this.firstName,
        lastName: this.lastName,
        birthday: this.birthday,
        contractNumber: this.contractNumber,
      }, {
        firstName: {
          presence: {
            allowEmpty: false,
          },
        },
        lastName: {
          presence: {
            allowEmpty: false,
          },
        },
        birthday: {
          birthday: true,
          length: {
            is: 10,
          },
          // date: {
          //   earliest: moment().subtract(150, 'years'),
          //   latest: moment().subtract(18, 'years'),
          // }
        },
        contractNumber: {
          presence: {
            allowEmpty: false,
          },
        },
      }, {
        format: 'flat',
      }));
    }

    private changeMode() {
      this.withContractNumber = !this.withContractNumber;
      this.contractNumber = '';
      this.address = '';
      this.location = '';
    }

    private identify() {
      if (!this.disabled) {
        this.$router.push('/data');
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

<template>
  <v-layout>
    <v-flex @keyup.enter="submit()">
      <h1>Deine Daten</h1>
      <template v-if="area === 'personal'">
        <v-text-field
          box
          :append-icon="iconState('firstName')"
          label="Vorname"
          :rules="[isValid('firstName')]"
          :success="!errors.firstName"
          v-model="fields.firstName"
        />
        <v-text-field
          box
          :append-icon="iconState('lastName')"
          label="Nachname"
          :rules="[isValid('lastName')]"
          :success="!errors.lastName"
          v-model="fields.lastName"
        />
        <v-text-field
          box
          :append-icon="iconState('address')"
          label="Straße"
          :rules="[isValid('address')]"
          :success="!errors.address"
          v-model="fields.address"
        />
        <v-layout wrap>
          <v-flex xs12 md4>
            <v-text-field
              box
              :append-icon="iconState('zip')"
              label="PLZ"
              :rules="[isValid('zip')]"
              :success="!errors.zip"
              v-model="fields.zip"
            />
          </v-flex>
          <v-flex xs12 md8>
            <v-text-field
              box
              :append-icon="iconState('location')"
              label="Ort"
              :rules="[isValid('location')]"
              :success="!errors.location"
              v-model="fields.location"
            />
          </v-flex>
        </v-layout>
        <v-text-field
          box
          :append-icon="iconState('phoneNumber')"
          label="Telefon"
          :rules="[isValid('phoneNumber')]"
          :success="!errors.phoneNumber"
          v-model="fields.phoneNumber"
        />
        <v-text-field
          box
          :append-icon="iconState('email')"
          label="E-Mail"
          :rules="[isValid('email')]"
          :success="!errors.email"
          v-model="fields.email"
        />
      </template>
      <template v-else>
        <v-text-field
          box
          :append-icon="iconState('iban')"
          label="IBAN"
          :rules="[isValid('iban')]"
          :success="!errors.iban"
          v-model="fields.iban"
        />
        <v-text-field
          box
          :append-icon="iconState('bic')"
          label="BIC"
          :rules="[isValid('bic')]"
          :success="!errors.bic"
          v-model="fields.bic"
        />
      </template>
      <v-btn
        large
        :dark="formIsValid"
        :disabled="!formIsValid"
        color="primary"
        @click="submit()"
      >
        Submit
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import validate from 'validate.js';

@Component({})
export default class DataEdit extends Vue {
  @Prop() private area!: string;
  private icons = {
    success: 'thumb_up',
    error: 'thumb_down',
  };
  private errors = {};
  private fields: { [key: string]: string } = {};

  private validationConstraints = {
    presence: () => ({ presence: { allowEmpty: false } }),
    name: () => ({
      presence: { allowEmpty: false },
      length: {
        minimum: 3,
        maximum: 20,
      },
    }),
  };

  private created() {
    this.fields = {
      ...this.$store.state.userData[this.area],
    };
  }

  private get addressChanged() {
    return (
      this.areaToUse.address !== this.fields.address ||
      this.areaToUse.zip !== this.fields.zip ||
      this.areaToUse.location !== this.fields.location
    ).toString();
  }

  private get areaToUse() {
    return this.$store.state.userData[this.area];
  }

  private get formIsValid() {
    let errors;
    if (this.area === 'personal') {
      errors = validate({
        firstName: this.fields.firstName,
        lastName: this.fields.lastName,
        address: this.fields.address,
        zip: this.fields.zip,
        location: this.fields.location,
        phoneNumber: this.fields.phoneNumber,
        email: this.fields.email,
      }, {
        firstName: {
          ...this.validationConstraints.presence(),
          ...this.validationConstraints.name(),
        },
        lastName: {
          ...this.validationConstraints.presence(),
          ...this.validationConstraints.name(),
        },
        address: {
          ...this.validationConstraints.presence(),
          format: /\w+.*\d+.*/,
        },
        zip: {
          ...this.validationConstraints.presence(),
          length: {
            minimum: 4,
            maximum: 5,
          },
        },
        location: {
          ...this.validationConstraints.presence(),
        },
        phoneNumber: {
          ...this.validationConstraints.presence(),
        },
        email: {
          ...this.validationConstraints.presence(),
          email: true,
        },
      });
    } else {
      errors = validate(
        {
          iban: this.fields.iban,
          bic: this.fields.bic,
        },
        {
          iban: {
            presence: { allowEmpty: false },
            length: { is: 22 },
          },
          bic: {
            presence: { allowEmpty: false },
            length: { is: 11 },
          },
        },
      );
    }
    this.errors = errors || {};
    return !errors;
  }

  private get submitTarget() {
    return {
      path: '/data/success',
      // query: {
      //   addressChanged: this.addressChanged
      // }
    };
  }

  private hasChanges(fieldName: string) {
    return this.fields[fieldName] !== this.areaToUse[fieldName];
  }

  private iconState(fieldName: string) {
    if (this.hasChanges(fieldName)) {
      // @ts-ignore
      const hasErrors = this.errors[fieldName];
      return hasErrors ? this.icons.error : this.icons.success;
    }
    return null;
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

  private submit() {
    this.$router.push(this.submitTarget);
    const mutation = this.area === 'personal' ? 'setPersonalData' : 'setBankData';
    this.$store.commit(`userData/${mutation}`, this.fields);
  }
}
</script>

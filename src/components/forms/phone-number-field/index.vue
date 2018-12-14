<template>
  <v-layout>
    <v-flex xs3>
      <!-- <v-select
        box
        label="Landesvorwahl"
        :items="countryCodes"
        :rules="[isValid('countryCode')]"
        v-model="countryCode"
        @input="emitValue()"
      /> -->
      <v-text-field
        box
        label="Landesvorwahl"
        v-model="countryCode"
        ref="countryCodeField"
        @input="emitValue()"
      >
        <v-menu
          full-width
          slot="append"
        >
          <v-icon slot="activator">arrow_drop_down</v-icon>
          <v-list>
            <v-list-tile
              v-for="code in countryCodes"
              :key="code"
              @click="countryCode = code"
            >
              <v-list-tile-title>
                {{ code }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-text-field>
    </v-flex>
    <v-flex xs3>
      <v-text-field
        box
        label="Vorwahl"
        hint="ohne führende Null (0)"
        :rules="[isValid('prefix')]"
        v-model="prefix"
        @input="emitValue()"
      />
    </v-flex>
    <v-flex xs6>
      <v-text-field
        box
        label="Rufnummer"
        :rules="[isValid('phoneNumber')]"
        v-model="phoneNumber"
        @input="emitValue()"
      />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import validate from 'validate.js';

  import countryCodes from './countryCodes.json';

  @Component({})
  export default class PhoneNumberField extends Vue {
    private countryCodes = countryCodes
    private countryCode = '';
    private prefix = '';
    private phoneNumber = '';
    private errors = {};

    private get countryCodeField() {
      if (!this.$refs.countryCodeField) return null;

      return (this.$refs.countryCodeField as any).$el;
    }

    private validationConstraints = {
      countryCode: {
        format: {
          pattern: /^\+\d{2,}/,
          message: 'Landesvorwahl ist ungültig!',
        },
      },
      prefix: {
        format: {
          pattern: /\d{3,4}/,
          message: 'Vorwahl ist ungültig!',
        },
      },
      phoneNumber: {
        format: {
          pattern: /\d{4,}/,
          message: 'Rufnummer ist ungültig!',
        },
      },
    };

    private isValid(fieldName: string) {
      return () => {
        if (this[fieldName] !== '' && this.errors[fieldName]) {
          return this.errors[fieldName][0];
        }

        return true;
      }
    }

    private emitValue() {
      const errors = validate({
        countryCode: this.countryCode,
        prefix: this.prefix,
        phoneNumber: this.phoneNumber,
      }, this.validationConstraints, { fullMessages: false });
      console.dir(errors);
      if (!errors) {
        this.errors = {};
        this.$emit('input', `${this.countryCode}${this.prefix}${(this.countryCode || this.prefix) && this.phoneNumber ? '/': ''}${this.phoneNumber}`);
      } else {
        this.errors = errors;
      }
    }
  }
</script>
